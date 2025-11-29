import React from "react";
import "./Requests.css";

function Requests() {
  const requests = [
    {
      id: 1,
      supervisor: "Dr. Rania Alhazmi",
      field: "Blockchain & Web Development",
      date: "2025-01-15",
      status: "Pending"
    },
    {
      id: 2,
      supervisor: "Dr. Afraa Attia",
      field: "Networking",
      date: "2025-01-10",
      status: "Accepted"
    },
    {
      id: 3,
      supervisor: "Dr. Duaa Sinnari",
      field: "Game Development",
      date: "2025-01-08",
      status: "Rejected"
    }
  ];

  return (
    <div className="requests-main">

      <h1 className="page-title">Supervision Requests</h1>
      <p className="page-subtitle">Review the status of your supervision requests.</p>

      <div className="requests-grid">
        {requests.map((req) => (
          <div key={req.id} className="request-card">
            
            <h3 className="supervisor-name">{req.supervisor}</h3>
            <p><strong>Field:</strong> {req.field}</p>
            <p><strong>Date Sent:</strong> {req.date}</p>

            <span className={`status ${req.status.toLowerCase()}`}>
              {req.status}
            </span>

            {req.status === "Pending" && (
              <button className="cancel-btn">Cancel Request</button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Requests;
