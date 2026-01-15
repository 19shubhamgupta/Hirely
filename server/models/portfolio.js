const mongoose = require("mongoose");

const portfolioProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  date: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  image: {
    type: String, // Cloudinary URL
    default: null,
  },
  link: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  github: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  technologies: [
    {
      type: String,
      trim: true,
    },
  ],
});

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "My Portfolio",
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    projects: [portfolioProjectSchema],
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
    theme: {
      type: String,
      enum: ["dark", "light", "gradient"],
      default: "dark",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster slug lookup
portfolioSchema.index({ slug: 1 });
portfolioSchema.index({ userId: 1 });

module.exports = mongoose.model("Portfolio", portfolioSchema);
