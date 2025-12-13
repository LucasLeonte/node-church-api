exports.up = function(knex) {
  return knex.schema.createTable('favorite_verses', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('translation', 32).notNullable().defaultTo('WEB');
    table.string('book').notNullable();
    table.specificType('chapter', 'smallint').notNullable();
    table.specificType('verse', 'smallint').notNullable();
    table.timestamps(true, true);
    table.unique(['user_id', 'translation', 'book', 'chapter', 'verse'], 'fav_unique');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('favorite_verses');
};
