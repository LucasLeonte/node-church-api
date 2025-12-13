class HttpError extends Error {
    constructor(status, message, details) {
        super(message);
        this.status = status;
        if (details) this.details = details;
    }

    static badRequest(message = "Bad Request", details) {
        return new HttpError(400, message, details);
    }

    static unauthorized(message = "Unauthorized") {
        return new HttpError(401, message);
    }

    static forbidden(message = "Forbidden") {
        return new HttpError(403, message);
    }

    static notFound(message = "Not Found") {
        return new HttpError(404, message);
    }

    static server(message = "Internal Server Error") {
        return new HttpError(500, message);
    }
}

module.exports = HttpError;
