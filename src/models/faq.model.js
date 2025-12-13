const BaseModel = require('./base.model');
const { Model } = require('objection');

class Faq extends BaseModel {
  static get tableName() { return 'faqs'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['faq_category_id', 'question', 'answer'],
      properties: {
        id: { type: 'integer' },
        faq_category_id: { type: 'integer' },
        question: { type: 'string' },
        answer: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const FaqCategory = require('./faqCategory.model');

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: FaqCategory,
        join: {
          from: 'faqs.faq_category_id',
          to: 'faq_categories.id'
        }
      }
    };
  }
}

module.exports = Faq;
