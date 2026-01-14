
// models/Report.js
const mongoose = require("mongoose");

const qaAnalysisSchema = new mongoose.Schema({
  question: { type: String, required: true },
  transcript: { type: String, required: true },
  suggestedAnswer: { type: String, required: true },
});

const skillAssessmentSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  score: { type: Number, min: 0, max: 100 },
});

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Untitled Interview" },
    role: { type: String, default: "Not specified" },
    experience: { type: String, default: "Not specified" },
    difficulty: { type: String, default: "medium" },
    skills: { type: [String], default: [] },

    qaAnalysis: [qaAnalysisSchema], // [["q1","answer1","suggested1"],...]

    successPercentage: { type: Number, min: 0, max: 100 },

    suggestedImprovements: { type: [String], default: [] },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },

    skillAssessment: [skillAssessmentSchema], // {skill: score}

    summary: { type: String },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
