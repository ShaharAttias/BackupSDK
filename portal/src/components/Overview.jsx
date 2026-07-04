import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { backupData, restoreData } from "../data/charts";

function Overview({
  selectedApp,
  hasBackupActivity,
  activity,
}) {
  return (
    <>
      <section className="cards">
        <div className="card">
          <span>Total Users</span>
          <h3>{selectedApp.users}</h3>
          <p>{hasBackupActivity ? "+12.5% this week" : "No data yet"}</p>
        </div>

        <div className="card">
          <span>Total Backups</span>
          <h3>{selectedApp.backups}</h3>
          <p>{hasBackupActivity ? "+18.7% this week" : "Waiting for SDK"}</p>
        </div>

        <div className="card">
          <span>Total Devices</span>
          <h3>{selectedApp.devices}</h3>
          <p>{hasBackupActivity ? "+8.3% this week" : "No devices yet"}</p>
        </div>

        <div className="card">
          <span>Total Restores</span>
          <h3>{selectedApp.restores}</h3>
          <p>{hasBackupActivity ? "+15.2% this week" : "No restores yet"}</p>
        </div>
      </section>

      {!hasBackupActivity ? (
        <section className="panel empty-state">
          <h3>No backup activity yet</h3>

          <p>
            This app was registered successfully, but no backup data has been
            received yet.
          </p>

          <p>
            Install the SDK in your Android app and call{" "}
            <strong>BackupSDK.save()</strong> to start seeing analytics here.
          </p>

          <pre className="code-block">{`BackupSDK.init(
    context = this,
    appId = "${selectedApp.appId}",
    apiKey = "${selectedApp.apiKey}",
    baseUrl = "https://backupflow-api.onrender.com/"
)

BackupSDK.setUserId("user_001")
BackupSDK.save("level", "5")`}</pre>
        </section>
      ) : (
        <>
          <section className="grid">
            <div className="panel">
              <h3>Backups This Week</h3>

              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={backupData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="backups"
                    fill="#3B82F6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="panel">
              <h3>Restores This Week</h3>

              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={restoreData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="restores"
                    stroke="#2563EB"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="grid">
            <div className="panel">
              <h3>Recent Activity</h3>

              {activity.map((item, index) => (
                <div className="activity-row" key={index}>
                  <div>
                    <strong>{item.action}</strong>
                    <p>User ID: {item.user}</p>
                  </div>

                  <span
                    className={
                      item.status === "Success"
                        ? "status success"
                        : "status failed"
                    }
                  >
                    {item.status}
                  </span>

                  <small>{item.time}</small>
                </div>
              ))}
            </div>

            <div className="panel">
              <h3>Top Users by Backups</h3>

              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Backups</th>
                    <th>Last Backup</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedApp.usersData.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.backupsCount}</td>
                      <td>{user.lastBackup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Overview;