const Joi = require("joi");

const create = Joi.object({
    resource_id: Joi.number().integer().required(),
    body: Joi.string().required(),
});

const update = Joi.object({
    body: Joi.string().required(),
});

module.exports = { create, update };
