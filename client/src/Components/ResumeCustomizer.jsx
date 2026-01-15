import React, { useState } from "react";
import { useStoreAuth } from "../store/useResumeStore";

const ResumeCustomizer = ({
  tailoredResumeData,
  updateResumeData,
  addArrayItem,
  removeArrayItem,
}) => {
  const { tailorData } = useStoreAuth();
  const [editingSummary, setEditingSummary] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleGenerateAISummary = () => {
    // Use AI generated summary from tailorData if available
    const generatedSummary =
      tailorData?.analysisResults?.professionalSummary?.aiGeneratedSummary ||
      "Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Proven track record of building scalable web applications and leading development teams. Strong background in microservices architecture, CI/CD pipelines, and agile methodologies.";

    updateResumeData("personalInfo", "objective", generatedSummary);
  };

  const handleSaveSummary = () => {
    setEditingSummary(false);
    console.log("Summary saved:", tailoredResumeData.personalInfo.objective);
  };

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

  // Get data from tailorData or use fallback sample data
  const matchedSkills = tailorData?.analysisResults?.matchedSkills || [
    "React",
    "JavaScript",
    "Node.js",
  ];
  const missingSkills = tailorData?.analysisResults?.missingSkills || [
    "Docker",
    "Kubernetes",
    "AWS",
  ];
  const suggestedImprovements = tailorData?.analysisResults
    ?.suggestedImprovements || [
    "Add a 'Projects' section with cloud-based applications",
    "Include keywords: 'containerization', 'CI/CD', 'cloud-native'",
    "Quantify achievements with metrics and numbers",
  ];

  const currentSummary =
    tailorData?.analysisResults?.professionalSummary?.currentSummary ||
    "Software developer with experience in web development using modern frameworks and technologies.";

  const summaryIssues = tailorData?.analysisResults?.professionalSummary
    ?.issues || [
    "Missing cloud technology keywords (AWS, Docker, Kubernetes)",
    "No mention of microservices architecture",
    "Lacks quantified achievements",
    "Missing industry-specific buzzwords like 'CI/CD', 'DevOps'",
  ];

  // Project analysis data from tailorData
  const existingProjects = tailorData?.analysisResults?.existingProjects || [
    {
      project: "MERN Stack E-Commerce Platform",
      relevance: "low",
      issues: [
        "Uses MERN stack instead of Java technologies",
        "Frontend-focused project for backend role",
        "Missing enterprise-level complexity",
      ],
      suggestions: [
        "Emphasize backend API development aspects",
        "Highlight database optimization techniques",
        "Add scalability and performance metrics",
      ],
    },
    {
      project: "React Dashboard Application",
      relevance: "medium",
      issues: [
        "Primarily frontend project",
        "Missing backend integration details",
      ],
      suggestions: ["Include API documentation and testing strategies"],
    },
  ];

  const suggestedProjects = tailorData?.analysisResults?.suggestedProjects || [
    {
      title: "Microservices Architecture with Docker & Kubernetes",
      description:
        "Build a distributed system using modern backend technologies, containerized with Docker and orchestrated with Kubernetes",
      impact: "High Impact",
      keyTechnologies: [
        "Java",
        "Spring Boot",
        "Docker",
        "Kubernetes",
        "REST APIs",
      ],
      reasoning:
        "Addresses missing enterprise-level complexity and cloud technologies",
    },
    {
      title: "Cloud-Native Application with CI/CD Pipeline",
      description:
        "Develop a scalable application deployed on AWS with automated CI/CD pipeline, monitoring, and infrastructure as code",
      impact: "High Impact",
      keyTechnologies: [
        "AWS",
        "Jenkins",
        "Terraform",
        "CloudWatch",
        "ElasticSearch",
      ],
      reasoning:
        "Covers missing DevOps, CI/CD, and cloud infrastructure skills",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Resume Analysis & Editor
      </h2>

      {/* Editable Resume Sections */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
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
          Editable Resume Data
        </h3>

        {/* Personal Information Editor */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-medium text-gray-800 mb-3">
            Personal Information
          </h4>
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
            <button
              onClick={handleGenerateAISummary}
              className="mt-2 text-xs bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition-colors"
            >
              Generate AI Summary
            </button>
          </div>
        </div>

        {/* Skills Editor */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
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
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
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
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
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

      {/* Analysis Results */}
      <div className="bg-white rounded-xl shadow-md p-6">
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
          Analysis Results
        </h2>

        {/* Skills Match */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
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
              <h4 className="font-medium text-gray-800">Matched Skills</h4>
              <div className="mt-2 flex flex-wrap gap-2">
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

        {/* Missing Skills */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
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
            <div>
              <h4 className="font-medium text-gray-800">Missing Skills</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-4">
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
              <h4 className="font-medium text-gray-800">
                Suggested Improvements
              </h4>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                {suggestedImprovements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Summary Analysis */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
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
              <h4 className="font-medium text-gray-800 mb-2">
                Professional Summary Analysis
              </h4>

              {/* Current Summary */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 font-medium">
                  Current Summary:
                </p>
                <p className="text-sm text-gray-700 bg-white p-3 rounded border mt-1">
                  {currentSummary}
                </p>
              </div>

              {/* Issues with current summary */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 font-medium">
                  Issues Identified:
                </p>
                <ul className="text-sm text-red-600 mt-1 space-y-1">
                  {summaryIssues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-red-500 mt-1">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Generated Summary */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600 font-medium">
                    AI-Generated Summary:
                  </p>
                  <button
                    onClick={handleGenerateAISummary}
                    className="text-xs bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition-colors"
                  >
                    Generate New
                  </button>
                </div>
                {tailoredResumeData?.personalInfo?.objective ? (
                  <div className="bg-white border rounded p-3">
                    {editingSummary ? (
                      <div>
                        <textarea
                          value={tailoredResumeData.personalInfo.objective}
                          onChange={(e) =>
                            updateResumeData(
                              "personalInfo",
                              "objective",
                              e.target.value
                            )
                          }
                          className="w-full h-24 text-sm border border-gray-300 rounded p-2 resize-none"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={handleSaveSummary}
                            className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingSummary(false)}
                            className="text-xs bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-700">
                          {tailoredResumeData.personalInfo.objective}
                        </p>
                        <button
                          onClick={() => setEditingSummary(true)}
                          className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">
                    Click "Generate New" to create an AI-optimized summary
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Relevance Analysis */}
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
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
              <h4 className="font-medium text-gray-800 mb-3">
                Existing Projects Analysis
              </h4>

              {existingProjects.map((project, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-800">
                        {project.project}
                      </h5>
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

                    {project.issues.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-600 font-medium">
                          Issues:
                        </p>
                        <ul className="text-xs text-red-600 mt-1 space-y-1">
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

                    <div>
                      <p className="text-xs text-gray-600 font-medium">
                        Suggestions:
                      </p>
                      <ul className="text-xs text-green-600 mt-1 space-y-1">
                        {project.suggestions.map(
                          (suggestion, suggestionIndex) => (
                            <li
                              key={suggestionIndex}
                              className="flex items-start gap-1"
                            >
                              <span className="text-green-500 mt-0.5">•</span>
                              {suggestion}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggested Projects Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
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
                  Suggested New Projects
                </h5>
                <p className="text-xs text-gray-600 mb-4">
                  Consider adding these projects to better align with the job
                  requirements:
                </p>

                <div className="space-y-3">
                  {suggestedProjects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 rounded-lg p-3 border border-blue-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-medium text-gray-800">
                          {project.title}
                        </h6>
                        <div className="flex gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                            {project.impact}
                          </span>
                          <button
                            onClick={() =>
                              addArrayItem("projects", {
                                name: project.title,
                                date: "2024",
                                description: project.description,
                              })
                            }
                            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Add to Resume
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        {project.description}
                      </p>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">
                          Key Technologies:
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.keyTechnologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 italic">
                        {project.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCustomizer;
