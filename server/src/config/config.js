const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

let envFile = "";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "production") {
  envFile = ".env.production";
} else if (fs.existsSync(`${__dirname}/.env.${process.env.NODE_ENV}.local`)) {
  envFile = `.env.${process.env.NODE_ENV}.local`;
} else {
  envFile = `.env.${process.env.NODE_ENV}`;
}
dotenv.config({ path: path.resolve(__dirname, envFile), override: true });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || "somelevel",
};
