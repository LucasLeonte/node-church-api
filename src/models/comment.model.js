const BaseModel = require('./base.model');
const { Model } = require('objection');

class Comment extends BaseModel {
  static get tableName() { return 'comments'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'resource_id', 'body'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        resource_id: { type: 'integer' },
        body: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./user.model');
    const Resource = require('./resource.model');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'users.id'
        }
      },
      resource: {
        relation: Model.BelongsToOneRelation,
        modelClass: Resource,
        join: {
          from: 'comments.resource_id',
          to: 'resources.id'
        }
      }
    };
  }
}

module.exports = Comment;
