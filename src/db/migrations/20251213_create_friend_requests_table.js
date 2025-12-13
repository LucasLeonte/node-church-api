exports.up = function(knex) {
  return knex.schema.createTable('friend_requests', function(table) {
    table.bigIncrements('id').primary();
    table.bigInteger('sender_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.bigInteger('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('status').notNullable().defaultTo('pending');
    table.text('message').nullable();
    table.timestamps(true, true);
    table.unique(['sender_id', 'receiver_id']);
    table.index(['receiver_id', 'status']);
    table.index(['sender_id', 'status']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('friend_requests');
};
