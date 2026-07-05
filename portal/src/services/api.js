const API_BASE_URL = "https://backupsdk-api.onrender.com/api";

export async function getApps() {
  const response = await fetch(`${API_BASE_URL}/apps`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load apps");
  }

  return data.apps;
}

export async function getAppBackups(appId) {
  const response = await fetch(`${API_BASE_URL}/apps/${appId}/backups`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load app backups");
  }

  return data.backups;
}

export async function registerApp(appName, appId) {
  const response = await fetch(`${API_BASE_URL}/apps/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appName, appId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to register app");
  }

  return data.app;
}

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
  devices: 0,
  restores: 0,

  usersData: [],
});