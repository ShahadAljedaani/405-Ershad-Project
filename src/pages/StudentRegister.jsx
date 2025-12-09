import React, { useState } from "react";
import "./StudentRegister.css";
import axios from "axios";                 
import { useNavigate } from "react-router-dom"; 

function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
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
        role: "student",
        university_id: universityId,
        major,
      });

      alert("Student registered successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. This email may already be used.");
    }
  };

  return (
    <div className="student-register-container">
      <div className="register-card">
        <h2 className="title">Student Registration</h2>
        <p className="subtitle">Create your student account</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="example@stu.edu.sa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>University ID</label>
          <input
            type="text"
            placeholder="Enter your university ID"
            value={universityId}
            onChange={(e) => setUniversityId(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Major / Field</label>
          <select
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          >
            <option value="">Select major</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>

          <button type="submit" className="btn-register">
            Register
          </button>
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
