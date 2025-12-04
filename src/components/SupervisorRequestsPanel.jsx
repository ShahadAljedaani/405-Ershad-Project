import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SupervisorRequestsPanel.css";

function SupervisorRequestsPanel() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRequests = async () => {
    try {
      setError("");
      const res = await axios.get(
        "http://localhost:8888/ershad-api/supervisor_requests.php",
        { withCredentials: true }
      );
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load student requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.post(
        "http://localhost:8888/ershad-api/update_request_status.php",
        { request_id: id, status },
        { withCredentials: true }
      );
      await loadRequests(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Could not update request status.");
    }
  };

  return (
    <div className="requests-card">
      <div className="requests-header">
        <h3>Student Requests</h3>
        {loading && <span className="requests-tag">Loading…</span>}
      </div>

      {error && <p className="requests-error">{error}</p>}

      {!loading && requests.length === 0 && !error && (
        <p className="requests-empty">No requests yet.</p>
      )}

      {!loading && requests.length > 0 && (
        <div className="requests-table-wrapper">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>University ID</th>
                <th>Major</th>
                <th>Message</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.student_name}</td>
                  <td>{r.student_university_id || "-"}</td>
                  <td>{r.student_major || "-"}</td>
                  <td>{r.message || "-"}</td>
                  <td>
                    <span className={`status-badge status-${r.status}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="requests-actions">
                    {r.status === "pending" ? (
                      <>
                        <button
                          className="btn-accept"
                          onClick={() => updateStatus(r.id, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => updateStatus(r.id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="requests-done">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SupervisorRequestsPanel;