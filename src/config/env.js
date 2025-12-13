const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    DB_CLIENT: process.env.DB_CLIENT || "sqlite3",
    DB_FILENAME: process.env.DB_FILENAME || "../db/dev.sqlite3",
    JWT_SECRET: process.env.JWT_SECRET || "change-me",
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10) || 10,
};
