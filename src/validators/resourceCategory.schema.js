const Joi = require("joi");

const create = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null),
});

const update = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional().allow(null),
});

module.exports = { create, update };
