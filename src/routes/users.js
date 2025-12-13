const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middleware/auth.middleware");

router.get("/me", auth, usersController.me);
router.patch("/me", auth, usersController.updateMe);

module.exports = router;
