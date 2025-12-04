import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { Link } from "react-router-dom";   // ✅ better than <a>

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8888/ershad-api/profile.php",
          { withCredentials: true }
        );
        setUser(res.data.user);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      } catch (err) {
        console.error(err);
        setError("Could not load profile. Please log in again.");

        const stored = localStorage.getItem("currentUser");
        if (stored) {
          setUser(JSON.parse(stored));
        }
      }
    };

    fetchProfile();
  }, []);

  if (error && !user) {
    return <p className="error-message">{error}</p>;
  }

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="title">Profile</h2>
        <p className="subtitle">
          {user.role === "student" ? "Student" : "Supervisor"} Account
        </p>

        <div className="profile-field">
          <span className="label">Name:</span>
          <span className="value">{user.name}</span>
        </div>

        <div className="profile-field">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>

        {user.role === "student" && (
          <>
            <div className="profile-field">
              <span className="label">University ID:</span>
              <span className="value">{user.university_id || "-"}</span>
            </div>
            <div className="profile-field">
              <span className="label">Major:</span>
              <span className="value">{user.major || "-"}</span>
            </div>
          </>
        )}

        {user.role === "supervisor" && (
          <>
            <div className="profile-field">
              <span className="label">Title:</span>
              <span className="value">{user.title || "-"}</span>
            </div>
            <div className="profile-field">
              <span className="label">Expertise:</span>
              <span className="value">{user.expertise || "-"}</span>
            </div>
          </>
        )}

        {/* ✅ ONE button, changes link based on role */}
        <div className="edit-profile-btn-container">
          {user.role === "student" && (
            <Link to="/student/edit-profile" className="edit-profile-btn">
              Edit Profile
            </Link>
          )}

          {user.role === "supervisor" && (
            <Link to="/supervisor/edit-profile" className="edit-profile-btn">
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;