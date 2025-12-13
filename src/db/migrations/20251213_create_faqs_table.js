exports.up = function(knex) {
  return knex.schema.createTable('faqs', function(table) {
    table.increments('id').primary();
    table.integer('faq_category_id').unsigned().notNullable()
      .references('id').inTable('faq_categories').onDelete('CASCADE');
    table.string('question').notNullable();
    table.text('answer').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('faqs');
};
