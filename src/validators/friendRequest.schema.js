const Joi = require("joi");

const create = Joi.object({
    receiver_id: Joi.number().integer().required(),
    message: Joi.string().optional().allow(null),
});

const update = Joi.object({
    status: Joi.string().valid("accepted", "rejected").required(),
    message: Joi.string().optional().allow(null),
});

module.exports = { create, update };
