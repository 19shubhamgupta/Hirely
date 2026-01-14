// interviewController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Report = require("../models/Report");
const fs = require("fs");
const pdfParse = require("pdf-parse");
// Initialize Google Generative AI
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Utility: Clean Gemini response and safely parse JSON
 */
function safeJSONParse(responseText, fallbackType = "array") {
  try {
    // Remove code fences like ```json ... ```
    let cleaned = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("Direct JSON.parse failed, attempting regex extraction...");

    // Try array match first
    if (fallbackType === "array") {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }

    // Try object match
    const objMatch = responseText.match(/\{[\s\S]*\}/);
    if (objMatch) {
      return JSON.parse(objMatch[0]);
    }

    return fallbackType === "array" ? [] : {};
  }
}

/**
 * Start interview → generate questions on the fly
 */
exports.startInterview = async (req, res) => {
  try {
    const { title, role, experience, skills, difficulty } = req.body;
    console.log("Starting interview:", {
      title,
      role,
      experience,
      skills,
      difficulty,
    });

    const prompt = `
You are an expert interview question generator. Create 15-20 interview questions for a ${experience} level ${role}.

Interview Details:
- Role: ${role}
- Title: ${title}
- Experience Level: ${experience}
- Skills: ${skills?.join(", ") || "Not specified"}
- Difficulty: ${difficulty || "medium"}

Generate:
1. 2 introduction/background questions
2. 3 technical/deep-dive questions

Format the response as a JSON array:
[
  {
    "question": "Question text",
    "type": "introduction" | "technical",
    "timeLimit": 120,
    "category": "JavaScript | React | System Design | etc."
  }
]

Return ONLY JSON array. No extra text, no markdown.
`;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    let questions;
    try {
      questions = JSON.parse(responseText);
    } catch (err) {
      console.warn("JSON.parse failed for questions, extracting array...");
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      questions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    }

    return res.status(200).json({
      message: "Questions generated successfully",
      questions,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

/**
 * Submit answers → generate report immediately
 */
exports.submitInterview = async (req, res) => {
  try {
    const { title, role, experience, skills, difficulty, questions, answers } =
      req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({
        message: "Answers are required",
      });
    }

    // Build QA pairs
    const qaPairs = questions
      ? questions.map((q, i) => ({
          question: q.question,
          type: q.type,
          category: q.category,
          answer: answers[i] || "No answer provided",
        }))
      : answers.map((a, i) => ({
          question: a.question || `Q${i + 1}`,
          type: a.type || "unspecified",
          category: a.category || "general",
          answer: a.answer || "No answer provided",
        }));

    // Prompt for Gemini
    const prompt = `
You are an expert interview evaluator. Analyze the following interview performance.

Details:
- Role: ${role || "Not specified"}
- Title: ${title || "Interview"}
- Experience: ${experience || "Not specified"}
- Skills: ${skills?.join(", ") || "Not specified"}
- Difficulty: ${difficulty || "medium"}

Questions and Answers:
${qaPairs.map(
  (qa, i) => `Q${i + 1} (${qa.type} - ${qa.category}):
${qa.question}

Answer:
${qa.answer}`
)}

Now evaluate and return JSON in this format and ensure it's valid JSON:
{
  "qaAnalysis": [
    ["question1", "transcript1", "suggestedAnswer1"],
    ["question2", "transcript2", "suggestedAnswer2"]
  ],
  "successPercentage": 76,
  "suggestedImprovements": ["Practice system design questions", "Improve SQL optimization"],
  "strengths": ["Good fundamentals"],
  "weaknesses": ["Weak in TypeScript"],
  "skillAssessment": {"JavaScript": 80, "React": 85, "System Design": 60},
  "summary": "Overall good performance but needs improvement."
}

Return ONLY JSON object. No extra text, no markdown.
`;

    // Call Gemini
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Parse response safely
    let reportData = {};
    try {
      reportData = JSON.parse(responseText);
    } catch (err) {
      console.warn("JSON.parse failed, extracting object...", err);
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          reportData = JSON.parse(jsonMatch[0]);
        } catch (err2) {
          console.warn("Failed to parse extracted JSON, using fallback", err2);
          reportData = {};
        }
      }
    }

    // Save report to database
    const report = new Report({
      title,
      role,
      experience,
      difficulty,
      skills,
      qaAnalysis:
        reportData.qaAnalysis?.map(([q, t, s]) => ({
          question: q,
          transcript: t,
          suggestedAnswer: s,
        })) || [],
      successPercentage: reportData.successPercentage || 0,
      suggestedImprovements: reportData.suggestedImprovements || [],
      strengths: reportData.strengths || [],
      weaknesses: reportData.weaknesses || [],
      skillAssessment: reportData.skillAssessment
        ? Object.entries(reportData.skillAssessment).map(([skill, score]) => ({
            skill,
            score,
          }))
        : [],
      summary: reportData.summary || "",
    });

    await report.save();

    console.log("Generated Report saved:", report);

    // Return reportId to frontend
    return res.status(200).json({
      message: "Interview report generated and saved",
      reportId: report._id,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message,
    });
  }
};

// ===============================
// Start Custom Interview
// ===============================
exports.startCustomInterview = async (req, res) => {
  try {
    const { role, title, company, description } = req.body;

    // --- Step 1: Extract resume text ---
    let resumeText = "";
    if (req.files?.resume) {
      const resumeBuffer = fs.readFileSync(req.files.resume[0].path);
      const resumeData = await pdfParse(resumeBuffer);
      resumeText = resumeData.text;
    }

    // --- Step 2: Extract job description text ---
    let jobText = "";
    if (req.files?.jobPdf) {
      const jobBuffer = fs.readFileSync(req.files.jobPdf[0].path);
      const jobData = await pdfParse(jobBuffer);
      jobText = jobData.text;
    } else if (description) {
      jobText = `
      Job Role: ${role || "Not specified"}
      Job Title: ${title || "Not specified"}
      Company: ${company || "Not specified"}
      Description: ${description}
      `;
    }

    // --- Step 3: AI Prompt ---
    const prompt = `
You are an expert interview question generator. 
Analyze the candidate's resume and the job description to generate 15–20 tailored interview questions.

Candidate Resume:
${resumeText || "Not provided"}

Job Description:
${jobText || "Not provided"}

Generate:
1. 2 introduction/background questions (based on resume, past work, achievements).
2. 4 technical/deep-dive questions (based on resume skills + job requirements).

Format the response as a JSON array:
[
  {
    "question": "Question text",
    "type": "introduction" | "technical",
    "timeLimit": 120,
    "category": "JavaScript | React | System Design | etc."
  }
]

Return ONLY JSON array. No extra text, no markdown.
`;

    // --- Step 4: Generate with Gemini ---
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // --- Step 5: Parse JSON safely ---
    let questions;
    try {
      questions = JSON.parse(responseText);
    } catch (err) {
      console.warn(
        "JSON.parse failed for custom interview, extracting array..."
      );
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      questions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    }

    return res.status(200).json({
      message: "Custom interview generated successfully",
      questions,
    });
  } catch (error) {
    console.error("Error generating custom interview:", error);
    return res.status(500).json({
      message: "Failed to generate custom interview questions",
      error: error.message,
    });
  }
};
