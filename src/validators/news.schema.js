const Joi = require("joi");

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const newsCreate = Joi.object({
    title: Joi.string().min(1).required(),
    image: Joi.string().required(),
    content: Joi.string().min(1).required(),
    published_at: Joi.date().iso().optional(),
    author: Joi.string().pattern(namePattern).optional().allow(null).messages({
        "string.pattern.base":
            "Author may only contain letters, spaces, apostrophes and dashes",
    }),
});

const newsUpdate = Joi.object({
    title: Joi.string().min(1).optional(),
    image: Joi.string().optional().allow(null),
    content: Joi.string().min(1).optional(),
    published_at: Joi.date().iso().optional(),
    author: Joi.string().pattern(namePattern).optional().allow(null).messages({
        "string.pattern.base":
            "Author may only contain letters, spaces, apostrophes and dashes",
    }),
});

module.exports = { create: newsCreate, update: newsUpdate };
