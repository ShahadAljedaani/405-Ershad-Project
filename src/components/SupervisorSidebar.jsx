

import { FaUser, FaSignOutAlt, FaGithub } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./Sidebar.css";
import axios from "axios";                           


export default function SupervisorSidebar() {
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
    <aside className="sidebar">
      <h2 className="sidebar-logo">Ershad</h2>

      <ul className="menu">
        <li>
          <Link to="/supervisor/dashboard">
            <FaUser className="menu-icon" /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/supervisor/profile">
            <FaUser className="menu-icon" /> Profile
          </Link>
        </li>

        <li>
          <Link to="/supervisor/recommendations">
            <FaGithub className="menu-icon" /> GitHub Project Recommendations
          </Link>
        </li>

        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt className="menu-icon" /> Logout
        </li>
      </ul>
    </aside>
  );
}