import { useCourseStore } from "../store/useCourseStore";

const CoursePage = () => {
  const { currentCourse } = useCourseStore();

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
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
      </div>
    </div>
  );
};

export default CoursePage;
