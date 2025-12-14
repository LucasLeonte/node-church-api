const Joi = require("joi");

const newsCreate = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    content: Joi.string().required(),
    published_at: Joi.date().iso().optional(),
    author: Joi.string().optional().allow(null),
});

const newsUpdate = Joi.object({
    title: Joi.string().optional(),
    image: Joi.string().optional().allow(null),
    content: Joi.string().optional(),
    published_at: Joi.date().iso().optional(),
    author: Joi.string().optional().allow(null),
});

module.exports = { create: newsCreate, update: newsUpdate };
