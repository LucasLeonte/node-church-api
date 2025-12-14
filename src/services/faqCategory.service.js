const FaqCategory = require("../models/faqCategory.model");
const { knex } = require("../config/database");

async function list({ page = 1, limit = 20 } = {}) {
    return await FaqCategory.query()
        .orderBy("id", "desc")
        .page(page - 1, limit);
}

async function getById(id) {
    return await FaqCategory.query().findById(id).withGraphFetched("faqs");
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        const row = await FaqCategory.query(trx).insert(
            Object.assign({}, data)
        );
        return row;
    });
}

async function update(id, data) {
    return await FaqCategory.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await FaqCategory.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, update, remove };
