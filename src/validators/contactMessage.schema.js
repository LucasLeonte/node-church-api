const Joi = require("joi");

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const create = Joi.object({
    name: Joi.string().pattern(namePattern).min(1).required().messages({
        "string.pattern.base":
            "Name may only contain letters, spaces, apostrophes and dashes",
    }),
    email: Joi.string().email().required(),
    message: Joi.string().min(1).required(),
});

const update = Joi.object({
    reply_message: Joi.string().optional().allow(null),
});

module.exports = { create, update };
