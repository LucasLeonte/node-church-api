const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const env = require("../config/env");
const HttpError = require("../errors/HttpError");

async function register({ name, email, password }) {
    const exists = await User.query().findOne({ email });
    if (exists) throw HttpError.badRequest("Email already in use");
    const hash = await bcrypt.hash(password, env.SALT_ROUNDS);
    const user = await User.query().insert({ name, email, password: hash });
    const token = signToken(user);
    return { user, token };
}

async function login({ email, password }) {
    const user = await User.query().findOne({ email });
    if (!user) throw HttpError.unauthorized("Invalid credentials");
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw HttpError.unauthorized("Invalid credentials");
    const token = signToken(user);
    return { user, token };
}

function signToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        is_admin: !!user.is_admin, // convert to boolean
    };
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

module.exports = { register, login };
