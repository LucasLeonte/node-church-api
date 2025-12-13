const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");
const validate = require("../middleware/validation.middleware");
const auth = require("../middleware/auth.middleware");
const {
    resourceCreate,
    resourceUpdate,
} = require("../validators/resource.schema");

// Public list and get
router.get("/", resourceController.list);
router.get("/:id", resourceController.get);

// Admin protected create/update/delete
router.post("/", auth, validate(resourceCreate), resourceController.create);
router.patch("/:id", auth, validate(resourceUpdate), resourceController.update);
router.delete("/:id", auth, resourceController.remove);

module.exports = router;
