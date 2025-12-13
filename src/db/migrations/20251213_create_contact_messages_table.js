exports.up = function(knex) {
  return knex.schema.createTable('contact_messages', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.text('message').notNullable();
    table.text('reply_message').nullable();
    table.timestamp('replied_at').nullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contact_messages');
};
