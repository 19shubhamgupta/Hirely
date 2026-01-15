import React from "react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "../Components/ResumePreview";

export default function TemplateGallery() {
  const navigate = useNavigate();

  // Sample data for template previews
  const sampleData = {
    personalInfo: {
      fullName: "John Doe",
      jobTitle: "Software Developer",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      website: "www.johndoe.com",
      location: "New York, NY",
      objective:
        "Passionate software developer with 3+ years of experience in full-stack development. Seeking to leverage expertise in React, Node.js, and cloud technologies to drive innovation at a forward-thinking company.",
    },
    workExperience: [
      {
        id: 1,
        company: "Tech Solutions Inc.",
        position: "Frontend Developer",
        startDate: "2022",
        endDate: "Present",
        description:
          "Developed responsive web applications using React and TypeScript. Collaborated with UX/UI teams to implement user-friendly interfaces and improved application performance by 40%.",
      },
      {
        id: 2,
        company: "StartupXYZ",
        position: "Junior Developer",
        startDate: "2021",
        endDate: "2022",
        description:
          "Built RESTful APIs using Node.js and Express. Implemented database solutions with MongoDB and participated in agile development processes.",
      },
    ],
    education: [
      {
        id: 1,
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2017",
        endDate: "2021",
        gpa: "3.8",
        additionalInfo: "Dean's List, Computer Science Society President",
      },
    ],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        date: "2023",
        description:
          "Built a full-stack e-commerce application with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and real-time inventory management.",
      },
      {
        id: 2,
        name: "Task Management App",
        date: "2022",
        description:
          "Developed a collaborative task management tool using MERN stack. Implemented real-time updates with Socket.io and deployed on AWS.",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Git",
      "Docker",
    ],
  };

  const templates = [
    {
      id: "template1",
      name: "Classic Professional",
    },
    {
      id: "template3",
      name: "Creative Modern",
    },
    {
      id: "template4",
      name: "Minimalist Black & White",
    },
    {
      id: "template5",
      name: "Two Column Executive",
    },
    {
      id: "template6",
      name: "Modern Tech",
    },
    {
      id: "template7",
      name: "Corporate Executive",
    },
  ];

  const handleTemplateSelect = (templateId) => {
    navigate(`/resume-builder?template=${templateId}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-gradient">
                Choose Your Template to create   
              </h1>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="">
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                    {template.name}
                  </h3>
                  <button
                    onClick={() => handleTemplateSelect(template.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                  >
                    Use This Template
                  </button>
                </div>

                {/* Template Preview - A4 dimensions */}
                <div
                  className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 mx-auto"
                  style={{ width: "300px", height: "424px" }}
                >
                  <div className="transform scale-[0.36] origin-top-left w-[278%] h-[1180px] overflow-hidden">
                    <div className="bg-white shadow-sm">
                      <ResumePreview
                        resumeData={sampleData}
                        template={template.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className=" rounded-2xl p-12  mx-auto border border-white/20">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Why Choose Our Templates?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Professionally designed templates that help you stand out and get
              noticed
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  ATS-Friendly
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  Optimized for Applicant Tracking Systems to ensure your resume
                  gets seen by recruiters and passes automated screenings.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
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
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Professional Design
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  Clean, modern layouts designed by professionals that make a
                  great first impression with hiring managers.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
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
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Quick & Easy
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  Fill out the form once and generate a professional resume in
                  minutes. No design skills required!
                </p>
              </div>
            </div>

            {/* Additional Stats Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    10K+
                  </div>
                  <div className="text-sm text-gray-600">Resumes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    5★
                  </div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    2M
                  </div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
