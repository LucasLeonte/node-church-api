const BaseModel = require('./base.model');
const { Model } = require('objection');

class ResourceCategory extends BaseModel {
  static get tableName() { return 'resource_categories'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: ['string', 'null'] }
      }
    };
  }

  static get relationMappings() {
    const Resource = require('./resource.model');

    return {
      resources: {
        relation: Model.ManyToManyRelation,
        modelClass: Resource,
        join: {
          from: 'resource_categories.id',
          through: {
            from: 'category_resource.resource_category_id',
            to: 'category_resource.resource_id'
          },
          to: 'resources.id'
        }
      }
    };
  }
}

module.exports = ResourceCategory;
