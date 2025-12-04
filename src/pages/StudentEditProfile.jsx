// src/pages/StudentEditProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentEditProfile.css";
import { useNavigate } from "react-router-dom";

function StudentEditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [major, setMajor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Load existing profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setError("");
        const res = await axios.get(
          "http://localhost:8888/ershad-api/profile.php",
          { withCredentials: true }
        );
        const u = res.data.user;

        if (u.role !== "student") {
          setError("Only students can use this page.");
          return;
        }

        setName(u.name || "");
        setEmail(u.email || "");
        setUniversityId(u.university_id || "");
        setMajor(u.major || "");
      } catch (err) {
        console.error(err);
        setError("Could not load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name,
        email,
        role: "student",
        university_id: universityId,
        major,
      };

      const res = await axios.post(
        "http://localhost:8888/ershad-api/update_profile.php",
        payload,
        { withCredentials: true }
      );

      // update localStorage so Profile page shows new data
      if (res.data.user) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      }

      alert("Profile updated successfully!");
      navigate("/student/profile");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error || "Failed to update profile. Try again.";
      setError(msg);
    }
  };

  if (loading) {
    return (
      <div className="student-edit-container">
        <div className="edit-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-edit-container">
      <div className="edit-card">
        <h2 className="title">Edit Profile</h2>
        <p className="subtitle">Update your student information</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="example@stu.edu.sa"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>University ID</label>
          <input
            type="text"
            value={universityId}
            placeholder="Enter your university ID"
            onChange={(e) => setUniversityId(e.target.value)}
          />

          <label>Major / Field</label>
          <select
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          >
            <option value="">Select major</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Software Engineering">
              Software Engineering
            </option>
            <option value="Cyber Security">Cyber Security</option>
          </select>

          <button type="submit" className="btn-save">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentEditProfile;