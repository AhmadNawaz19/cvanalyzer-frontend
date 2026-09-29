import React, { useState, useEffect } from "react";
import "./styles/resumeUpload.css";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaTrashAlt,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Zod Schema Validation
const uploadSchema = z.object({
  resumes: z
    .array(
      z
        .instanceof(File, { message: "Invalid file object" })
        .refine(
          (file) => file.type === "application/pdf",
          "Only PDF files are allowed",
        )
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          "File size must be under 5MB",
        ),
    )
    .min(1, "At least one PDF resume is required"),
  description: z
    .string()
    .min(10, "Job description must be at least 10 characters long"),
});

const ResumeUpload = React.memo(() => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [bestResume, setBestResume] = useState("");

  // Process and append incoming files
  const processFiles = (fileList) => {
    const validPdfs = [];
    let fileError = "";

    Array.from(fileList).forEach((file) => {
      if (file.type !== "application/pdf") {
        fileError = "Only PDF files are allowed";
      } else if (file.size > 5 * 1024 * 1024) {
        fileError = "Each PDF must be smaller than 5MB";
      } else {
        validPdfs.push(file);
      }
    });

    if (fileError) {
      setErrors((prev) => ({ ...prev, resumes: fileError }));
    } else {
      setResumes((prev) => [...prev, ...validPdfs]);
      setErrors((prev) => ({ ...prev, resumes: undefined }));
    }
  };

  const removeFile = (indexToRemove) => {
    setResumes((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // React Query Mutation
  const sendResumeAndDescription = useMutation({
    mutationFn: (formData) => api.post("/file/fileupload", formData),

    onSuccess: (response) => {
      setServerError("");

      const resultUrl = response.data?.data?.url;

      if (resultUrl) {
        setBestResume(resultUrl);
      }
    },

    onError: (err) => {
      console.log("ANALYSIS ERROR:", err);

      const status = err.response?.status;
      const responseData = err.response?.data;
      const message = err.message;

      if (status === 401) {
        navigate("/login");
        return;
      }

      setServerError(
        `STATUS: ${status || "NO RESPONSE"}\nMESSAGE: ${message}\nDATA: ${
          responseData
            ? JSON.stringify(responseData)
            : "No response from server"
        }`,
      );
    },
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  setServerError("");

 const formDataPayload = new FormData();

const originalFile = resumes[0];

const pdfBlob = new Blob(
  [await originalFile.arrayBuffer()],
  { type: "application/pdf" }
);

console.log("Original size:", originalFile.size);
console.log("Blob size:", pdfBlob.size);
console.log("Blob type:", pdfBlob.type);

formDataPayload.append(
  "resume",
  pdfBlob,
  originalFile.name
);

formDataPayload.append("description", description);

fetch(`${import.meta.env.VITE_API_URL}/file/fileupload-test`, {
  method: "POST",
  body: formDataPayload,
  credentials: "include",
})
  .then(async (response) => {
    console.log("PDF BLOB STATUS:", response.status);
    console.log("PDF BLOB RESPONSE:", await response.text());
  })
  .catch((error) => {
    console.log("PDF BLOB ERROR:", error);
  });
};

  return (
    <>
      <div className="resumeUploadAndSelected">
        <div id="resumeUpload">
          {serverError && (
            <div id="error-toast">
              <FaExclamationCircle />
              <span>{serverError}</span>
            </div>
          )}

          <div className="upload-title-container">
            <h2>Upload Resume & Job Description</h2>
            <p>
              Analyze match score, detect missing keywords, and get instant
              recommendations.
            </p>
          </div>

          <form className="main-upload-form" onSubmit={handleSubmit}>
            <div className="upload-grid">
              {/* Resume Upload Dropzone */}
              <div
                className={`upload-card ${errors.resumes ? "has-error" : ""}`}
              >
                <h3>1. Resumes (PDF)</h3>
                <div
                  className="dropzone"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {resumes.length > 0 ? (
                    <div className="file-list">
                      {resumes.map((file, idx) => (
                        <div key={idx} className="file-item">
                          <FaFilePdf className="pdf-icon" />
                          <span className="file-name">{file.name}</span>
                          <button
                            type="button"
                            className="remove-file-btn"
                            onClick={() => removeFile(idx)}
                            aria-label="Remove file"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      ))}
                      <label htmlFor="selectRes" className="add-more-label">
                        + Add More PDFs
                      </label>
                    </div>
                  ) : (
                    <div className="dropzone-placeholder">
                      <FaCloudUploadAlt className="upload-icon" />
                      <p className="drag-text">
                        Drag & drop your resume PDFs here
                      </p>
                      <span className="or-text">or</span>
                      <label htmlFor="selectRes" className="browse-btn">
                        Browse Files
                      </label>
                    </div>
                  )}
                  <input
                    id="selectRes"
                    type="file"
                    name="resume"
                    accept="application/pdf"
                    multiple
                    onChange={(e) => processFiles(e.target.files)}
                  />
                </div>
                {errors.resumes && (
                  <span className="field-error">{errors.resumes}</span>
                )}
              </div>

              {/* Job Description TextArea */}
              <div
                className={`upload-card ${errors.description ? "has-error" : ""}`}
              >
                <h3>2. Job Description</h3>
                <textarea
                  placeholder="Paste the target job description or requirements here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={10}
                />
                {errors.description && (
                  <span className="field-error">{errors.description}</span>
                )}
              </div>
            </div>

            <div className="action-row">
              <button
                type="submit"
                className="submit-analyze-btn"
                disabled={sendResumeAndDescription.isPending}
              >
                {sendResumeAndDescription.isPending ? (
                  <>
                    <FaSpinner className="spinner-icon" />
                    <span>Analyzing Resumes...</span>
                  </>
                ) : (
                  <span>Analyze Resume Match</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Selected Resume PDF Viewer */}
        {bestResume && (
          <div id="selectedResume">
            <div className="preview-header">
              <h3>Top Matched Resume Preview</h3>
            </div>
            <iframe src={bestResume} title="Top Matched Resume Preview" />
          </div>
        )}
      </div>
    </>
  );
});

ResumeUpload.displayName = "ResumeUpload";
export default ResumeUpload;
