const BaseModel = require('./base.model');
const { Model } = require('objection');

class FriendRequest extends BaseModel {
  static get tableName() { return 'friend_requests'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sender_id', 'receiver_id'],
      properties: {
        id: { type: 'integer' },
        sender_id: { type: 'integer' },
        receiver_id: { type: 'integer' },
        status: { type: 'string' },
        message: { type: ['string', 'null'] }
      }
    };
  }

  static get relationMappings() {
    const User = require('./user.model');

    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'friend_requests.sender_id',
          to: 'users.id'
        }
      },
      receiver: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'friend_requests.receiver_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = FriendRequest;
