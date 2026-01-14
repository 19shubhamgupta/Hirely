"use client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Simple replacement for getHasUsedAppBefore
function getHasUsedAppBefore() {
  return localStorage.getItem("hasUsedAppBefore") === "true";
}

// Simple ResumeDropzone replacement
function ResumeDropzone({ onFileUrlChange, className }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      onFileUrlChange(fileUrl);
      localStorage.setItem("hasUsedAppBefore", "true"); // save flag
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
      />
    </div>
  );
}

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);

  const onFileUrlChange = (fileUrl) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main>
      <div className="mx-auto mt-14 max-w-3xl rounded-md border border-gray-200 px-10 py-10 text-center shadow-md">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="text-lg font-semibold text-gray-900">
              Import data from an existing resume
            </h1>
            <ResumeDropzone onFileUrlChange={onFileUrlChange} className="mt-5" />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Don't have a resume yet?"
                  buttonText="Create from scratch"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="You have data saved in browser from prior session"
                  buttonText="Continue where I left off"
                />
                <OrDivider />
              </>
            )}
            <h1 className="font-semibold text-gray-900">
              Override data with a new resume
            </h1>
            <ResumeDropzone onFileUrlChange={onFileUrlChange} className="mt-5" />
          </>
        )}
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className="mx-[-2.5rem] flex items-center pb-6 pt-8" aria-hidden="true">
    <div className="flex-grow border-t border-gray-200" />
    <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-400">or</span>
    <div className="flex-grow border-t border-gray-200" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({ heading, buttonText }) => {
  return (
    <>
      <p className="font-semibold text-gray-900">{heading}</p>
      <div className="mt-5">
        <Link
          to="/resume-builder"
          className="rounded-full bg-sky-500 px-6 pb-2 pt-1.5 text-base font-semibold text-white hover:bg-sky-600"
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};
