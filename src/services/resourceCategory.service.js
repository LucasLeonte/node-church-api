const ResourceCategory = require("../models/resourceCategory.model");
const { knex } = require("../config/database");
const { ensureUnique } = require("./unique.helper");

async function list({ page = 1, limit = 20 } = {}) {
    return await ResourceCategory.query()
        .orderBy("id", "desc")
        .page(page - 1, limit);
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        const insert = Object.assign({}, data);
        await ensureUnique(ResourceCategory, "name", data.name, trx);
        const row = await ResourceCategory.query(trx).insert(insert);
        return row;
    });
}

async function update(id, data) {
    if (data.name) {
        await ensureUnique(ResourceCategory, "name", data.name, null, id);
    }
    return await ResourceCategory.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await ResourceCategory.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, create, update, remove };
