const App = require("../models/App");
const Backup = require("../models/Backup");
const generateApiKey = require("../utils/generateApiKey");

const registerApp = async ({ appName, appId }) => {
  const existingApp = await App.findOne({ appId });

  if (existingApp) {
    return null;
  }

  const apiKey = generateApiKey();

  return await App.create({
    appName,
    appId,
    apiKey,
  });
};

const getDeveloperApps = async () => {
  return await App.find().sort({ createdAt: -1 });
};

const getAppStatistics = async ({ appId }) => {
  const app = await App.findOne({ appId });

  if (!app) {
    return null;
  }

  const totalBackups = await Backup.countDocuments({ appId });
  const users = await Backup.distinct("userId", { appId });

  return {
    appId,
    appName: app.appName,
    totalBackups,
    totalUsers: users.length,
  };
};

module.exports = {
  registerApp,
  getAppStatistics,
  getDeveloperApps,
};