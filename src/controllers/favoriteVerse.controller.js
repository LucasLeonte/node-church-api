const service = require("../services/favoriteVerse.service");
const HttpError = require("../errors/HttpError");

async function list(req, res, next) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const user_id = req.query.user_id
            ? parseInt(req.query.user_id, 10)
            : undefined;
        const data = await service.list({ page, limit, user_id });
        res.json(data);
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const row = await service.getById(id);
        if (!row) return next(HttpError.notFound("Favorite verse not found"));
        res.json(row);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        if (!req.user)
            return next(HttpError.unauthorized("Authentication required"));
        const created = await service.create(req.user.id, req.body);
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = req.params.id;
        const existing = await service.getById(id);
        if (!existing)
            return next(HttpError.notFound("Favorite verse not found"));
        if (
            !req.user ||
            (req.user.id !== existing.user_id && !req.user.is_admin)
        )
            return next(HttpError.forbidden("Not allowed"));
        await service.remove(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { list, get, create, remove };
