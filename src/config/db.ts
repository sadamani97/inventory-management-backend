import { Sequelize } from "sequelize";
import { env } from "./env.js";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

// Helper to detect current git branch
function getCurrentBranch(): string {
  if (process.env.GIT_BRANCH) {
    return process.env.GIT_BRANCH.trim();
  }

  try {
    const cwd = process.cwd();
    // Check local .git/HEAD
    let gitHeadPath = path.join(cwd, ".git", "HEAD");
    if (!fs.existsSync(gitHeadPath)) {
      // Try parent directory in case we are inside the 'backend' folder
      gitHeadPath = path.join(cwd, "..", ".git", "HEAD");
    }

    if (fs.existsSync(gitHeadPath)) {
      const headContent = fs.readFileSync(gitHeadPath, "utf-8").trim();
      if (headContent.startsWith("ref:")) {
        return headContent.replace("ref: refs/heads/", "").trim();
      }
      return headContent; // Detached HEAD
    }
  } catch (e) {
    // Ignore and proceed to CLI fallback
  }

  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch (e) {
    return "developing"; // Default fallback
  }
}

// Automatically create database if it does not exist
async function ensureDatabaseExists(url: string) {
  try {
    const parsedUrl = new URL(url);
    const dbName = parsedUrl.pathname.replace(/^\//, "");
    
    const config: any = {
      host: parsedUrl.hostname,
      port: Number(parsedUrl.port) || 3306,
      user: parsedUrl.username,
      password: parsedUrl.password,
    };
    
    if (parsedUrl.searchParams.has("ssl") || url.includes("tidbcloud")) {
      config.ssl = { minVersion: "TLSv1.2", rejectUnauthorized: true };
    }

    const connection = await mysql.createConnection(config);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();
  } catch (error) {
    // Ignore error and let Sequelize connect directly
  }
}

const currentBranch = getCurrentBranch();

// Determine database URL based on environment or active git branch
let dbUrl = "";

if (process.env.DATABASE_URL) {
  dbUrl = process.env.DATABASE_URL;
} else if (currentBranch === "main") {
  dbUrl = env.DATABASE_URL_MAIN || env.DATABASE_URL || env.DATABASE_URL_DEV;
} else if (currentBranch === "staging" || currentBranch === "stagging") {
  dbUrl = env.DATABASE_URL_STAGING || env.DATABASE_URL || env.DATABASE_URL_DEV;
} else {
  dbUrl = env.DATABASE_URL_DEV || env.DATABASE_URL || env.DATABASE_URL_MAIN;
}

// Fallback to any configured URL if the branch-specific one is not provided
if (!dbUrl) {
  dbUrl = env.DATABASE_URL || env.DATABASE_URL_MAIN || env.DATABASE_URL_STAGING || env.DATABASE_URL_DEV || "";
}

// Clean the dbUrl to remove query params like ssl that confuse Sequelize
let cleanDbUrl = dbUrl;
if (dbUrl) {
  try {
    const parsed = new URL(dbUrl);
    parsed.searchParams.delete("ssl");
    cleanDbUrl = parsed.toString();
  } catch (e) {
    // Ignore
  }
}

const dialectOptions: any = {};
if (dbUrl && (dbUrl.includes("ssl=") || dbUrl.includes("tidbcloud"))) {
  dialectOptions.ssl = { minVersion: "TLSv1.2", rejectUnauthorized: true };
}

export const sequelize = dbUrl
  ? new Sequelize(cleanDbUrl, {
      dialect: "mysql",
      logging: false,
      dialectOptions,
    })
  : new Sequelize({
      dialect: "mysql",
      logging: false,
    });

export const initDb = async () => {
  if (!dbUrl) {
    throw new Error("Missing DATABASE_URL in environment variables.");
  }

  // Ensure configured databases exist if URLs are present
  if (env.DATABASE_URL_DEV) await ensureDatabaseExists(env.DATABASE_URL_DEV);
  if (env.DATABASE_URL_STAGING) await ensureDatabaseExists(env.DATABASE_URL_STAGING);
  if (env.DATABASE_URL_MAIN) await ensureDatabaseExists(env.DATABASE_URL_MAIN);

  await sequelize.authenticate();

  const isTiDB = dbUrl.includes("tidbcloud");
  await sequelize.sync({ alter: !isTiDB });
};

