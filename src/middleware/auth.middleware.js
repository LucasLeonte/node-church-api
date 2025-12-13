const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/user.model");
const HttpError = require("../errors/HttpError");

module.exports = async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return next(HttpError.unauthorized("Missing Authorization"));
    const token = authHeader.split(" ")[1]; // Get Bearer token value

    try {
        const payload = jwt.verify(token, env.JWT_SECRET);

        const user = await User.query()
            .select(
                "id",
                "name",
                "email",
                "is_admin",
                "avatar",
                "bio",
                "birthdate"
            )
            .findById(payload.id);

        if (!user)
            return next(
                HttpError.unauthorized("Invalid token (user not found)")
            );

        req.user = user.toJSON ? user.toJSON() : user;
        return next();
    } catch (err) {
        return next(HttpError.unauthorized("Invalid token"));
    }
};
