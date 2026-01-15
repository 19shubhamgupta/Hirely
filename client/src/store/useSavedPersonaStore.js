import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSavedPersonaStore = create((set, get) => ({
  savedPersonas: [],
  isLoadingPersona: false,
  isSavingPersona: false,

  // Create persona from resume using AI analysis
  createPersonaFromResume: async (resumeId) => {
    try {
      set({ isLoadingPersona: true });

      const response = await axiosInstance.post("/persona/from-resume", {
        resumeId,
      });

      return {
        success: true,
        personaData: response.data.personaData,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to generate persona from resume";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isLoadingPersona: false });
    }
  },

  // Create a new persona
  createPersona: async (personaName, templateName, personaData) => {
    try {
      set({ isSavingPersona: true });

      const response = await axiosInstance.post("/persona/create", {
        personaName,
        templateName,
        ...personaData, // Spread the personaData object directly
      });

      // Refresh the personas list
      await get().getUserPersonas();

      toast.success("Persona saved successfully!");
      return { success: true, persona: response.data.persona };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to save persona";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isSavingPersona: false });
    }
  },

  // Get all user personas
  getUserPersonas: async () => {
    try {
      set({ isLoadingPersona: true });

      const response = await axiosInstance.get("/persona/user-personas");

      set({ savedPersonas: response.data.personas });
      return { success: true, personas: response.data.personas };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch personas";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isLoadingPersona: false });
    }
  },

  // Get a specific persona by ID
  getPersonaById: async (id) => {
    try {
      set({ isLoadingPersona: true });

      const response = await axiosInstance.get(`/persona/${id}`);

      return { success: true, persona: response.data.persona };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch persona";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isLoadingPersona: false });
    }
  },

  // Update a persona
  updatePersona: async (id, personaName, templateName, personaData) => {
    try {
      set({ isSavingPersona: true });

      const response = await axiosInstance.put(`/persona/${id}`, {
        personaName,
        templateName,
        ...personaData, // Spread the personaData object directly
      });

      // Refresh the personas list
      await get().getUserPersonas();

      toast.success("Persona updated successfully!");
      return { success: true, persona: response.data.persona };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update persona";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isSavingPersona: false });
    }
  },

  // Delete a persona
  deletePersona: async (id) => {
    try {
      set({ isLoadingPersona: true });

      await axiosInstance.delete(`/persona/${id}`);

      // Remove from local state
      set((state) => ({
        savedPersonas: state.savedPersonas.filter(
          (persona) => persona._id !== id
        ),
      }));

      toast.success("Persona deleted successfully!");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete persona";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isLoadingPersona: false });
    }
  },

  // Clear all personas from store
  clearPersonas: () => {
    set({ savedPersonas: [] });
  },
}));
