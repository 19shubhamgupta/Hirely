import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSavedResumeStore } from "../store/useSavedResumeStore";
import ResumePreview from "../Components/ResumePreview";

export default function MyResumesPage() {
  const navigate = useNavigate();
  const { savedResumes, isLoading, getUserResumes, deleteResume } =
    useSavedResumeStore();

  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    getUserResumes();
  }, [getUserResumes]);

  const handleDelete = async (id) => {
    const result = await deleteResume(id);
    if (result.success) {
      setDeleteConfirm(null);
    }
  };

  // Function to ensure proper data structure for ResumePreview
  const formatResumeData = (resume) => {
    return {
      personalInfo: resume.personalInfo || {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        website: "",
        location: "",
        objective: "",
      },
      workExperience: (resume.workExperience || []).map((job, index) => ({
        id: job.id || index + 1,
        company: job.company || "",
        position: job.position || "",
        startDate: job.startDate || "",
        endDate: job.endDate || "",
        description: job.description || "",
      })),
      education: (resume.education || []).map((edu, index) => ({
        id: edu.id || index + 1,
        institution: edu.institution || "",
        degree: edu.degree || "",
        field: edu.field || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
        gpa: edu.gpa || "",
      })),
      projects: (resume.projects || []).map((project, index) => ({
        id: project.id || index + 1,
        name: project.name || "",
        description: project.description || "",
        technologies: project.technologies || "",
        link: project.link || "",
      })),
      skills: resume.skills || [],
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="relative mb-8">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
            My Resumes
          </h1>
        </div>

        {/* Resumes Grid */}
        {savedResumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No resumes yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first resume.
              </p>
              <div className="mt-6">
                <Link
                  to="/templates"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create Resume
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8">
            {savedResumes.map((resume) => (
              <div key={resume._id} className="transition-all duration-300">
                {/* Resume Preview */}
                <div className="p-6">
                  {/* Template Preview - A4 dimensions */}
                  <div
                    className="border border-gray-200 rounded-lg bg-white mx-auto shadow-sm relative group cursor-pointer"
                    style={{ width: "300px", height: "424px" }}
                  >
                    <div className="transform scale-[0.36] origin-top-left w-[278%] h-[1180px] ">
                      <div className="bg-white">
                        
                        <ResumePreview
                          resumeData={formatResumeData(resume)}
                          template={resume.templateName}
                        />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-transparent transition-all duration-300 opacity-0 group-hover:opacity-100">
                      {/* Resume Info - Top Left */}
                      <div className="absolute top-4 left-4 text-left">
                        <h3 className="text-lg font-bold text-zinc-600  px-3 py-1 rounded-md mb-1 ">
                          {resume.resumeName}
                        </h3>
                        <p className="text-sm text-zinc-600 font-bold  px-3 py-1 rounded-md ">
                          {resume.templateName
                            ? `Template ${resume.templateName.replace(
                                "template",
                                ""
                              )}`
                            : "Template"}
                        </p>
                      </div>

                      {/* Action Icons - Bottom Right */}
                      <div className="absolute bottom-4 right-4">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/resume-builder?template=${resume.templateName}&resumeId=${resume._id}`
                              );
                            }}
                            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors shadow-lg"
                            title="Edit Resume"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(
                                deleteConfirm === resume._id ? null : resume._id
                              );
                            }}
                            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors shadow-lg"
                            title="Delete Resume"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.5 1.5A1 1 0 0117 12H3a1 1 0 01-.707-1.707L4 8.5V5zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Confirmation Overlay */}
                    {deleteConfirm === resume._id && (
                      <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 mx-4 max-w-sm">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Delete Resume
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete "{resume.resumeName}
                            " permanently? This action cannot be undone.
                          </p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleDelete(resume._id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Floating Create Resume Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <Link
          to="/templates"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group-hover:px-6 group-hover:rounded-xl"
        >
          {/* Document Plus Icon */}
          <svg
            className="w-6 h-6 transition-all duration-300 group-hover:mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 0v4m0-4h4m-4 0H8"
            />
          </svg>

          {/* Text that appears on hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium max-w-0 group-hover:max-w-xs overflow-hidden">
            Create Resume
          </span>
        </Link>
      </div>
    </div>
  );
}
