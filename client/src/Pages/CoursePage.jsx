import { useNavigate } from "react-router-dom";
import { useCourseStore } from "../store/useCourseStore";

const CoursePage = () => {
  const { currentCourse } = useCourseStore();
  const navigate = useNavigate();

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }
const handleGameClickked = ()=>{
    navigate("/play-game");
}
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{currentCourse.title}</h1>

        {/* Video Section */}
        {currentCourse.videoUrl && (
          <div className="mb-8">
            <div className="aspect-w-16 aspect-h-9 relative">
              <iframe
                src={currentCourse.videoUrl}
                title={currentCourse.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[400px] rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        )}

        {/* Course Content Section */}
        <div className="prose max-w-none">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-4">
              {currentCourse.sections?.map((section, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h3 className="text-xl font-medium mb-2">{section.title}</h3>
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Section */}
        {currentCourse.resources && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Additional Resources
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {currentCourse.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {resource.title}
                  </a>
                  {resource.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {resource.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Game Challenge Button */}
        <div className="mt-12 flex justify-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold text-xl rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50 active:scale-95 overflow-hidden"
          onClick={handleGameClickked}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
            <span className="relative flex items-center gap-3">
              <span className="text-2xl">🎮</span>
              <span className="tracking-wider">ENTER ARENA</span>
              <span className="text-2xl animate-pulse">⚔️</span>
            </span>
            <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
