const express = require("express");
const router = express.Router();
const programController = require("../controllers/program.controller");
const validation = require("../middleware/validation.middleware");
const programSchema = require("../validators/program.schema");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

// Public list and get
router.get("/", programController.list);
router.get("/:id", programController.get);

// Admin protected create/update/delete
router.post(
    "/",
    auth,
    admin,
    validation(programSchema.create),
    programController.create
);
router.patch(
    "/:id",
    auth,
    admin,
    validation(programSchema.update),
    programController.update
);
router.delete("/:id", auth, admin, programController.remove);

module.exports = router;
