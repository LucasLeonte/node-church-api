const service = require("../services/faqCategory.service");
const HttpError = require("../errors/HttpError");

async function list(req, res, next) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const data = await service.list({ page, limit });
        res.json(data);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const created = await service.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const updated = await service.update(id, req.body);
        if (!updated) return next(HttpError.notFound("FAQ category not found"));
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = req.params.id;
        await service.remove(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { list, create, update, remove };
