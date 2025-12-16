const Joi = require("joi");

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const resourceCreate = Joi.object({
    title: Joi.string().min(1).required(),
    image: Joi.string().optional().allow(null),
    content: Joi.string().min(1).required(),
    published_at: Joi.date().iso().optional(),
    author: Joi.string().pattern(namePattern).required().messages({
        "string.pattern.base":
            "Author may only contain letters, spaces, apostrophes and dashes",
    }),
    link: Joi.string().uri().optional().allow(null),
    categories: Joi.array().items(Joi.number().integer()).optional(),
});

const resourceUpdate = Joi.object({
    title: Joi.string().min(1).optional(),
    image: Joi.string().optional().allow(null),
    content: Joi.string().min(1).optional(),
    published_at: Joi.date().iso().optional(),
    author: Joi.string().pattern(namePattern).optional().messages({
        "string.pattern.base":
            "Author may only contain letters, spaces, apostrophes and dashes",
    }),
    link: Joi.string().uri().optional().allow(null),
    categories: Joi.array().items(Joi.number().integer()).optional(),
});

module.exports = { resourceCreate, resourceUpdate };
