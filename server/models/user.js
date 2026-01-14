const mongoose = require("mongoose");

const userSchemsa = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Not required for Google OAuth users
    },
    profilePicture: {
      type: String,
      default: "/images/defaultProfilePic",
    },
    loginSource: {
      type: String,
      enum: ["resume-builder", "google", "github"],
      default: "resume-builder",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values but ensures uniqueness when present
    },
    roadmapsCreated: {
      type: [Object],
      default: [],
    },
    bookmarks:{
      type: [String],
      dafault: [],
    },
    reportSchemas: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Report" 
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchemsa);
