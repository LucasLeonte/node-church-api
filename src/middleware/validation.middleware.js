// This middleware validates and sanitizes the request body against a schema,
// rejects invalid input early, and ensures controllers receive only trusted data.

module.exports = function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error)
            return res
                .status(400)
                .json({ error: error.details.map((d) => d.message) });
        req.body = value;
        next();
    };
};
