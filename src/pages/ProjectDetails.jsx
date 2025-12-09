import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectDetails.css";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

function ProjectDetails({ role }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const formatStatusLabel = (status) => {
    if (!status) return "Unknown";
    const map = {
      pending_review: "Pending",
      assigned: "Accepted",
      rejected: "Rejected",
      no_requests: "No Supervisor Yet",
    };
    return map[status] || status;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8888/ershad-api/project_details.php?id=${id}`,
          { withCredentials: true }
        );
        setProject(res.data.project);
      } catch (err) {
        console.error("Project details error:", err.response?.data || err);
        setError("Could not load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleBack = () => {
    if (role === "supervisor") {
      navigate("/supervisor/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      setDeleting(true);
      await axios.post(
        "http://localhost:8888/ershad-api/delete_project.php",
        { project_id: parseInt(id, 10) },
        { withCredentials: true }
      );

      alert("Project deleted.");
      navigate("/student/dashboard");
    } catch (err) {
      console.error("Delete project error:", err.response?.data || err);
      alert("Could not delete the project.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/student/project/${id}/edit`);
  };

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading project...</p>;
  }

  if (error || !project) {
    return <p style={{ padding: "2rem" }}>{error || "Project not found."}</p>;
  }

  return (
    <main className="project-main">
      <button className="project-back-btn" onClick={handleBack}>
        <FaArrowLeft className="back-icon" /> Back
      </button>

      <header className="project-header">
        <h1 className="project-title">{project.title}</h1>
        <span className="project-field">{project.field}</span>
      </header>

      <section className="project-card">
        <h2 className="project-section-title">Project Overview</h2>

        <p className="project-description">{project.description}</p>

        <div className="project-meta-row">
          <span className="meta-label">Student:</span>
          <span className="meta-value">{project.student_name}</span>
        </div>

        {project.supervisor_name && (
          <div className="project-meta-row">
            <span className="meta-label">Supervisor:</span>
            <span className="meta-value">{project.supervisor_name}</span>
          </div>
        )}

        <div className="project-meta-row">
          <span className="meta-label">Status:</span>
          <span className={`status-pill status-${project.status}`}>
            {formatStatusLabel(project.status)}
          </span>
        </div>

        <div className="project-meta-row">
          <span className="meta-label">Attachment:</span>
          {project.attachment_url ? (
            <a
              href={project.attachment_url}
              className="attachment-link"
              target="_blank"
              rel="noreferrer"
            >
              <FaDownload className="attach-icon" />
              Download file
            </a>
          ) : (
            <span className="meta-value">No file attached.</span>
          )}
        </div>

        {role === "student" && (
          <div className="project-actions">
            <button
              className="btn-delete-project"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Project"}
            </button>

            <button className="btn-edit-project" onClick={handleEdit}>
              Edit Project
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default ProjectDetails;