const express = require("express");
const router = express.Router();

const authenticateApp = require("../middleware/authMiddleware");

const {
  registerApp,
  getDeveloperApps,
  getAppStatistics,
  getAppBackups,
} = require("../controllers/appController");

/**
 * @swagger
 * /api/apps/register:
 *   post:
 *     summary: Register a new app
 *     tags: [Apps]
 */
router.post("/apps/register", registerApp);

/**
 * @swagger
 * /api/apps:
 *   get:
 *     summary: Get all developer apps
 *     tags: [Apps]
 */
router.get("/apps", getDeveloperApps);

/**
 * @swagger
 * /api/apps/statistics:
 *   get:
 *     summary: Get app statistics
 *     tags: [Apps]
 */
router.get("/apps/statistics", authenticateApp, getAppStatistics);

/**
 * @swagger
 * /api/apps/{appId}/backups:
 *   get:
 *     summary: Get backups for a specific app
 *     tags: [Apps]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/apps/:appId/backups", getAppBackups);

module.exports = router;