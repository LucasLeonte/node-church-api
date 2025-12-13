const BaseModel = require('./base.model');

class ContactMessage extends BaseModel {
  static get tableName() { return 'contact_messages'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'message'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        message: { type: 'string' },
        reply_message: { type: ['string', 'null'] },
        replied_at: { type: ['string', 'null'] }
      }
    };
  }
}

module.exports = ContactMessage;
