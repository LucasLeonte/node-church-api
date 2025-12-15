const Joi = require("joi");

const update = Joi.object({
    name: Joi.string().min(1).optional(),
    avatar: Joi.string().uri().allow(null, "").optional(),
    bio: Joi.string().allow(null, "").optional(),
    birthdate: Joi.string().isoDate().allow(null, "").optional(),
    is_admin: Joi.boolean().optional(),
}).min(1);

module.exports = { update };
