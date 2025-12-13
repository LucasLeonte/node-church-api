const express = require("express");
const router = express.Router();

// Root
router.get("/", (req, res) => res.json({ message: "API root" }));

const authRoutes = require("./auth");
router.use("/auth", authRoutes);

module.exports = router;
