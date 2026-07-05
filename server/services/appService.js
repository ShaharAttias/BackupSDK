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
  const apps = await App.find().sort({ createdAt: -1 });

  const appsWithStats = await Promise.all(
    apps.map(async (app) => {
      const totalBackups = await Backup.countDocuments({
        appId: app.appId,
      });

      const users = await Backup.distinct("userId", {
        appId: app.appId,
      });

      return {
        _id: app._id,
        appName: app.appName,
        appId: app.appId,
        apiKey: app.apiKey,
        createdAt: app.createdAt,
        totalBackups,
        totalUsers: users.length,
      };
    })
  );

  return appsWithStats;
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