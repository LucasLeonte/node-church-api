exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.boolean('is_admin').notNullable().defaultTo(false);
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('avatar').nullable();
      table.string('bio').nullable();
      table.string('birthdate').nullable();
      table.timestamp('email_verified_at').nullable();
      table.string('password').notNullable();
      table.string('remember_token').nullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
