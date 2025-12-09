import React, { useState } from "react";
import "./SupervisorRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SupervisorRegister() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [expertise, setExpertise] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8888/ershad-api/register.php", {
        name,
        email,
        password,
        role: "supervisor",
        title,
        expertise,
      });

      alert("Supervisor registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(
        "Registration failed. This email may already be used or a server error occurred."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Supervisor Registration</h1>
        <p className="auth-subtitle">Create your supervisor account</p>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Full Name
            <input
              className="auth-input"
              type="text"
              placeholder="Dr. Rania Alhazmi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="auth-label">
            Email
            <input
              className="auth-input"
              type="email"
              placeholder="example@kau.edu.sa"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>Academic Title</label>
          <select className="auth-input" value={title} onChange={(e) => setTitle(e.target.value)}>
            <option value="">Select title</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
          </select>
          <label className="auth-label">

            Expertise / Field
            <select
              className="auth-input"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
            >
              <option value="">Select expertise</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Information Security">Information Security</option>
              <option value="Networks">Networks</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
            </select>
          </label>

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <div className="login-link">
          <p>Already have an account?</p>
          <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default SupervisorRegister;