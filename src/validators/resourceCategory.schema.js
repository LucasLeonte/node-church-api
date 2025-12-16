const Joi = require("joi");

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]+$/;

const create = Joi.object({
    name: Joi.string().min(1).pattern(namePattern).required(),
    description: Joi.string().optional().allow(null),
});

const update = Joi.object({
    name: Joi.string().min(1).pattern(namePattern).optional(),
    description: Joi.string().optional().allow(null),
});

module.exports = { create, update };
