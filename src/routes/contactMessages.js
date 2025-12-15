const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/contactMessage.controller");
const validation = require("../middleware/validation.middleware");
const schema = require("../validators/contactMessage.schema");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

// Public create
router.post("/", validation(schema.create), ctrl.create);

// Admin protected read/create(reply)/delete
router.get("/", auth, admin, ctrl.list);
router.get("/:id", auth, admin, ctrl.get);
router.post("/:id/reply", auth, admin, validation(schema.update), ctrl.reply);
router.delete("/:id", auth, admin, ctrl.remove);

module.exports = router;
