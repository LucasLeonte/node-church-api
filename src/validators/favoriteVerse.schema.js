const Joi = require("joi");

const bookPattern = /^[A-Za-z0-9() .'-]+$/; // allow common book name chars but not arbitrary symbols

const create = Joi.object({
    translation: Joi.string().optional().allow(null),
    book: Joi.string().pattern(bookPattern).required().messages({
        "string.pattern.base": "Book contains invalid characters",
    }),
    chapter: Joi.number().integer().min(1).required(),
    verse: Joi.number().integer().min(1).required(),
});

const update = Joi.object({
    translation: Joi.string().optional().allow(null),
    book: Joi.string().pattern(bookPattern).optional(),
    chapter: Joi.number().integer().min(1).optional(),
    verse: Joi.number().integer().min(1).optional(),
});

module.exports = { create, update };
