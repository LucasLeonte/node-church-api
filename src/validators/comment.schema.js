const Joi = require("joi");

const create = Joi.object({
    resource_id: Joi.number().integer().required(),
    body: Joi.string().min(1).required(),
});

const update = Joi.object({
    body: Joi.string().min(1).required(),
});

module.exports = { create, update };
