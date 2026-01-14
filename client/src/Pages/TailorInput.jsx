import React, { useState } from "react";
import GeneratingLoader from "../Components/GeneratingLoader";
import { useStoreAuth } from "../store/useResumeStore";
import { ArrowRight, ArrowLeft, Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TailorInput = () => {
  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobFile, setJobFile] = useState(null);
  const [manualJob, setManualJob] = useState({
    role: "",
    title: "",
    description: "",
  });
  const [useManual, setUseManual] = useState(false);
  const navigate = useNavigate();

  // Zustand store
  const { isTailoring, getTailorData } = useStoreAuth();

  // Handle submit
  const handleSubmit = async () => {
    const formData = new FormData();
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    if (useManual) {
      formData.append("role", manualJob.role);
      formData.append("title", manualJob.title);
      formData.append("description", manualJob.description);
    } else if (jobFile) {
      formData.append("job", jobFile);
    }

    setStep(3); // Show loader step
    const res = await getTailorData(formData);
    if (!isTailoring && res) {
      navigate("/tailoring-resume");
    }
  };

  // Navigate to tailoring page

  // Step 1: Resume PDF upload
  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Upload Your Resume (PDF)</h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <label className="w-full flex flex-col items-center px-4 py-8 border-2 border-blue-950 rounded-lg cursor-pointer bg-white hover:bg-blue-50">
          <Upload size={32} className="mb-2 text-blue-600" />
          <span className="text-gray-700">Click to upload PDF</span>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </label>
        {resumeFile && (
          <div className="text-green-600 font-medium flex items-center gap-2">
            <FileText size={18} /> {resumeFile.name}
          </div>
        )}
      </div>
    </div>
  );

  // Step 2: Job PDF upload or manual entry
  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Job Description</h2>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md border-2 ${
            !useManual
              ? "bg-blue-100 border-blue-600"
              : "bg-white border-gray-300"
          } font-medium`}
          onClick={() => setUseManual(false)}
        >
          Upload PDF
        </button>
        <button
          className={`px-4 py-2 rounded-md border-2 ${
            useManual
              ? "bg-blue-100 border-blue-600"
              : "bg-white border-gray-300"
          } font-medium`}
          onClick={() => setUseManual(true)}
        >
          Enter Manually
        </button>
      </div>
      {!useManual ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <label className="w-full flex flex-col items-center px-4 py-8 border-2 border-blue-950 rounded-lg cursor-pointer bg-white hover:bg-blue-50">
            <Upload size={32} className="mb-2 text-blue-600" />
            <span className="text-gray-700">Click to upload Job PDF</span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setJobFile(e.target.files[0])}
            />
          </label>
          {jobFile && (
            <div className="text-green-600 font-medium flex items-center gap-2">
              <FileText size={18} /> {jobFile.name}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Role"
            value={manualJob.role}
            onChange={(e) =>
              setManualJob({ ...manualJob, role: e.target.value })
            }
            className="px-4 py-2 border-2 border-blue-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
          <input
            type="text"
            placeholder="Title"
            value={manualJob.title}
            onChange={(e) =>
              setManualJob({ ...manualJob, title: e.target.value })
            }
            className="px-4 py-2 border-2 border-blue-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
          <textarea
            placeholder="Description"
            value={manualJob.description}
            onChange={(e) =>
              setManualJob({ ...manualJob, description: e.target.value })
            }
            className="px-4 py-2 border-2 border-blue-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 resize-none"
            rows="4"
          />
        </div>
      )}
    </div>
  );

  // Step validation
  const isStep1Valid = !!resumeFile;
  const isStep2Valid = useManual
    ? manualJob.role.trim() &&
      manualJob.title.trim() &&
      manualJob.description.trim()
    : !!jobFile;

  if (step === 3) {
    return (
      <div className="w-full flex items-center justify-center mt-10 md:mt-100">
        <div className="max-w-200 md:-mt-60   ">
          {/* Custom Generating Loader */}
          <GeneratingLoader />

          <div className="text-center text-blue-950 font-bold mt-4">
            Your custom course will be ready soon
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto border-2 border-blue-950 mt-20">
      {/* Progress indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative mb-2">
          {[1, 2].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col z-10">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
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
                {stepNumber === 1 ? "Resume" : "Job Description"}
              </span>
            </div>
          ))}
          <div
            className="absolute top-4 left-0 h-3 bg-gray-200 w-full -z-0 rounded-full"
            style={{ backgroundColor: "#CDDEEF" }}
          ></div>
          <div
            className="absolute top-4 left-0 h-3 transition-all duration-500 ease-in-out rounded-full"
            style={{
              backgroundColor: "#00ABE4",
              width: step === 1 ? "0%" : "100%",
            }}
          ></div>
        </div>
      </div>

      {/* Form steps */}
      <div className="min-h-[300px]">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
            style={{ borderColor: "#CDDEEF", color: "#333333" }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        ) : (
          <div></div>
        )}
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 ${
              isStep1Valid ? "" : "opacity-50"
            }`}
            style={{ backgroundColor: "#00ABE4" }}
            disabled={!isStep1Valid}
          >
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 ${
              isStep2Valid ? "" : "opacity-50"
            }`}
            style={{ backgroundColor: "#00ABE4" }}
            disabled={!isStep2Valid}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TailorInput;
