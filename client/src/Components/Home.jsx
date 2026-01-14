import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const createResumeHandler = () => {
   navigate('/resume-builder');
  }
  const generateResumeHandler = () => {
    navigate('/tailorinput');
  }
  
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-spin-slow"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-float delay-300"></div>
        <div className="absolute top-40 right-40 w-6 h-6 bg-purple-400 rounded-full animate-float delay-700"></div>
        <div className="absolute bottom-40 left-40 w-5 h-5 bg-pink-400 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-green-400 rounded-full animate-float delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-gradient">
                Build Your
                <br />
                <span className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-gradient">
                  Dream Resume
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-expand"></div>
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl animate-fade-in-up delay-300">
                Create professional, ATS-friendly resumes with our AI-powered
                builder. Stand out from the crowd and land your dream job.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-500">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-pulse-subtle"
              onClick={createResumeHandler}
              >
                <span className="relative z-10">Start Building Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </button>

              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-purple-400 hover:text-purple-600 transform hover:-translate-y-1 transition-all duration-300"
              onClick={generateResumeHandler}>
                Generate
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start animate-fade-in-up delay-700">
              <div className="text-center animate-count-up">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-500">Resumes Created</div>
              </div>
              <div className="text-center animate-count-up delay-200">
                <div className="text-3xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
              <div className="text-center animate-count-up delay-400">
                <div className="text-3xl font-bold text-pink-600">5★</div>
                <div className="text-sm text-gray-500">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Resume Mockup */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center animate-fade-in-up delay-300">
            <div className="relative">
              {/* Main Resume Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 h-96 transform rotate-3 hover:rotate-0 transition-transform duration-500 animate-float-resume">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-32 animate-shimmer"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 animate-shimmer delay-200"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded animate-shimmer delay-300"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6 animate-shimmer delay-400"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6 animate-shimmer delay-500"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 bg-blue-200 rounded w-20 animate-shimmer delay-600"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-blue-100 rounded-full w-16 animate-shimmer delay-700"></div>
                      <div className="h-6 bg-purple-100 rounded-full w-20 animate-shimmer delay-800"></div>
                      <div className="h-6 bg-pink-100 rounded-full w-14 animate-shimmer delay-900"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 w-32 h-24 transform -rotate-12 animate-float delay-500">
                <div className="space-y-2">
                  <div className="h-2 bg-green-200 rounded animate-shimmer"></div>
                  <div className="h-2 bg-green-200 rounded w-3/4 animate-shimmer delay-100"></div>
                  <div className="h-2 bg-green-200 rounded w-1/2 animate-shimmer delay-200"></div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 w-36 h-28 transform rotate-12 animate-float delay-1000">
                <div className="space-y-2">
                  <div className="h-3 bg-orange-200 rounded animate-shimmer delay-300"></div>
                  <div className="h-2 bg-orange-100 rounded animate-shimmer delay-400"></div>
                  <div className="h-2 bg-orange-100 rounded w-4/5 animate-shimmer delay-500"></div>
                  <div className="h-2 bg-orange-100 rounded w-3/5 animate-shimmer delay-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From resume creation to interview preparation - we've got you
            covered with our comprehensive suite of tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Resume Builder */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Create Professional Resume
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Build stunning, ATS-friendly resumes using our professionally
              designed templates. Stand out with modern layouts and compelling
              content.
            </p>
          </div>

          {/* Card 2: Resume Tailoring */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-purple-200">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              AI Resume Tailoring
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Automatically tailor your resume to specific job descriptions
              using AI. Optimize keywords and content for maximum impact.
            </p>
          </div>

          {/* Card 3: Learning Roadmap */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-green-200">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Personalized Roadmap
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get AI-generated learning roadmaps based on your target job
              description. Bridge skill gaps and advance your career
              strategically.
            </p>
          </div>

          {/* Card 4: Mock Interview */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-orange-200">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Mock Interview Practice
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Practice with AI-powered mock interviews tailored to your
              industry. Build confidence and improve your interview performance.
            </p>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Your Journey to Success
            </h3>
            <p className="text-lg text-gray-600">
              Follow these simple steps to land your dream job
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Create Resume
              </h4>
              <p className="text-gray-600 text-sm">
                Build your professional resume using our templates
              </p>
            </div>

            <div className="hidden lg:block">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Tailor & Optimize
              </h4>
              <p className="text-gray-600 text-sm">
                AI optimizes your resume for specific job descriptions
              </p>
            </div>

            <div className="hidden lg:block">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Learn & Grow</h4>
              <p className="text-gray-600 text-sm">
                Follow personalized roadmaps to bridge skill gaps
              </p>
            </div>

            <div className="hidden lg:block">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Ace Interviews
              </h4>
              <p className="text-gray-600 text-sm">
                Practice with mock interviews and land your dream job
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 text-center py-16 animate-fade-in-up delay-1000">
        <p className="text-lg text-gray-600 mb-6">
          Join thousands of professionals who landed their dream jobs
        </p>
        <div className="flex justify-center space-x-8 opacity-60">
          <div className="text-2xl font-bold text-gray-400">Google</div>
          <div className="text-2xl font-bold text-gray-400">Microsoft</div>
          <div className="text-2xl font-bold text-gray-400">Apple</div>
          <div className="text-2xl font-bold text-gray-400">Amazon</div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-resume {
          0%,
          100% {
            transform: translateY(0px) rotate(3deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }

        @keyframes expand {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-resume {
          animation: float-resume 4s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-expand {
          animation: expand 2s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        .animate-count-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
