const express = require("express");
const uploadMemory = require("../middlewares/multerUpload");
const { checkUser } = require("../middlewares/checkUser");
const {
  analyzeResume,
  getUserResumeAnalyses,
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const resumeRouter = express.Router();

// Route for analyzing resume
resumeRouter.post(
  "/tailor-info",
  checkUser,
  uploadMemory.fields([
    { name: "resume", maxCount: 1 },
    { name: "job", maxCount: 1 },
  ]),
  analyzeResume // Changed from getTailorInfo to analyzeResume
);

// Add route for getting user's resume analyses
resumeRouter.get("/analyses", checkUser, getUserResumeAnalyses);

// CRUD routes for resumes
resumeRouter.post("/create", checkUser, createResume);
resumeRouter.get("/user-resumes", checkUser, getUserResumes);
resumeRouter.get("/:id", checkUser, getResumeById);
resumeRouter.put("/:id", checkUser, updateResume);
resumeRouter.delete("/:id", checkUser, deleteResume);

module.exports = resumeRouter;
