// src/pages/Requests.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Requests.css";
import { FaPaperPlane, FaUserTie } from "react-icons/fa";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        setLoading(true);

        const res = await axios.get(
          "http://localhost:8888/ershad-api/student_requests.php",
          { withCredentials: true }
        );

        setRequests(res.data.requests || []);
      } catch (err) {
        console.error(err);
        setError("Could not load your supervisor requests.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="requests-page">
      <div className="requests-inner">
        {/* Header */}
        <header className="req-header">
          <h1 className="req-title">
            <FaPaperPlane className="req-title-icon" />
            My Supervisor Requests
          </h1>
          <p className="req-subtitle">
            Track the status of the supervisors you’ve requested to work with.
          </p>
        </header>

        {/* Card */}
        <section className="req-card">
          {loading && <p className="req-info">Loading your requests…</p>}

          {error && !loading && <p className="req-error">{error}</p>}

          {!loading && !error && requests.length === 0 && (
            <p className="req-empty">
              You haven’t sent any supervisor requests yet.
            </p>
          )}

          {!loading && !error && requests.length > 0 && (
            <div className="req-table-wrapper">
              <table className="req-table">
                <thead>
                  <tr>
                    <th>
                      <FaUserTie className="req-th-icon" />
                      Supervisor
                    </th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Message</th>
                    <th>Sent At</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => {
                    const statusKey = (r.status || "").toLowerCase();
                    return (
                      <tr key={r.id}>
                        <td>{r.supervisor_name}</td>
                        <td>{r.supervisor_title || "-"}</td>
                        <td>
                          <span
                            className={`req-status-badge req-status-${statusKey}`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="req-message-cell">
                          {r.message || "—"}
                        </td>
                        <td>
                          {r.created_at
                            ? new Date(r.created_at).toLocaleString()
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Requests;