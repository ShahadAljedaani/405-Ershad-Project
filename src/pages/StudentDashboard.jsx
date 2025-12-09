import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentDashboard.css";
import { FaUpload, FaUsers, FaEnvelopeOpenText } from "react-icons/fa";

function StudentDashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsError("");
        const res = await axios.get(
          "http://localhost:8888/ershad-api/student_projects.php",
          { withCredentials: true }
        );
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error(err);
        setProjectsError("Could not load your projects.");
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="student-dashboard">
      <header className="student-dashboard-header">
        <h1>Welcome, Student</h1>
        <p>Manage your project ideas and supervisor requests easily.</p>
      </header>

      <section className="student-dashboard-actions">
        <div className="dashboard-actions">

          <div className="dashboard-card" onClick={() => navigate("/student/upload")}>
            <FaUpload className="dashboard-icon" />
            <h3>Upload Idea</h3>
            <p>Submit a new project idea</p>
          </div>

          <div className="dashboard-card" onClick={() => navigate("/student/supervisors")}>
            <FaUsers className="dashboard-icon" />
            <h3>Supervisors</h3>
            <p>Find suitable supervisors</p>
          </div>

          <div className="dashboard-card" onClick={() => navigate("/student/requests")}>
            <FaEnvelopeOpenText className="dashboard-icon" />
            <h3>Requests</h3>
            <p>Check supervisor responses</p>
          </div>

        </div>
      </section>

      <section className="student-projects-section">
        <div className="projects-header">
          <h2>My Projects</h2>
        </div>

        {projectsError && (
          <p className="projects-error">{projectsError}</p>
        )}

        {loadingProjects && !projectsError && (
          <p className="projects-info">Loading your projects…</p>
        )}

        {!loadingProjects && !projectsError && projects.length === 0 && (
          <p className="projects-empty">
            You don’t have any projects yet. Start by uploading a new idea.
          </p>
        )}

        {!loadingProjects && !projectsError && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.id} className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{p.title}</h3>
                  <span className={`status-pill status-${p.status}`}>
                    {p.status}
                  </span>
                </div>

                <p className="project-field">
                  Field: {p.field || p.category || "—"}
                </p>

                {p.supervisor_name && (
                  <p className="project-meta">
                    Supervisor: <strong>{p.supervisor_name}</strong>
                  </p>
                )}

                {p.created_at && (
                  <p className="project-meta">
                    Submitted: {p.created_at_formatted || p.created_at}
                  </p>
                )}

                <button
                  className="project-details-btn"
                  onClick={() => navigate(`/student/project/${p.id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default StudentDashboard;