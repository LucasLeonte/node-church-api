const News = require("../models/news.model");
const { knex } = require("../config/database");
const { ensureUnique } = require("./unique.helper");

async function list({ page = 1, limit = 20 } = {}) {
    return await News.query()
        .orderBy("published_at", "desc")
        .page(page - 1, limit);
}

async function getById(id) {
    return await News.query().findById(id);
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        const insert = Object.assign({}, data);
        if (insert.title) await ensureUnique(News, "title", insert.title, trx);
        if (!insert.published_at) insert.published_at = knex.fn.now();
        const row = await News.query(trx).insert(insert);
        return row;
    });
}

async function update(id, data) {
    if (data.title) {
        await ensureUnique(News, "title", data.title, null, id);
    }
    return await News.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await News.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, update, remove };
