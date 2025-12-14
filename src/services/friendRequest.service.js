const FriendRequest = require("../models/friendRequest.model");
const { knex } = require("../config/database");

async function list({ page = 1, limit = 20, userId } = {}) {
    const q = FriendRequest.query();
    if (userId)
        q.where((builder) =>
            builder.where("sender_id", userId).orWhere("receiver_id", userId)
        );
    return await q.orderBy("id", "desc").page(page - 1, limit);
}

async function getById(id) {
    return await FriendRequest.query().findById(id);
}

async function create(senderId, data) {
    return await knex.transaction(async (trx) => {
        const insert = Object.assign({}, data, {
            sender_id: senderId,
            status: "pending",
        });
        const row = await FriendRequest.query(trx).insert(insert);
        return row;
    });
}

async function update(id, data) {
    return await FriendRequest.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await FriendRequest.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, update, remove };
