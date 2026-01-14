import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Briefcase, FileText, Loader2 } from "lucide-react";
import { axiosInstance } from "../lib/axios";

const CustomInterview = () => {
  const navigate = useNavigate();
  const [jdInputType, setJdInputType] = useState("manual");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobPdfFile, setJobPdfFile] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    title: "",
    company: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setError("");
    } else if (file) {
      setError("Please upload a PDF file for your resume");
    }
  };

  const handleJobPdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setJobPdfFile(file);
      setError("");
    } else if (file) {
      setError("Please upload a PDF file for the job description");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!resumeFile) {
      setError("Please upload your resume");
      return false;
    }

    if (jdInputType === "manual") {
      if (!formData.role || !formData.title || !formData.description) {
        setError("Please fill all required fields (role, title, description)");
        return false;
      }
    } else {
      if (!jobPdfFile) {
        setError("Please upload a job description PDF");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("resume", resumeFile);

      if (jdInputType === "manual") {
        data.append("role", formData.role);
        data.append("title", formData.title);
        data.append("company", formData.company);
        data.append("description", formData.description);
      } else {
        data.append("jobPdf", jobPdfFile);
      }

      const response = await axiosInstance.post("/interview/custom", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Navigate to the interview room with the generated questions
        navigate("/custom-interview-room", {
          state: {
            questions: response.data.questions,
            interviewDetails: {
              title: formData.title,
              role: formData.role,
              company: formData.company || "Not specified",
              description: formData.description,
            }
          }
        });
      } else {
        setError(response.data.message || "Failed to generate interview");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while generating the interview");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">
            Custom Interview Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Upload your resume and job description to generate a tailored interview
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border-4 border-blue-900 rounded-lg shadow-md p-6 space-y-10">
          {/* Resume Upload */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Upload Your Resume (PDF) *</h2>
            <div className="flex flex-col items-center justify-center gap-4">
              <label className="w-full flex flex-col items-center px-4 py-8 border-2 border-blue-900 rounded-lg cursor-pointer bg-white hover:bg-blue-50">
                <Upload size={32} className="mb-2 text-blue-600" />
                <span className="text-gray-700">
                  {resumeFile ? resumeFile.name : "Click to upload PDF"}
                </span>
                <input 
                  type="file" 
                  accept="application/pdf" 
                  className="hidden" 
                  onChange={handleResumeChange}
                  required
                />
              </label>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>

            {/* Toggle between PDF / Manual */}
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setJdInputType("manual")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 transition ${
                  jdInputType === "manual"
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-white text-blue-900 border-blue-900 hover:bg-blue-50"
                }`}
              >
                <Briefcase size={20} /> Manual Input
              </button>
              <button
                type="button"
                onClick={() => setJdInputType("pdf")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 transition ${
                  jdInputType === "pdf"
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-white text-blue-900 border-blue-900 hover:bg-blue-50"
                }`}
              >
                <FileText size={20} /> Upload JD PDF
              </button>
            </div>

            {/* Conditional Input */}
            {jdInputType === "manual" ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="role"
                    placeholder="Job Role (e.g. Frontend Developer) *"
                    className="px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Title (e.g. Senior Developer) *"
                    className="px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name (optional)"
                  className="px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Job Description (requirements, responsibilities, etc.) *"
                  className="px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none h-32"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <label className="w-full flex flex-col items-center px-4 py-8 border-2 border-blue-900 rounded-lg cursor-pointer bg-white hover:bg-blue-50">
                  <Upload size={32} className="mb-2 text-blue-600" />
                  <span className="text-gray-700">
                    {jobPdfFile ? jobPdfFile.name : "Click to upload Job Description PDF"}
                  </span>
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    className="hidden" 
                    onChange={handleJobPdfChange}
                    required={jdInputType === "pdf"}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 disabled:bg-blue-400 font-medium transition"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Interview"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomInterview;