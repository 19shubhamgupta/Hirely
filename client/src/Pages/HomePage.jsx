import React from "react";
import { useStoreAuth } from "../store/useAuthStore";
import Hero from "../Components/Home";

const HomePage = () => {
  const { authUser } = useStoreAuth();

  console.log("authuser", authUser);

  return authUser && <Hero />;
};

export default HomePage;
