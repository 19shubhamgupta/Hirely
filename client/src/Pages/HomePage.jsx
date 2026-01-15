import React from "react";
import { useStoreAuth } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Home";

const HomePage = () => {
  const { authUser } = useStoreAuth();
  const navigate = useNavigate();
  if (!authUser) {
    navigate("/login");
  }
  console.log("authuser" , authUser)
  return (
    authUser && (
      <Hero />
    )
  );
};

export default HomePage;
