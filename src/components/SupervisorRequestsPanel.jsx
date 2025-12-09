import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SupervisorRequestsPanel.css";

function SupervisorRequestsPanel() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeRequest, setActiveRequest] = useState(null);

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
      await loadRequests(); 
    } catch (err) {
      console.error(err);
      alert("Could not update request status.");
    }
  };

  const closeModal = () => setActiveRequest(null);

  return (
    <>
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
                  <th style={{ textAlign: "center" }}>Actions</th>
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
                      <button
                        className="btn-view"
                        onClick={() => setActiveRequest(r)}
                      >
                        View Idea
                      </button>

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

      {activeRequest && (
        <div className="project-modal-backdrop" onClick={closeModal}>
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()} 
          >
            <h3 className="project-modal-title">
              {activeRequest.project_title || "Project Idea"}
            </h3>
            <p className="project-modal-sub">
              Field: <strong>{activeRequest.project_field || "-"}</strong>
            </p>

            <div className="project-modal-section">
              <h4>Student</h4>
              <p>
                {activeRequest.student_name}{" "}
                {activeRequest.student_university_id &&
                  `(${activeRequest.student_university_id})`}
              </p>
              {activeRequest.student_email && (
                <p className="project-modal-email">
                  <a
                    href={`mailto:${activeRequest.student_email}?subject=${encodeURIComponent(
                      "Regarding your project: " +
                        (activeRequest.project_title || "")
                    )}`}
                  >
                    Email student
                  </a>
                </p>
              )}
            </div>

            <div className="project-modal-section">
              <h4>Description</h4>
              <p>
                {activeRequest.project_description ||
                  "No detailed description provided."}
              </p>
            </div>

            {activeRequest.attachment_path && (
              <div className="project-modal-section">
                <h4>Attachment</h4>
                <a
                  href={`http://localhost:8888/ershad-api/${activeRequest.attachment_path}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download attached file
                </a>
              </div>
            )}

            <div className="project-modal-actions">
              <button className="btn-close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SupervisorRequestsPanel;