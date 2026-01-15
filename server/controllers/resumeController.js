// resumeController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdfParse = require("pdf-parse");
const user = require("../models/user");
const Resume = require("../models/resume");

// Initialize Google Generative AI
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeResume = async (req, res) => {
  try {
    console.log("Received files:", req.files);
    console.log("Received body:", req.body);

    let resumeText = "";
    let jobDescriptionText = "";

    // Extract resume text if uploaded
    if (req.files?.resume && req.files.resume[0]) {
      const resumeBuffer = req.files.resume[0].buffer;
      const parsedResume = await pdfParse(resumeBuffer);
      resumeText = parsedResume.text.trim();
    }

    // Extract job description text if uploaded
    if (req.files?.job && req.files.job[0]) {
      const jobBuffer = req.files.job[0].buffer;
      const parsedJob = await pdfParse(jobBuffer);
      jobDescriptionText = parsedJob.text.trim();
    } else {
      // Fallback to body fields
      const { role, title, description } = req.body;
      jobDescriptionText = `Role: ${role || ""}\nTitle: ${
        title || ""
      }\nDescription: ${description || ""}`;
    }

    if (!resumeText || !jobDescriptionText) {
      return res.status(400).json({
        message: "Resume and job description are required (file or text).",
      });
    }

    // Gemini prompt
    const prompt = `
You are an expert resume and job description analyzer.  
Your task is to compare a candidate’s resume with a given job description and provide a detailed analysis report.  

### Inputs:
1. Resume (text extracted from PDF):
"""
${resumeText}
"""

2. Job Description (text or extracted from PDF):
"""
${jobDescriptionText}
"""

### Instructions:
- Analyze the resume against the job description.  
- Provide analysis in the exact structure needed for the ResumeCustomizer component.
- Create a complete tailored resume object that improves the original resume based on job requirements.
- Be specific and actionable in all recommendations.
- Extract actual project names from the resume for existing projects analysis.
- Generate realistic project suggestions based on the job requirements.
- For professionalSummary, extract the actual summary from resume and provide specific improvement suggestions.
- For existingProjects, analyze actual projects mentioned in the resume.
- For the tailoredResume object, extract and improve all sections from the original resume.  

### Output Format (strict JSON):
{
  "analysisResults": {
    "matchedSkills": [
      "React", 
      "JavaScript", 
      "Node.js"
    ],
    "missingSkills": [
      "Docker", 
      "Kubernetes", 
      "AWS"
    ],
    "suggestedImprovements": [
      "Add a 'Projects' section with cloud-based applications",
      "Include keywords: 'containerization', 'CI/CD', 'cloud-native'",
      "Quantify achievements with metrics and numbers"
    ],
    "professionalSummary": {
      "currentSummary": "Extract the actual professional summary from resume here",
      "issues": [
        "Missing cloud technology keywords (AWS, Docker, Kubernetes)",
        "No mention of microservices architecture", 
        "Lacks quantified achievements",
        "Missing industry-specific buzzwords like 'CI/CD', 'DevOps'"
      ],
      "aiGeneratedSummary": "Generate an improved professional summary tailored to the job description with specific keywords and quantified achievements"
    },
    "existingProjects": [
      {
        "project": "Extract actual project name from resume",
        "relevance": "low",
        "issues": [
          "Specific issues with this project for the target role",
          "Missing technologies or complexity"
        ],
        "suggestions": [
          "How to improve or reframe this project",
          "What technologies or aspects to emphasize"
        ]
      }
    ],
    "suggestedProjects": [
      {
        "title": "Microservices Architecture with Docker & Kubernetes",
        "description": "Build a distributed system using modern backend technologies, containerized with Docker and orchestrated with Kubernetes",
        "impact": "High Impact",
        "keyTechnologies": ["Java", "Spring Boot", "Docker", "Kubernetes", "REST APIs"],
        "reasoning": "Addresses missing enterprise-level complexity and cloud technologies"
      },
      {
        "title": "Cloud-Native Application with CI/CD Pipeline", 
        "description": "Develop a scalable application deployed on AWS with automated CI/CD pipeline, monitoring, and infrastructure as code",
        "impact": "High Impact",
        "keyTechnologies": ["AWS", "Jenkins", "Terraform", "CloudWatch", "ElasticSearch"],
        "reasoning": "Covers missing DevOps, CI/CD, and cloud infrastructure skills"
      }
    ]
  },
  "tailoredResume": {
    "personalInfo": {
      "fullName": "Extract full name from resume",
      "jobTitle": "Extract or improve job title based on target role",
      "email": "Extract email from resume",
      "phone": "Extract phone from resume",
      "website": "Extract website/portfolio from resume",
      "location": "Extract location from resume",
      "objective": "Generate an improved professional summary tailored to the job description with specific keywords and quantified achievements"
    },
    "workExperience": [
      {
        "id": 1,
        "company": "Extract company name from resume",
        "position": "Extract position from resume",
        "startDate": "Extract start date",
        "endDate": "Extract end date",
        "description": "Improve and tailor the job description with relevant keywords and quantified achievements"
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "Extract institution name from resume",
        "degree": "Extract degree from resume",
        "field": "Extract field of study",
        "startDate": "Extract start date",
        "endDate": "Extract end date",
        "gpa": "Extract GPA if mentioned",
        "additionalInfo": "Any additional relevant info"
      }
    ],
    "projects": [
      {
        "id": 1,
        "name": "Extract project name from resume and improve if needed",
        "date": "Extract project date",
        "description": "Improve project description with relevant keywords and technologies"
      }
    ],
    "skills": [
      "Extract all skills from resume and add missing relevant skills based on job description"
    ]
  }
}
    `;

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);

    console.log("Received response from Gemini");
    const response = await result.response;
    const responseText = response.text();

    console.log("Raw Gemini Response:", responseText);

    // Improved JSON parsing with error handling
    let analysisData;
    try {
      // First, try to parse the direct response
      analysisData = JSON.parse(responseText);
    } catch (err) {
      console.log(
        "Initial JSON parse failed, trying to extract JSON from text"
      );
      try {
        // Look for JSON pattern in the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisData = JSON.parse(jsonMatch[0]);
        } else {
          // If no JSON found, create a structured error response
          throw new Error("No valid JSON found in response");
        }
      } catch (parseError) {
        console.error("JSON parsing failed:", parseError);
        // Create a fallback response structure
        analysisData = {
          analysisResults: {
            error: "Failed to parse model response",
            rawResponse: responseText,
          },
        };
      }
    }

    console.log("Parsed Analysis Data:", analysisData);

    // Save to user profile if user exists

    return res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: analysisData,
    });
  } catch (error) {
    console.error("Error in resume analysis:", error);
    return res.status(500).json({
      message: "Failed to analyze resume",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

exports.getUserResumeAnalyses = async (req, res) => {
  try {
    const currUser = await user.findById(req.user.id);
    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ analyses: currUser.resumeAnalyses || [] });
  } catch (error) {
    console.error("Error fetching resume analyses:", error);
    return res.status(500).json({
      message: "Failed to fetch analyses",
      error: error.message,
    });
  }
};

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const { resumeName, templateName, resumeData } = req.body;

    if (!resumeName || !templateName || !resumeData) {
      return res.status(400).json({
        message: "Resume name, template name, and resume data are required",
      });
    }

    // Check if resume with same name already exists for this user
    const existingResume = await Resume.findOne({
      userId: req.user.id,
      resumeName: resumeName,
    });

    if (existingResume) {
      return res.status(400).json({
        message:
          "A resume with this name already exists. Please choose a different name.",
      });
    }

    const newResume = new Resume({
      userId: req.user.id,
      resumeName,
      templateName,
      ...resumeData,
    });

    await newResume.save();

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume.getSummary ? newResume.getSummary() : newResume,
    });
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
};

// Get all resumes for a user
exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({
      lastModified: -1,
    });

    return res.status(200).json({
      message: "Resumes fetched successfully",
      resumes,
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return res.status(500).json({
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }
};

// Get a specific resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume fetched successfully",
      resume,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).json({
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};

// Update a resume
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { resumeName, templateName, resumeData } = req.body;

    const resume = await Resume.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // Check if new name conflicts with existing resumes (excluding current)
    if (resumeName && resumeName !== resume.resumeName) {
      const existingResume = await Resume.findOne({
        userId: req.user.id,
        resumeName: resumeName,
        _id: { $ne: id },
      });

      if (existingResume) {
        return res.status(400).json({
          message:
            "A resume with this name already exists. Please choose a different name.",
        });
      }
    }

    // Update fields
    if (resumeName) resume.resumeName = resumeName;
    if (templateName) resume.templateName = templateName;
    if (resumeData) {
      Object.assign(resume, resumeData);
    }

    await resume.save();

    return res.status(200).json({
      message: "Resume updated successfully",
      resume: resume.getSummary ? resume.getSummary() : resume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).json({
      message: "Failed to update resume",
      error: error.message,
    });
  }
};

// Delete a resume
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return res.status(500).json({
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};
