import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UploadIdea.css"; // reuse the same styles
import { FaHeading, FaFileAlt, FaTags, FaUpload, FaSave } from "react-icons/fa";

function StudentEditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [field, setField] = useState("");
  const [file, setFile] = useState(null);
  const [existingFileName, setExistingFileName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load current project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8888/ershad-api/project_details.php?id=${id}`,
          { withCredentials: true }
        );
        const p = res.data.project;
        setTitle(p.title || "");
        setDescription(p.description || "");
        setField(p.field || "");
        if (p.attachment_path) {
          const parts = p.attachment_path.split("/");
          setExistingFileName(parts[parts.length - 1]);
        }
      } catch (err) {
        console.error("Edit project load error:", err.response?.data || err);
        setError("Could not load project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("project_id", id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("field", field);
      if (file) {
        formData.append("attachment", file);
      }

      await axios.post(
        "http://localhost:8888/ershad-api/update_project.php",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Project updated successfully.");
      navigate(`/student/project/${id}`);
    } catch (err) {
      console.error("Update project error:", err.response?.data || err);
      setError("Could not update the project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading project...</p>;
  }

  return (
    <main className="upload-main">
      <div className="upload-header">
        <h1>Edit Project</h1>
        <p>Update your project details and attachment.</p>
      </div>

      <div className="upload-card">
        {error && <p className="upload-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaHeading className="form-icon" />
              Project Title
            </label>
            <input
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaFileAlt className="form-icon" />
              Description
            </label>
            <textarea
              placeholder="Write a clear description of your idea"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaTags className="form-icon" />
              Field / Major
            </label>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              required
            >
              <option value="">Select field</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Web Development">Web Development</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Science">Data Science</option>
              <option value="Mobile Apps">Mobile Apps</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <FaUpload className="form-icon" />
              Attach File (optional)
            </label>

            <div className="file-box">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="file-hint">
                {file
                  ? file.name
                  : existingFileName
                  ? `Current: ${existingFileName}`
                  : "PDF / DOCX allowed"}
              </span>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={saving}>
            <FaSave className="btn-icon" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default StudentEditProject;