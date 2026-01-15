// personaController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Persona = require("../models/persona");
const Resume = require("../models/resume");
const User = require("../models/user");

// Initialize Google Generative AI
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate persona summary using Gemini AI
exports.generatePersonaSummary = async (req, res) => {
  try {
    const {
      personaName,
      professionalTitle,
      yearsOfExperience,
      specializations,
      keySkills,
      achievements,
      industryExpertise,
      careerGoals,
      templateName,
    } = req.body;

    // Validate required fields
    if (!personaName || !professionalTitle || !templateName) {
      return res.status(400).json({
        message:
          "Persona name, professional title, and template name are required",
      });
    }

    // Create a detailed prompt for Gemini
    const prompt = `You are a professional career coach and personal branding expert. Based on the following professional profile, generate a compelling and professional career persona that highlights the person's unique value proposition and professional identity.

Professional Profile:
- Name: ${personaName}
- Professional Title: ${professionalTitle}
- Years of Experience: ${yearsOfExperience || "Not specified"}
- Specializations: ${
      Array.isArray(specializations)
        ? specializations.join(", ")
        : "Not specified"
    }
- Key Skills: ${
      Array.isArray(keySkills) ? keySkills.join(", ") : "Not specified"
    }
- Achievements: ${
      Array.isArray(achievements) ? achievements.join("; ") : "Not specified"
    }
- Industry Expertise: ${
      Array.isArray(industryExpertise)
        ? industryExpertise.join(", ")
        : "Not specified"
    }
- Career Goals: ${careerGoals || "Not specified"}

Please provide:
1. A professional persona summary (2-3 paragraphs) that captures their professional identity
2. Their unique value proposition (1 paragraph)
3. Key recommendations for personal branding (3-4 bullet points)

Format the response in JSON with keys: "personaSummary", "uniqueValue", "recommendations" (array of strings)`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the response
    let aiResponse = {};
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiResponse = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON found, create structured response from text
        aiResponse = {
          personaSummary: responseText,
          uniqueValue: "",
          recommendations: [],
        };
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      aiResponse = {
        personaSummary: responseText,
        uniqueValue: "",
        recommendations: [],
      };
    }

    return res.status(200).json({
      message: "Persona summary generated successfully",
      summary: aiResponse,
    });
  } catch (error) {
    console.error("Error generating persona summary:", error);
    return res.status(500).json({
      message: "Failed to generate persona summary",
      error: error.message,
    });
  }
};

