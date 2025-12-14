const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/favoriteVerse.controller");
const validation = require("../middleware/validation.middleware");
const schema = require("../validators/favoriteVerse.schema");
const auth = require("../middleware/auth.middleware");

router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.post("/", auth, validation(schema.create), ctrl.create);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;
