import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useStoreAuth } from "../store/useAuthStore";

function SignupPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { signup, isSigningUp, toggleNav, getGooglePage } = useStoreAuth();

  useEffect(() => {
    toggleNav(false);

    // Cleanup function to show navbar when leaving the page
    return () => {
      toggleNav(true);
    };
  }, [toggleNav]);

  const signupForm = (data) => {
    signup(data).then(() => {
      toggleNav(true);
      navigate("/");
    });
  };

  const handlegoogle = () => {
    getGooglePage();
  };
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#E9F1FA" }}>
      {/* Left Section - Branding */}
      <div
        className="hidden md:flex md:w-[45%] items-center justify-center rounded-r-[3rem] border h-screen flex-col shadow-2xl"
        style={{ backgroundColor: "#00ABE4", borderColor: "#0089B6" }}
      >
        <img src="/hirely.png" alt="chit-chat-logo" className="size-40" />
        <div className="space-y-4 text-center px-8">
          <h1 className="text-5xl font-extrabold text-white">
            Your Career
            <br />
            <span style={{ color: "#E9F1FA" }}>Elevated</span>
          </h1>
          <p className="mt-4 text-3xl font-bold text-blue-950">
            Sign up to create professional resumes that stand out!
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="w-full max-w-md p-8 rounded-2xl shadow-2xl border"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#CDDEEF" }}
        >
          <h3
            className="text-2xl font-bold text-center mb-6"
            style={{ color: "#333333" }}
          >
            Create Your Account
          </h3>

          <form onSubmit={handleSubmit(signupForm)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium"
                style={{ color: "#333333" }}
              >
                Name
              </label>
              <input
                id="fullname"
                type="text"
                {...register("fullname", { required: true })}
                className="mt-1 block w-full h-12 border rounded-lg shadow-sm focus:ring-2 focus:border-2 placeholder-gray-500 placeholder:truncate placeholder:px-2"
                placeholder="Your full name"
                style={{
                  backgroundColor: "#E9F1FA",
                  color: "#333333",
                  borderColor: "#CDDEEF",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium"
                style={{ color: "#333333" }}
              >
                E‑mail
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="mt-1 block w-full h-12 border rounded-lg shadow-sm focus:ring-2 focus:border-2 placeholder-gray-500 placeholder:truncate placeholder:px-2"
                placeholder="you@example.com"
                style={{
                  backgroundColor: "#E9F1FA",
                  color: "#333333",
                  borderColor: "#CDDEEF",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium"
                style={{ color: "#333333" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="mt-1 block w-full h-12 border rounded-lg shadow-sm focus:ring-2 focus:border-2 placeholder-gray-500 placeholder:truncate placeholder:px-2"
                placeholder="Enter a secure password"
                style={{
                  backgroundColor: "#E9F1FA",
                  color: "#333333",
                  borderColor: "#CDDEEF",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white font-semibold rounded-lg transition-all duration-200 h-12 shadow-lg"
              style={{ backgroundColor: "#00ABE4" }}
              disabled={isSigningUp}
            >
              {isSigningUp ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <hr className="flex-grow" style={{ borderColor: "#CDDEEF" }} />
            <span className="mx-2" style={{ color: "#555555" }}>
              OR
            </span>
            <hr className="flex-grow" style={{ borderColor: "#CDDEEF" }} />
          </div>

          <button
            className="w-full py-3 flex items-center justify-center border rounded-lg transition-all duration-200 shadow-lg"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#CDDEEF",
              color: "#333333",
            }}
            onClick={handlegoogle}
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm" style={{ color: "#555555" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium hover:underline transition-colors"
              style={{ color: "#00ABE4" }}
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
