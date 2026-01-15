import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoadMapCollection = ({ roadmaps, title = "Role Based Roadmaps" }) => {
  const [bookmarked, setBookmarked] = useState({});
  const navigate = useNavigate();

  const handleBookmark = (event, id) => {
    event.stopPropagation(); // Prevent card click from triggering navigation
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCardClick = (roadmapTitle) => {
    // Navigate to roadmap detail page
    navigate(`/roadmap/${encodeURIComponent(roadmapTitle)}`);
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1
          className="text-2xl font-semibold text-white p-3 rounded-md inline-block"
          style={{ backgroundColor: "#00ABE4" }}
        >
          {title}
        </h1>
      </div>

      {/* Roadmap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            className="relative border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all bg-white"
            style={{ borderColor: "#CDDEEF" }}
            onClick={() => handleCardClick(roadmap.title)}
          >
            <button
              onClick={(e) => handleBookmark(e, roadmap.id)}
              className="absolute top-4 right-4"
              style={{
                color: bookmarked[roadmap.id] ? "#00ABE4" : "#CDDEEF",
              }}
            >
              <Bookmark
                className={`w-5 h-5 ${bookmarked[roadmap.id] ? "fill-current" : ""}`}
              />
            </button>

            <h3 className="text-lg font-medium" style={{ color: "#333333" }}>
              {roadmap.title}
            </h3>

            {roadmap.isNew && (
              <span
                className="absolute top-4 right-12 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-white rounded-full"
                style={{ backgroundColor: "#00ABE4" }}
              >
                New
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RoadMapCollection;
