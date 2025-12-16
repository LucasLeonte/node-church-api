const FaqCategory = require("../models/faqCategory.model");
const { knex } = require("../config/database");
const { ensureUnique } = require("./unique.helper");

async function list({ page = 1, limit = 20 } = {}) {
    return await FaqCategory.query()
        .orderBy("id", "desc")
        .page(page - 1, limit);
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        await ensureUnique(FaqCategory, "name", data.name, trx);
        const row = await FaqCategory.query(trx).insert(Object.assign({}, data));
        return row;
    });
}

async function update(id, data) {
    if (data.name) await ensureUnique(FaqCategory, "name", data.name, null, id);
    return await FaqCategory.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await FaqCategory.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, create, update, remove };
