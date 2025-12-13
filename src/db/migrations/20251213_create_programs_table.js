exports.up = function(knex) {
  return knex.schema.createTable('programs', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description').nullable();
    table.string('day_of_week').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
    table.boolean('published').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('programs');
};
