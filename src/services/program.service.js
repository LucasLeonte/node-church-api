const Program = require("../models/program.model");
const { knex } = require("../config/database");

async function list({ page = 1, limit = 20 } = {}) {
    return await Program.query()
        .orderBy("id", "desc")
        .page(page - 1, limit);
}

async function getById(id) {
    return await Program.query().findById(id);
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        const insert = Object.assign({}, data);
        const row = await Program.query(trx).insert(insert);
        return row;
    });
}

async function update(id, data) {
    return await Program.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await Program.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, update, remove };
