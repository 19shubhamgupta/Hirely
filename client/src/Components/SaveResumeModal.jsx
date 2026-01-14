import React, { useState } from "react";

export default function SaveResumeModal({
  isOpen,
  onClose,
  onSave,
  isSaving = false,
  resumeData,
  selectedTemplate,
}) {
  const [resumeName, setResumeName] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!resumeName.trim()) {
      setError("Please enter a resume name");
      return;
    }

    if (!resumeData?.personalInfo?.fullName) {
      setError("Please fill in your name in the resume before saving");
      return;
    }

    setError("");
    onSave(resumeName.trim(), selectedTemplate, resumeData);
  };

  const handleClose = () => {
    setResumeName("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ml-20 bg-white  ">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border-4 border-blue-600">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Save Resume</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume Name
          </label>
          <input
            type="text"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            placeholder="e.g., Software Engineer Resume"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSaving}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="text-sm text-gray-600">
            <p>
              <strong>Template:</strong> {selectedTemplate}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {resumeData?.personalInfo?.fullName || "Not specified"}
            </p>
            <p>
              <strong>Title:</strong>{" "}
              {resumeData?.personalInfo?.jobTitle || "Not specified"}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isSaving}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  className="opacity-75"
                />
              </svg>
            )}
            {isSaving ? "Saving..." : "Save Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}
