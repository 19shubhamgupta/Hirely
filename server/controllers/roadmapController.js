const { GoogleGenerativeAI } = require("@google/generative-ai");
const user = require("../models/user");

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY"
);

exports.generateRoadmap = async (req, res) => {
  try {
    const courseData = req.body;
    console.log("Received course data:", courseData);

    // Extract relevant course information
    const { title, description, skills, level } = courseData;

    // Create a prompt for Gemini API
    const prompt = `
    Generate a detailed course roadmap for a ${level} level course titled "${title}".
    
    Course description: ${description}
    
    Skills covered: ${skills.join(", ")}
    
    Format the response as a JSON array of steps, where each step has:
    - an id (numerical)
    - a title (string, maximum 3 words)
    - chapters (an array of sub-topics)
      - each chapter has an id (can be decimal like 1.1) and a title
      
    The number of steps and chapters should be decided by you based on the course content.
    The content should be educational, well-structured, and specifically tailored to the ${level} level.
    
    Example format:
    [
      {
        "id": 1,
        "title": "Course Overview",
        "chapters": [
          {
            "id": 1.1,
            "title": "Introduction to Course"
          },
          {
            "id": 1.2,
            "title": "Getting Started with Development"
          }
        ]
      },
      ...
    ]
    
    Only respond with the JSON array, no additional text.
    `;

    // Call Gemini API to generate roadmap
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Parse the response as JSON
    let roadmapSteps;
    try {
      // Try to parse the full response
      roadmapSteps = JSON.parse(responseText);
    } catch (error) {
      // If parsing fails, try to extract JSON using regex
      const jsonMatch = responseText.match(/\[\s*{[\s\S]*}\s*\]/);
      if (jsonMatch) {
        roadmapSteps = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse Gemini API response");
      }
    }

    // Return the generated roadmap
    const idGenrator = () => {
      return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };
    let roadmap = {
      id: idGenrator(),
      title: title,
      steps: roadmapSteps,
    };

    const currUser = await user.findById(req.user.id);
    currUser.roadmapsCreated.push(roadmap);
    await currUser.save();

    console.log("Generated roadmap :", roadmap);

    return res.status(200).json({
      message: "Roadmap generated successfully",
      roadmap: roadmap,
      courseData,
    });
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return res.status(500).json({
      message: "Failed to generate roadmap",
      error: error.message,
    });
  }
};

exports.getUserroadmaps = async (req, res) => {
  try {
    const currUser = await user.findById(req.user.id);
    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      roadmaps: currUser.roadmapsCreated,
    });
  } catch (error) {
    console.error("Error fetching user roadmaps:", error);
    return res.status(500).json({
      message: "Failed to fetch user roadmaps",
      error: error.message,
    });
  }
};

