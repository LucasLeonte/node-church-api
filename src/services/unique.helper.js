const HttpError = require("../errors/HttpError");

async function ensureUnique(Model, field, value, trx = null, excludeId = null) {
    if (value == null) return;
    const val = String(value).toLowerCase();
    let qb = Model.query(trx).whereRaw(`LOWER(${field}) = ?`, [val]);
    if (excludeId) qb = qb.whereNot("id", excludeId);
    const existing = await qb.first();
    if (existing) {
        throw new HttpError(409, `${field} must be unique`);
    }
}

module.exports = { ensureUnique };
