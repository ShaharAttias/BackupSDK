function TopBar({ onRegisterClick, portalError }) {
  return (
    <header className="topbar">
      <div>
        <h1>Overview</h1>
        <p>Monitor backups, restores, devices, and user backup data</p>
        {portalError && <p className="error-text">{portalError}</p>}
      </div>

      <button className="register-btn" onClick={onRegisterClick}>
        Register App
      </button>
    </header>
  );
}

export default TopBar;