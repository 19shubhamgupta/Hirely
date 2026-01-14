import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://chit-chat-realtime-chat-app-2.onrender.com";

export const useCourseStore = create((set, get) => ({
  isGeneratingRoadmap: false,
  isGeneratingCourse: false,
  isGeneratingChpt: false,
  chptData: null,
  userDataForRoadmap: null,
  userRoadmaps: [],
  courseData: null,
  currentCourse: null, // Will store the current course being viewed

  // Set course generation state
  setIsGeneratingCourse: (value) => set({ isGeneratingCourse: value }),

  // Store course data
  setCourseData: (data) => set({ courseData: data }),

  getUserRoadmaps: async () => {
    try {
      const res = await axiosInstance.get("/roadmap/user-roadmaps");
      set({ userRoadmaps: res.data.roadmaps });
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log(err);
      }
    }
  },
  generateRoadmap: async (data) => {
    /*
    {
        title: "JavaScript Fundamentals",
        description: "A comprehensive course covering JavaScript basics for beginners. Learn variables, functions, objects, and DOM manipulation.",
        skills: [
                "JavaScript",
                "DOM Manipulation",
                "ES6 Features",
                "Basic Algorithms"
                ],
        level: "beginner"
   }
*/
    try {
      set({ isGeneratingRoadmap: true });

      const generatedRoadmap = await axiosInstance.post(
        "/roadmap/generate",
        data
      );
      set({
        userRoadmaps: [...get().userRoadmaps, generatedRoadmap.data.roadmap],
      });
      toast.success("Generated successfully!");

      set({ isGeneratingRoadmap: false });
      return generatedRoadmap.data.roadmap.id;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data?.message || "Generation failed");
      } else {
        toast.error("Network error — please try again");
      }
      set({ isGeneratingRoadmap: false });
      return false;
    }
  },
  generateChpt: async (data) => {
    try {
      set({ isGeneratingChpt: true });

      const generatedchpt = await axiosInstance.post("/roadmap/chpt-gen", data);

      // Transform the response into a structured course format
      const courseContent = {
        title: generatedchpt.data.title || "Course Chapter",
        videoUrl: generatedchpt.data.videoUrl,
        sections: generatedchpt.data.sections || [],
        resources: generatedchpt.data.resources || [],
      };

      set({
        chptData: generatedchpt,
        currentCourse: courseContent,
      });

      toast.success("Generated successfully!");
      set({ isGeneratingChpt: false });

      return courseContent;
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data?.message || "Generation failed");
      } else {
        toast.error("Network error — please try again");
      }
      set({ isGeneratingChpt: false });
      return null;
    }
  },
}));
