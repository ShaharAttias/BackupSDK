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
  users: 0,
  backups: 0,
  devices: 0,
  restores: 0,
  usersData: [
    {
      id: "demo_user_001",
      device: "Android Emulator",
      status: "Active",
      lastBackup: "No backups yet",
      backupsCount: 0,
      backup: {
        level: 0,
        coins: 0,
      },
    },
  ],
});