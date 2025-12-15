const resourceService = require("../services/resource.service");
const HttpError = require("../errors/HttpError");

async function list(req, res, next) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const q = req.query.q;
        const data = await resourceService.list({ page, limit, q });
        res.json(data);
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const row = await resourceService.getById(id);
        if (!row) return next(HttpError.notFound("Resource not found"));
        res.json(row);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const created = await resourceService.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const updated = await resourceService.update(id, req.body);
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = req.params.id;
        await resourceService.remove(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { list, get, create, update, remove };
