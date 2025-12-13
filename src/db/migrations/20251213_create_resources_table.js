exports.up = function (knex) {
    return knex.schema.createTable("resources", function (table) {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("image").nullable();
        table.text("content").notNullable();
        table.timestamp("published_at").notNullable().defaultTo(knex.fn.now());
        table.string("author").notNullable();
        table.string("link").nullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("resources");
};
