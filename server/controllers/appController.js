const appService = require("../services/appService");

const registerApp = async (req, res) => {
  try {
    const { appName, appId } = req.body;

    if (!appName || !appId) {
      return res.status(400).json({
        message: "appName and appId are required",
      });
    }

    const app = await appService.registerApp({ appName, appId });

    if (!app) {
      return res.status(400).json({
        message: "App already exists",
      });
    }

    res.status(201).json({
      message: "App registered successfully",
      app,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering app",
      error: error.message,
    });
  }
};

const getDeveloperApps = async (req, res) => {
  try {
    const apps = await appService.getDeveloperApps();

    res.status(200).json({
      message: "Apps retrieved successfully",
      apps,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting apps",
      error: error.message,
    });
  }
};

const getAppStatistics = async (req, res) => {
  try {
    const appId = req.app.appId;

    const statistics = await appService.getAppStatistics({ appId });

    if (!statistics) {
      return res.status(404).json({
        message: "App not found",
      });
    }

    res.status(200).json({
      message: "Statistics retrieved successfully",
      statistics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting statistics",
      error: error.message,
    });
  }
};

const getAppBackups = async (req, res) => {
  try {
    const { appId } = req.params;

    const backups = await appService.getAppBackups({ appId });

    res.status(200).json({
      message: "Backups retrieved successfully",
      backups,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting app backups",
      error: error.message,
    });
  }
};

module.exports = {
  registerApp,
  getDeveloperApps,
  getAppStatistics,
  getAppBackups,
};