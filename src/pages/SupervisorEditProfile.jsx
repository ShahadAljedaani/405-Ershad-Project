import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SupervisorEditProfile.css";
import { useNavigate } from "react-router-dom";

function SupervisorEditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [expertise, setExpertise] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8888/ershad-api/profile.php",
          { withCredentials: true }
        );

        const u = res.data.user;
        if (!u || u.role !== "supervisor") {
          setError("Only supervisors can edit this profile.");
          setLoading(false);
          return;
        }

        setName(u.name || "");
        setEmail(u.email || "");
        setTitle(u.title || "");
        setExpertise(u.expertise || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
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
        title,
        expertise,
      };

      const res = await axios.post(
        "http://localhost:8888/ershad-api/update_profile.php",
        payload,
        { withCredentials: true }
      );

      if (res.data.user) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      }

      alert("Profile updated successfully!");
      navigate("/supervisor/profile");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Failed to update profile.";
      setError(msg);
    }
  };

  if (loading) return <div className="supervisor-edit-container"><p>Loading...</p></div>;

  return (
    <div className="supervisor-edit-container">
      <div className="edit-card">
        <h2 className="title">Edit Profile</h2>
        <p className="subtitle">Update your supervisor information</p>

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
            placeholder="example@university.edu.sa"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Academic / Professional Title</label>
          <input
            type="text"
            value={title}
            placeholder="Assistant Professor, Trainer..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Field of Expertise</label>
          <input
            type="text"
            value={expertise}
            placeholder="AI, Networking, Cybersecurity..."
            onChange={(e) => setExpertise(e.target.value)}
            required
          />

          <button type="submit" className="btn-save">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default SupervisorEditProfile;