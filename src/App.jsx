import React, { useState } from "react";
import "./App.css";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const allowedFormats = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/bmp",
    "image/webp",
  ];
  const maxFileSize = 5 * 1024 * 1024;
  const handleFileChange = (event) => {
    setError("");

    const files = Array.from(event.target.files);
    const selected = files.filter(
      (file) => allowedFormats.includes(file.type) && file.size <= maxFileSize
    );

    if (selected.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...selected]);
    } else {
      setError("Invalid file format or size.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setError("");

    const files = Array.from(event.dataTransfer.files);
    const selected = files.filter(
      (file) => allowedFormats.includes(file.type) && file.size <= maxFileSize
    );

    if (selected.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...selected]);
    } else {
      setError("Invalid file format or size.");
    }
  };

  const handleUpload = async () => {
    setError("");
    setUploading(true);
    setProgress(0);

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Simulate an upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would make an actual API request to upload the file
        // Update the progress as needed

        setProgress(progress + 100 / selectedFiles.length);
      } catch (error) {
        setError("Error uploading file.");
      }
    }

    setUploading(false);
    setSelectedFiles([]);
    setProgress(0);
  };

  return (
    <div className="cont">
      <h1>File upload functonality</h1>
      <div className="file-upload-container">
        <div
          className={`file-dropzone ${error && "error"}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".jpeg, .png, .jpg, .bmp, .webp"
            multiple
            onChange={handleFileChange}
          />
          <br />
          <p>Drag & Drop files here or click to browse</p>
        </div>
        <div className="selected-files">
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-item">
              {file.name}
            </div>
          ))}
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0}
        >
          Upload Files
        </button>
        {uploading && (
          <div className="upload-progress">
            Uploading... {Math.round(progress)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
