const Joi = require("joi");

const create = Joi.object({
    translation: Joi.string().optional().allow(null),
    book: Joi.string().required(),
    chapter: Joi.number().integer().required(),
    verse: Joi.number().integer().required(),
});

const update = Joi.object({
    translation: Joi.string().optional().allow(null),
    book: Joi.string().optional(),
    chapter: Joi.number().integer().optional(),
    verse: Joi.number().integer().optional(),
});

module.exports = { create, update };
