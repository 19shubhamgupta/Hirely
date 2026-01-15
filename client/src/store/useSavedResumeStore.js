import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSavedResumeStore = create((set, get) => ({
  savedResumes: [],
  isLoading: false,
  isSaving: false,

  // Create a new resume
  createResume: async (resumeName, templateName, resumeData) => {
    try {
      set({ isSaving: true });

      const response = await axiosInstance.post("/resume/create", {
        resumeName,
        templateName,
        resumeData,
      });

      // Refresh the resumes list
      await get().getUserResumes();

      toast.success("Resume saved successfully!");
      return { success: true, resume: response.data.resume };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to save resume";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isSaving: false });
    }
  },

  // Get all user resumes
  getUserResumes: async () => {
    try {
      set({ isLoading: true });

      const response = await axiosInstance.get("/resume/user-resumes");

      set({ savedResumes: response.data.resumes });
      return { success: true, resumes: response.data.resumes };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch resumes";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Get a specific resume by ID
  getResumeById: async (id) => {
    try {
      set({ isLoading: true });

      const response = await axiosInstance.get(`/resume/${id}`);

      return { success: true, resume: response.data.resume };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch resume";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Update a resume
  updateResume: async (id, resumeName, templateName, resumeData) => {
    try {
      set({ isSaving: true });

      const response = await axiosInstance.put(`/resume/${id}`, {
        resumeName,
        templateName,
        resumeData,
      });

      // Refresh the resumes list
      await get().getUserResumes();

      toast.success("Resume updated successfully!");
      return { success: true, resume: response.data.resume };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update resume";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isSaving: false });
    }
  },

  // Delete a resume
  deleteResume: async (id) => {
    try {
      set({ isLoading: true });

      await axiosInstance.delete(`/resume/${id}`);

      // Remove from local state
      set((state) => ({
        savedResumes: state.savedResumes.filter((resume) => resume._id !== id),
      }));

      toast.success("Resume deleted successfully!");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete resume";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Clear all resumes from store
  clearResumes: () => {
    set({ savedResumes: [] });
  },
}));
