const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const env = require("../config/env");

async function register({ name, email, password }) {
    const exists = await User.query().findOne({ email });
    if (exists)
        throw Object.assign(new Error("Email already in use"), { status: 400 });
    const hash = await bcrypt.hash(password, env.SALT_ROUNDS);
    const user = await User.query().insert({ name, email, password: hash });
    const token = signToken(user);
    return { user, token };
}

async function login({ email, password }) {
    const user = await User.query().findOne({ email });
    if (!user)
        throw Object.assign(new Error("Invalid credentials"), { status: 401 });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
        throw Object.assign(new Error("Invalid credentials"), { status: 401 });
    const token = signToken(user);
    return { user, token };
}

function signToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        is_admin: !!user.is_admin, // force convert to boolean
    };
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

module.exports = { register, login };
