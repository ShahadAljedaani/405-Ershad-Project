import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import {
  FaHome,
  FaUpload,
  FaUsers,
  FaClipboardList,
  FaUser,
  FaGithub,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar({ role }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8888/ershad-api/logout.php", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");

    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">Ershad</h2>

      <ul className="sidebar-menu">
        {role === "student" && (
          <>
            <li>
              <Link to="/student/dashboard">
                <FaHome className="menu-icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/student/upload">
                <FaUpload className="menu-icon" /> Upload Idea
              </Link>
            </li>
            <li>
              <Link to="/student/supervisors">
                <FaUsers className="menu-icon" /> Supervisors
              </Link>
            </li>
            <li>
              <Link to="/student/requests">
                <FaClipboardList className="menu-icon" /> Requests
              </Link>
            </li>
            <li>
              <Link to="/student/profile">
                <FaUser className="menu-icon" /> Profile
              </Link>
            </li>
            <li>
              <Link to="/recommendations">
                <FaGithub className="menu-icon" /> GitHub Project Recommendations
              </Link>
            </li>
          </>
        )}

        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt className="menu-icon" /> Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
