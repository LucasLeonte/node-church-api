const express = require("express");
const router = express.Router();
const programController = require("../controllers/program.controller");
const validation = require("../middleware/validation.middleware");
const programSchema = require("../validators/program.schema");
const auth = require("../middleware/auth.middleware");

// Public list and get
router.get("/", programController.list);
router.get("/:id", programController.get);

// Admin protected create/update/delete
router.post(
    "/",
    auth,
    validation(programSchema.create),
    programController.create
);
router.patch(
    "/:id",
    auth,
    validation(programSchema.update),
    programController.update
);
router.delete("/:id", auth, programController.remove);

module.exports = router;
