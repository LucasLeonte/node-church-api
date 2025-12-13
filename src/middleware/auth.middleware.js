const jwt = require("jsonwebtoken");
const env = require("../config/env");

module.exports = function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Not Authorized" });
    const token = authHeader.split(" ")[1]; // Get JWT value
    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
