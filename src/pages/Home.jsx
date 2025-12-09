import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <nav className="navbar">
        <h2 className="logo">Ershad</h2>
        <div className="nav-links">
          <a href="/login">Login</a>
          <a href="/about">About</a>
        </div>
      </nav>

      <header className="hero-section centered-hero">
        <h1>
          Welcome to <span>Ershad</span>
        </h1>

        <p className="subtitle">
          A smart platform that connects students with the perfect academic supervisor
          based on their project idea.
        </p>

        <div className="buttons">
          <a href="/student-register" className="btn primary">Register as Student</a>
          <a href="/supervisor-register" className="btn secondary">Register as Supervisor</a>
          <a href="/login" className="btn outline">Login</a>
        </div>
      </header>

    </div>
  );
}

export default Home;
