import React from "react";
import "./ProjectDetails.css";
import {
  FaArrowLeft,
  FaFolderOpen,
  FaCheckCircle,
  FaPaperclip
} from "react-icons/fa";

import { toast } from "react-toastify";

function ProjectDetails({ role = "student" }) {
  const project = {
    id: 1,
    title: "Blockchain-Based Health Records",
    description:
      "This project proposes a secure and decentralized platform for managing patient health records using blockchain technology.",
    field: "Blockchain & Web Development",
    student: "Noura Ali",
    attachment: "health-records-proposal.pdf",
    status: "Pending"
  };

  return (
    <div className="project-details-page">
      <main className="project-main">

        <a
          href={role === "student" ? "/student/dashboard" : "/supervisor/dashboard"}
          className="back-btn"
        >
          <FaArrowLeft /> Back
        </a>

        <h1 className="title">{project.title}</h1>
        <p className="subtitle">{project.field}</p>

        <div className="details-card">

          <h2>Project Overview</h2>
          <p className="desc-text">{project.description}</p>

          <p><strong>Student:</strong> {project.student}</p>

          <p><strong>Status:</strong></p>
          <span className={`status ${project.status.toLowerCase()}`}>
            {project.status}
          </span>

          <p className="attach-title"><strong>Attachment:</strong></p>
          <div className="attachment-box">
            <FaPaperclip />
            <span>{project.attachment}</span>
            <a href="#" className="download-btn">Download</a>
          </div>

          <div className="actions">
            {role === "student" && (
              <>
                <button className="delete-btn" onClick={() => toast.error("Project deleted!")}>
                  Delete Project
                </button>

                <button className="edit-btn" onClick={() => toast.info("Edit mode coming soon!")}>
                  Edit Project
                </button>
              </>
            )}

            {role === "supervisor" && (
              <button
                className="request-btn"
                onClick={() => toast.success("Supervision request sent!")}
              >
                <FaCheckCircle /> Request Supervision
              </button>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}

export default ProjectDetails;
