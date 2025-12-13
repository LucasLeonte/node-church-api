const express = require("express");
const router = express.Router();

// Root
router.get("/", (req, res) => res.json({ message: "API root" }));

// Auth
const authRoutes = require("./auth");
router.use("/auth", authRoutes);

// Users
const usersRoutes = require("./users");
router.use("/users", usersRoutes);

// Resources
const resourcesRoutes = require("./resources");
router.use("/resources", resourcesRoutes);

module.exports = router;
