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

// Mask database passwords in logs for security
function maskDbUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.password) {
      parsed.password = "****";
    }
    return parsed.toString();
  } catch {
    return url.replace(/:([^:@]+)@/, ":****@");
  }
}

// Automatically create database if it does not exist
async function ensureDatabaseExists(url: string) {
  try {
    const parsedUrl = new URL(url);
    const dbName = parsedUrl.pathname.replace(/^\//, "");
    
    const config = {
      host: parsedUrl.hostname,
      port: Number(parsedUrl.port) || 3306,
      user: parsedUrl.username,
      password: parsedUrl.password,
    };

    const connection = await mysql.createConnection(config);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();
  } catch (error) {
    console.warn("[Database] Note: Could not pre-create database automatically. Sequelize will try to connect directly.", error);
  }
}

const currentBranch = getCurrentBranch();

// Determine database URL based on the current branch
let dbUrl = env.DATABASE_URL_DEV; // Default to local development database

if (currentBranch === "main") {
  dbUrl = env.DATABASE_URL_MAIN;
} else if (currentBranch === "staging" || currentBranch === "stagging") {
  dbUrl = env.DATABASE_URL_STAGING;
} else {
  // Any other active issue/feature branch (e.g., SO-001, PO-01, BE-purchaseorder, developing)
  // connects to the local development database
  dbUrl = env.DATABASE_URL_DEV;
}

export const sequelize = new Sequelize(dbUrl, {
  dialect: "mysql",
  logging: false,
});

export const initDb = async () => {
  try {
    console.log(`[Database] Detected Git Branch: "${currentBranch}"`);
    console.log(`[Database] Connecting to: ${maskDbUrl(dbUrl)}`);
    
    // Ensure all three configured databases exist in MySQL
    await ensureDatabaseExists(env.DATABASE_URL_DEV);
    await ensureDatabaseExists(env.DATABASE_URL_STAGING);
    await ensureDatabaseExists(env.DATABASE_URL_MAIN);

    await sequelize.authenticate();
    console.log("[Database] Connection established successfully.");

    await sequelize.sync();
    console.log("[Database] Models synchronized successfully.");
  } catch (error) {
    console.error("[Database] Failed to initialize database:", error);
    throw error;
  }
};
