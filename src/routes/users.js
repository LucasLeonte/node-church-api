const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const schema = require("../validators/user.schema");

// Public list and get
router.get("/", usersController.list);
router.get("/:id", usersController.get);

// Owner-only update, admin-only toggle is_admin
router.patch("/:id", auth, validate(schema.update), usersController.update);

// Owner or admin can delete
router.delete("/:id", auth, usersController.remove);

module.exports = router;
