exports.up = function(knex) {
  return knex.schema.createTable('faq_categories', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').nullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('faq_categories');
};
