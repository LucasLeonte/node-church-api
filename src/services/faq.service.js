const Faq = require("../models/faq.model");
const { knex } = require("../config/database");
const { ensureUnique } = require("./unique.helper");
const HttpError = require("../errors/HttpError");

async function list({ page = 1, limit = 20, q } = {}) {
    const qb = Faq.query().withGraphFetched("category").orderBy("id", "desc");
    if (q && String(q).trim()) {
        // Search in question and answer
        const term = `%${String(q).toLowerCase()}%`;
        qb.whereRaw("(LOWER(question) LIKE ? OR LOWER(answer) LIKE ?)", [
            term,
            term,
        ]);
    }
    return await qb.page(page - 1, limit); // limit & offset
}

async function getById(id) {
    return await Faq.query().findById(id).withGraphFetched("category");
}

async function create(data) {
    return await knex.transaction(async (trx) => {
        await ensureUnique(Faq, "question", data.question, trx);
        // If a faq_category_id is provided, ensure it exists
        if (data.faq_category_id) {
            const found = await knex("faq_categories")
                .transacting(trx)
                .where({ id: Number(data.faq_category_id) })
                .first();
            if (!found) {
                throw HttpError.notFound("FAQ category not found");
            }
        }

        const row = await Faq.query(trx).insert(Object.assign({}, data));
        return await getById(row.id);
    });
}

async function update(id, data) {
    if (data.question) {
        await ensureUnique(Faq, "question", data.question, null, id);
    }
    if (data.faq_category_id) {
        const found = await knex("faq_categories")
            .where({ id: Number(data.faq_category_id) })
            .first();
        if (!found) throw HttpError.notFound("FAQ category not found");
    }
    return await Faq.query().patchAndFetchById(id, data);
}

async function remove(id) {
    await Faq.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, create, update, remove };
