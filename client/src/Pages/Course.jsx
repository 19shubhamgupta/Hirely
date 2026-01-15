import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseStore } from "../store/useCourseStore";
import GeneratingLoader from "../Components/GeneratingLoader";

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userRoadmaps, generateChpt, isGeneratingChpt } = useCourseStore();
  // Roadmap steps array - simplified with title and chapters only
  const currRoadmap = userRoadmaps.find((rm) => rm.id === id);
  const roadmapSteps = currRoadmap ? currRoadmap.steps : [];

  const roadmaptitle = currRoadmap ? currRoadmap.title : "Course Roadmap";

  const initialStepState = roadmapSteps.map(() => false);
  const [openStepArr, setopenStepArr] = useState(initialStepState);

  const handleToggle = (index) => {
    let val = !openStepArr[index];
    setopenStepArr((prev) => {
      let newPrev = [...prev];
      newPrev[index] = val;
      return newPrev;
    });
  };

  const handleChpterClick = async (chapter) => {
    try {
      const data = {
        title: chapter.title,
        description: `This is a chapter about ${chapter.title} from the roadmap ${currRoadmap.title}`,
      };

      // Generate the course content
      const courseContent = await generateChpt(data);

      if (courseContent) {
        // Navigate to the course page using React Router
        navigate(`/course/${chapter.id}`);
      }
    } catch (error) {
      console.error("Error generating chapter content:", error);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 -right-20 w-64 h-64 bg-indigo-200 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Small floating dots */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-bounce"></div>
        <div
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-indigo-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {isGeneratingChpt && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center md:ml-20">
          <GeneratingLoader />
        </div>
      )}

      <div className="max-w-full mx-auto flex items-center justify-center flex-col relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-2">
            {roadmaptitle}
          </h1>
        </div>

        {/* Main container for vertical connection */}
        <div className="relative flex flex-col items-center w-[80%]">
          {roadmapSteps.map((step, index) => (
            <div
              className="relative w-full flex flex-col items-center"
              key={step.id}
            >
              {/* title */}
              <div
                className={`w-full md:w-[50%] h-15 bg-blue-400 border-blue-950 rounded-3xl flex items-center relative py-3 z-10 ${
                  index > 0 ? "mt-10" : ""
                } cursor-pointer`}
                onClick={() => handleToggle(index)}
              >
                <div className="w-10 h-10 bg-black rounded-full text-white flex items-center justify-center ml-4">
                  {step.id}
                </div>
                <div className="text-black text-3xl ml-2 font-medium absolute left-1/2 transform -translate-x-1/2 max-w-[70%] truncate text-center">
                  {step.title}
                </div>
              </div>

              {/* Vertical dotted line - for all steps */}
              <div
                className={`absolute top-[40px] ${
                  index === roadmapSteps.length - 1
                    ? "h-[calc(100%+20px)]"
                    : "h-[calc(100%+120px)]"
                } w-0 border-l-2 border-dashed border-black left-1/2 transform -translate-x-1/2 z-0`}
              ></div>

              {/* Chapters container - only show if this step is open */}
              {openStepArr[index] && (
                <div className="flex flex-col items-center w-full mt-8 relative">
                  {step.chapters.map((chapter, chapterIndex) => (
                    <div
                      key={chapter.id}
                      className={`md:w-[45%] ${
                        chapterIndex === 0 ? "mt-2" : "mt-6"
                      } bg-blue-400 border-blue-950 rounded-lg shadow-lg flex items-center py-4 px-6 relative z-10 ${
                        index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                      }`}
                      onClick={() => handleChpterClick(chapter)}
                    >
                      {/* Horizontal dotted line */}
                      <div
                        className={`hidden md:block absolute top-1/2 ${
                          index % 2 === 0
                            ? "right-[-60px] w-[60px]"
                            : "left-[-60px] w-[60px]"
                        } border-t-2 border-dashed border-black`}
                      ></div>

                      <div className="text-black text-lg md:text-xl font-medium flex items-center w-full">
                        <div
                          className={`min-w-[36px] h-9 bg-black rounded-full text-white flex items-center justify-center mr-4 text-sm font-bold ${
                            index % 2 !== 0 ? "md:order-2 md:ml-4 md:mr-0" : ""
                          }`}
                        >
                          {chapter.id}
                        </div>
                        <span
                          className={`line-clamp-2 ${
                            index % 2 !== 0 ? "md:text-right md:order-1" : ""
                          }`}
                        >
                          {chapter.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* END div */}
        <div className="text-2xl font-bold mb-10 flex items-center justify-center text-white bg-blue-950 mt-15 w-40 rounded-3xl h-15">
          END
        </div>
      </div>
    </div>
  );
};

export default Course;
