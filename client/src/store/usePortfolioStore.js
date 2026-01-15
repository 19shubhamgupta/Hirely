import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePortfolioStore = create((set, get) => ({
  // State
  isLoading: false,
  isCreating: false,
  isUploading: false,
  portfolioData: null,
  projects: [],
  skills: [],
  personalInfo: null,

  // Get projects from resumes
  getProjects: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/portfolio/projects");
      if (res.data.success) {
        set({
          projects: res.data.projects,
          skills: res.data.skills,
          personalInfo: res.data.personalInfo,
        });
        return res.data;
      }
    } catch (error) {
      console.error("Get Projects Error:", error);
      toast.error("Failed to fetch projects");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update project in local state
  updateProject: (projectIndex, updates) => {
    const { projects } = get();
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      ...updates,
    };
    set({ projects: updatedProjects });
  },

  // Upload project image
  uploadProjectImage: async (file, projectIndex) => {
    try {
      set({ isUploading: true });
      const formData = new FormData();
      formData.append("image", file);

      const res = await axiosInstance.post(
        "/portfolio/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        // Update project with new image URL
        const { projects } = get();
        const updatedProjects = [...projects];
        updatedProjects[projectIndex] = {
          ...updatedProjects[projectIndex],
          image: res.data.imageUrl,
        };
        set({ projects: updatedProjects });
        toast.success("Image uploaded successfully");
        return res.data.imageUrl;
      }
    } catch (error) {
      console.error("Upload Image Error:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      set({ isUploading: false });
    }
  },

  // Create portfolio
  createPortfolio: async (portfolioData) => {
    try {
      set({ isCreating: true });
      const res = await axiosInstance.post("/portfolio/create", portfolioData);
      if (res.data.success) {
        set({ portfolioData: res.data.portfolio });
        toast.success("Portfolio created successfully!");
        return res.data;
      }
    } catch (error) {
      console.error("Create Portfolio Error:", error);
      const message =
        error.response?.data?.error || "Failed to create portfolio";
      toast.error(message);
      if (error.response?.data?.slug) {
        return { success: false, slug: error.response.data.slug };
      }
      return null;
    } finally {
      set({ isCreating: false });
    }
  },

  // Get portfolio by slug (public)
  getPortfolioBySlug: async (slug) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/portfolio/${slug}`);
      if (res.data.success) {
        set({ portfolioData: res.data.portfolio });
        return res.data.portfolio;
      }
    } catch (error) {
      console.error("Get Portfolio Error:", error);
      toast.error("Portfolio not found");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Get my portfolio
  getMyPortfolio: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/portfolio/my");
      if (res.data.success) {
        set({ portfolioData: res.data.portfolio });
        return res.data;
      }
    } catch (error) {
      console.error("Get My Portfolio Error:", error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update portfolio
  updatePortfolio: async (updates) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put("/portfolio/update", updates);
      if (res.data.success) {
        set({ portfolioData: res.data.portfolio });
        toast.success("Portfolio updated successfully");
        return res.data;
      }
    } catch (error) {
      console.error("Update Portfolio Error:", error);
      toast.error("Failed to update portfolio");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Reset state
  resetState: () => {
    set({
      portfolioData: null,
      projects: [],
      skills: [],
      personalInfo: null,
    });
  },
}));
