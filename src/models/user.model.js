const BaseModel = require('./base.model');
const { Model } = require('objection');

class User extends BaseModel {
  static get tableName() { return 'users'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        is_admin: { type: 'boolean' },
        name: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        avatar: { type: ['string', 'null'] },
        bio: { type: ['string', 'null'] },
        birthdate: { type: ['string', 'null'] },
        password: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Comment = require('./comment.model');
    const FavoriteVerse = require('./favoriteVerse.model');
    const FriendRequest = require('./friendRequest.model');

    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'users.id',
          to: 'comments.user_id'
        }
      },
      favorites: {
        relation: Model.HasManyRelation,
        modelClass: FavoriteVerse,
        join: {
          from: 'users.id',
          to: 'favorite_verses.user_id'
        }
      },
      sentRequests: {
        relation: Model.HasManyRelation,
        modelClass: FriendRequest,
        join: {
          from: 'users.id',
          to: 'friend_requests.sender_id'
        }
      },
      receivedRequests: {
        relation: Model.HasManyRelation,
        modelClass: FriendRequest,
        join: {
          from: 'users.id',
          to: 'friend_requests.receiver_id'
        }
      }
    };
  }
}

module.exports = User;
