import { useNavigate } from "react-router-dom";
import { useStoreAuth } from "../store/useAuthStore";
import RoadMapCollection from "../Components/RoadMapCollection";

const RoadmapPage = () => {
  const { authUser } = useStoreAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!authUser) {
    navigate("/login");
    return null;
  }

  // List of roadmap roles
  const roadmaps = [
    { id: 1, title: "Frontend", isNew: false },
    { id: 2, title: "Backend", isNew: false },
    { id: 3, title: "Full Stack", isNew: false },
    { id: 4, title: "DevOps", isNew: false },
    { id: 5, title: "Data Analyst", isNew: false },
    { id: 6, title: "AI Engineer", isNew: false },
    { id: 7, title: "AI and Data Scientist", isNew: false },
    { id: 8, title: "Data Engineer", isNew: true },
    { id: 9, title: "Android", isNew: false },
    { id: 10, title: "Machine Learning", isNew: true },
    { id: 11, title: "PostgreSQL", isNew: false },
    { id: 12, title: "iOS", isNew: false },
    { id: 13, title: "Blockchain", isNew: false },
    { id: 14, title: "QA", isNew: false },
    { id: 15, title: "Software Architect", isNew: false },
    { id: 16, title: "Cyber Security", isNew: false },
    { id: 17, title: "UX Design", isNew: false },
    { id: 18, title: "Technical Writer", isNew: false },
    { id: 19, title: "Game Developer", isNew: false },
    { id: 20, title: "Server Side Game Developer", isNew: false },
    { id: 21, title: "MLOps", isNew: false },
    { id: 22, title: "Product Manager", isNew: false },
    { id: 23, title: "Engineering Manager", isNew: false },
    { id: 24, title: "Developer Relations", isNew: false },
    { id: 25, title: "BI Analyst", isNew: true },
  ];

  // Skill based roadmap
  const skillRoadmaps = [
    { id: 101, title: "HTML", isNew: false },
    { id: 102, title: "CSS", isNew: false },
    { id: 103, title: "JavaScript", isNew: false },
    { id: 104, title: "TypeScript", isNew: false },
    { id: 105, title: "React", isNew: false },
    { id: 106, title: "Angular", isNew: false },
    { id: 107, title: "Vue.js", isNew: false },
    { id: 108, title: "Node.js", isNew: false },
    { id: 109, title: "Python", isNew: false },
    { id: 110, title: "Java", isNew: false },
    { id: 111, title: "Docker", isNew: false },
    { id: 112, title: "Kubernetes", isNew: false },
    { id: 113, title: "Git", isNew: false },
    { id: 114, title: "SQL", isNew: false },
    { id: 115, title: "MongoDB", isNew: false },
    { id: 116, title: "AWS", isNew: false },
    { id: 117, title: "Azure", isNew: false },
    { id: 118, title: "GraphQL", isNew: true },
    { id: 119, title: "Rust", isNew: true },
    { id: 120, title: "Go", isNew: true },
  ];

  // Navigate to roadmap detail page
  const handleRoadmapClick = (title) => {
    // Encode URI to handle spaces & special characters
    navigate(`/roadmap/${encodeURIComponent(title)}`);
  };

  return (
    <div
      className="min-h-screen pt-20 pb-10 px-4"
      style={{ backgroundColor: "#E9F1FA" }}
    >
      <div className="container mx-auto">
        <RoadMapCollection
          roadmaps={roadmaps}
          title="Role Based Roadmaps"
          onRoadmapClick={handleRoadmapClick}
        />
        <div className="mt-10"></div>
        <RoadMapCollection
          roadmaps={skillRoadmaps}
          title="Skill Based Roadmaps"
          onRoadmapClick={handleRoadmapClick}
        />
      </div>
    </div>
  );
};

export default RoadmapPage;
