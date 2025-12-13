const express = require("express");
const router = express.Router();

// Root
router.get("/", (req, res) => res.json({ message: "API root" }));

const authRoutes = require("./auth");
router.use("/auth", authRoutes);
const usersRoutes = require("./users");
router.use("/users", usersRoutes);

module.exports = router;
