require("dotenv").config();

module.exports = {
    development: {
        client: process.env.DB_CLIENT || "sqlite3",
        connection: {
            filename: process.env.DB_FILENAME || "./src/db/dev.sqlite3",
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./src/db/migrations",
        },
        seeds: {
            directory: "./src/db/seeds",
        },
    },
};