// Create persona from resume using Gemini AI analysis
exports.createPersonaFromResume = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        message: "Resume ID is required",
      });
    }

    // Fetch the resume
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // Calculate years of experience
    const workExperience = resume.workExperience || [];
    let yearsOfExperience = 0;
    if (workExperience.length > 0) {
      const startDates = workExperience
        .map((job) => new Date(job.startDate).getFullYear())
        .filter((year) => !isNaN(year));
      if (startDates.length > 0) {
        const earliestYear = Math.min(...startDates);
        yearsOfExperience = new Date().getFullYear() - earliestYear;
      }
    }

    // Extract key information from resume
    const skills = resume.skills || [];
    const achievements = workExperience
      .map((job) => job.description)
      .filter((desc) => desc && desc.trim());
    const specializations = resume.education
      .map((edu) => edu.field)
      .filter((field) => field && field.trim());

    // Create prompt for Gemini to analyze resume
    const prompt = `You are a professional career coach and personal branding expert. Based on the following resume information, extract and generate a professional career persona with the following details:

RESUME INFORMATION:
Name: ${resume.personalInfo.fullName}
Current Job Title: ${resume.personalInfo.jobTitle || "Not specified"}
Email: ${resume.personalInfo.email || "Not specified"}
Location: ${resume.personalInfo.location || "Not specified"}
Professional Objective: ${resume.personalInfo.objective || "Not specified"}

Work Experience:
${
  workExperience
    .map(
      (job, i) =>
        `${i + 1}. ${job.position} at ${job.company} (${job.startDate} - ${
          job.endDate
        })
   Description: ${job.description}`
    )
    .join("\n") || "No work experience provided"
}

Education:
${
  resume.education
    .map(
      (edu, i) =>
        `${i + 1}. ${edu.degree} in ${edu.field} from ${edu.institution}`
    )
    .join("\n") || "No education provided"
}

Skills: ${skills.join(", ") || "Not specified"}

Years of Experience: ${yearsOfExperience}

Please analyze this resume and generate the following in JSON format:
1. "personaName" - A professional persona name (e.g., "Senior Tech Leader")
2. "professionalTitle" - Current professional title from resume
3. "yearsOfExperience" - Number of years in the field
4. "specializations" - Array of 3-5 key specializations based on education and experience
5. "keySkills" - Array of 5-7 key skills from resume
6. "achievements" - Array of 3-5 major achievements from work experience
7. "industryExpertise" - Array of 3-4 industries they have experience in
8. "careerGoals" - A brief statement of career goals based on their trajectory
9. "personaSummary" - A compelling 2-3 paragraph professional summary
10. "uniqueValue" - Their unique value proposition (1 paragraph)
11. "recommendations" - Array of 3-4 personal branding recommendations

Return ONLY valid JSON, no additional text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the response
    let personaData = {};
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        personaData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return res.status(500).json({
        message: "Failed to parse AI response",
        error: parseError.message,
      });
    }

    return res.status(200).json({
      message: "Persona data extracted from resume successfully",
      personaData: {
        personaName: personaData.personaName || "",
        professionalTitle:
          personaData.professionalTitle || resume.personalInfo.jobTitle || "",
        yearsOfExperience: personaData.yearsOfExperience || yearsOfExperience,
        specializations: personaData.specializations || specializations,
        keySkills: personaData.keySkills || skills,
        achievements: personaData.achievements || achievements,
        industryExpertise: personaData.industryExpertise || [],
        careerGoals: personaData.careerGoals || "",
        personaSummary: personaData.personaSummary || "",
        uniqueValue: personaData.uniqueValue || "",
        recommendations: personaData.recommendations || [],
      },
    });
  } catch (error) {
    console.error("Error creating persona from resume:", error);
    
    // Check if it's a quota error
    if (error.message && error.message.includes("429")) {
      return res.status(429).json({
        message: "API quota exceeded. Please try again in a few minutes or upgrade your plan.",
        error: "Rate limit exceeded",
      });
    }
    
    return res.status(500).json({
      message: "Failed to create persona from resume",
      error: error.message,
    });
  }
};

// Create a new persona
exports.createPersona = async (req, res) => {
  try {
    const { personaName, templateName, ...personaData } = req.body;

    if (!personaName || !templateName) {
      return res.status(400).json({
        message: "Persona name and template name are required",
      });
    }

    // Check if persona with same name already exists for this user
    const existingPersona = await Persona.findOne({
      userId: req.user.id,
      personaName: personaName,
    });

    if (existingPersona) {
      return res.status(400).json({
        message:
          "A persona with this name already exists. Please choose a different name.",
      });
    }

    const newPersona = new Persona({
      userId: req.user.id,
      personaName,
      templateName,
      ...personaData,
    });

    await newPersona.save();

    return res.status(201).json({
      message: "Persona created successfully",
      persona: newPersona.getSummary ? newPersona.getSummary() : newPersona,
    });
  } catch (error) {
    console.error("Error creating persona:", error);
    return res.status(500).json({
      message: "Failed to create persona",
      error: error.message,
    });
  }
};

// Get all personas for a user
exports.getUserPersonas = async (req, res) => {
  try {
    const personas = await Persona.find({ userId: req.user.id }).sort({
      lastModified: -1,
    });

    return res.status(200).json({
      message: "Personas fetched successfully",
      personas,
    });
  } catch (error) {
    console.error("Error fetching personas:", error);
    return res.status(500).json({
      message: "Failed to fetch personas",
      error: error.message,
    });
  }
};

// Get a specific persona by ID
exports.getPersonaById = async (req, res) => {
  try {
    const { id } = req.params;

    const persona = await Persona.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!persona) {
      return res.status(404).json({
        message: "Persona not found",
      });
    }

    return res.status(200).json({
      message: "Persona fetched successfully",
      persona,
    });
  } catch (error) {
    console.error("Error fetching persona:", error);
    return res.status(500).json({
      message: "Failed to fetch persona",
      error: error.message,
    });
  }
};

// Update a persona
exports.updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { personaName, templateName, ...personaData } = req.body;

    const persona = await Persona.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!persona) {
      return res.status(404).json({
        message: "Persona not found",
      });
    }

    // Check if new name conflicts with existing personas (excluding current)
    if (personaName && personaName !== persona.personaName) {
      const existingPersona = await Persona.findOne({
        userId: req.user.id,
        personaName: personaName,
        _id: { $ne: id },
      });

      if (existingPersona) {
        return res.status(400).json({
          message:
            "A persona with this name already exists. Please choose a different name.",
        });
      }
    }

    // Update fields
    if (personaName) persona.personaName = personaName;
    if (templateName) persona.templateName = templateName;
    if (Object.keys(personaData).length > 0) {
      Object.assign(persona, personaData);
    }

    await persona.save();

    return res.status(200).json({
      message: "Persona updated successfully",
      persona: persona.getSummary ? persona.getSummary() : persona,
    });
  } catch (error) {
    console.error("Error updating persona:", error);
    return res.status(500).json({
      message: "Failed to update persona",
      error: error.message,
    });
  }
};

// Delete a persona
exports.deletePersona = async (req, res) => {
  try {
    const { id } = req.params;

    const persona = await Persona.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!persona) {
      return res.status(404).json({
        message: "Persona not found",
      });
    }

    return res.status(200).json({
      message: "Persona deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting persona:", error);
    return res.status(500).json({
      message: "Failed to delete persona",
      error: error.message,
    });
  }
};
