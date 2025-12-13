// Pivot table for associating resources with resource categories

exports.up = function(knex) {
  return knex.schema.createTable('category_resource', function(table) {
    table.increments('id').primary();
    table.integer('resource_id').unsigned().notNullable().references('id').inTable('resources').onDelete('CASCADE');
    table.integer('resource_category_id').unsigned().notNullable().references('id').inTable('resource_categories').onDelete('CASCADE');
    table.unique(['resource_id', 'resource_category_id']);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('category_resource');
};
