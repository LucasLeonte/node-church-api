const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validation.middleware");

router.post(
    "/register",
    validate(authController.register.createSchema),
    authController.register
);
router.post(
    "/login",
    validate(authController.login.createSchema),
    authController.login
);

module.exports = router;
