const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/friendRequest.controller");
const validation = require("../middleware/validation.middleware");
const schema = require("../validators/friendRequest.schema");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, ctrl.list);
router.get("/:id", auth, ctrl.get);
router.post("/", auth, validation(schema.create), ctrl.create);
router.patch("/:id", auth, validation(schema.update), ctrl.update);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;
