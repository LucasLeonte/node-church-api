const authService = require("../services/auth.service");
const { registerSchema, loginSchema } = require("../validators/auth.schema");

async function register(req, res, next) {
    try {
        const { user, token } = await authService.register(req.body);
        res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { user, token } = await authService.login(req.body);
        res.json({ user, token });
    } catch (err) {
        next(err);
    }
}

register.createSchema = registerSchema;
login.createSchema = loginSchema;

module.exports = { register, login };
