const Joi = require("joi");

const create = Joi.object({
    faq_category_id: Joi.number().integer().required(),
    question: Joi.string().required(),
    answer: Joi.string().required(),
});

const update = Joi.object({
    faq_category_id: Joi.number().integer().optional(),
    question: Joi.string().optional(),
    answer: Joi.string().optional(),
});

module.exports = { create, update };
