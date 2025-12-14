const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/contactMessage.controller");
const validation = require("../middleware/validation.middleware");
const schema = require("../validators/contactMessage.schema");
const auth = require("../middleware/auth.middleware");

// Public create
router.post("/", validation(schema.create), ctrl.create);

// Admin protected read/create(reply)/delete
router.get("/", auth, ctrl.list);
router.get("/:id", auth, ctrl.get);
router.post("/:id/reply", auth, validation(schema.update), ctrl.reply);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;
