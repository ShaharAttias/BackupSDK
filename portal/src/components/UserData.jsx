import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function UserData({
  hasBackupActivity,
  selectedApp,
  selectedUser,
  setSelectedUser,
  selectedMetric,
  setSelectedMetric,
  numericKeys,
  metricValue,
}) {
  return (
    <div className="user-layout">
      <div className="panel">
        <h3>Users</h3>

        {!hasBackupActivity ? (
          <div className="mini-empty">
            No users yet.
            <br />
            User data will appear after the SDK sends the first backup.
          </div>
        ) : (
          selectedApp.usersData.map((user) => (
            <div
              key={user.id}
              className={`user-row ${
                selectedUser.id === user.id ? "selected-user" : ""
              }`}
              onClick={() => {
                const firstMetric =
                  Object.keys(user.backup).find(
                    (key) => typeof user.backup[key] === "number"
                  ) || "level";

                setSelectedUser(user);
                setSelectedMetric(firstMetric);
              }}
            >
              <strong>{user.id}</strong>

              <p>{user.device}</p>
            </div>
          ))
        )}
      </div>

      <div className="panel">
        {!hasBackupActivity ? (
          <section className="empty-state compact">
            <h3>No user backup data yet</h3>

            <p>
              Once your Android app calls BackupSDK.save(), user backup data
              and metric history will appear here.
            </p>
          </section>
        ) : (
          <>
            <h3>User Backup Details</h3>

            <div className="details-grid">
              <div>
                <span>User</span>
                <strong>{selectedUser.id}</strong>
              </div>

              <div>
                <span>Device</span>
                <strong>{selectedUser.device}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedUser.status}</strong>
              </div>

              <div>
                <span>Last Backup</span>
                <strong>{selectedUser.lastBackup}</strong>
              </div>
            </div>

            <h3>Stored Backup Data</h3>

            <div className="backup-data-grid">
              {Object.entries(selectedUser.backup).map(([key, value]) => (
                <div key={key} className="backup-data-item">
                  <span>{key}</span>

                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="metric-section">
              <div className="metric-header">
                <h3>Backup Metric Timeline</h3>

                <select
                  className="metric-select"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  {numericKeys.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={[
                    {
                      step: "Previous 4",
                      value: Math.round(metricValue * 0.35),
                    },
                    {
                      step: "Previous 3",
                      value: Math.round(metricValue * 0.55),
                    },
                    {
                      step: "Previous 2",
                      value: Math.round(metricValue * 0.72),
                    },
                    {
                      step: "Previous 1",
                      value: Math.round(metricValue * 0.88),
                    },
                    {
                      step: "Latest",
                      value: metricValue,
                    },
                  ]}
                >
                  <XAxis dataKey="step" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserData;