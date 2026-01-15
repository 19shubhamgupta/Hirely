import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";
import { Mic } from "lucide-react";

const InterviewRoom = () => {
  const { speak, voices } = useSpeechSynthesis();
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, interviewDetails } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    questions ? questions[0].timeLimit : 0
  );
  const [answers, setAnswers] = useState([]); // { question, answer }
  const [hasHeard, setHasHeard] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const timerRef = useRef(null);

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = {
        question: questions[currentIndex].question,
        answer: result,
      };
      setAnswers(updatedAnswers);
    },
  });

  const handleSpeak = (text) => {
    speak({ text, rate: 1.2, voice: voices[4] });
    setHasHeard(true);
  };

  useEffect(() => {
    if (!questions) {
      navigate("/");
      return;
    }

    if (answers.length === 0) {
      setAnswers(questions.map((q) => ({ question: q.question, answer: "" })));
    }

    setHasHeard(false);
    setQuestionNumber(currentIndex + 1);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return questions[currentIndex + 1]?.timeLimit || 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, questions]);

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(questions[currentIndex + 1].timeLimit);
      setQuestionNumber((prev) => prev + 1);
    } else {
      handleSubmitInterview();
    }
  };

  const handleSubmitInterview = async () => {
    try {
      const res = await axiosInstance.post("/interview/submit", {
        title: interviewDetails?.title || "Untitled Interview",
        role: interviewDetails?.role || "Not specified",
        experience: interviewDetails?.experience || "Not specified",
        skills: interviewDetails?.skills || [],
        difficulty: interviewDetails?.difficulty || "medium",
        questions, // 👈 only questions
        answers, // 👈 only answers
      });

      toast.success("Interview submitted successfully!");
      navigate(`/report/${res.data.reportId}`);
    } catch (error) {
      console.error("Error submitting interview:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit interview."
      );
    }
  };

  if (!questions) return null;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header section */}
        <div className="bg-white border-4 border-blue-900 rounded-lg shadow-lg p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {interviewDetails.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestion.category}
            </span>
            <span className="px-2">|</span>
            <span className="font-medium">
              Question {questionNumber} of {questions.length}
            </span>
          </div>
        </div>

        {/* Interview content */}
        <div className="bg-white border-4 border-blue-900 rounded-lg shadow-lg p-8 w-full flex flex-col">
          {/* Timer bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{
                width: `${(timeLeft / currentQuestion.timeLimit) * 100}%`,
                backgroundColor: timeLeft < 10 ? "#ef4444" : "#2563eb",
              }}
            />
          </div>

          

          {/* Controls section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => handleSpeak(currentQuestion.question)}
              disabled={hasHeard}
              className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 w-full md:w-auto justify-center transition-all ${
                hasHeard
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-900 text-white hover:bg-blue-800 shadow-md hover:shadow-lg"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
              Hear Question
            </button>

            <button
              onClick={listening ? stop : listen}
              className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 w-full md:w-auto justify-center transition-all shadow-md hover:shadow-lg ${
                listening
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <Mic size={20} />
              {listening ? "Listening..." : "Click to Talk"}
            </button>
          </div>

          {/* Answer display */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 min-h-[150px] relative">
            <div className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500 font-medium">
              Your Answer
            </div>
            <p
              className={`text-gray-800 ${
                answers[currentIndex]?.answer ? "" : "text-gray-400 italic"
              }`}
            >
              {answers[currentIndex]?.answer ||
                "Your answer will appear here as you speak..."}
            </p>
          </div>

          {/* Bottom controls */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  timeLeft < 10 ? "bg-red-500 animate-pulse" : "bg-green-500"
                }`}
              ></div>
              <span className="font-medium text-gray-700">
                Time Left: {timeLeft}s
              </span>
            </div>
            <button
              onClick={handleNextQuestion}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              {currentIndex === questions.length - 1
                ? "Submit Interview"
                : "Next Question"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;