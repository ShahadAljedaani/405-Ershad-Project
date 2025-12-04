import React, { useEffect, useState } from "react";
import "./SupervisorDashboard.css";
import SupervisorRequestsPanel from "../components/SupervisorRequestsPanel";


function SupervisorDashboard() {
  const [supervisor, setSupervisor] = useState(null);

  useEffect(() => {
    // try to read current user from localStorage (set in Profile / Login)
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      const user = JSON.parse(stored);
      if (user.role === "supervisor") {
        setSupervisor(user);
      }
    }
  }, []);

  const displayName = supervisor?.name || "Supervisor";

  return (
    <div className="supervisor-dashboard">

      {/* Top welcome section */}
      <div className="supdash-header">
        <h1 className="supdash-title">Welcome back, {displayName}</h1>
        <p className="supdash-subtitle">
          Review student requests and keep track of your supervision activity.
        </p>
      </div>

      {/* Example summary cards (static, you can later connect to backend) */}
      <div className="supdash-stats-row">
        <div className="supdash-stat-card">
          <span className="stat-label">Pending Requests</span>
          <span className="stat-value">–</span>
          <span className="stat-note">Handled below in the requests panel</span>
        </div>

        <div className="supdash-stat-card">
          <span className="stat-label">Active Students</span>
          <span className="stat-value">–</span>
          <span className="stat-note">You can wire this later to real data</span>
        </div>

        <div className="supdash-stat-card">
          <span className="stat-label">Notifications</span>
          <span className="stat-value">–</span>
          <span className="stat-note">Future place for alerts / messages</span>
        </div>
      </div>

      {/* Student requests list */}
      <SupervisorRequestsPanel />
    </div>
  );
}

export default SupervisorDashboard;