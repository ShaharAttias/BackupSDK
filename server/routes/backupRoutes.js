const express = require("express");
const router = express.Router();
const authenticateApp = require("../middleware/authMiddleware");

const {
  saveBackup,
  getBackup,
  deleteBackup,
  getBackupStatus,
} = require("../controllers/backupController");

/**
 * @swagger
 * tags:
 *   name: Backups
 *   description: Backup management endpoints
 */

/**
 * @swagger
 * /api/backup:
 *   post:
 *     summary: Save a backup
 *     tags: [Backups]
 */
router.post("/backup", authenticateApp, saveBackup);

/**
 * @swagger
 * /api/backup/{userId}:
 *   get:
 *     summary: Get a user's backup
 *     tags: [Backups]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/backup/:userId", authenticateApp, getBackup);

/**
 * @swagger
 * /api/backup/{userId}:
 *   delete:
 *     summary: Delete a user's backup
 *     tags: [Backups]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/backup/:userId", authenticateApp, deleteBackup);

/**
 * @swagger
 * /api/backup/status/{userId}:
 *   get:
 *     summary: Check backup status
 *     tags: [Backups]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/backup/status/:userId", authenticateApp, getBackupStatus);

module.exports = router;