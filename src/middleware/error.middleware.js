const HttpError = require("../errors/HttpError");

module.exports = function errorHandler(err, req, res, next) {
    // Joi validation error
    if (err && err.isJoi) {
        const details = err.details
            ? err.details.map((d) => d.message)
            : undefined;
        const httpErr = HttpError.badRequest("Validation error", details);
        err = httpErr;
    }

    // Objection/Knex unique violation (sqlite returns code)
    if (
        err &&
        err.code &&
        (err.code === "SQLITE_CONSTRAINT" || err.code === "ER_DUP_ENTRY")
    ) {
        const httpErr = HttpError.badRequest(
            "Database constraint error",
            err.message
        );
        err = httpErr;
    }

    const status = err.status || 500;
    const payload = { error: err.message || "Internal Server Error" };
    if (err.details) payload.details = err.details;

    if (process.env.NODE_ENV === "development") {
        payload.stack = err.stack;
    }

    return res.status(status).json(payload);
};
