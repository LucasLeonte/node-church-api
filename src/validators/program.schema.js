const Joi = require("joi");

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM 24h
const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

const programCreate = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().optional().allow(null),
    day_of_week: Joi.string()
        .lowercase()
        .valid(...days)
        .required(),
    start_time: Joi.string().pattern(timePattern).required().messages({
        "string.pattern.base": "start_time must be HH:MM 24-hour format",
    }),
    end_time: Joi.string().pattern(timePattern).required().messages({
        "string.pattern.base": "end_time must be HH:MM 24-hour format",
    }),
    published: Joi.boolean().optional(),
});

const programUpdate = Joi.object({
    title: Joi.string().min(1).optional(),
    description: Joi.string().optional().allow(null),
    day_of_week: Joi.string()
        .lowercase()
        .valid(...days)
        .optional(),
    start_time: Joi.string().pattern(timePattern).optional(),
    end_time: Joi.string().pattern(timePattern).optional(),
    published: Joi.boolean().optional(),
});

// Validation: ensure end_time is after start_time when both present
function timeOrderValidator(value, helpers) {
    if (value.start_time && value.end_time) {
        const [sh, sm] = value.start_time.split(":").map(Number);
        const [eh, em] = value.end_time.split(":").map(Number);
        if ([sh, sm, eh, em].some((n) => Number.isNaN(n))) {
            return helpers.message(
                "start_time or end_time is not a valid time"
            );
        }
        const s = sh * 60 + sm;
        const e = eh * 60 + em;
        if (e <= s) {
            return helpers.message("end_time must be after start_time");
        }
    }
    return value;
}

const create = programCreate.custom(timeOrderValidator);
const update = programUpdate.custom(timeOrderValidator);

module.exports = { create, update };
