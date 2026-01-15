import React from "react";
import { useStoreAuth } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import CourseGeneratorForm from "../Components/CourseGeneratorForm";

const CourseGeneratorPage = () => {
  const { authUser } = useStoreAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!authUser) {
    navigate("/login");
    return null;
  }

  return (
    <div
      className="min-h-screen pt-4 pb-10 px-4"
      style={{ backgroundColor: "#E9F1FA" }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-semibold text-white p-3 rounded-md inline-block"
            style={{ backgroundColor: "#00ABE4" }}
          >
            Roadmap Generator
          </h1>
          <p className="mt-4 text-black max-w-2xl mx-auto text-3xl font-bold">
            Create a personalized learning path in seconds
          </p>
        </div>

        <CourseGeneratorForm />
      </div>
    </div>
  );
};

export default CourseGeneratorPage;
