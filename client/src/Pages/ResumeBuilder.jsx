import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ResumeForm from "../Components/ResumeForm";
import ResumePreview from "../Components/ResumePreview";
import TemplateSelector from "../Components/TemplateSelector";
import toast, { Toaster } from "react-hot-toast";
import "../styles/pdf-styles.css";
import { useSavedResumeStore } from "../store/useSavedResumeStore";
import SaveResumeModal from "../Components/SaveResumeModal";
import { axiosInstance } from "../lib/axios";

export default function ResumeBuilder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateFromUrl = searchParams.get("template") || "template1";
  const resumeIdFromUrl = searchParams.get("resumeId");

  const { createResume, updateResume, getResumeById, isSaving } =
    useSavedResumeStore();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState(null);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      website: "",
      location: "",
      objective: "",
    },
    workExperience: [
      {
        id: 1,
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        id: 1,
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
        additionalInfo: "",
      },
    ],
    projects: [{ id: 1, name: "", date: "", description: "" }],
    skills: [],
  });

  const [newSkill, setNewSkill] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(templateFromUrl);
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    setSelectedTemplate(templateFromUrl);
  }, [templateFromUrl]);

  // Load existing resume if resumeId is provided
  useEffect(() => {
    const loadExistingResume = async () => {
      if (resumeIdFromUrl) {
        const result = await getResumeById(resumeIdFromUrl);
        if (result.success) {
          const resume = result.resume;
          setResumeData({
            personalInfo: resume.personalInfo || {
              fullName: "",
              jobTitle: "",
              email: "",
              phone: "",
              website: "",
              location: "",
              objective: "",
            },
            workExperience: resume.workExperience || [
              {
                id: 1,
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
            education: resume.education || [
              {
                id: 1,
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                gpa: "",
                additionalInfo: "",
              },
            ],
            projects: resume.projects || [
              { id: 1, name: "", date: "", description: "" },
            ],
            skills: resume.skills || [],
          });
          setSelectedTemplate(resume.templateName);
          setIsEditing(true);
          setCurrentResumeId(resumeIdFromUrl);
        }
      }
    };

    loadExistingResume();
  }, [resumeIdFromUrl, getResumeById]);

  const handleSaveResume = async (resumeName, templateName, resumeData) => {
    let result;
    if (isEditing && currentResumeId) {
      result = await updateResume(
        currentResumeId,
        resumeName,
        templateName,
        resumeData
      );
    } else {
      result = await createResume(resumeName, templateName, resumeData);
    }

    if (result.success) {
      setShowSaveModal(false);
      if (!isEditing) {
        setIsEditing(true);
        setCurrentResumeId(result.resume.id);
      }
    }
  };

  const handleInputChange = (section, field, value, id = null) => {
    setResumeData((prevData) => {
      if (id) {
        const updatedArray = prevData[section].map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        );
        return { ...prevData, [section]: updatedArray };
      } else {
        return {
          ...prevData,
          [section]: { ...prevData[section], [field]: value },
        };
      }
    });
  };

  const addItem = (section, template) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], { id: Date.now(), ...template }],
    }));
  };

  const removeItem = (section, id) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((item) => item.id !== id),
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  // ✅ Puppeteer Backend PDF Generation
  const downloadResume = async () => {
    if (!resumeRef.current) {
      toast.error("Resume preview not available");
      return;
    }

    if (isDownloading) return;

    setIsDownloading(true);
    toast.loading("Generating your PDF...", { id: "download" });

    try {
      // Get the complete HTML of the resume
      const resumeElement = resumeRef.current;

      // Clone the element
      const clonedElement = resumeElement.cloneNode(true);

      // Get all computed styles in a cleaner way
      const getElementStyles = (element) => {
        const computedStyle = window.getComputedStyle(element);
        const importantProps = [
          "background",
          "background-color",
          "background-image",
          "background-gradient",
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "font-style",
          "padding",
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
          "margin",
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
          "border",
          "border-radius",
          "border-color",
          "border-width",
          "width",
          "height",
          "max-width",
          "min-height",
          "display",
          "flex-direction",
          "justify-content",
          "align-items",
          "gap",
          "text-align",
          "line-height",
          "letter-spacing",
          "box-shadow",
          "opacity",
          "overflow",
        ];

        let styleStr = "";
        importantProps.forEach((prop) => {
          const value = computedStyle.getPropertyValue(prop);
          if (value) {
            styleStr += `${prop}:${value};`;
          }
        });
        return styleStr;
      };

      // Apply styles to cloned element and children
      const applyStylesToElement = (cloned, original) => {
        cloned.setAttribute("style", getElementStyles(original));

        const clonedChildren = cloned.children;
        const originalChildren = original.children;

        for (let i = 0; i < clonedChildren.length; i++) {
          if (originalChildren[i]) {
            applyStylesToElement(clonedChildren[i], originalChildren[i]);
          }
        }
      };

      applyStylesToElement(clonedElement, resumeElement);

      // Create a complete HTML document
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
              
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            </style>
          </head>
          <body>
            ${clonedElement.outerHTML}
          </body>
        </html>
      `;

      // Send to backend API
      const response = await axiosInstance.post(
        "/pdf/generate",
        {
          html: htmlContent,
          fileName: resumeData.personalInfo.fullName || "resume",
        },
        {
          responseType: "blob",
        }
      );

      // Check if response is actually a PDF (not an error JSON)
      if (response.data.type === "application/json") {
        const text = await response.data.text();
        const error = JSON.parse(text);
        throw new Error(error.message || "PDF generation failed");
      }

      // Verify we got a valid PDF
      if (response.data.size < 100) {
        throw new Error("Generated PDF is too small, possibly corrupted");
      }

      // Create blob and download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Resume downloaded successfully!", { id: "download" });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to download resume",
        { id: "download" }
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-screen">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Resume Builder
              </h1>
              <button
                onClick={() => navigate("/templates")}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Templates
              </button>
            </div>

            <TemplateSelector
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />

            <ResumeForm
              resumeData={resumeData}
              handleInputChange={handleInputChange}
              addItem={addItem}
              removeItem={removeItem}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              addSkill={addSkill}
              removeSkill={removeSkill}
            />
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-1/2 sticky top-8 h-fit">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Live Preview
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                    disabled={isSaving}
                  >
                    {isSaving
                      ? "Saving..."
                      : isEditing
                      ? "Update Resume"
                      : "Save Resume"}
                  </button>
                  <button
                    onClick={downloadResume}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    disabled={isDownloading}
                  >
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 min-h-[600px]">
                <div ref={resumeRef} className="resume-preview">
                  <ResumePreview
                    resumeData={resumeData}
                    template={selectedTemplate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Resume Modal */}
        <SaveResumeModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          onSave={handleSaveResume}
          isSaving={isSaving}
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
        />
      </main>
    </>
  );
}
