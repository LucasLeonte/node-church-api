const BaseModel = require('./base.model');
const { Model } = require('objection');

class FavoriteVerse extends BaseModel {
  static get tableName() { return 'favorite_verses'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'book', 'chapter', 'verse'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        translation: { type: 'string' },
        book: { type: 'string' },
        chapter: { type: 'integer' },
        verse: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./user.model');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'favorite_verses.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = FavoriteVerse;
