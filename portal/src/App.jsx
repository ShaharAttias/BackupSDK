import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import RegisterModal from "./components/RegisterModal";
import Overview from "./components/Overview";
import UserData from "./components/UserData";

import { getApps, registerApp, getAppBackups } from "./services/api";
import { createAppId, createEmptyPortalApp } from "./utils/helpers";

function App() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [portalError, setPortalError] = useState("");

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    try {
      setPortalError("");

      const serverApps = await getApps();
      const mappedApps = serverApps.map(createEmptyPortalApp);

      setApps(mappedApps);

      if (mappedApps.length > 0) {
        await handleSelectApp(mappedApps[0]);
      }
    } catch (error) {
      setPortalError(error.message);
    }
  };

  const handleSelectApp = async (app) => {
    try {
      setPortalError("");

      const backups = await getAppBackups(app.appId);

      const appWithBackups = {
        ...app,
        usersData: backups,
      };

      const firstUser = backups[0] || null;

      setSelectedApp(appWithBackups);
      setSelectedUser(firstUser);

      if (firstUser) {
        const firstMetric =
          Object.keys(firstUser.backup || {}).find(
            (key) => typeof firstUser.backup[key] === "number"
          ) || "";

        setSelectedMetric(firstMetric);
      } else {
        setSelectedMetric("");
      }

      setActiveTab("overview");
    } catch (error) {
      setPortalError(error.message);
    }
  };

  const handleRegisterApp = async () => {
    if (!newAppName.trim()) return;

    const appId = createAppId(newAppName);

    try {
      setPortalError("");

      const serverApp = await registerApp(newAppName.trim(), appId);
      const createdApp = createEmptyPortalApp(serverApp);

      setApps((prev) => [...prev, createdApp]);

      setCreatedCredentials({
        appId: createdApp.appId,
        apiKey: createdApp.apiKey,
        appName: createdApp.name,
      });

      await handleSelectApp(createdApp);
    } catch (error) {
      setPortalError(error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewAppName("");
    setCreatedCredentials(null);
  };

  const numericKeys = selectedUser
    ? Object.keys(selectedUser.backup || {}).filter(
        (key) => typeof selectedUser.backup[key] === "number"
      )
    : [];

  const metricValue = selectedUser?.backup?.[selectedMetric] || 0;
  const hasBackupActivity = selectedApp ? selectedApp.backups > 0 : false;

  const activity = selectedUser
    ? [
        {
          action: "Backup completed",
          user: selectedUser.id,
          status: "Success",
          time: selectedUser.lastBackup
            ? new Date(selectedUser.lastBackup).toLocaleString()
            : "No date",
        },
      ]
    : [];

  if (!selectedApp) {
    return (
      <div className="portal-loading">
        <h2>BackupFlow</h2>

        <p>{portalError || "Loading dashboard..."}</p>

        <button className="register-btn" onClick={() => setIsModalOpen(true)}>
          Register First App
        </button>

        {isModalOpen && (
          <RegisterModal
            newAppName={newAppName}
            setNewAppName={setNewAppName}
            createdCredentials={createdCredentials}
            handleRegisterApp={handleRegisterApp}
            closeModal={closeModal}
            portalError={portalError}
          />
        )}
      </div>
    );
  }

  return (
    <div className="portal">
      <Sidebar
        apps={apps}
        selectedApp={selectedApp}
        onSelectApp={handleSelectApp}
      />

      <main className="main">
        <TopBar
          onRegisterClick={() => setIsModalOpen(true)}
          portalError={portalError}
        />

        <section className="banner">
          <div>
            <h2>{selectedApp.name}</h2>
            <p>
              App ID: {selectedApp.appId} · Last sync:{" "}
              {hasBackupActivity ? "Synced from server" : "No backups yet"} ·
              Status: Active
            </p>
          </div>
        </section>

        <div className="tabs">
          <button
            className={activeTab === "overview" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            className={activeTab === "user" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("user")}
          >
            User Data
          </button>
        </div>

        {activeTab === "overview" ? (
          <Overview
            selectedApp={selectedApp}
            hasBackupActivity={hasBackupActivity}
            activity={activity}
          />
        ) : (
          <UserData
            selectedApp={selectedApp}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            numericKeys={numericKeys}
            metricValue={metricValue}
            hasBackupActivity={hasBackupActivity}
          />
        )}
      </main>

      {isModalOpen && (
        <RegisterModal
          newAppName={newAppName}
          setNewAppName={setNewAppName}
          createdCredentials={createdCredentials}
          handleRegisterApp={handleRegisterApp}
          closeModal={closeModal}
          portalError={portalError}
        />
      )}
    </div>
  );
}

export default App;