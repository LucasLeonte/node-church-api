const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/user.model");

module.exports = function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "Missing Authorization" });
    const token = authHeader.split(" ")[1]; // Get Bearer token value

    (async () => {
        try {
            const payload = jwt.verify(token, env.JWT_SECRET);
            const user = await User.query().findById(payload.id);
            if (!user)
                return res
                    .status(401)
                    .json({ error: "Invalid token (user not found)" });
            const u = user.toJSON();
            delete u.password;
            req.user = u;
            next();
        } catch (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
    })();
};
