const BaseModel = require("./base.model");
const { Model } = require("objection");

class Resource extends BaseModel {
    static get tableName() {
        return "resources";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "content", "author"],
            properties: {
                id: { type: "integer" },
                title: { type: "string" },
                image: { type: "string" },
                content: { type: "string" },
                published_at: { type: "string", format: "date-time" },
                author: { type: "string" },
                link: { type: ["string", "null"] },
            },
        };
    }

    static get relationMappings() {
        const ResourceCategory = require("./resourceCategory.model");
        const Comment = require("./comment.model");

        return {
            categories: {
                relation: Model.ManyToManyRelation,
                modelClass: ResourceCategory,
                join: {
                    from: "resources.id",
                    through: {
                        from: "category_resource.resource_id",
                        to: "category_resource.resource_category_id",
                    },
                    to: "resource_categories.id",
                },
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comment,
                join: {
                    from: "resources.id",
                    to: "comments.resource_id",
                },
            },
        };
    }
}

module.exports = Resource;
