import React, { useState } from "react";
import "./StudentEditProfile.css";
import { FaUser, FaEnvelope, FaIdBadge, FaSchool, FaPhone } from "react-icons/fa";

function StudentEditProfile() {
  const [name, setName] = useState("Student Name");
  const [email, setEmail] = useState("student@mail.com");
  const [universityId, setUniversityId] = useState("441234567");
  const [major, setMajor] = useState("Computer Science");
  const [phone, setPhone] = useState("0551234567");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="edit-profile-page">

      <h1 className="edit-title">Edit Profile</h1>
      <p className="edit-subtitle">Update your personal information</p>

      <div className="edit-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label><FaUser className="icon" /> Full Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label><FaEnvelope className="icon" /> Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label><FaIdBadge className="icon" /> University ID</label>
            <input 
              type="text"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label><FaSchool className="icon" /> Major</label>
            <select value={major} onChange={(e) => setMajor(e.target.value)}>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Software Engineering</option>
              <option>Cyber Security</option>
            </select>
          </div>

          <div className="form-group">
            <label><FaPhone className="icon" /> Phone Number</label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="save-btn">Save Changes</button>

        </form>
      </div>

    </div>
  );
}

export default StudentEditProfile;
