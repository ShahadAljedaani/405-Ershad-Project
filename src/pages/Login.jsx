import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 

    localStorage.setItem("role", role);

    if (role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/supervisor/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="title">Login</h2>
        <p className="subtitle">Welcome back to Ershad</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          
          <label>Select Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="student">Student</option>
            <option value="supervisor">Supervisor</option>
          </select>

          <button className="btn-login">Login</button>
        </form>

        <div className="register-links">
          <p>Don't have an account?</p>
          <a href="/student-register">Register as Student</a>
          <a href="/supervisor-register">Register as Supervisor</a>
        </div>

      </div>
    </div>
  );
}

export default Login;
