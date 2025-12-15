const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validation.middleware");
const auth = require("../middleware/auth.middleware");

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

router.get("/me", auth, authController.me);

module.exports = router;
