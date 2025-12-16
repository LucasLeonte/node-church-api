const service = require("../services/friendRequest.service");
const HttpError = require("../errors/HttpError");

async function list(req, res, next) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const userId = req.user ? req.user.id : undefined;
        const data = await service.list({ page, limit, userId });
        res.json(data);
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const id = req.params.id;
        const row = await service.getById(id);
        if (!row) return next(HttpError.notFound("Friend request not found"));
        if (
            !req.user ||
            (req.user.id !== row.sender_id &&
                req.user.id !== row.receiver_id &&
                !req.user.is_admin)
        )
            return next(HttpError.forbidden("Not allowed"));
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

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const existing = await service.getById(id);
        if (!existing)
            return next(HttpError.notFound("Friend request not found"));
        // Only receiver can update (accept/reject)
        if (!req.user || req.user.id !== existing.receiver_id)
            return next(HttpError.forbidden("Not allowed"));
        const updated = await service.update(id, req.body);
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = req.params.id;
        const existing = await service.getById(id);
        if (!existing)
            return next(HttpError.notFound("Friend request not found"));
        // Only sender or receiver can cancel/delete
        if (
            !req.user ||
            (req.user.id !== existing.sender_id &&
                req.user.id !== existing.receiver_id)
        )
            return next(HttpError.forbidden("Not allowed"));
        await service.remove(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { list, get, create, update, remove };
