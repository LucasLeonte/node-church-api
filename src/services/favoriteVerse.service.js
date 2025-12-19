const FavoriteVerse = require("../models/favoriteVerse.model");
const { knex } = require("../config/database");

async function list({ page = 1, limit = 20, user_id } = {}) {
    const q = FavoriteVerse.query();
    if (user_id) q.where("user_id", user_id);
    return await q.orderBy("id", "desc").page(page - 1, limit);
}

async function create(userId, data) {
    return await knex.transaction(async (trx) => {
        const insert = Object.assign({}, data, { user_id: userId });
        const row = await FavoriteVerse.query(trx).insert(insert);
        return row;
    });
}

async function getById(id) {
    return await FavoriteVerse.query().findById(id);
}

async function remove(id) {
    await FavoriteVerse.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, create, getById, remove };
