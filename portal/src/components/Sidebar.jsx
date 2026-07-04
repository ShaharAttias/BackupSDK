function Sidebar({ apps, selectedApp, onSelectApp }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">B</div>
        <h2>BackupFlow</h2>
      </div>

      <p className="section-title">MY APPS</p>

      {apps.map((app) => (
        <button
          key={app.appId}
          className={`app ${selectedApp?.appId === app.appId ? "active" : ""}`}
          onClick={() => onSelectApp(app)}
        >
          {app.name}
        </button>
      ))}

      <div className="sidebar-card">
        <h4>SDK Status</h4>
        <p>Server Online</p>
        <span>Version 1.0.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;