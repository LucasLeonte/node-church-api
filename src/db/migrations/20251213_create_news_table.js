exports.up = function (knex) {
    return knex.schema.createTable("news", function (table) {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("image").notNullable();
        table.text("content").notNullable();
        table.timestamp("published_at").notNullable().defaultTo(knex.fn.now());
        table.string("author").nullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("news");
};
