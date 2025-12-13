const BaseModel = require('./base.model');
const { Model } = require('objection');

class FaqCategory extends BaseModel {
  static get tableName() { return 'faq_categories'; }

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
    const Faq = require('./faq.model');

    return {
      faqs: {
        relation: Model.HasManyRelation,
        modelClass: Faq,
        join: {
          from: 'faq_categories.id',
          to: 'faqs.faq_category_id'
        }
      }
    };
  }
}

module.exports = FaqCategory;