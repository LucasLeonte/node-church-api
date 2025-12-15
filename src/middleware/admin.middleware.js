const HttpError = require("../errors/HttpError");

module.exports = function adminMiddleware(req, res, next) {
    if (!req.user)
        return next(HttpError.unauthorized("Authentication required"));
    if (!req.user.is_admin) return next(HttpError.forbidden("Admin required"));
    return next();
};
