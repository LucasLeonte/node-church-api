const Joi = require("joi");

const create = Joi.object({
    faq_category_id: Joi.number().integer().required(),
    question: Joi.string().min(1).required(),
    answer: Joi.string().min(1).required(),
});

const update = Joi.object({
    faq_category_id: Joi.number().integer().optional(),
    question: Joi.string().min(1).optional(),
    answer: Joi.string().min(1).optional(),
});

module.exports = { create, update };
