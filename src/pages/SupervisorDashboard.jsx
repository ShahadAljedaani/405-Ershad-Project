import React from "react";
import "./SupervisorDashboard.css";
import { FaFolderOpen } from "react-icons/fa";

function SupervisorDashboard() {
  const matchingProjects = [
    {
      id: 1,
      title: "Blockchain-Based Health Records",
      field: "Blockchain & Web Development",
      student: "Noura Ali",
      status: "Pending",
    },
    {
      id: 2,
      title: "Web Portal for Research Management",
      field: "Web Development",
      student: "Ruba Hassan",
      status: "Pending",
    },
  ];

  const supervisedProjects = [
    {
      id: 10,
      title: "AI Smart Assistant",
      field: "Artificial Intelligence",
      student: "Aisha Alzahrani",
      status: "In progress",
    },
    {
      id: 11,
      title: "Data Mining for E-Learning",
      field: "Data Mining",
      student: "Sarah Alharbi",
      status: "Approved",
    },
  ];

  return (
    <div className="supervisor-dashboard-page">

   
      <main className="dash-main">

        <h1 className="page-title">Supervisor Dashboard</h1>
        <p className="page-subtitle">
          Review matching projects and manage your supervised projects.
        </p>

        
        <h2 className="section-title">Matching Projects</h2>
        <div className="projects-grid">
          {matchingProjects.map((proj) => (
            <div key={proj.id} className="project-card">
              <h3>{proj.title}</h3>
              <p><strong>Field:</strong> {proj.field}</p>
              <p><strong>Student:</strong> {proj.student}</p>
              <span className="status pending">Pending</span>

              <a href={`/supervisor/project/${proj.id}`} className="details-btn">
                <FaFolderOpen /> View Details
              </a>
            </div>
          ))}
        </div>

        <h2 className="section-title">My Supervised Projects</h2>
        <div className="projects-grid">
          {supervisedProjects.map((proj) => (
            <div key={proj.id} className="project-card">
              <h3>{proj.title}</h3>
              <p><strong>Field:</strong> {proj.field}</p>
              <p><strong>Student:</strong> {proj.student}</p>

              <span
                className={`status ${
                  proj.status === "Approved" ? "approved" : "inprogress"
                }`}
              >
                {proj.status}
              </span>

              <a href={`/supervisor/project/${proj.id}`} className="details-btn">
                <FaFolderOpen /> View Details
              </a>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default SupervisorDashboard;
