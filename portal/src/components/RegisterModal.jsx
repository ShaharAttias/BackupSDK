function RegisterModal({
  newAppName,
  setNewAppName,
  createdCredentials,
  handleRegisterApp,
  closeModal,
  portalError,
}) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>
          ×
        </button>

        <h2>Register New App</h2>
        <p className="modal-subtitle">
          Create app credentials and connect your Android app to BackupFlow SDK.
        </p>

        {!createdCredentials ? (
          <>
            <label>Application Name</label>
            <input
              value={newAppName}
              onChange={(e) => setNewAppName(e.target.value)}
              placeholder="Example: My Game App"
            />

            {portalError && <p className="error-text">{portalError}</p>}

            <button className="modal-primary-btn" onClick={handleRegisterApp}>
              Generate App Credentials
            </button>
          </>
        ) : (
          <>
            <div className="credentials-box">
              <p><strong>App Name:</strong> {createdCredentials.appName}</p>
              <p><strong>App ID:</strong> {createdCredentials.appId}</p>
              <p><strong>API Key:</strong> {createdCredentials.apiKey}</p>
              <p><strong>Developer ID:</strong> demo-developer</p>
            </div>

            <h3>SDK Configuration</h3>
            <pre className="code-block">{`BackupSDK.init(
    context = this,
    appId = "${createdCredentials.appId}",
    apiKey = "${createdCredentials.apiKey}",
    baseUrl = "https://backupflow-api.onrender.com/"
)`}</pre>

            <button className="modal-primary-btn" onClick={closeModal}>
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterModal;