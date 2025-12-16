const BaseModel = require("./base.model");

class Program extends BaseModel {
    static get tableName() {
        return "programs";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "day_of_week", "start_time", "end_time"],
            properties: {
                id: { type: "integer" },
                title: { type: "string" },
                description: { type: ["string", "null"] },
                day_of_week: { type: "string" },
                start_time: {
                    type: "string",
                    pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$", // Regex (HH:MM)
                },
                end_time: {
                    type: "string",
                    pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$", // Regex (HH:MM)
                },
                published: { type: "boolean" },
            },
        };
    }
}

module.exports = Program;
