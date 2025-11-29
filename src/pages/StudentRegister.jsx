import React, { useState } from "react";
import "./StudentRegister.css";

function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");

  return (
    <div className="student-register-container">
      <div className="register-card">

        <h2 className="title">Student Registration</h2>
        <p className="subtitle">Create your student account</p>

        <form>
          <label>Full Name</label>
          <input 
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input 
            type="email"
            placeholder="example@stu.edu.sa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>University ID</label>
          <input 
            type="text"
            placeholder="Enter your university ID"
            value={universityId}
            onChange={(e) => setUniversityId(e.target.value)}
          />

          <label>Password</label>
          <input 
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Major / Field</label>
          <select value={major} onChange={(e) => setMajor(e.target.value)}>
            <option value="">Select major</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>

          <button className="btn-register">Register</button>
        </form>

        <div className="login-link">
          <p>Already have an account?</p>
          <a href="/login">Login</a>
        </div>

      </div>
    </div>
  );
}

export default StudentRegister;
