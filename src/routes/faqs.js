const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/faq.controller");
const validation = require("../middleware/validation.middleware");
const schema = require("../validators/faq.schema");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

// Public list and get
router.get("/", ctrl.list);
router.get("/:id", ctrl.get);

// Admin protected create/update/delete
router.post("/", auth, admin, validation(schema.create), ctrl.create);
router.patch("/:id", auth, admin, validation(schema.update), ctrl.update);
router.delete("/:id", auth, admin, ctrl.remove);

module.exports = router;
