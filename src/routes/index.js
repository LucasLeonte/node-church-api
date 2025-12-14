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

// News
const newsRoutes = require("./news");
router.use("/news", newsRoutes);

// Programs
const programsRoutes = require("./programs");
router.use("/programs", programsRoutes);

// Resources
const resourcesRoutes = require("./resources");
router.use("/resources", resourcesRoutes);

// Resource categories
const resourceCategoriesRoutes = require("./resourceCategories");
router.use("/resource-categories", resourceCategoriesRoutes);

// FAQs
const faqRoutes = require("./faqs");
router.use("/faqs", faqRoutes);

// FAQ categories
const faqCategoryRoutes = require("./faqCategories");
router.use("/faq-categories", faqCategoryRoutes);

// Comments
const commentsRoutes = require("./comments");
router.use("/comments", commentsRoutes);

module.exports = router;
