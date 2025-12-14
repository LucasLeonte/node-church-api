const Faq = require("../models/faq.model");
const { knex } = require("../config/database");

async function list({ page = 1, limit = 20 } = {}) {
    return await Faq.query()
        .withGraphFetched("category")
        .orderBy("id", "desc")
        .page(page - 1, limit);
}

async function getById(id) {
    return await Faq.query().findById(id).withGraphFetched("category");
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        const row = await Faq.query(trx).insert(Object.assign({}, data));
        return await getById(row.id);
    });
}

async function update(id, data) {
    return await Faq.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await Faq.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, update, remove };
