const Resource = require("../models/resource.model");
const { knex } = require("../config/database");

async function list({
    page = 1,
    limit = 20,
    q,
    sortBy = "id",
    sortDir = "asc",
} = {}) {
    const allowedSortFields = new Set([
        "id",
        "title",
        "published_at",
        "author",
    ]);
    const dir = String(sortDir || "").toLowerCase() === "desc" ? "desc" : "asc";

    const qb = Resource.query().withGraphFetched("categories");
    if (q && String(q).trim()) {
        // Search in title, content, author
        const term = `%${String(q).toLowerCase()}%`;
        qb.whereRaw(
            "(LOWER(title) LIKE ? OR LOWER(content) LIKE ? OR LOWER(author) LIKE ?)",
            [term, term, term]
        );
    }

    // Apply sorting (whitelist fields to avoid injection)
    if (allowedSortFields.has(sortBy)) {
        qb.orderBy(sortBy, dir);
    } else {
        qb.orderBy("id", "asc");
    }

    return await qb.page(page - 1, limit); // limit & offset
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
