const express = require("express");
const router = express.Router();

const authenticateApp = require("../middleware/authMiddleware");

const {
  registerApp,
  getAppStatistics,
  getDeveloperApps,
} = require("../controllers/appController");



router.post("/apps/register", registerApp);
router.get("/apps/statistics", authenticateApp, getAppStatistics);
router.get("/apps", getDeveloperApps);

module.exports = router;