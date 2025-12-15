const usersService = require("../services/users.service");

async function list(req, res, next) {
    try {
        const users = await usersService.list();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await usersService.getById(id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        const updated = await usersService.update(id, req.user, req.body);
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        await usersService.remove(id, req.user);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { list, get, update, remove };
