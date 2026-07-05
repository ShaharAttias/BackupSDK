export const createAppId = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const createEmptyPortalApp = (app) => ({
  name: app.appName || app.name,
  appId: app.appId,
  apiKey: app.apiKey,

  users: app.totalUsers || 0,
  backups: app.totalBackups || 0,

  devices: app.totalUsers || 0,
  restores: 0,

  usersData: [],
});