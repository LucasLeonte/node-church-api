const Joi = require("joi");

const create = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
});

const update = Joi.object({
    reply_message: Joi.string().optional().allow(null),
});

module.exports = { create, update };
