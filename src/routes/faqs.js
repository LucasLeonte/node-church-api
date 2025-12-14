const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/faq.controller");
const validation = require("../middleware/validation.middleware");
const schema = require("../validators/faq.schema");
const auth = require("../middleware/auth.middleware");

// Public list and get
router.get("/", ctrl.list);
router.get("/:id", ctrl.get);

// Admin protected create/update/delete
router.post("/", auth, validation(schema.create), ctrl.create);
router.patch("/:id", auth, validation(schema.update), ctrl.update);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;
