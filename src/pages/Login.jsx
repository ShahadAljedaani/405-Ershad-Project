import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8888/ershad-api/login.php", // change to /ERSHAD-API/ if needed
        { email, password, role },
        { withCredentials: true }
      );

      const user = res.data.user;

      localStorage.setItem("role", user.role);
      localStorage.setItem("currentUser", JSON.stringify(user));

      if (user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/supervisor/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email, password, or role.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Ershad</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Role
            <select
              className="auth-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </label>

          <label className="auth-label">
            Email
            <input
              className="auth-input"
              type="email"
              placeholder="example@stu.edu.sa"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        {/* Register section */}
        <div className="auth-register">
          <p>Don’t have an account?</p>
          <div className="auth-register-buttons">
            <Link to="/student-register" className="auth-link-button">
              Register as Student
            </Link>
            <Link to="/supervisor-register" className="auth-link-button secondary">
              Register as Supervisor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
