const User = require("../models/user.model");
const HttpError = require("../errors/HttpError");

async function list() {
    return await User.query().select(
        "id",
        "name",
        "email",
        "avatar",
        "bio",
        "birthdate",
        "is_admin"
    );
}

async function getById(id) {
    const user = await User.query()
        .findById(id)
        .select(
            "id",
            "name",
            "email",
            "avatar",
            "bio",
            "birthdate",
            "is_admin"
        );
    if (!user) throw HttpError.notFound("User not found");
    return user;
}

async function update(id, requester, data) {
    if (!requester) throw HttpError.unauthorized("Authentication required");

    const isOwner = requester.id === id;
    const isAdmin = !!requester.is_admin; // convert to boolean

    // Checks whether req.body has its own property named "is_admin"
    const wantsToggleAdmin = Object.prototype.hasOwnProperty.call(
        data,
        "is_admin"
    );
    // Only admin can change is_admin field
    if (wantsToggleAdmin && !isAdmin)
        throw HttpError.forbidden("Admin required to change is_admin");

    // Allowed profile fields that owners can update
    const allowed = ["name", "avatar", "bio", "birthdate"];
    const patch = {};
    for (const k of allowed) if (data[k] !== undefined) patch[k] = data[k];

    // Only owner can change profile fields
    if (Object.keys(patch).length > 0 && !isOwner)
        throw HttpError.forbidden("Owner required to update profile fields");

    // Apply is_admin change only if present and requester is admin
    if (wantsToggleAdmin) patch.is_admin = !!data.is_admin;

    if (Object.keys(patch).length === 0)
        throw HttpError.badRequest("No valid fields to update");

    const updated = await User.query().patchAndFetchById(id, patch);
    if (!updated) throw HttpError.notFound("User not found");
    const u = updated.toJSON();
    delete u.password;
    return u;
}

async function remove(id, requester) {
    if (!requester) throw HttpError.unauthorized("Authentication required");
    const isOwner = requester.id === id;
    const isAdmin = !!requester.is_admin; // convert to boolean
    if (!isOwner && !isAdmin)
        throw HttpError.forbidden("Owner or admin required");
    await User.query().deleteById(id);
    return { deleted: true };
}

module.exports = { list, getById, update, remove };
