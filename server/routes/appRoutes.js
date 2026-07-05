const express = require("express");
const router = express.Router();

const authenticateApp = require("../middleware/authMiddleware");

const {
  registerApp,
  getDeveloperApps,
  getAppStatistics,
  getAppBackups,
} = require("../controllers/appController");

router.post("/apps/register", registerApp);
router.get("/apps", getDeveloperApps);
router.get("/apps/statistics", authenticateApp, getAppStatistics);
router.get("/apps/:appId/backups", getAppBackups);

module.exports = router;