exports.generateChapter = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a prompt for Gemini API to generate course content with YouTube search suggestions
    const prompt = `You are an expert programming instructor. Generate a comprehensive course chapter about "${title}".

Description: ${description}

Respond ONLY with a valid JSON object in this exact format, with no additional text or explanation:
{
  "title": "A clear, concise title",
  "videoSearchQuery": "best tutorial ${title} programming beginners",
  "sections": [
    {
      "title": "Introduction and Overview",
      "content": "<div class='section-content'><h2>What is [Topic]</h2><p>Comprehensive introduction with clear explanations...</p><h3>Why Learn This?</h3><p>Practical applications and importance...</p><h3>Prerequisites</h3><ul><li>Required knowledge point 1</li><li>Required knowledge point 2</li></ul></div>"
    },
    {
      "title": "Core Concepts",
      "content": "<div class='section-content'><h2>Key Principles</h2><p>Detailed explanation of main concepts...</p><h3>Important Features</h3><ul><li>Feature 1 with explanation</li><li>Feature 2 with explanation</li></ul><h3>Code Examples</h3><code>// Example code with comments\\ncode line 1;\\ncode line 2;</code><h3>Best Practices</h3><ul><li>Best practice 1</li><li>Best practice 2</li></ul></div>"
    },
    {
      "title": "Practical Implementation",
      "content": "<div class='section-content'><h2>Step-by-Step Guide</h2><ol><li>Detailed step one</li><li>Detailed step two</li></ol><h3>Common Pitfalls</h3><ul><li>Pitfall 1 and how to avoid it</li><li>Pitfall 2 and how to avoid it</li></ul><h3>Real-World Examples</h3><p>Practical application scenarios...</p></div>"
    }
  ],
  "resources": [
    {
      "title": "Official Documentation",
      "url": "https://relevant-docs-url",
      "description": "Comprehensive official documentation and guides"
    },
    {
      "title": "Practice Exercises",
      "url": "https://practice-exercises-url",
      "description": "Interactive exercises and problems to solve"
    },
    {
      "title": "Additional Learning Resources",
      "url": "https://additional-resources-url",
      "description": "Supplementary materials, tutorials, and articles"
    }
  ],
  "gameData": {
    "conceptMatcher": [
      {
        "term": "Short concept name",
        "definition": "Clear, concise definition in 10-15 words"
      },
      {
        "term": "Another concept",
        "definition": "Brief explanation of the concept"
      },
      {
        "term": "Key term",
        "definition": "Simple definition for matching game"
      },
      {
        "term": "Important concept",
        "definition": "Easy to understand definition"
      },
      {
        "term": "Core principle",
        "definition": "Straightforward explanation"
      }
    ]
  }
}

Rules:
1. Use only ASCII characters in the JSON
2. Escape all quotes properly
3. Use only basic HTML tags in content
4. No markdown or complex formatting
5. URLs must be valid HTTPS links
6. No line breaks in strings (use <br> tags instead)
7. Maximum 3 sections
8. Maximum 3 resources
9. Generate exactly 5 concept-definition pairs for the game
10. Keep definitions concise (10-15 words) for better gameplay
11. Terms should be 1-3 words maximum
12. Definitions should be clear and distinct from each other`;

    // Call Gemini API to generate course content
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    console.log("Generating chapter for:", { title, description });
    console.log("Raw response from Gemini:", responseText);

    // Clean and parse the response as JSON
    let courseContent;
    try {
      // Clean the response text
      let cleanText = responseText
        .replace(/[\u0000-\u001F]+/g, "") // Remove control characters
        .replace(/\\n/g, "\\n") // Preserve newlines
        .replace(/\\'/g, "\\'") // Preserve quotes
        .replace(/\\"/g, '\\"') // Preserve double quotes
        .replace(/\\&/g, "\\&") // Preserve ampersands
        .replace(/\\r/g, "\\r") // Preserve carriage returns
        .replace(/\\t/g, "\\t") // Preserve tabs
        .replace(/\\b/g, "\\b") // Preserve backspace
        .replace(/\\f/g, "\\f"); // Preserve form feed

      // Try to find and parse only the JSON object
      const jsonMatch = cleanText.match(/{[\s\S]*}/);
      if (jsonMatch) {
        courseContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON object found in response");
      }
    } catch (error) {
      console.error("JSON parsing error:", error);
      throw new Error("Failed to parse Gemini API response: " + error.message);
    }

    // Validate the structure and content quality
    if (
      !courseContent.title ||
      !courseContent.sections ||
      !Array.isArray(courseContent.sections)
    ) {
      throw new Error("Invalid course content structure");
    }

    // Ensure we have enough content
    for (const section of courseContent.sections) {
      if (!section.content || section.content.length < 200) {
        // Minimum content length
        throw new Error(
          "Section content is too brief. Requesting regeneration."
        );
      }
    }

    // Ensure we have enough sections
    if (courseContent.sections.length < 2) {
      throw new Error(
        "Not enough sections generated. Requesting regeneration."
      );
    }

    // Search for a relevant YouTube video
    // In a production environment, you would use the YouTube Data API
    // For now, we'll construct a YouTube search URL
    const videoSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      courseContent.videoSearchQuery
    )}`;

    // Get a default video ID for the topic
    // In production, you would use the YouTube Data API to get the most relevant video
    const defaultVideoIds = {
      java: "eIrMbAQSU34",
      python: "kqtD5dpn9C8",
      javascript: "PkZNo7MFNFg",
      react: "w7ejDZ8SWv8",
      // Add more default video IDs for common topics
    };

    const searchTermLower = courseContent.videoSearchQuery.toLowerCase();
    let videoId = "eIrMbAQSU34"; // Default to Java tutorial if no match

    for (const [topic, id] of Object.entries(defaultVideoIds)) {
      if (searchTermLower.includes(topic)) {
        videoId = id;
        break;
      }
    }

    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;

    console.log("Generated course content:", {
      title: courseContent.title,
      videoUrl,
      sectionsCount: courseContent.sections.length,
      resourcesCount: courseContent.resources?.length || 0,
    });

    console.log("Game data:", courseContent.gameData?.conceptMatcher);

    // Return the generated course content
    return res.status(200).json({
      title: courseContent.title,
      videoUrl,
      sections: courseContent.sections,
      resources: courseContent.resources,
      gameData: courseContent.gameData,
    });
  } catch (error) {
    console.error("Error generating chapter:", error);
    return res.status(500).json({
      message: "Failed to generate chapter content",
      error: error.message,
    });
  }
};
