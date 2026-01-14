const express = require("express");
const { checkUser } = require("../middlewares/checkUser");
const {
  startInterview,
  submitInterview,
  startCustomInterview
} = require("../controllers/interviewController");

const interviewRouter = express.Router();

// All routes require authentication
interviewRouter.use(checkUser);

// Start a new interview
interviewRouter.post("/start", startInterview);

// Submit interview answers
interviewRouter.post("/submit", submitInterview);

// Submit interview answers
interviewRouter.post("/custom", startCustomInterview);

module.exports = interviewRouter;
