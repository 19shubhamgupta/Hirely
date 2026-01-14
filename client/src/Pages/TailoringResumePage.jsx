import React, { useState, useEffect } from "react";
import ResumeCustomizer from "../Components/ResumeCustomizer";
import ResumePreview from "../Components/ResumePreview";
import SaveResumeModal from "../Components/SaveResumeModal";
import { useStoreAuth } from "../store/useResumeStore";
import { useSavedResumeStore } from "../store/useSavedResumeStore";
import { useCourseStore } from "../store/useCourseStore";
import toast, { Toaster } from "react-hot-toast";

// Analysis Report Component
const AnalysisReport = ({ tailorData, addArrayItem, updateResumeData }) => {
  // Get data from tailorData
  const analysisResults = tailorData?.analysisResults || {};
  const matchedSkills = analysisResults.matchedSkills || [];
  const missingSkills = analysisResults.missingSkills || [];
  const suggestedImprovements = analysisResults.suggestedImprovements || [];
  const professionalSummary = analysisResults.professionalSummary || {};
  const existingProjects = analysisResults.existingProjects || [];
  const suggestedProjects = analysisResults.suggestedProjects || [];

  return (
    <div className="space-y-6">
      {/* Skills Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Skills */}
        {matchedSkills.length > 0 && (
          <div className="bg-green-50 border-4 border-blue-900 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Matched Skills ({matchedSkills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Missing Skills */}
        {missingSkills.length > 0 && (
          <div className="bg-red-50 border-4 border-blue-900 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-800">
                    Missing Skills ({missingSkills.length})
                  </h4>
                  <button
                    onClick={() => {
                      // Add all missing skills to resume
                      updateResumeData("skills", null, [
                        ...(tailorData?.tailoredResume?.skills || []),
                        ...missingSkills,
                      ]);
                    }}
                    className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Add All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => {
                          // Add individual skill
                          const currentSkills =
                            tailorData?.tailoredResume?.skills || [];
                          if (!currentSkills.includes(skill)) {
                            updateResumeData("skills", null, [
                              ...currentSkills,
                              skill,
                            ]);
                          }
                        }}
                        className="text-green-600 hover:text-green-800 font-bold"
                        title="Add this skill"
                      >
                        +
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Professional Summary Analysis */}
      {(professionalSummary.currentSummary ||
        professionalSummary.aiGeneratedSummary ||
        professionalSummary.issues) && (
        <div className="bg-blue-50 border-4 border-blue-900 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div className="w-full">
              <h4 className="font-medium text-gray-800 mb-3">
                Professional Summary Analysis
              </h4>

              {/* Current Summary */}
              {professionalSummary.currentSummary && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Current Summary:
                  </p>
                  <div className="bg-white p-3 rounded border text-sm text-gray-700">
                    {professionalSummary.currentSummary}
                  </div>
                </div>
              )}

              {/* Issues */}
              {professionalSummary.issues &&
                professionalSummary.issues.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Issues Identified:
                    </p>
                    <ul className="text-sm text-red-600 space-y-1">
                      {professionalSummary.issues.map((issue, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500 mt-1 text-xs">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* AI Generated Summary */}
              {professionalSummary.aiGeneratedSummary && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-600">
                      AI-Generated Improved Summary:
                    </p>
                    <button
                      onClick={() => {
                        updateResumeData(
                          "personalInfo",
                          "objective",
                          professionalSummary.aiGeneratedSummary
                        );
                      }}
                      className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Apply to Resume
                    </button>
                  </div>
                  <div className="bg-blue-100 p-3 rounded border text-sm text-gray-700">
                    {professionalSummary.aiGeneratedSummary}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestedImprovements.length > 0 && (
        <div className="bg-yellow-50 border-4 border-blue-900 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Suggested Improvements ({suggestedImprovements.length})
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {suggestedImprovements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Projects Analysis */}
      {(existingProjects.length > 0 || suggestedProjects.length > 0) && (
        <div className="bg-purple-50 border-4 border-blue-900 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-500 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <div className="w-full">
              <h4 className="font-medium text-gray-800 mb-4">
                Projects Analysis
              </h4>

              {/* Existing Projects Analysis */}
              {existingProjects.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-medium text-gray-700 mb-3">
                    Existing Projects Review
                  </h5>
                  <div className="space-y-4">
                    {existingProjects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="font-medium text-gray-800">
                            {project.project || project.name}
                          </h6>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              project.relevance === "high"
                                ? "bg-green-100 text-green-800"
                                : project.relevance === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {project.relevance} relevance
                          </span>
                        </div>

                        {project.issues && project.issues.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-gray-600 mb-1">
                              Issues:
                            </p>
                            <ul className="text-xs text-red-600 space-y-1">
                              {project.issues.map((issue, issueIndex) => (
                                <li
                                  key={issueIndex}
                                  className="flex items-start gap-1"
                                >
                                  <span className="text-red-500 mt-0.5">•</span>
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {project.suggestions &&
                          project.suggestions.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-gray-600 mb-1">
                                Suggestions:
                              </p>
                              <ul className="text-xs text-green-600 space-y-1">
                                {project.suggestions.map(
                                  (suggestion, suggestionIndex) => (
                                    <li
                                      key={suggestionIndex}
                                      className="flex items-start gap-1"
                                    >
                                      <span className="text-green-500 mt-0.5">
                                        •
                                      </span>
                                      {suggestion}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested New Projects */}
              {suggestedProjects.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Suggested New Projects ({suggestedProjects.length})
                  </h5>
                  <p className="text-xs text-gray-600 mb-4">
                    Consider adding these projects to better align with job
                    requirements:
                  </p>

                  <div className="space-y-4">
                    {suggestedProjects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 rounded-lg p-4 border border-blue-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h6 className="font-medium text-gray-800">
                            {project.title}
                          </h6>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                              {project.impact}
                            </span>
                            <button
                              onClick={() => {
                                // Add project to resume
                                const newProject = {
                                  name: project.title,
                                  date: "2024",
                                  description: project.description,
                                };
                                addArrayItem("projects", newProject);
                              }}
                              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            >
                              Add to Resume
                            </button>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-3">
                          {project.description}
                        </p>

                        {project.keyTechnologies &&
                          project.keyTechnologies.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs font-medium text-gray-600 mb-2">
                                Key Technologies:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {project.keyTechnologies.map(
                                  (tech, techIndex) => (
                                    <span
                                      key={techIndex}
                                      className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded"
                                    >
                                      {tech}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {project.reasoning && (
                          <p className="text-xs text-gray-600 italic mt-2">
                            💡 {project.reasoning}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Editable Resume Form Component
const EditableResumeForm = ({
  tailoredResumeData,
  updateResumeData,
  addArrayItem,
  removeArrayItem,
}) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [
        ...(tailoredResumeData.skills || []),
        newSkill.trim(),
      ];
      updateResumeData("skills", null, updatedSkills);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = tailoredResumeData.skills.filter(
      (_, i) => i !== index
    );
    updateResumeData("skills", null, updatedSkills);
  };

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto">
      {/* Personal Information Editor */}
      <div className="p-4 bg-blue-50 border-4 border-blue-900 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={tailoredResumeData?.personalInfo?.fullName || ""}
            onChange={(e) =>
              updateResumeData("personalInfo", "fullName", e.target.value)
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={tailoredResumeData?.personalInfo?.jobTitle || ""}
            onChange={(e) =>
              updateResumeData("personalInfo", "jobTitle", e.target.value)
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={tailoredResumeData?.personalInfo?.email || ""}
            onChange={(e) =>
              updateResumeData("personalInfo", "email", e.target.value)
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Phone"
            value={tailoredResumeData?.personalInfo?.phone || ""}
            onChange={(e) =>
              updateResumeData("personalInfo", "phone", e.target.value)
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Website"
            value={tailoredResumeData?.personalInfo?.website || ""}
            onChange={(e) =>
              updateResumeData("personalInfo", "website", e.target.value)
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Location"
            value={tailoredResumeData?.personalInfo?.location || ""}
            onChange={(e) =>
              updateResumeData("personalInfo", "location", e.target.value)
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary
          </label>
          <textarea
            placeholder="Professional Summary"
            value={tailoredResumeData?.personalInfo?.objective || ""}
            onChange={(e) =>
              updateResumeData("personalInfo", "objective", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20 resize-none"
          />
        </div>
      </div>

      {/* Skills Editor */}
      <div className="p-4 bg-green-50 border-4 border-blue-900 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {(tailoredResumeData?.skills || []).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center gap-1"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700 ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Work Experience Editor */}
      <div className="p-4 bg-yellow-50 border-4 border-blue-900 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium text-gray-800">Work Experience</h4>
          <button
            onClick={() =>
              addArrayItem("workExperience", {
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
            className="text-xs bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            + Add Job
          </button>
        </div>
        {(tailoredResumeData?.workExperience || []).map((job, index) => (
          <div
            key={job.id || index}
            className="mb-4 p-3 bg-white rounded border"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Job #{index + 1}
              </span>
              <button
                onClick={() => removeArrayItem("workExperience", job.id)}
                className="text-red-500 text-xs hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder="Company"
                value={job.company || ""}
                onChange={(e) =>
                  updateResumeData(
                    "workExperience",
                    "company",
                    e.target.value,
                    job.id
                  )
                }
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Position"
                value={job.position || ""}
                onChange={(e) =>
                  updateResumeData(
                    "workExperience",
                    "position",
                    e.target.value,
                    job.id
                  )
                }
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Start Date"
                value={job.startDate || ""}
                onChange={(e) =>
                  updateResumeData(
                    "workExperience",
                    "startDate",
                    e.target.value,
                    job.id
                  )
                }
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                placeholder="End Date"
                value={job.endDate || ""}
                onChange={(e) =>
                  updateResumeData(
                    "workExperience",
                    "endDate",
                    e.target.value,
                    job.id
                  )
                }
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <textarea
              placeholder="Job Description"
              value={job.description || ""}
              onChange={(e) =>
                updateResumeData(
                  "workExperience",
                  "description",
                  e.target.value,
                  job.id
                )
              }
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm h-16 resize-none"
            />
          </div>
        ))}
      </div>

      {/* Projects Editor */}
      <div className="p-4 bg-purple-50 border-4 border-blue-900 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium text-gray-800">Projects</h4>
          <button
            onClick={() =>
              addArrayItem("projects", {
                name: "",
                date: "",
                description: "",
              })
            }
            className="text-xs bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
          >
            + Add Project
          </button>
        </div>
        {(tailoredResumeData?.projects || []).map((project, index) => (
          <div
            key={project.id || index}
            className="mb-4 p-3 bg-white rounded border"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Project #{index + 1}
              </span>
              <button
                onClick={() => removeArrayItem("projects", project.id)}
                className="text-red-500 text-xs hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name || ""}
                onChange={(e) =>
                  updateResumeData(
                    "projects",
                    "name",
                    e.target.value,
                    project.id
                  )
                }
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Date"
                value={project.date || ""}
                onChange={(e) =>
                  updateResumeData(
                    "projects",
                    "date",
                    e.target.value,
                    project.id
                  )
                }
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <textarea
              placeholder="Project Description"
              value={project.description || ""}
              onChange={(e) =>
                updateResumeData(
                  "projects",
                  "description",
                  e.target.value,
                  project.id
                )
              }
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm h-16 resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TailoringResumePage = () => {
  const { tailorData } = useStoreAuth();
  const { createResume, isSaving } = useSavedResumeStore();
  const { generateRoadmap, isGeneratingRoadmap } = useCourseStore();
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Initialize with default resume structure
  const [tailoredResumeData, setTailoredResumeData] = useState({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      website: "",
      location: "",
      objective: "",
    },
    workExperience: [],
    education: [],
    projects: [],
    skills: [],
  });

  // Update resume data when tailorData changes (from Gemini response)
  useEffect(() => {
    if (tailorData?.tailoredResume) {
      setTailoredResumeData(tailorData.tailoredResume);
    }
  }, [tailorData]);

  // Handle save resume
  const handleSaveResume = async (resumeName, templateName, resumeData) => {
    const result = await createResume(resumeName, templateName, resumeData);
    if (result.success) {
      setShowSaveModal(false);
    }
  };

  // Handle generate roadmap based on analysis data
  const handleGenerateRoadmap = async () => {
    if (!tailorData?.analysisResults) {
      toast.error(
        "No analysis data available. Please tailor your resume first."
      );
      return;
    }

    const analysisResults = tailorData.analysisResults;
    const missingSkills = analysisResults.missingSkills || [];
    const personalInfo = tailorData.tailoredResume?.personalInfo || {};

    // Create roadmap data based on analysis
    const roadmapData = {
      title: `Guide for ${personalInfo.jobTitle || "Professional Development"}`,
      description: `Personalized learning roadmap based on resume analysis. Focus on acquiring missing skills: ${missingSkills
        .slice(0, 5)
        .join(
          ", "
        )}. This roadmap will help bridge skill gaps and improve job market competitiveness.`,
      skills:
        missingSkills.length > 0
          ? missingSkills
          : ["Professional Development", "Career Growth"],
      level: "intermediate", // Can be made dynamic based on experience level
    };

    try {
      const roadmapId = await generateRoadmap(roadmapData);
      if (roadmapId) {
        toast.success("Learning roadmap generated successfully!");
      }
    } catch {
      toast.error("Failed to generate roadmap. Please try again.");
    }
  };

  // Handler to update resume data from left panel changes
  const updateResumeData = (section, field, value, id = null) => {
    setTailoredResumeData((prevData) => {
      if (section === "personalInfo") {
        return {
          ...prevData,
          personalInfo: {
            ...prevData.personalInfo,
            [field]: value,
          },
        };
      } else if (section === "skills") {
        return {
          ...prevData,
          skills: value,
        };
      } else {
        // For arrays (workExperience, education, projects)
        return {
          ...prevData,
          [section]: prevData[section].map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        };
      }
    });
  };

  const addArrayItem = (section, template) => {
    setTailoredResumeData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], { id: Date.now(), ...template }],
    }));
  };

  const removeArrayItem = (section, id) => {
    setTailoredResumeData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((item) => item.id !== id),
    }));
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
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header with Action Buttons */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-white border-4 border-blue-900 rounded-lg shadow-md p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Resume Tailoring
                </h1>
                <p className="text-gray-600">
                  Customize your resume based on job analysis
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGenerateRoadmap}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
                  disabled={isGeneratingRoadmap || !tailorData?.analysisResults}
                >
                  {isGeneratingRoadmap ? (
                    <>
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
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      Generate Learning Roadmap
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Save Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Report at Top */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white border-4 border-blue-900 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Resume Analysis Report
            </h2>
            <AnalysisReport
              tailorData={tailorData}
              addArrayItem={addArrayItem}
              updateResumeData={updateResumeData}
            />
          </div>
        </div>

        {/* Editable Resume Data and Preview */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Panel - Editable Resume Data */}
            <div className="lg:w-1/2">
              <div className="bg-white border-4 border-blue-900 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Resume Data
                </h2>
                <EditableResumeForm
                  tailoredResumeData={tailoredResumeData}
                  updateResumeData={updateResumeData}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />
              </div>
            </div>

            {/* Right Panel - Live Resume Preview */}
            <div className="lg:w-1/2">
              <div className="bg-white border-4 border-blue-900 rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Live Preview
                </h2>
                <div className="h-[700px] overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="scale-75 transform-origin-top">
                    <ResumePreview
                      resumeData={tailoredResumeData}
                      template="template3"
                    />
                  </div>
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
          resumeData={tailoredResumeData}
          selectedTemplate="template3"
        />
      </div>
    </>
  );
};

export default TailoringResumePage;
