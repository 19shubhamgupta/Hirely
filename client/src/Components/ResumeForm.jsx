// src/Components/ResumeForm.jsx
import React from "react";

// InputField Component
function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

// TextAreaField Component
function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={4}
      />
    </div>
  );
}

// Section Component
function Section({ title, children }) {
  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

// Main ResumeForm Component
function ResumeForm({
  resumeData,
  handleInputChange,
  addItem,
  removeItem,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
}) {
  return (
    <div className="space-y-8">

      {/* Personal Info */}
      <Section title="Personal Info">
        <InputField
          label="Full Name"
          value={resumeData.personalInfo.fullName}
          onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
          placeholder="John Doe"
        />
        <InputField
          label="Job Title"
          value={resumeData.personalInfo.jobTitle}
          onChange={(e) => handleInputChange("personalInfo", "jobTitle", e.target.value)}
          placeholder="Software Engineer"
        />
        <InputField
          label="Email"
          type="email"
          value={resumeData.personalInfo.email}
          onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
          placeholder="john.doe@example.com"
        />
        <InputField
          label="Phone"
          value={resumeData.personalInfo.phone}
          onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
          placeholder="(123) 456-7890"
        />
        <InputField
          label="Website"
          value={resumeData.personalInfo.website}
          onChange={(e) => handleInputChange("personalInfo", "website", e.target.value)}
          placeholder="https://johndoe.com"
        />
        <InputField
          label="Location"
          value={resumeData.personalInfo.location}
          onChange={(e) => handleInputChange("personalInfo", "location", e.target.value)}
          placeholder="New York, NY"
        />
        <TextAreaField
          label="Professional Objective"
          value={resumeData.personalInfo.objective}
          onChange={(e) => handleInputChange("personalInfo", "objective", e.target.value)}
          placeholder="Experienced software engineer with 5+ years in web development..."
        />
      </Section>

      {/* Work Experience */}
      <Section title="Work Experience">
        {resumeData.workExperience.map((job, idx) => (
          <div key={job.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700">Job #{idx + 1}</h3>
              <button type="button" onClick={() => removeItem("workExperience", job.id)} className="text-red-500 text-sm">
                Remove
              </button>
            </div>
            <InputField
              label="Company"
              value={job.company}
              onChange={(e) => handleInputChange("workExperience", "company", e.target.value, job.id)}
              placeholder="Google Inc."
            />
            <InputField
              label="Job Title"
              value={job.position}
              onChange={(e) => handleInputChange("workExperience", "position", e.target.value, job.id)}
              placeholder="Senior Developer"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Start Date"
                value={job.startDate}
                onChange={(e) => handleInputChange("workExperience", "startDate", e.target.value, job.id)}
                placeholder="Jan 2020"
              />
              <InputField
                label="End Date"
                value={job.endDate}
                onChange={(e) => handleInputChange("workExperience", "endDate", e.target.value, job.id)}
                placeholder="Present"
              />
            </div>
            <TextAreaField
              label="Description"
              value={job.description}
              onChange={(e) => handleInputChange("workExperience", "description", e.target.value, job.id)}
              placeholder="Designed and implemented new features..."
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("workExperience", { id: Date.now(), company: "", position: "", startDate: "", endDate: "", description: "" })}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add Job
        </button>
      </Section>

      {/* Education */}
      <Section title="Education">
        {resumeData.education.map((edu, idx) => (
          <div key={edu.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700">Education #{idx + 1}</h3>
              <button type="button" onClick={() => removeItem("education", edu.id)} className="text-red-500 text-sm">
                Remove
              </button>
            </div>
            <InputField
              label="Institution"
              value={edu.institution}
              onChange={(e) => handleInputChange("education", "institution", e.target.value, edu.id)}
              placeholder="Cornell University"
            />
            <InputField
              label="Degree & Major"
              value={edu.degree}
              onChange={(e) => handleInputChange("education", "degree", e.target.value, edu.id)}
              placeholder="Bachelor of Science in Computer Engineering"
            />
            <InputField
              label="Field of Study"
              value={edu.field}
              onChange={(e) => handleInputChange("education", "field", e.target.value, edu.id)}
              placeholder="Computer Engineering"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Start Date"
                value={edu.startDate}
                onChange={(e) => handleInputChange("education", "startDate", e.target.value, edu.id)}
                placeholder="Aug 2014"
              />
              <InputField
                label="End Date"
                value={edu.endDate}
                onChange={(e) => handleInputChange("education", "endDate", e.target.value, edu.id)}
                placeholder="May 2018"
              />
            </div>
            <InputField
              label="GPA"
              value={edu.gpa}
              onChange={(e) => handleInputChange("education", "gpa", e.target.value, edu.id)}
              placeholder="3.81"
            />
            <TextAreaField
              label="Additional Information"
              value={edu.additionalInfo}
              onChange={(e) => handleInputChange("education", "additionalInfo", e.target.value, edu.id)}
              placeholder="Relevant courses, achievements, etc."
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("education", { id: Date.now(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", additionalInfo: "" })}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add School
        </button>
      </Section>

      {/* Projects */}
      <Section title="Projects">
        {resumeData.projects.map((proj, idx) => (
          <div key={proj.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700">Project #{idx + 1}</h3>
              <button type="button" onClick={() => removeItem("projects", proj.id)} className="text-red-500 text-sm">
                Remove
              </button>
            </div>
            <InputField
              label="Project Name"
              value={proj.name}
              onChange={(e) => handleInputChange("projects", "name", e.target.value, proj.id)}
              placeholder="OpenResume"
            />
            <InputField
              label="Date"
              value={proj.date}
              onChange={(e) => handleInputChange("projects", "date", e.target.value, proj.id)}
              placeholder="Winter 2022"
            />
            <TextAreaField
              label="Description"
              value={proj.description}
              onChange={(e) => handleInputChange("projects", "description", e.target.value, proj.id)}
              placeholder="Developed a resume builder application with React..."
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("projects", { id: Date.now(), name: "", date: "", description: "" })}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add Project
        </button>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Add Skills</label>
          <div className="flex">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a skill"
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.length > 0 ? (
            resumeData.skills.map((skill, idx) => (
              <div key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                {skill}
                <button type="button" onClick={() => removeSkill(idx)} className="ml-2 text-blue-600 hover:text-blue-800">
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No skills added yet</p>
          )}
        </div>
      </Section>
    </div>
  );
}

export default ResumeForm;
