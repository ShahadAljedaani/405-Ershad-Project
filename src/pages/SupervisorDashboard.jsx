import React, { useEffect, useState } from "react";
import "./SupervisorDashboard.css";

import SupervisorRequestsPanel from "../components/SupervisorRequestsPanel";

function SupervisorDashboard() {
  const [supervisor, setSupervisor] = useState(null);

  useEffect(() => {
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
      <div className="supdash-header">
        <h1 className="supdash-title">Welcome back, {displayName}</h1>
        <p className="supdash-subtitle">
          Review student requests and keep track of your supervision activity.
        </p>
      </div>

      <SupervisorRequestsPanel />
    </div>
  );
}

export default SupervisorDashboard;