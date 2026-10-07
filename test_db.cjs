const { Sequelize } = require("sequelize");
const dbUrl = 'mysql://tiVZGodT9xZg9Yk.root:S4wJ53MqVLVHO92p@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/inventory_management_main?ssl={"rejectUnauthorized":true}';

let cleanDbUrl = dbUrl;
try {
  const parsed = new URL(dbUrl);
  parsed.searchParams.delete("ssl");
  cleanDbUrl = parsed.toString();
} catch (e) {
}

console.log("Clean URL:", cleanDbUrl);

const dialectOptions = {};
if (dbUrl.includes("ssl=") || dbUrl.includes("tidbcloud")) {
  dialectOptions.ssl = { minVersion: "TLSv1.2", rejectUnauthorized: true };
}

const sequelize = new Sequelize(cleanDbUrl, {
  dialect: "mysql",
  logging: false,
  dialectOptions,
});

sequelize.authenticate().then(() => {
  console.log("Success");
  process.exit(0);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
