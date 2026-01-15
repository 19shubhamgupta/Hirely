// InterviewDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const InterviewDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);

  // Mock interviews
  const predefinedInterviews = [
    {
      id: 1,
      title: "Frontend Developer",
      role: "React Developer",
      experience: "Mid-level",
      time: "15-20 mins",
      description:
        "A comprehensive interview focusing on React fundamentals, state management, and modern frontend development practices.",
      skills: ["React", "JavaScript", "CSS", "Redux", "TypeScript"],
      difficulty: "Intermediate",
      preparationTips: [
        "Review React hooks and lifecycle methods",
        "Practice component architecture patterns",
        "Brush up on JavaScript fundamentals",
        "Prepare examples of state management solutions",
      ],
      process: [
        "Introduction and background questions",
        "Technical concepts discussion",
      ],
    },
    {
      id: 2,
      title: "Data Scientist",
      role: "Machine Learning Engineer",
      experience: "Senior",
      time: "15-20 mins",
      description:
        "An advanced interview covering machine learning algorithms, statistical analysis, and real-world data science problems.",
      skills: [
        "Python",
        "Machine Learning",
        "Statistics",
        "Data Visualization",
        "SQL",
      ],
      difficulty: "Advanced",
      preparationTips: [
        "Review core ML algorithms and their applications",
        "Prepare to discuss past projects in detail",
        "Brush up on statistical concepts",
        "Practice explaining complex concepts simply",
      ],
      process: [
        "Introduction and experience discussion",
        "ML theory and concepts",
      ],
    },
    {
      id: 3,
      title: "UX Designer",
      role: "Product Designer",
      experience: "Junior",
      time: "15-20 mins",
      description:
        "A foundational interview assessing design thinking, user research methodologies, and portfolio presentation skills.",
      skills: [
        "Figma",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
      difficulty: "Beginner",
      preparationTips: [
        "Prepare your portfolio with 2-3 case studies",
        "Practice explaining your design process",
        "Review basic UX principles and methodologies",
        "Be ready to discuss user research techniques",
      ],
      process: [
        "Introduction and background questions",
        "Design concepts discussion",
      ],
    },
    {
      id: 4,
      title: "Backend Engineer",
      role: "Node.js Developer",
      experience: "Mid-level",
      time: "15-20 mins",
      description:
        "A technical interview focusing on server-side development, API design, database management, and system architecture.",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Docker"],
      difficulty: "Intermediate",
      preparationTips: [
        "Review Node.js core concepts and event loop",
        "Practice API design principles",
        "Brush up on database optimization techniques",
        "Prepare examples of error handling and logging",
      ],
      process: [
        "Introduction and background questions",
        "Technical concepts discussion",
      ],
    },
    {
      id: 5,
      title: "DevOps Specialist",
      role: "Cloud Engineer",
      experience: "Senior",
      time: "15-20 mins",
      description:
        "An infrastructure-focused interview covering cloud services, CI/CD pipelines, containerization, and system reliability.",
      skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Monitoring"],
      difficulty: "Advanced",
      preparationTips: [
        "Review cloud architecture patterns",
        "Prepare to discuss CI/CD pipeline implementations",
        "Brush up on container orchestration concepts",
        "Practice explaining infrastructure as code",
      ],
      process: [
        "Introduction and background questions",
        "Technical concepts discussion",
      ],
    },
    {
      id: 6,
      title: "Product Manager",
      role: "Technical Product Manager",
      experience: "Senior",
      time: "15-20 mins",
      description:
        "A strategic interview assessing product vision, stakeholder management, prioritization frameworks, and technical understanding.",
      skills: [
        "Product Strategy",
        "Roadmapping",
        "Stakeholder Management",
        "Data Analysis",
        "Agile Methodology",
      ],
      difficulty: "Advanced",
      preparationTips: [
        "Prepare case studies of successful product launches",
        "Review prioritization frameworks (RICE, Kano, etc.)",
        "Practice explaining technical concepts to non-technical audiences",
        "Brush up on metrics and KPIs for product success",
      ],
      process: [
        "Introduction and background questions",
        "Product strategy discussion",
      ],
    },
  ];

  useEffect(() => {
    const foundInterview = predefinedInterviews.find(
      (item) => item.id === parseInt(id)
    );
    setInterview(foundInterview);
    setIsLoading(false);
  }, [id]);

  const handleStartInterview = async () => {
    if (!interview) return;
    setIsStarting(true);

    try {
      // 1. Request backend to start interview and generate questions
      const { data } = await axiosInstance.post("/interview/start", {
        interviewId: interview.id,
        title: interview.title,
        role: interview.role,
        experience: interview.experience,
        skills: interview.skills,
        difficulty: interview.difficulty,
      });

      // 2. If backend immediately returns questions → go to room
      if (data.questions && data.questions.length > 0) {
        navigate("/room", {
          state: { interviewDetails: interview, questions: data.questions },
        });
        return;
      }

      // 3. Otherwise, poll interview status endpoint
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const maxAttempts = 20;
      let attempts = 0;
      let questions = null;

      while (attempts < maxAttempts && !questions) {
        attempts++;
        const statusRes = await axiosInstance.get(
          `/interview/status/${interview.id}`
        );
        const { status, questions: readyQuestions, error } = statusRes.data;

        if (status === "ready" && readyQuestions?.length > 0) {
          questions = readyQuestions;
          break;
        }
        if (status === "error")
          throw new Error(error || "Failed to generate questions");

        await delay(2000); // wait 2s before retry
      }

      if (!questions) {
        throw new Error(
          "Questions generation took too long. Please try again."
        );
      }

      // ✅ Navigate to interview room
      navigate("/room", {
        state: { interviewDetails: interview, questions },
      });
    } catch (err) {
      console.error("Error starting interview:", err);
      toast.error(err.message || "Failed to start interview.");
    } finally {
      setIsStarting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-gray-600">Loading interview details...</p>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-red-500">Interview not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition-colors"
          >
            ← Back to Interviews
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {interview.title}
              </h1>
              <p className="text-gray-600 text-lg">{interview.role}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {interview.experience}
            </span>
          </div>
        </header>

        {/* Overview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Interview Overview
            </h2>
            <p className="text-gray-600 mb-6">{interview.description}</p>
          </div>

          {/* Skills */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Skills Assessed
            </h2>
            <div className="flex flex-wrap gap-2">
              {interview.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Interview Process
            </h2>
            <ol className="list-decimal ml-6 space-y-1 text-gray-600">
              {interview.process.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Preparation Tips */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Preparation Tips
            </h2>
            <ul className="list-disc ml-6 text-gray-600 space-y-1">
              {interview.preparationTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleStartInterview}
            disabled={isStarting}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
          >
            {isStarting ? "Preparing Interview..." : "Start Interview Now"}
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Estimated time: {interview.time} • AI-powered interview
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailsPage;
