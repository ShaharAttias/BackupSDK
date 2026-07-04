const Backup = require("../models/Backup");

const saveBackup = async ({ appId, userId, backupData }) => {
  return await Backup.findOneAndUpdate(
    { appId, userId },
    { backupData },
    { new: true, upsert: true }
  );
};

const getBackup = async ({ appId, userId }) => {
  return await Backup.findOne({ appId, userId });
};

const deleteBackup = async ({ appId, userId }) => {
  return await Backup.findOneAndDelete({ appId, userId });
};

const getBackupStatus = async ({ appId, userId }) => {
  const backup = await Backup.findOne({ appId, userId });

  if (!backup) {
    return {
      hasBackup: false,
    };
  }

  return {
    hasBackup: true,
    lastUpdated: backup.updatedAt,
  };
};

module.exports = {
  saveBackup,
  getBackup,
  deleteBackup,
  getBackupStatus,
};