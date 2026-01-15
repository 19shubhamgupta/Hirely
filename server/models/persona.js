const mongoose = require("mongoose");

const personaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personaName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    templateName: {
      type: String,
      required: true,
      enum: [
        "professional",
        "creative",
        "technical",
        "leadership",
        "entrepreneur",
      ],
      default: "professional",
    },
    // Professional Profile Data
    professionalTitle: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
    },
    specializations: [
      {
        type: String,
        trim: true,
        maxlength: 100,
      },
    ],
    keySkills: [
      {
        type: String,
        trim: true,
        maxlength: 100,
      },
    ],
    achievements: [
      {
        type: String,
        trim: true,
        maxlength: 500,
      },
    ],
    industryExpertise: [
      {
        type: String,
        trim: true,
        maxlength: 100,
      },
    ],
    careerGoals: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    // AI Generated Summary
    personaSummary: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    professionalProfile: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    uniqueValue: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    recommendations: [
      {
        type: String,
        trim: true,
        maxlength: 500,
      },
    ],
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
personaSchema.index({ userId: 1, personaName: 1 });
personaSchema.index({ userId: 1, templateName: 1 });
personaSchema.index({ userId: 1, lastModified: -1 });

// Middleware to update lastModified on save
personaSchema.pre("save", function (next) {
  if (this.isModified() && !this.isNew) {
    this.lastModified = new Date();
  }
  next();
});

// Virtual for persona preview URL
personaSchema.virtual("previewUrl").get(function () {
  return `/persona/preview/${this._id}`;
});

// Method to get persona summary
personaSchema.methods.getSummary = function () {
  return {
    id: this._id,
    personaName: this.personaName,
    templateName: this.templateName,
    professionalTitle: this.professionalTitle,
    yearsOfExperience: this.yearsOfExperience,
    personaSummary: this.personaSummary,
    lastModified: this.lastModified,
    createdAt: this.createdAt,
  };
};

// Static method to find personas by user
personaSchema.statics.findByUser = function (userId) {
  return this.find({ userId }).sort({ lastModified: -1 });
};

// Static method to find personas by template
personaSchema.statics.findByTemplate = function (userId, templateName) {
  return this.find({ userId, templateName }).sort({ lastModified: -1 });
};

module.exports = mongoose.model("Persona", personaSchema);
