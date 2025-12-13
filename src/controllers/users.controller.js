async function me(req, res, next) {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
}

async function updateMe(req, res, next) {
  try {
    const allowed = ['name', 'avatar', 'bio', 'birthdate'];
    const patch = {};
    for (const k of allowed) if (req.body[k] !== undefined) patch[k] = req.body[k];
    const User = require('../models/user.model');
    const updated = await User.query().patchAndFetchById(req.user.id, patch);
    const u = updated.toJSON();
    delete u.password;
    res.json(u);
  } catch (err) { next(err); }
}

module.exports = { me, updateMe };
