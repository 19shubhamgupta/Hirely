// InterviewHomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewHomePage = () => {
  const navigate = useNavigate();
  
  // Predefined interview data
  const predefinedInterviews = [
    {
      id: 1,
      title: "Frontend Developer",
      role: "React Developer",
      experience: "Mid-level",
      time: "45 mins",
      questions: 12
    },
    {
      id: 2,
      title: "Data Scientist",
      role: "Machine Learning Engineer",
      experience: "Senior",
      time: "60 mins",
      questions: 15
    },
    {
      id: 3,
      title: "UX Designer",
      role: "Product Designer",
      experience: "Junior",
      time: "30 mins",
      questions: 10
    },
    {
      id: 4,
      title: "Backend Engineer",
      role: "Node.js Developer",
      experience: "Mid-level",
      time: "50 mins",
      questions: 14
    },
    {
      id: 5,
      title: "DevOps Specialist",
      role: "Cloud Engineer",
      experience: "Senior",
      time: "55 mins",
      questions: 13
    },
    {
      id: 6,
      title: "Product Manager",
      role: "Technical Product Manager",
      experience: "Senior",
      time: "60 mins",
      questions: 12
    }
  ];

  const handleStartInterview = (interviewId) => {
    // Navigate to InterviewDetailsPage with the interview ID
    navigate(`/interview/${interviewId}`);
  };

  const handleGenerateCustomInterview = () => {
    // Placeholder for custom interview generation
    navigate("/custom-interview");
    console.log("Generate custom interview clicked");
    // You can implement this functionality later
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Interview Preparation Platform</h1>
          <p className="text-gray-600">Prepare for your next career move with our tailored interview experiences</p>
        </header>

        {/* Generate Custom Interview Button */}
        <div className="mb-16 text-center">
          <button 
            onClick={handleGenerateCustomInterview}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Generate Custom Interview
          </button>
        </div>

        {/* Predefined Interviews Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Predefined Interview Templates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predefinedInterviews.map(interview => (
              <div key={interview.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{interview.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {interview.experience}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {interview.role}
                  </p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {interview.time}
                    </div>
                    
                    <div className="flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      {interview.questions} questions
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleStartInterview(interview.id)}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300"
                  >
                    Start Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} InterviewPrep. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default InterviewHomePage;