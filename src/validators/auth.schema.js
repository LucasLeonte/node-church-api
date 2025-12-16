const Joi = require("joi");

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const registerSchema = Joi.object({
    name: Joi.string().pattern(namePattern).min(1).required().messages({
        "string.pattern.base":
            "Name may only contain letters, spaces, apostrophes and dashes",
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
