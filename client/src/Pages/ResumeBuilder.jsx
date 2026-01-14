import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ResumeForm from "../Components/ResumeForm";
import ResumePreview from "../Components/ResumePreview";
import TemplateSelector from "../Components/TemplateSelector";
import html2canvas from "html2canvas";
import toast, { Toaster } from "react-hot-toast";
import "../styles/pdf-styles.css";
import { useSavedResumeStore } from "../store/useSavedResumeStore";
import { jsPDF } from "jspdf";
import SaveResumeModal from "../Components/SaveResumeModal";

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

  // Function to replace unsupported CSS before conversion
  const replaceUnsupportedCSS = (htmlElement) => {
    const clone = htmlElement.cloneNode(true);
    const styleSheets = document.styleSheets;

    // Create a new style element with modified CSS
    const newStyle = document.createElement("style");
    let modifiedCSS = "";

    // Iterate through all stylesheets and replace oklch values
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const rules = styleSheets[i].cssRules;
        for (let j = 0; j < rules.length; j++) {
          let ruleText = rules[j].cssText;
          // Replace oklch colors with rgb equivalents
          ruleText = ruleText.replace(/oklch\([^)]+\)/g, (match) => {
            // Simple replacement logic - you might need to customize this
            if (match.includes("primary")) return "rgb(59, 130, 246)";
            if (match.includes("accent")) return "rgb(79, 70, 229)";
            return "rgb(156, 163, 175)"; // default gray
          });
          modifiedCSS += ruleText;
        }
      } catch (e) {
        console.log("Cannot access stylesheet:", e);
      }
    }

    newStyle.textContent = modifiedCSS;
    clone.appendChild(newStyle);
    return clone;
  };

  // ✅ Improved Download Method using html2canvas with CSS fallbacks
  const downloadResume = async () => {
    if (!resumeRef.current) {
      toast.error("Resume preview not available");
      return;
    }

    if (isDownloading) return;

    setIsDownloading(true);
    toast.loading("Preparing your resume...", { id: "download" });

    try {
      // Replace unsupported CSS values
      const printableElement = replaceUnsupportedCSS(resumeRef.current);

      // Temporarily append to body to ensure proper rendering
      document.body.appendChild(printableElement);
      printableElement.style.position = "absolute";
      printableElement.style.left = "-9999px";

      // Use html2canvas to capture the resume with styles
      const canvas = await html2canvas(printableElement, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Remove the temporary element
      document.body.removeChild(printableElement);

      // Create PDF
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate aspect ratio and dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const fileName = `${resumeData.personalInfo.fullName || "resume"}.pdf`;
      pdf.save(fileName);

      toast.success("Resume downloaded successfully!", { id: "download" });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error(`Failed to download resume: ${error.message}`, {
        id: "download",
      });
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
