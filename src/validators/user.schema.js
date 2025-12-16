const Joi = require("joi");

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const update = Joi.object({
    name: Joi.string().pattern(namePattern).min(1).optional().messages({
        'string.pattern.base': 'Name may only contain letters, spaces, apostrophes and dashes',
    }),
    avatar: Joi.string().uri().allow(null, "").optional(),
    bio: Joi.string().allow(null, "").optional(),
    birthdate: Joi.string().isoDate().allow(null, "").optional(),
    is_admin: Joi.boolean().optional(),
}).min(1);

module.exports = { update };
