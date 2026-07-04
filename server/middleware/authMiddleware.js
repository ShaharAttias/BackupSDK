const App = require("../models/App");

const authenticateApp = async (req, res, next) => {
  try {
    const appId = req.header("x-app-id");
    const apiKey = req.header("x-api-key");

    if (!appId || !apiKey) {
      return res.status(401).json({
        success: false,
        message: "Missing appId or apiKey",
      });
    }

    const app = await App.findOne({ appId, apiKey });

    if (!app) {
      return res.status(403).json({
        success: false,
        message: "Invalid app credentials",
      });
    }

    req.app = {
      id: app._id,
      appId: app.appId,
      appName: app.appName,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports = authenticateApp;