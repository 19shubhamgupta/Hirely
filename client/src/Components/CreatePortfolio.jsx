import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreAuth } from "../store/useAuthStore";
import { usePortfolioStore } from "../store/usePortfolioStore";
import {
  Briefcase,
  Upload,
  X,
  Loader2,
  Image,
  Plus,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const { authUser, checkAuth } = useStoreAuth();
  const {
    projects,
    skills,
    isLoading,
    isCreating,
    isUploading,
    getProjects,
    updateProject,
    uploadProjectImage,
    createPortfolio,
  } = usePortfolioStore();

  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  // Redirect if user already has portfolio
  useEffect(() => {
    if (authUser?.portfolioSlug) {
      navigate(`/portfolio/${authUser.portfolioSlug}`);
    }
  }, [authUser, navigate]);

  // Fetch projects on mount
  useEffect(() => {
    getProjects();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e, projectIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    await uploadProjectImage(file, projectIndex);
  };

  // Handle project field update
  const handleProjectUpdate = (index, field, value) => {
    updateProject(index, { [field]: value });
  };

  // Handle submit
  const handleSubmit = async () => {
    if (projects.length === 0) {
      toast.error("Add at least one project to create portfolio");
      return;
    }

    const result = await createPortfolio({
      projects,
      skills,
      title: title || `${authUser?.fullname}'s Portfolio`,
      bio,
    });

    if (result?.success) {
      await checkAuth(); // Refresh auth to get new slug
      navigate(`/portfolio/${result.slug}`);
    } else if (result?.slug) {
      navigate(`/portfolio/${result.slug}`);
    }
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-40 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-40 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">
              Portfolio Builder
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Create Your Portfolio
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Customize your projects with images and create a shareable portfolio
          </p>
        </div>

        {/* Portfolio Title & Bio */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Portfolio Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`${authUser?.fullname || "My"}'s Portfolio`}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio (optional)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a short bio about yourself..."
                rows={3}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 resize-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            Your Projects ({projects.length})
          </h2>

          {projects.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                No projects found in your resumes
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Add projects to your resume first
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    {/* Image Upload */}
                    <div className="flex-shrink-0">
                      <label className="cursor-pointer group">
                        <div
                          className={`w-32 h-24 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${
                            project.image
                              ? "border-purple-400 bg-purple-50"
                              : "border-gray-300 hover:border-purple-400 bg-white"
                          }`}
                        >
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          ) : isUploading ? (
                            <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                          ) : (
                            <div className="text-center">
                              <Image className="w-6 h-6 text-gray-400 mx-auto mb-1 group-hover:text-purple-500 transition-colors" />
                              <span className="text-xs text-gray-400 group-hover:text-purple-500 transition-colors">
                                Add Image
                              </span>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, index)}
                          disabled={isUploading}
                        />
                      </label>
                    </div>

                    {/* Project Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {project.name}
                        </h3>
                        {project.date && (
                          <span className="text-sm text-gray-500">
                            {project.date}
                          </span>
                        )}
                      </div>

                      {project.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      {/* Links */}
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                            <input
                              type="url"
                              placeholder="Live URL"
                              value={project.link || ""}
                              onChange={(e) =>
                                handleProjectUpdate(
                                  index,
                                  "link",
                                  e.target.value
                                )
                              }
                              className="flex-1 bg-transparent text-gray-800 text-sm placeholder-gray-400 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                            <Github className="w-4 h-4 text-gray-400" />
                            <input
                              type="url"
                              placeholder="GitHub URL"
                              value={project.github || ""}
                              onChange={(e) =>
                                handleProjectUpdate(
                                  index,
                                  "github",
                                  e.target.value
                                )
                              }
                              className="flex-1 bg-transparent text-gray-800 text-sm placeholder-gray-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full text-blue-800 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isCreating || projects.length === 0}
          className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isCreating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating Portfolio...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create Portfolio
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 transition-transform duration-300">
                →
              </div>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>
    </div>
  );
};

export default CreatePortfolio;
