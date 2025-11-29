import React from "react";
import "./AboutUs.css";
import { FaGraduationCap, FaLightbulb, FaHandshake } from "react-icons/fa";

function About() {
  return (
    <div className="about-page">

      {/* Navbar */}
      <header className="about-header">
        <h2 className="logo">Ershad</h2>
        <nav>
          <a href="/login">Login</a>
          <a href="/student-register">Register</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="about-main">
        <h1 className="title">
          About <span>Ershad</span>
        </h1>

        <p className="subtitle">
          A smart platform that connects students with the perfect academic supervisor
          based on their graduation project idea.
        </p>

        {/* Cards */}
        <div className="about-cards">

          <div className="card">
            <div className="card-icon">
              <FaGraduationCap />
            </div>
            <h3>Our Mission</h3>
            <p>
              To make the supervision process easier, clearer, and more efficient
              for both students and supervisors.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              <FaLightbulb />
            </div>
            <h3>How it Works</h3>
            <p>
              Students submit their project ideas, and Ershad matches them with the most
              suitable supervisors based on expertise and project field.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              <FaHandshake />
            </div>
            <h3>Why Ershad?</h3>
            <p>
              Ershad provides a smooth experience by organizing supervision requests,
              matching projects, and improving communication between both sides.
            </p>
          </div>

        </div>

        <a href="/" className="back-btn">Back to Home</a>
      </main>

    </div>
  );
}

export default About;
