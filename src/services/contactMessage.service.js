const ContactMessage = require("../models/contactMessage.model");
const { knex } = require("../config/database");

async function list({ page = 1, limit = 20 } = {}) {
    return await ContactMessage.query()
        .orderBy("id", "desc")
        .page(page - 1, limit);
}

async function getById(id) {
    return await ContactMessage.query().findById(id);
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        const row = await ContactMessage.query(trx).insert(
            Object.assign({}, data)
        );
        return row;
    });
}

async function reply(id, reply_message) {
    const replied_at = knex.fn.now();
    return await ContactMessage.query().patchAndFetchById(id, {
        reply_message,
        replied_at,
    });
}

async function remove(id) {
    await ContactMessage.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, reply, remove };
