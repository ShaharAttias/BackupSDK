const API_BASE_URL = "https://backupsdk-api.onrender.com/api";

export async function getApps() {
  const response = await fetch(`${API_BASE_URL}/apps`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load apps");
  }

  return data.apps;
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