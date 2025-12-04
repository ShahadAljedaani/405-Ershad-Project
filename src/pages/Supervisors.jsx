import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Supervisors.css";

function Supervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8888/ershad-api/list_supervisors.php",
          { withCredentials: true }
        );
        setSupervisors(res.data.supervisors || []);
      } catch (err) {
        console.error("Failed loading supervisors", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const sendRequest = async (supervisorId) => {
    try {
      await axios.post(
        "http://localhost:8888/ershad-api/create_request.php",
        {
          supervisor_id: supervisorId,
          message: "I would like you to supervise my project.",
        },
        { withCredentials: true }
      );

      alert("Request sent to supervisor!");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error ||
          "Could not send request. Please check the console."
      );
    }
  };

  return (
    <div className="supervisors-page">
      <h2 className="supervisors-title">Available Supervisors</h2>

      {loading && <p className="supervisors-info">Loading…</p>}

      {!loading && supervisors.length === 0 && (
        <p className="supervisors-info">No supervisors available yet.</p>
      )}

      <div className="supervisor-list">
        {supervisors.map((s) => (
          <div key={s.id} className="supervisor-card">
            <h3 className="supervisor-name">{s.name}</h3>
            <p className="supervisor-line">Email: {s.email}</p>
            <p className="supervisor-line">Title: {s.title || "-"}</p>
            <p className="supervisor-line">
              Expertise: {s.expertise || "-"}
            </p>

            <button
              className="request-btn"
              onClick={() => sendRequest(s.id)}
            >
              Send Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Supervisors;