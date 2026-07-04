const express = require("express");
const router = express.Router();
const authenticateApp = require("../middleware/authMiddleware");

const {
    saveBackup,
    getBackup,
    deleteBackup,
    getBackupStatus
} = require("../controllers/backupController");

router.post("/backup", authenticateApp, saveBackup);

router.get("/backup/:userId", authenticateApp, getBackup);

router.delete("/backup/:userId", authenticateApp, deleteBackup);

router.get("/backup/status/:userId", authenticateApp, getBackupStatus);

module.exports = router;