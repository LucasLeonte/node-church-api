const BaseModel = require('./base.model');

class News extends BaseModel {
  static get tableName() { return 'news'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'image', 'content'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        image: { type: 'string' },
        content: { type: 'string' },
        published_at: { type: 'string', format: 'date-time' },
        author: { type: ['string', 'null'] }
      }
    };
  }
}

module.exports = News;
