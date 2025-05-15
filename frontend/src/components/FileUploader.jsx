import { useState } from "react";
import axios from "axios";
import { FaFileAlt } from "react-icons/fa";
import Toast from "./Toast"; // ✅ Import Toast component
import "./FileUploader.css";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [backendResponse, setBackendResponse] = useState("");
  const [showToast, setShowToast] = useState(false);

  const steps = [
    "Accessing the document...",
    "Checking the document...",
    "Uploading...",
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      document.getElementById("upload-text").classList.add("shake");
      setTimeout(() => {
        document.getElementById("upload-text").classList.remove("shake");
      }, 500);
      return;
    }

    if (!role.trim()) {
      setError("Please enter your desired role before uploading.");
      return;
    }

    setUploading(true);
    setStepsVisible(true);
    setStepIndex(0);
    setError("");

    let interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev === steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setUploaded(true);
          }, 1000);
        }
        return prev + 1;
      });
    }, 1000);

    try {
      const formData = new FormData();
      formData.append("role", role);
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8000/user/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const msg = response.data.pythonResult || "Upload successful!";
      setBackendResponse(msg);

      setShowToast(true); // Show the toast on success
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed. Please try again.");
      setUploading(false);
      setUploaded(false);
      setStepsVisible(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploading(false);
    setUploaded(false);
    setStepsVisible(false);
    setStepIndex(0);
    setRole("");
    setError("");
    setBackendResponse("");
    setShowToast(false);
  };

  const closeToast = () => {
    setShowToast(false); // Close the toast when the cross button is clicked
  };

  return (
    <div className="container">
      <div className={`role-input-container ${uploading ? "move-left" : ""}`}>
        <label htmlFor="role">Select Your Desired Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-input"
        >
          <option value="">-- Select a Role --</option>
          <option value="UX/UI Designer">UX/UI Designer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Data Engineer">Data Engineer</option>
          <option value="Web Developer">Web Developer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="AI/ML Developer">AI/ML Developer</option>
        </select>
      </div>

      <div className={`upload-box ${uploading ? "move-left" : ""}`}>
        <input type="file" id="file-input" onChange={handleFileChange} />
        <label htmlFor="file-input" className="file-label">
          {file ? (
            <>
              <FaFileAlt className="file-icon" />
              <span className="file-name">{file.name}</span>
            </>
          ) : (
            <>
              <span className="plus">+</span>
              <span id="upload-text">Click to upload</span>
            </>
          )}
        </label>
      </div>

      <div className={`upload-steps ${stepsVisible ? "visible" : ""}`}>
        {steps.map((step, index) => (
          <div key={index} className={index <= stepIndex ? "completed" : ""}>
            {index <= stepIndex && "✔"} {step}
          </div>
        ))}
        {uploaded && <div className="success">Uploaded!</div>}
      </div>

      {!uploaded && (
        <>
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {error && (
            <div className="text-red-600 font-semibold mt-2">
              <span>{error}</span>
              <button className="close-error" onClick={() => setError("")}>
                ×
              </button>
            </div>
          )}
        </>
      )}

      {uploaded && role && (
        <button className="upload-btn reset-btn" onClick={resetUpload}>
          Upload Another File
        </button>
      )}

      {/* Show the Toast component when necessary */}
      {showToast && <Toast message={backendResponse} onClose={closeToast} />}
    </div>
  );
};

export default FileUploader;
