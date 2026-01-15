import React, { useState, useCallback } from "react";
import { X, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import GeneratingLoader from "./GeneratingLoader";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCourseStore } from "../store/useCourseStore";

const CourseGeneratorForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Access the course store
  const {
    isGeneratingCourse,
    generateRoadmap,
    setCourseData,
  } = useCourseStore();

  // Initialize react-hook-form
  const { control, getValues, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      skills: [{ value: "" }],
      level: "beginner",
    },
  });

  // Watch form values for validation
  const watchedValues = watch();

  // Setup field array for dynamic skills fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  // Log all form data function
  const logFormData = () => {
    const values = getValues();
    const formattedData = {
      title: values.title,
      description: values.description,
      skills: values.skills
        .map((skill) => skill.value)
        .filter((skill) => skill.trim() !== ""),
      level: values.level,
    };

    console.log("Course Generator - Form Data:", formattedData);
    return formattedData;
  };

  // Add a new empty skill field
  const addSkillField = () => {
    append({ value: "" });
  };

  // Go to next step
  const nextStep = () => {
    if (step === 3) {
      startGenerating();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const startGenerating = async () => {
    // Get form data using our helper function
    const courseData = logFormData();

    // Update step to show loading UI
    setStep(4);

    // Store the course data in the global state
    setCourseData(courseData);

    // Prepare data for roadmap generation with isCourse flag
    const requestData = {
      ...courseData,
    };

    const res = await generateRoadmap(requestData);

    // Check if generation is complete before navigating
    if (res && !isGeneratingCourse) {
      navigate(`/roadmap/customize-roadmap/course/${res}`);
    }
    if (!res) {
      // If generation failed, navigate back to step 1
      setStep(1);
    }
  };
  // Check if current step is valid and can proceed
  const isStepValid = useCallback(() => {
    // Using watchedValues ensures re-rendering when any form value changes
    console.log("Step:", step, "Watched values:", watchedValues);

    switch (step) {
      case 1: {
        const step1Valid =
          watchedValues.title &&
          watchedValues.title.trim() !== "" &&
          watchedValues.description &&
          watchedValues.description.trim() !== "";
        console.log("Step 1 valid:", step1Valid);
        return step1Valid;
      }

      case 2: {
        const step2Valid =
          watchedValues.skills &&
          watchedValues.skills.length > 0 &&
          watchedValues.skills.some(
            (skill) => skill.value && skill.value.trim() !== ""
          );
        console.log("Step 2 valid:", step2Valid);
        return step2Valid;
      }

      case 3: {
        const step3Valid =
          watchedValues.level && watchedValues.level.trim() !== "";
        console.log("Step 3 valid:", step3Valid);
        return step3Valid;
      }

      default:
        return true;
    }
  }, [step, watchedValues]);

  // Function is now used directly

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Course Information</h2>
            <div>
              <label className="block text-sm font-medium mb-1">
                Course Title
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter course title"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Course Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full p-2 border rounded-md h-32"
                    placeholder="Enter course description"
                  />
                )}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <p className="text-sm text-gray-600 mb-4">
              Add skills that will be covered in this course
            </p>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Controller
                    name={`skills.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder={`Skill ${index + 1}`}
                      />
                    )}
                  />
                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    aria-label="Remove skill"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addSkillField}
              type="button"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              style={{ color: "#00ABE4" }}
            >
              <Plus size={16} />
              Add another skill
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Course Level</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the difficulty level of your course
            </p>

            <div className="space-y-3">
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <>
                    <label className="block p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        className="mr-2"
                        {...field}
                        value="beginner"
                        checked={field.value === "beginner"}
                      />
                      Beginner
                    </label>

                    <label className="block p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        className="mr-2"
                        {...field}
                        value="intermediate"
                        checked={field.value === "intermediate"}
                      />
                      Intermediate
                    </label>

                    <label className="block p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        className="mr-2"
                        {...field}
                        value="advanced"
                        checked={field.value === "advanced"}
                      />
                      Advanced
                    </label>
                  </>
                )}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full flex items-center justify-center md:mt-10">
            <div className="max-w-200 md:-mt-60 border-4 border-blue-950 rounded-lg p-8 bg-white shadow-lg ">
              {/* Custom Generating Loader */}
              <GeneratingLoader />

              <div className="text-center text-blue-950 font-bold mt-4">
                Your custom course will be ready soon
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`${
        step === 4
          ? " min-h-[80vh] flex items-center justify-center w-full"
          : "bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto border-2 border-blue-950"
      }`}
    >
      {/* Progress indicator */}
      {step < 4 && (
        <div className="mb-10">
          {/* Step circles with labels */}
          <div className="flex items-center justify-between relative mb-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center 
                  transition-all duration-300 border-4 ${
                    step >= stepNumber
                      ? "text-white border-blue-950"
                      : "text-gray-400 border-blue-950 bg-white"
                  }`}
                  style={{
                    backgroundColor: step >= stepNumber ? "#00ABE4" : "white",
                    boxShadow: "0 0 0 3px white",
                  }}
                >
                  {stepNumber}
                </div>
                <span
                  className="mt-3 text-sm font-medium"
                  style={{ color: step >= stepNumber ? "#00ABE4" : "#CDDEEF" }}
                >
                  {stepNumber === 1 && "Course Info"}
                  {stepNumber === 2 && "Skills"}
                  {stepNumber === 3 && "Level"}
                </span>
              </div>
            ))}

            {/* Thick progress bar underneath */}
            <div
              className="absolute top-4 left-0 h-3 bg-gray-200 w-full -z-0 rounded-full"
              style={{ backgroundColor: "#CDDEEF" }}
            ></div>
            <div
              className="absolute top-4 left-0 h-3 transition-all duration-500 ease-in-out rounded-full"
              style={{
                backgroundColor: "#00ABE4",
                width:
                  step === 1
                    ? "0%"
                    : step === 2
                    ? "50%"
                    : step >= 3
                    ? "100%"
                    : "0%",
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Form steps */}
      <div className={step === 4 ? "w-full" : "min-h-[300px]"}>
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      {step < 4 && (
        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
              style={{ borderColor: "#CDDEEF", color: "#333333" }}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div></div> // Empty div to maintain layout
          )}

          <button
            onClick={nextStep}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 ${
              isStepValid() ? "" : "opacity-50"
            }`}
            style={{ backgroundColor: "#00ABE4" }}
          >
            {step === 3 ? "Generate Course" : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseGeneratorForm;
