import "./App.css";

import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentRegister from "./pages/StudentRegister";
import SupervisorRegister from "./pages/SupervisorRegister";

import StudentDashboard from "./pages/StudentDashboard";
import UploadIdea from "./pages/UploadIdea";
import Supervisors from "./pages/Supervisors";
import Requests from "./pages/Requests";

import SupervisorDashboard from "./pages/SupervisorDashboard";
import ProjectDetails from "./pages/ProjectDetails";

import Profile from "./pages/Profile";
import StudentEditProfile from "./pages/StudentEditProfile";
import SupervisorEditProfile from "./pages/SupervisorEditProfile";

import Sidebar from "./components/Sidebar";
import SupervisorSidebar from "./components/SupervisorSidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import About from "./pages/AboutUs";
import GitHubRecommendations from "./pages/GitHubRecommendations";
import StudentEditProject from "./pages/StudentEditProject";


function LayoutWrapper() {

  const location = useLocation();
  const path = location.pathname;

  const role =
    path.startsWith("/student") ? "student" :
      path.startsWith("/supervisor") ? "supervisor" :
        "none";

  const noSidebarPages = ["/", "/login", "/student-register", "/supervisor-register"];
  const hideSidebar = noSidebarPages.includes(path);

  return (
    <div className={hideSidebar ? "no-sidebar layout" : "layout"}>

      {!hideSidebar && role === "student" && <Sidebar role="student" />}
      {!hideSidebar && role === "supervisor" && <SupervisorSidebar />}

      <div className="main-content">
        <ToastContainer position="top-right" autoClose={2500} />

        <Routes>

          {/* === Public Pages === */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/supervisor-register" element={<SupervisorRegister />} />
          <Route path="/about" element={<About />} />

          {/* ===== Redirect Root Roles ===== */}
          <Route path="/student" element={<Navigate to="/student/dashboard" />} />
          <Route path="/supervisor" element={<Navigate to="/supervisor/dashboard" />} />


          {/* === Protected Student Pages === */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/upload"
            element={
              <ProtectedRoute allowedRole="student">
                <UploadIdea />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/supervisors"
            element={
              <ProtectedRoute allowedRole="student">
                <Supervisors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/requests"
            element={
              <ProtectedRoute allowedRole="student">
                <Requests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRole="student">
                <Profile role="student" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/edit-profile"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentEditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/project/:id"
            element={
              <ProtectedRoute allowedRole="student">
                <ProjectDetails role="student" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommendations"
            element={
              <ProtectedRoute allowedRole="student">
                <GitHubRecommendations />
              </ProtectedRoute>
            }
          />


          {/* === Protected Supervisor Pages === */}
          <Route
            path="/supervisor/dashboard"
            element={
              <ProtectedRoute allowedRole="supervisor">
                <SupervisorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supervisor/profile"
            element={
              <ProtectedRoute allowedRole="supervisor">
                <Profile role="supervisor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supervisor/edit-profile"
            element={
              <ProtectedRoute allowedRole="supervisor">
                <SupervisorEditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supervisor/project/:id"
            element={
              <ProtectedRoute allowedRole="supervisor">
                <ProjectDetails role="supervisor" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supervisor/recommendations"
            element={
              <ProtectedRoute allowedRole="supervisor">
                <GitHubRecommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/project/:id/edit"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentEditProject />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;
