import React, { useState } from "react";
import "./SupervisorRegister.css";

function SupervisorRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [expertise, setExpertise] = useState("");

  return (
    <div className="supervisor-register-container">
      <div className="register-card">

        <h2 className="title">Supervisor Registration</h2>
        <p className="subtitle">Create your supervisor account</p>

        <form>
          <label>Full Name</label>
          <input 
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input 
            type="email"
            placeholder="example@university.edu.sa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input 
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Academic Title</label>
          <select value={title} onChange={(e) => setTitle(e.target.value)}>
            <option value="">Select title</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
          </select>

          <label>Area of Expertise</label>
          <select value={expertise} onChange={(e) => setExpertise(e.target.value)}>
            <option value="">Choose expertise</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Information Security">Information Security</option>
            <option value="Networks">Networks</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
          </select>

          <button className="btn-register">Register</button>
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
