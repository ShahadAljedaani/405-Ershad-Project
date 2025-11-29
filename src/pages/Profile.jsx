import "./Profile.css";
import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaUniversity,
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";

function Profile({ role = "student" }) {

  const navigate = useNavigate();

  const user =
    role === "student"
      ? {
          name: "Noura Ali",
          email: "noura@student.com",
          universityId: "431234567",
          major: "Information Technology",
        }
      : {
          name: "Dr. Rania Alhazmi",
          email: "rania@kau.edu.sa",
          title: "Assistant Professor",
          field: "Blockchain & Web Development",
          experience: "5 years",
        };

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="profile-page">
      <h1 className="profile-header">Profile</h1>
      <p className="profile-subtext">Manage your personal information</p>

      <div className="profile-card">

        <div className="profile-top">
          <div className="profile-avatar">{initial}</div>
          <h2 className="profile-name">{user.name}</h2>
        </div>

        <div className="profile-section">
          <div className="section-title">Personal Info</div>

          <div className="info-row">
            <FaEnvelope className="info-icon" />
            <div>
              <div className="info-label">Email</div>
              <div className="info-value">{user.email}</div>
            </div>
          </div>
        </div>

        {role === "student" && (
          <div className="profile-section">
            <div className="section-title">Academic Details</div>

            <div className="info-row">
              <FaUniversity className="info-icon" />
              <div>
                <div className="info-label">University ID</div>
                <div className="info-value">{user.universityId}</div>
              </div>
            </div>

            <div className="info-row">
              <FaBook className="info-icon" />
              <div>
                <div className="info-label">Major</div>
                <div className="info-value">{user.major}</div>
              </div>
            </div>
          </div>
        )}

        {role === "supervisor" && (
          <div className="profile-section">
            <div className="section-title">Academic Details</div>

            <div className="info-row">
              <FaChalkboardTeacher className="info-icon" />
              <div>
                <div className="info-label">Academic Title</div>
                <div className="info-value">{user.title}</div>
              </div>
            </div>

            <div className="info-row">
              <FaUserGraduate className="info-icon" />
              <div>
                <div className="info-label">Field</div>
                <div className="info-value">{user.field}</div>
              </div>
            </div>

            <div className="info-row">
              <FaUsers className="info-icon" />
              <div>
                <div className="info-label">Experience</div>
                <div className="info-value">{user.experience}</div>
              </div>
            </div>
          </div>
        )}

        {role === "student" && (
          <button
            className="edit-btn"
            onClick={() => navigate("/student/edit-profile")}
          >
            Edit Profile
          </button>
        )}

      </div>
    </div>
  );
}

export default Profile;
