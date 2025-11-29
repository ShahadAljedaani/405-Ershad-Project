import React from "react";
import "./StudentDashboard.css";
import { FaUpload, FaUserFriends, FaEnvelopeOpenText } from "react-icons/fa";

function StudentDashboard() {
  return (
    <div className="dashboard-content">

      {/* Header */}
      <h1 className="welcome">Welcome, Student</h1>
      <p className="sub-welcome">Manage your project ideas and supervisor requests easily.</p>

      {/* Quick Actions */}
      <div className="quick-actions">

        <a href="/student/upload" className="qa-card">
          <FaUpload className="qa-icon" />
          <h3>Upload Idea</h3>
          <p>Submit a new project idea</p>
        </a>

        <a href="/student/supervisors" className="qa-card">
          <FaUserFriends className="qa-icon" />
          <h3>Supervisors</h3>
          <p>Find suitable supervisors</p>
        </a>

        <a href="/student/requests" className="qa-card">
          <FaEnvelopeOpenText className="qa-icon" />
          <h3>Requests</h3>
          <p>Check supervisor responses</p>
        </a>

      </div>

      {/* Projects Section */}
      <h2 className="section-title">My Projects</h2>

      <div className="projects-grid">

        <div className="project-card">
          <h3>AI-based Medical Assistant</h3>
          <p className="project-field">Field: Artificial Intelligence</p>

          <div className="project-footer">
            <span className="status pending">Pending Review</span>
            <a href="/project/1" className="details-btn">View Details</a>
          </div>
        </div>

        <div className="project-card">
          <h3>Web-Based Student Tracking</h3>
          <p className="project-field">Field: Web Development</p>

          <div className="project-footer">
            <span className="status approved">Approved</span>
            <a href="/project/2" className="details-btn">View Details</a>
          </div>
        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;
