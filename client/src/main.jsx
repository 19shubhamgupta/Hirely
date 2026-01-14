import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import RoadmapPage from "./Pages/RoadmapPage.jsx";
import CourseGeneratorPage from "./Pages/CourseGeneratorPage.jsx";
import Course from "./Pages/Course.jsx";
import ResumeBuilder from "./Pages/ResumeBuilder.jsx";
import TemplateGallery from "./Pages/TemplateGallery.jsx";
import TailorInput from "./Pages/TailorInput.jsx";
import TailoringResumePage from "./Pages/TailoringResumePage.jsx";
import MyResumesPage from "./Pages/MyResumesPage.jsx";
import CoursePage from "./Pages/CoursePage.jsx";


// 👉 Import our new pages
import InterviewHomePage from "./Pages/InterviewHomePage.jsx";
import BackendRoadmapGraph from "./Pages/BackendRoadmapPage.jsx";
import FrontendRoadmapGraph from "./Pages/FrontendRoadmapPage.jsx";
import InterviewDetailsPage from "./Pages/InterviewDetailsPage.jsx";
import InterviewRoom from "./Pages/InterviewRoom.jsx";
import ReportPage from "./Pages/ReportPage.jsx";
import CustomInterview from "./Pages/CustomInterview.jsx";
import CustomInterviewRoom from "./Pages/CustomInterviewRoom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/roadmap", element: <RoadmapPage /> },
      { path: "/course-generator", element: <CourseGeneratorPage /> },
      { path: "/roadmap/customize-roadmap/course/:id", element: <Course /> },
      { path: "/course/:id", element: <CoursePage /> },
      { path: "/templates", element: <TemplateGallery /> },
      { path: "/resume-builder", element: <ResumeBuilder /> },
      { path: "/my-resumes", element: <MyResumesPage /> },
      { path: "/tailorinput", element: <TailorInput /> },
      { path: "/tailoring-resume", element: <TailoringResumePage /> },

      // 👉 New Interview Routes
      { path: "/interview", element: <InterviewHomePage /> },
      { path: "/interview/:id", element: <InterviewDetailsPage /> },
      { path: "/room", element: <InterviewRoom  /> },
      { path: "/report/:reportId", element: <ReportPage  /> },

      { path: "/custom-interview", element: <CustomInterview /> },
      { path: "/custom-interview-room", element: <CustomInterviewRoom /> },

      { path: "/roadmap/Frontend", element: <FrontendRoadmapGraph /> },
      { path: "/roadmap/Backend", element: <BackendRoadmapGraph /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
