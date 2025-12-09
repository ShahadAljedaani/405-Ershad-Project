import React, { useState } from "react";
import "./UploadIdea.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUpload,
  FaFileAlt,
  FaHeading,
  FaTags,
  FaPaperPlane,
} from "react-icons/fa";

function UploadIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [field, setField] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("field", field);
      if (file) formData.append("attachment", file);
  
      const res = await axios.post(
        "http://localhost:8888/ershad-api/create_project.php",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      const count = res.data?.supervisor_count ?? 0;
  
      if (count > 0) {
        alert(
          `Project idea submitted and sent to ${count} supervisor${count > 1 ? "s" : ""} with matching expertise.`
        );
      } else {
        alert(
          "Project idea submitted successfully, but no supervisor with matching expertise was found yet."
        );
      }
  
      setTitle("");
      setDescription("");
      setField("");
      setFile(null);
      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      setError("Could not submit your idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="upload-main">
      <div className="upload-header">
        <h1>Upload Project Idea</h1>
        <p>Fill in your idea details so supervisors can review it.</p>
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
              <option value="Software Engineering">Software Engineering</option>
              <option value="Information Security">Information Security</option>
              <option value="Networks">Networks</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
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
                accept=".pdf,.doc,.docx"
              />
              <span className="file-hint">
                {file ? file.name : "PDF / DOCX allowed"}
              </span>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            <FaPaperPlane className="btn-icon" />
            {loading ? "Submitting..." : "Submit Idea"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default UploadIdea;