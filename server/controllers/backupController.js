const backupService = require("../services/backupService");

const saveBackup = async (req, res) => {
  try {
    const { userId, backupData } = req.body;
    const appId = req.app.appId;

    if (!userId || !backupData) {
      return res.status(400).json({
        message: "userId and backupData are required",
      });
    }

    const backup = await backupService.saveBackup({
      appId,
      userId,
      backupData,
    });

    res.status(200).json({
      message: "Backup saved successfully",
      backup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving backup",
      error: error.message,
    });
  }
};

const getBackup = async (req, res) => {
  try {
    const { userId } = req.params;
    const appId = req.app.appId;

    const backup = await backupService.getBackup({
      appId,
      userId,
    });

    if (!backup) {
      return res.status(404).json({
        message: "Backup not found",
      });
    }

    res.status(200).json({
      message: "Backup retrieved successfully",
      backup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting backup",
      error: error.message,
    });
  }
};

const deleteBackup = async (req, res) => {
  try {
    const { userId } = req.params;
    const appId = req.app.appId;

    const backup = await backupService.deleteBackup({
      appId,
      userId,
    });

    if (!backup) {
      return res.status(404).json({
        message: "Backup not found",
      });
    }

    res.status(200).json({
      message: "Backup deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting backup",
      error: error.message,
    });
  }
};

const getBackupStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const appId = req.app.appId;

    const status = await backupService.getBackupStatus({
      appId,
      userId,
    });

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({
      message: "Error getting backup status",
      error: error.message,
    });
  }
};

module.exports = {
  saveBackup,
  getBackup,
  deleteBackup,
  getBackupStatus,
};