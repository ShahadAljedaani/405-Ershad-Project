import React, { useState } from "react";
import "./Supervisors.css";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

function Supervisors() {
  const supervisors = [
    { id: 1, name: "Dr. Rania Alhazmi", title: "Assistant Professor", field: "Blockchain & Web Development", email: "Rania@gmail.com", experience: 5 },
    { id: 2, name: "Dr. Afraa Attia", title: "Assistant Professor", field: "Networking", email: "Afraa@gmail.com", experience: 4 },
    { id: 3, name: "Dr. Duaa Sinnari", title: "Assistant Professor", field: "Game Development", email: "Duaa@gmail.com", experience: 6 },
    { id: 4, name: "Suaad Baawidan", title: "Assistant Professor", field: "Graphics & Animation", email: "Suaad@gmail.com", experience: 5 },
    { id: 5, name: "Hind Almisbahi", title: "Assistant Professor", field: "Artificial Intelligence & Data Mining", email: "Hind@gmail.com", experience: 7 },
    { id: 6, name: "Aisha Asseri", title: "Assistant Professor", field: "Security", email: "Aisha@gmail.com", experience: 6 },
    { id: 7, name: "Amirah Alshumrani", title: "Assistant Professor", field: "Database", email: "Amirah@gmail.com", experience: 5 },
    { id: 8, name: "Munira Tailab", title: "Assistant Professor", field: "Software Engineering", email: "Munira@gmail.com", experience: 6 },
    { id: 9, name: "Hanan Alotaibi", title: "Assistant Professor", field: "Software Economics", email: "Hanan@gmail.com", experience: 7 },
    { id: 10, name: "Noor Bajunaied", title: "Assistant Professor", field: "Technical Projects Management", email: "Noor@gmail.com", experience: 4 }
  ];

  const [search, setSearch] = useState("");

  return (
    <div className="supervisors-main"> 

      <h1 className="page-title">Supervisors List</h1>
      <p className="page-subtitle">Find supervisors based on field and expertise.</p>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or field..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="supervisors-grid">
        {supervisors
          .filter((sup) =>
            sup.name.toLowerCase().includes(search.toLowerCase()) ||
            sup.field.toLowerCase().includes(search.toLowerCase())
          )
          .map((sup) => (
            <div key={sup.id} className="supervisor-card">
              <div className="profile-circle">{sup.name.charAt(0)}</div>

              <h3>{sup.name}</h3>
              <p><strong>Title:</strong> {sup.title}</p>
              <p><strong>Field:</strong> {sup.field}</p>
              <p><strong>Email:</strong> {sup.email}</p>
              <p><strong>Experience:</strong> {sup.experience} years</p>

              <button
                className="request-btn"
                onClick={() => toast.success("Your supervision request has been sent!")}
              >
                Request Supervision
              </button>

            </div>
          ))}
      </div>

    </div>
  );
}

export default Supervisors;
