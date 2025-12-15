const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");
const validation = require("../middleware/validation.middleware");
const newsSchema = require("../validators/news.schema");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

// Public list and get
router.get("/", newsController.list);
router.get("/:id", newsController.get);

// Admin protected create/update/delete
router.post(
    "/",
    auth,
    admin,
    validation(newsSchema.create),
    newsController.create
);
router.patch(
    "/:id",
    auth,
    admin,
    validation(newsSchema.update),
    newsController.update
);
router.delete("/:id", auth, admin, newsController.remove);

module.exports = router;
