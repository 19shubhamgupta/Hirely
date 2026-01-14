import React from "react";

export default function ResumePreview({ resumeData, template }) {
  // Template 1: Classic Professional
  if (template === "template1") {
    return (
      <div className="resume-preview p-8 bg-white max-w-[8.5in] mx-auto min-h-[11in] text-sm">
        {/* Personal Info */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-lg text-gray-600 mt-1">
            {resumeData.personalInfo.jobTitle || "Professional Title"}
          </p>
          <div className="flex justify-center flex-wrap gap-3 mt-3 text-sm text-gray-600">
            {resumeData.personalInfo.email && (
              <span>📧 {resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>📞 {resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.website && (
              <span>🌐 {resumeData.personalInfo.website}</span>
            )}
            {resumeData.personalInfo.location && (
              <span>📍 {resumeData.personalInfo.location}</span>
            )}
          </div>
        </div>

        {/* Objective */}
        {resumeData.personalInfo.objective && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3 uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {resumeData.personalInfo.objective}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.some(
          (job) => job.company || job.position
        ) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3 uppercase tracking-wide">
              Work Experience
            </h2>
            {resumeData.workExperience.map(
              (job, idx) =>
                (job.company || job.position) && (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {job.company}
                        </h3>
                        <p className="italic text-gray-700">{job.position}</p>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        {job.startDate}{" "}
                        {job.startDate && job.endDate ? " - " : ""}{" "}
                        {job.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.some((edu) => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3 uppercase tracking-wide">
              Education
            </h2>
            {resumeData.education.map(
              (edu, idx) =>
                (edu.institution || edu.degree) && (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {edu.institution}
                        </h3>
                        <p className="text-gray-700">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        {edu.startDate}{" "}
                        {edu.startDate && edu.endDate ? " - " : ""}{" "}
                        {edu.endDate}
                      </p>
                    </div>
                    {edu.additionalInfo && (
                      <p className="text-gray-600 text-sm mt-1">
                        {edu.additionalInfo}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.some((proj) => proj.name) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3 uppercase tracking-wide">
              Projects
            </h2>
            {resumeData.projects.map(
              (proj, idx) =>
                proj.name && (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">{proj.name}</h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {proj.date}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-1 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3 uppercase tracking-wide">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Template 3: Creative Modern
  if (template === "template3") {
    return (
      <div className="resume-preview p-8 bg-gradient-to-br from-blue-50 to-white max-w-[8.5in] mx-auto min-h-[11in] text-sm">
        {/* Personal Info */}
        <div className="mb-8">
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-blue-100 text-lg mb-4">
              {resumeData.personalInfo.jobTitle || "Professional Title"}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {resumeData.personalInfo.email && (
                <span>✉ {resumeData.personalInfo.email}</span>
              )}
              {resumeData.personalInfo.phone && (
                <span>📞 {resumeData.personalInfo.phone}</span>
              )}
              {resumeData.personalInfo.website && (
                <span>🌐 {resumeData.personalInfo.website}</span>
              )}
              {resumeData.personalInfo.location && (
                <span>📍 {resumeData.personalInfo.location}</span>
              )}
            </div>
          </div>
        </div>

        {/* Objective */}
        {resumeData.personalInfo.objective && (
          <div className="mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
              <h2 className="text-lg font-bold text-blue-600 mb-2">ABOUT ME</h2>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.personalInfo.objective}
              </p>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.some(
          (job) => job.company || job.position
        ) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center">
              <span className="bg-blue-600 w-3 h-3 rounded-full mr-2"></span>
              WORK EXPERIENCE
            </h2>
            {resumeData.workExperience.map(
              (job, idx) =>
                (job.company || job.position) && (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-sm mb-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {job.company}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {job.position}
                        </p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.some((edu) => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center">
              <span className="bg-blue-600 w-3 h-3 rounded-full mr-2"></span>
              EDUCATION
            </h2>
            {resumeData.education.map(
              (edu, idx) =>
                (edu.institution || edu.degree) && (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-sm mb-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {edu.institution}
                        </h3>
                        <p className="text-gray-700">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    {edu.additionalInfo && (
                      <p className="text-gray-600 text-sm mt-2">
                        {edu.additionalInfo}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.some((proj) => proj.name) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center">
              <span className="bg-blue-600 w-3 h-3 rounded-full mr-2"></span>
              PROJECTS
            </h2>
            {resumeData.projects.map(
              (proj, idx) =>
                proj.name && (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-sm mb-3"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{proj.name}</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {proj.date}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center">
              <span className="bg-blue-600 w-3 h-3 rounded-full mr-2"></span>
              SKILLS
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Template 4: Minimalist Black & White
  if (template === "template4") {
    return (
      <div className="resume-preview p-8 bg-white max-w-[8.5in] mx-auto min-h-[11in] text-sm">
        {/* Personal Info */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-black mb-1">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-lg text-gray-600 mb-4 uppercase tracking-widest">
            {resumeData.personalInfo.jobTitle || "Professional Title"}
          </p>
          <div className="w-full h-px bg-black mb-4"></div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {resumeData.personalInfo.email && (
              <span className="text-gray-700">
                {resumeData.personalInfo.email}
              </span>
            )}
            {resumeData.personalInfo.phone && (
              <span className="text-gray-700">
                {resumeData.personalInfo.phone}
              </span>
            )}
            {resumeData.personalInfo.website && (
              <span className="text-gray-700">
                {resumeData.personalInfo.website}
              </span>
            )}
            {resumeData.personalInfo.location && (
              <span className="text-gray-700">
                {resumeData.personalInfo.location}
              </span>
            )}
          </div>
        </div>

        {/* Objective */}
        {resumeData.personalInfo.objective && (
          <div className="mb-8">
            <h2 className="text-lg font-light text-black mb-3 uppercase tracking-widest">
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed pl-4 border-l-2 border-black">
              {resumeData.personalInfo.objective}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.some(
          (job) => job.company || job.position
        ) && (
          <div className="mb-8">
            <h2 className="text-lg font-light text-black mb-4 uppercase tracking-widest">
              Experience
            </h2>
            {resumeData.workExperience.map(
              (job, idx) =>
                (job.company || job.position) && (
                  <div
                    key={idx}
                    className="mb-6 pl-4 border-l-2 border-gray-300"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-black uppercase tracking-wide">
                        {job.company}
                      </h3>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">
                        {job.startDate} - {job.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700 font-light mb-2">
                      {job.position}
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.some((edu) => edu.institution || edu.degree) && (
          <div className="mb-8">
            <h2 className="text-lg font-light text-black mb-4 uppercase tracking-widest">
              Education
            </h2>
            {resumeData.education.map(
              (edu, idx) =>
                (edu.institution || edu.degree) && (
                  <div
                    key={idx}
                    className="mb-4 pl-4 border-l-2 border-gray-300"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-black uppercase tracking-wide">
                        {edu.institution}
                      </h3>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700 font-light">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                    {edu.additionalInfo && (
                      <p className="text-gray-600 text-sm mt-1">
                        {edu.additionalInfo}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.some((proj) => proj.name) && (
          <div className="mb-8">
            <h2 className="text-lg font-light text-black mb-4 uppercase tracking-widest">
              Projects
            </h2>
            {resumeData.projects.map(
              (proj, idx) =>
                proj.name && (
                  <div
                    key={idx}
                    className="mb-4 pl-4 border-l-2 border-gray-300"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-black uppercase tracking-wide">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">
                        {proj.date}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-light text-black mb-4 uppercase tracking-widest">
              Skills
            </h2>
            <div className="pl-4 border-l-2 border-gray-300">
              <div className="flex flex-wrap gap-4">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-gray-700 text-sm uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Template 5: Two Column Layout
  if (template === "template5") {
    return (
      <div className="resume-preview bg-white max-w-[8.5in] mx-auto min-h-[11in] text-sm flex">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-800 text-white p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-gray-300 text-sm uppercase tracking-wide">
              {resumeData.personalInfo.jobTitle || "Professional Title"}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-yellow-400">CONTACT</h2>
            <div className="space-y-2 text-sm">
              {resumeData.personalInfo.email && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">✉</span>
                  <span>{resumeData.personalInfo.email}</span>
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">📞</span>
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
              )}
              {resumeData.personalInfo.website && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">🌐</span>
                  <span>{resumeData.personalInfo.website}</span>
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">📍</span>
                  <span>{resumeData.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-yellow-400">SKILLS</h2>
              <div className="flex flex-wrap gap-1">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-400 text-gray-800 px-2 py-1 rounded text-xs font-medium mb-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.some(
            (edu) => edu.institution || edu.degree
          ) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-yellow-400">
                EDUCATION
              </h2>
              {resumeData.education.map(
                (edu, idx) =>
                  (edu.institution || edu.degree) && (
                    <div key={idx} className="mb-3">
                      <h3 className="font-bold text-sm">{edu.institution}</h3>
                      <p className="text-gray-300 text-xs">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {edu.startDate} - {edu.endDate}
                      </p>
                      {edu.gpa && (
                        <p className="text-gray-400 text-xs">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  )
              )}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-6">
          {/* Objective */}
          {resumeData.personalInfo.objective && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-yellow-400 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.personalInfo.objective}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {resumeData.workExperience.some(
            (job) => job.company || job.position
          ) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-yellow-400 pb-1">
                WORK EXPERIENCE
              </h2>
              {resumeData.workExperience.map(
                (job, idx) =>
                  (job.company || job.position) && (
                    <div key={idx} className="mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-800">
                          {job.company}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {job.startDate} - {job.endDate}
                        </p>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">
                        {job.position}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  )
              )}
            </div>
          )}

          {/* Projects */}
          {resumeData.projects.some((proj) => proj.name) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-yellow-400 pb-1">
                PROJECTS
              </h2>
              {resumeData.projects.map(
                (proj, idx) =>
                  proj.name && (
                    <div key={idx} className="mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-800">{proj.name}</h3>
                        <p className="text-sm text-gray-600">{proj.date}</p>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Template 6: Modern Tech
  if (template === "template6") {
    return (
      <div className="resume-preview p-8 bg-gradient-to-r from-purple-50 to-pink-50 max-w-[8.5in] mx-auto min-h-[11in] text-sm">
        {/* Personal Info */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl">
            <h1 className="text-3xl font-bold mb-2">
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-purple-100 text-lg mb-4">
              {resumeData.personalInfo.jobTitle || "Professional Title"}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {resumeData.personalInfo.email && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {resumeData.personalInfo.email}
                </span>
              )}
              {resumeData.personalInfo.phone && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {resumeData.personalInfo.phone}
                </span>
              )}
              {resumeData.personalInfo.website && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {resumeData.personalInfo.website}
                </span>
              )}
              {resumeData.personalInfo.location && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {resumeData.personalInfo.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Objective */}
        {resumeData.personalInfo.objective && (
          <div className="mb-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-600">
              <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                ABOUT ME
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.personalInfo.objective}
              </p>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.some(
          (job) => job.company || job.position
        ) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              WORK EXPERIENCE
            </h2>
            {resumeData.workExperience.map(
              (job, idx) =>
                (job.company || job.position) && (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-lg mb-4 border border-purple-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {job.company}
                        </h3>
                        <p className="text-purple-600 font-medium">
                          {job.position}
                        </p>
                      </div>
                      <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.some((edu) => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              EDUCATION
            </h2>
            {resumeData.education.map(
              (edu, idx) =>
                (edu.institution || edu.degree) && (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-lg mb-3 border border-purple-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {edu.institution}
                        </h3>
                        <p className="text-gray-700">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    {edu.additionalInfo && (
                      <p className="text-gray-600 text-sm mt-2">
                        {edu.additionalInfo}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.some((proj) => proj.name) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              PROJECTS
            </h2>
            {resumeData.projects.map(
              (proj, idx) =>
                proj.name && (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-lg mb-3 border border-purple-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {proj.name}
                      </h3>
                      <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {proj.date}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              SKILLS
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Template 7: Corporate Executive
  if (template === "template7") {
    return (
      <div className="resume-preview p-8 bg-white max-w-[8.5in] mx-auto min-h-[11in] text-sm border-2 border-gray-200">
        {/* Personal Info */}
        <div className="text-center mb-8 pb-6 border-b-4 border-gray-800">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-xl text-gray-600 mb-4 uppercase tracking-widest font-light">
            {resumeData.personalInfo.jobTitle || "Professional Title"}
          </p>
          <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-700">
            {resumeData.personalInfo.email && (
              <span className="border-r border-gray-400 pr-6">
                {resumeData.personalInfo.email}
              </span>
            )}
            {resumeData.personalInfo.phone && (
              <span className="border-r border-gray-400 pr-6">
                {resumeData.personalInfo.phone}
              </span>
            )}
            {resumeData.personalInfo.website && (
              <span className="border-r border-gray-400 pr-6">
                {resumeData.personalInfo.website}
              </span>
            )}
            {resumeData.personalInfo.location && (
              <span>{resumeData.personalInfo.location}</span>
            )}
          </div>
        </div>

        {/* Objective */}
        {resumeData.personalInfo.objective && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-widest">
              Executive Summary
            </h2>
            <div className="bg-gray-50 p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed text-center italic">
                {resumeData.personalInfo.objective}
              </p>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.some(
          (job) => job.company || job.position
        ) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center uppercase tracking-widest border-b-2 border-gray-800 pb-2">
              Professional Experience
            </h2>
            {resumeData.workExperience.map(
              (job, idx) =>
                (job.company || job.position) && (
                  <div key={idx} className="mb-6 p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-3 bg-gray-800 text-white p-3">
                      <div>
                        <h3 className="text-lg font-bold">{job.company}</h3>
                        <p className="text-gray-300">{job.position}</p>
                      </div>
                      <p className="text-sm bg-white text-gray-800 px-3 py-1 rounded">
                        {job.startDate} - {job.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed p-3">
                      {job.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.some((edu) => edu.institution || edu.degree) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center uppercase tracking-widest border-b-2 border-gray-800 pb-2">
              Education
            </h2>
            {resumeData.education.map(
              (edu, idx) =>
                (edu.institution || edu.degree) && (
                  <div key={idx} className="mb-4 p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2 bg-gray-100 p-3">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {edu.institution}
                        </h3>
                        <p className="text-gray-700">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 px-3">
                        GPA: {edu.gpa}
                      </p>
                    )}
                    {edu.additionalInfo && (
                      <p className="text-gray-600 text-sm px-3">
                        {edu.additionalInfo}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.some((proj) => proj.name) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center uppercase tracking-widest border-b-2 border-gray-800 pb-2">
              Key Projects
            </h2>
            {resumeData.projects.map(
              (proj, idx) =>
                proj.name && (
                  <div key={idx} className="mb-4 p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2 bg-gray-100 p-3">
                      <h3 className="font-bold text-gray-800">{proj.name}</h3>
                      <p className="text-sm text-gray-600">{proj.date}</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed px-3">
                      {proj.description}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center uppercase tracking-widest border-b-2 border-gray-800 pb-2">
              Core Competencies
            </h2>
            <div className="bg-gray-50 p-6 border border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                {resumeData.skills.map((skill, idx) => (
                  <div key={idx} className="text-center">
                    <span className="text-gray-700 font-medium uppercase tracking-wide text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default fallback to template1
  return (
    <div className="resume-preview p-8 bg-white max-w-[8.5in] mx-auto min-h-[11in] text-sm">
      {/* Default template content - same as template1 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {resumeData.personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          {resumeData.personalInfo.jobTitle || "Professional Title"}
        </p>
        <div className="flex justify-center flex-wrap gap-3 mt-3 text-sm text-gray-600">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.website && (
            <span>{resumeData.personalInfo.website}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
        </div>
      </div>

      {resumeData.personalInfo.objective && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resumeData.personalInfo.objective}
          </p>
        </div>
      )}

      {resumeData.workExperience.some((job) => job.company || job.position) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3">
            Work Experience
          </h2>
          {resumeData.workExperience.map(
            (job, idx) =>
              (job.company || job.position) && (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{job.company}</h3>
                      <p className="italic text-gray-700">{job.position}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {job.startDate} - {job.endDate}
                    </p>
                  </div>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {resumeData.education.some((edu) => edu.institution || edu.degree) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3">
            Education
          </h2>
          {resumeData.education.map(
            (edu, idx) =>
              (edu.institution || edu.degree) && (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {edu.institution}
                      </h3>
                      <p className="text-gray-700">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  {edu.additionalInfo && (
                    <p className="text-gray-600 text-sm mt-1">
                      {edu.additionalInfo}
                    </p>
                  )}
                </div>
              )
          )}
        </div>
      )}

      {resumeData.projects.some((proj) => proj.name) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3">
            Projects
          </h2>
          {resumeData.projects.map(
            (proj, idx) =>
              proj.name && (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    <p className="text-sm text-gray-600">{proj.date}</p>
                  </div>
                  <p className="text-gray-700 mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
