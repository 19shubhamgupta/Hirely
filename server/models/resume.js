const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    templateName: {
      type: String,
      required: true,
      enum: [
        "template1", // Classic Professional
        "template2", // Modern Clean
        "template3", // Creative Modern
        "template4", // Minimalist Black & White
        "template5", // Two Column Layout
        "template6", // Modern Tech
        "template7", // Corporate Executive
      ],
      default: "template1",
    },
    personalInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      jobTitle: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: 100,
      },
      phone: {
        type: String,
        trim: true,
        maxlength: 20,
      },
      website: {
        type: String,
        trim: true,
        maxlength: 200,
      },
      location: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      objective: {
        type: String,
        trim: true,
        maxlength: 1000,
      },
    },
    workExperience: [
      {
        id: {
          type: Number,
          required: true,
        },
        company: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        position: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        startDate: {
          type: String,
          trim: true,
          maxlength: 20,
        },
        endDate: {
          type: String,
          trim: true,
          maxlength: 20,
        },
        description: {
          type: String,
          trim: true,
          maxlength: 1000,
        },
      },
    ],
    education: [
      {
        id: {
          type: Number,
          required: true,
        },
        institution: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        degree: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        field: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        startDate: {
          type: String,
          trim: true,
          maxlength: 20,
        },
        endDate: {
          type: String,
          trim: true,
          maxlength: 20,
        },
        gpa: {
          type: String,
          trim: true,
          maxlength: 10,
        },
        additionalInfo: {
          type: String,
          trim: true,
          maxlength: 500,
        },
      },
    ],
    projects: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        date: {
          type: String,
          trim: true,
          maxlength: 20,
        },
        description: {
          type: String,
          trim: true,
          maxlength: 1000,
        },
      },
    ],
    skills: [
      {
        type: String,
        trim: true,
        maxlength: 50,
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

// Index for better query performance
resumeSchema.index({ userId: 1, resumeName: 1 });
resumeSchema.index({ userId: 1, templateName: 1 });
resumeSchema.index({ userId: 1, lastModified: -1 });

// Middleware to update lastModified on save
resumeSchema.pre("save", function (next) {
  if (this.isModified() && !this.isNew) {
    this.lastModified = new Date();
  }
  next();
});

// Virtual for resume preview URL (if needed)
resumeSchema.virtual("previewUrl").get(function () {
  return `/resume/preview/${this._id}`;
});

// Method to get resume summary
resumeSchema.methods.getSummary = function () {
  return {
    id: this._id,
    resumeName: this.resumeName,
    templateName: this.templateName,
    fullName: this.personalInfo.fullName,
    jobTitle: this.personalInfo.jobTitle,
    lastModified: this.lastModified,
    createdAt: this.createdAt,
  };
};

// Static method to find resumes by user
resumeSchema.statics.findByUser = function (userId) {
  return this.find({ userId }).sort({ lastModified: -1 });
};

// Static method to find resumes by template
resumeSchema.statics.findByTemplate = function (userId, templateName) {
  return this.find({ userId, templateName }).sort({ lastModified: -1 });
};

module.exports = mongoose.model("Resume", resumeSchema);
