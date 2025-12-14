const Comment = require("../models/comment.model");
const { knex } = require("../config/database");

async function list({ page = 1, limit = 20, resource_id } = {}) {
    const q = Comment.query().withGraphFetched("user");
    if (resource_id) q.where("resource_id", resource_id);
    return await q.orderBy("id", "desc").page(page - 1, limit);
}

async function getById(id) {
    return await Comment.query().findById(id).withGraphFetched("user");
}

async function create(userId, data) {
    return await knex.transaction(async (trx) => {
        const insert = Object.assign({}, data, { user_id: userId });
        const row = await Comment.query(trx).insert(insert);
        return await getById(row.id);
    });
}

async function update(id, data) {
    return await Comment.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await Comment.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, update, remove };
