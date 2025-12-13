module.exports = function errorHandler(err, req, res, next) {
    // Standardized errors
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    if (process.env.NODE_ENV === "development") {
        return res.status(status).json({ error: message, stack: err.stack });
    }
    return res.status(status).json({ error: message });
};
