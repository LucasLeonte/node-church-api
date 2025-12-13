const Resource = require("../models/resource.model");
const { knex } = require("../config/database");

async function list({ page = 1, limit = 20 } = {}) {
    const result = await Resource.query()
        .withGraphFetched("categories")
        .page(page - 1, limit);
    return result;
}

async function getById(id) {
    const row = await Resource.query()
        .findById(id)
        .withGraphFetched("categories");
    return row;
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        const resourceData = Object.assign({}, data);
        if (!resourceData.published_at)
            resourceData.published_at = knex.fn.now();
        const inserted = await Resource.query(trx).insert(resourceData);
        if (
            data.categories &&
            Array.isArray(data.categories) &&
            data.categories.length
        ) {
            const rows = data.categories.map((cid) => ({
                resource_id: inserted.id,
                resource_category_id: cid,
            }));
            await knex("category_resource").transacting(trx).insert(rows);
        }
        return await getById(inserted.id);
    });
}

async function update(id, data) {
    return await knex.transaction(async (trx) => {
        const patch = Object.assign({}, data);
        await Resource.query(trx).patchAndFetchById(id, patch);
        if (data.categories) {
            await knex("category_resource")
                .transacting(trx)
                .where({ resource_id: id })
                .del();
            if (Array.isArray(data.categories) && data.categories.length) {
                const rows = data.categories.map((cid) => ({
                    resource_id: id,
                    resource_category_id: cid,
                }));
                await knex("category_resource").transacting(trx).insert(rows);
            }
        }
        return await getById(id);
    });
}

async function remove(id) {
    await Resource.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, update, remove };
