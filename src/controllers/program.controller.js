const programService = require("../services/program.service");
const HttpError = require("../errors/HttpError");

async function list(req, res, next) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const data = await programService.list({ page, limit });
        res.json(data);
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const row = await programService.getById(id);
        if (!row) return next(HttpError.notFound("Program not found"));
        res.json(row);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        if (!req.user || !req.user.is_admin)
            return next(HttpError.forbidden("Admin required"));
        const created = await programService.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        if (!req.user || !req.user.is_admin)
            return next(HttpError.forbidden("Admin required"));
        const id = req.params.id;
        const updated = await programService.update(id, req.body);
        if (!updated) return next(HttpError.notFound("Program not found"));
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        if (!req.user || !req.user.is_admin)
            return next(HttpError.forbidden("Admin required"));
        const id = req.params.id;
        await programService.remove(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { list, get, create, update, remove };
