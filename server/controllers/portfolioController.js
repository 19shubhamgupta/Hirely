const User = require("../models/user");
const Resume = require("../models/resume");
const Portfolio = require("../models/portfolio");
const cloudinary = require("../lib/cloudinary");

// Generate unique slug from fullname
const generateSlug = (name) => {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomSuffix}`;
};

// Get all projects from user's resumes
const getProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all resumes for this user
    const resumes = await Resume.find({ userId }).select(
      "personalInfo projects skills"
    );

    // Compile unique projects from all resumes
    const allProjects = [];
    const allSkills = new Set();
    let personalInfo = null;

    resumes.forEach((resume) => {
      // Get projects
      if (resume.projects && resume.projects.length > 0) {
        resume.projects.forEach((project) => {
          if (project.name && project.name.trim()) {
            allProjects.push({
              id: project.id || project._id,
              name: project.name,
              date: project.date || "",
              description: project.description || "",
              image: null,
              link: "",
              github: "",
              technologies: [],
            });
          }
        });
      }

      // Get skills
      if (resume.skills && resume.skills.length > 0) {
        resume.skills.forEach((skill) => allSkills.add(skill));
      }

      // Get personal info
      if (resume.personalInfo && resume.personalInfo.fullName) {
        personalInfo = resume.personalInfo;
      }
    });

    // Remove duplicate projects by name
    const uniqueProjects = allProjects.filter(
      (project, index, self) =>
        index === self.findIndex((p) => p.name === project.name)
    );

    res.json({
      success: true,
      projects: uniqueProjects,
      skills: Array.from(allSkills),
      personalInfo,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Create portfolio with projects and images
const createPortfolio = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projects, skills, title, bio, socialLinks } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if portfolio already exists
    const existingPortfolio = await Portfolio.findOne({ userId });
    if (existingPortfolio) {
      return res.status(400).json({
        error: "Portfolio already exists",
        slug: existingPortfolio.slug,
      });
    }

    // Generate unique slug
    const slug = generateSlug(user.fullname);

    // Create portfolio
    const portfolio = new Portfolio({
      userId,
      slug,
      title: title || `${user.fullname}'s Portfolio`,
      bio: bio || "",
      projects: projects || [],
      skills: skills || [],
      socialLinks: socialLinks || {},
    });

    await portfolio.save();

    // Update user with portfolio slug
    user.portfolioSlug = slug;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      slug,
      portfolio,
    });
  } catch (error) {
    console.error("Create Portfolio Error:", error);
    res.status(500).json({ error: "Failed to create portfolio" });
  }
};

// Upload project image
const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload to cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio-projects",
          transformation: [
            { width: 800, height: 600, crop: "limit" },
            { quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    res.json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Upload Image Error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

// Get portfolio by slug (public)
const getPortfolioBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find portfolio by slug
    const portfolio = await Portfolio.findOne({ slug }).populate(
      "userId",
      "fullname email profilePicture"
    );

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.json({
      success: true,
      portfolio: {
        ...portfolio.toObject(),
        user: {
          fullname: portfolio.userId.fullname,
          email: portfolio.userId.email,
          profilePicture: portfolio.userId.profilePicture,
        },
      },
    });
  } catch (error) {
    console.error("Get Portfolio Error:", error);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
};

// Get my portfolio
const getMyPortfolio = async (req, res) => {
  try {
    const userId = req.user._id;
    const portfolio = await Portfolio.findOne({ userId });
    const user = await User.findById(userId).select("portfolioSlug");

    res.json({
      success: true,
      slug: user?.portfolioSlug || null,
      portfolio: portfolio || null,
    });
  } catch (error) {
    console.error("Get My Portfolio Error:", error);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
};

// Update portfolio
const updatePortfolio = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projects, skills, title, bio, socialLinks } = req.body;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    // Update fields
    if (projects) portfolio.projects = projects;
    if (skills) portfolio.skills = skills;
    if (title) portfolio.title = title;
    if (bio !== undefined) portfolio.bio = bio;
    if (socialLinks) portfolio.socialLinks = socialLinks;

    await portfolio.save();

    res.json({
      success: true,
      message: "Portfolio updated successfully",
      portfolio,
    });
  } catch (error) {
    console.error("Update Portfolio Error:", error);
    res.status(500).json({ error: "Failed to update portfolio" });
  }
};

module.exports = {
  getProjects,
  createPortfolio,
  uploadProjectImage,
  getPortfolioBySlug,
  getMyPortfolio,
  updatePortfolio,
};
