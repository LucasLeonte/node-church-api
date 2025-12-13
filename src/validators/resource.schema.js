const Joi = require("joi");

const resourceCreate = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().optional().allow(null),
    content: Joi.string().required(),
    published_at: Joi.date().iso().optional(),
    author: Joi.string().required(),
    link: Joi.string().uri().optional().allow(null),
    categories: Joi.array().items(Joi.number().integer()).optional(),
});

const resourceUpdate = Joi.object({
    title: Joi.string().optional(),
    image: Joi.string().optional(),
    content: Joi.string().optional(),
    published_at: Joi.date().iso().optional(),
    author: Joi.string().optional(),
    link: Joi.string().uri().optional().allow(null),
    categories: Joi.array().items(Joi.number().integer()).optional(),
});

module.exports = { resourceCreate, resourceUpdate };
