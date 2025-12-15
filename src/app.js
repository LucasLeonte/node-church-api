const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
// Initialize DB (bind Objection models to knex)
require("./config/database");

const errorHandler = require("./middleware/error.middleware");

const routes = require("./routes");

const app = express();

// Security
app.use(helmet());
app.use(cors());

// Logging
app.use(morgan("dev"));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// Health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// API routes (at ./routes)
app.use("/api", routes);

// API docs at project root (public/index.html)
app.use(express.static(path.join(__dirname, "..", "public")));

// 404 fallback
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handler
app.use(errorHandler);

module.exports = app;
