const Joi = require("joi");

const programCreate = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(null),
    day_of_week: Joi.string().required(),
    start_time: Joi.string().required(),
    end_time: Joi.string().required(),
    published: Joi.boolean().optional(),
});

const programUpdate = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional().allow(null),
    day_of_week: Joi.string().optional(),
    start_time: Joi.string().optional(),
    end_time: Joi.string().optional(),
    published: Joi.boolean().optional(),
});

module.exports = { create: programCreate, update: programUpdate };
