const Resource = require("../models/resource.model");
const { knex } = require("../config/database");
const { ensureUnique } = require("./unique.helper");
const HttpError = require("../errors/HttpError");

// Verify that provided resource category IDs exist.
// Returns an array of numeric IDs or throws HttpError when any are missing.
async function validateResourceCategoryIds(categoryInput, trx) {
    // Normalize input to an array of positive numeric IDs
    const cats = Array.isArray(categoryInput)
        ? categoryInput.map((c) => Number(c)).filter(Boolean)
        : [categoryInput].map((c) => Number(c)).filter(Boolean);
    if (!cats.length) return [];
    // Fetch matching category ids from DB and compute any missing ones
    const existingRows = await knex("resource_categories")
        .transacting(trx)
        .whereIn("id", cats)
        .select("id");
    const existingIds = existingRows.map((r) => r.id);
    const missing = cats.filter((cid) => !existingIds.includes(cid));
    if (missing.length) {
        throw HttpError.badRequest("Some resource categories not found", {
            missing,
        });
    }
    return cats;
}

// List resources with pagination, search, and sorting
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

    // Base query: eager-load category relations
    const qb = Resource.query().withGraphFetched("categories");
    if (q && String(q).trim()) {
        // Apply search filter across title, content and author
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
        // Enforce uniqueness on title
        await ensureUnique(Resource, "title", data.title, trx);
        if (!resourceData.published_at)
            resourceData.published_at = knex.fn.now();
        const inserted = await Resource.query(trx).insert(resourceData);
        // Validate provided category ids and create join rows
        const cats = await validateResourceCategoryIds(data.categories, trx);
        if (cats.length) {
            const rows = cats.map((cid) => ({
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
        if (patch.title) {
            await ensureUnique(Resource, "title", patch.title, null, id);
        }
        await Resource.query(trx).patchAndFetchById(id, patch);
        if (data.categories) {
            // Remove existing relations
            await knex("category_resource")
                .transacting(trx)
                .where({ resource_id: id })
                .del();
            // Validate new category ids and insert relations
            const cats = await validateResourceCategoryIds(
                data.categories,
                trx
            );
            if (cats.length) {
                const rows = cats.map((cid) => ({
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
