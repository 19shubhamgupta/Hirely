import React from "react";

export default function PersonaPreview({ personaData, template }) {
  // Professional Template
  if (template === "professional") {
    return (
      <div className="persona-preview p-8 bg-white max-w-[8.5in] mx-auto min-h-[11in] text-sm">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-blue-600">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {personaData.personaName || "Your Name"}
          </h1>
          <p className="text-xl text-blue-600 font-semibold mb-2">
            {personaData.professionalTitle || "Professional Title"}
          </p>
          <p className="text-sm text-gray-600">
            {personaData.yearsOfExperience || 0} years of experience
          </p>
        </div>

        {/* Professional Summary */}
        {personaData.personaSummary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {personaData.personaSummary}
            </p>
          </div>
        )}

        {/* Unique Value Proposition */}
        {personaData.uniqueValue && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
              Unique Value Proposition
            </h2>
            <p className="text-gray-700 leading-relaxed italic">
              {personaData.uniqueValue}
            </p>
          </div>
        )}

        {/* Core Competencies */}
        {personaData.specializations &&
          personaData.specializations.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Core Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {personaData.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Key Skills */}
        {personaData.keySkills && personaData.keySkills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
              Key Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {personaData.keySkills.map((skill, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <span className="text-blue-600 mr-2">▸</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Industry Expertise */}
        {personaData.industryExpertise &&
          personaData.industryExpertise.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Industry Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {personaData.industryExpertise.map((industry, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Achievements */}
        {personaData.achievements && personaData.achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
              Key Achievements
            </h2>
            <ul className="space-y-2">
              {personaData.achievements.map((achievement, index) => (
                <li key={index} className="flex text-gray-700">
                  <span className="text-green-600 mr-3 font-bold">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Career Goals */}
        {personaData.careerGoals && (
          <div className="mb-6 pt-4 border-t border-gray-300">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
              Career Goals
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personaData.careerGoals}
            </p>
          </div>
        )}

        {/* Recommendations */}
        {personaData.recommendations &&
          personaData.recommendations.length > 0 && (
            <div className="mb-6 pt-4 border-t border-gray-300">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Personal Branding Recommendations
              </h2>
              <ul className="space-y-2">
                {personaData.recommendations.map((rec, index) => (
                  <li key={index} className="flex text-gray-700 text-sm">
                    <span className="text-purple-600 mr-3 font-bold">
                      {index + 1}.
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }

  // Creative Template
  if (template === "creative") {
    return (
      <div className="persona-preview p-8 bg-gradient-to-br from-purple-50 to-blue-50 max-w-[8.5in] mx-auto min-h-[11in] text-sm">
        {/* Header with colored background */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            {personaData.personaName || "Your Name"}
          </h1>
          <p className="text-xl font-semibold mb-2">
            {personaData.professionalTitle || "Professional Title"}
          </p>
          <p className="text-sm opacity-90">
            {personaData.yearsOfExperience || 0} years of experience
          </p>
        </div>

        {/* Professional Summary */}
        {personaData.personaSummary && (
          <div className="bg-white p-5 rounded-lg mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-purple-600 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personaData.personaSummary}
            </p>
          </div>
        )}

        {/* Unique Value */}
        {personaData.uniqueValue && (
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <h3 className="font-bold text-purple-600 mb-2">
              Unique Value Proposition
            </h3>
            <p className="text-sm text-gray-700 italic">
              {personaData.uniqueValue}
            </p>
          </div>
        )}

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            {/* Key Skills */}
            {personaData.keySkills && personaData.keySkills.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h3 className="font-bold text-purple-600 mb-3">Key Skills</h3>
                <div className="space-y-2">
                  {personaData.keySkills.map((skill, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      ▸ {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {personaData.achievements &&
              personaData.achievements.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h3 className="font-bold text-green-600 mb-3">
                    Key Achievements
                  </h3>
                  <ul className="space-y-2">
                    {personaData.achievements.map((achievement, index) => (
                      <li key={index} className="flex text-gray-700 text-xs">
                        <span className="text-green-600 mr-2 font-bold">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {/* Right Column */}
          <div>
            {/* Specializations */}
            {personaData.specializations &&
              personaData.specializations.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h3 className="font-bold text-blue-600 mb-3">
                    Core Specializations
                  </h3>
                  <div className="space-y-2">
                    {personaData.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2 mb-2"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Industry Expertise */}
            {personaData.industryExpertise &&
              personaData.industryExpertise.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h3 className="font-bold text-gray-600 mb-3">
                    Industry Expertise
                  </h3>
                  <div className="space-y-2">
                    {personaData.industryExpertise.map((industry, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs mr-2 mb-2"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Career Goals */}
        {personaData.careerGoals && (
          <div className="bg-white p-5 rounded-lg shadow-sm mt-6">
            <h2 className="text-lg font-bold text-purple-600 mb-3">
              Career Goals
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {personaData.careerGoals}
            </p>
          </div>
        )}

        {/* Recommendations */}
        {personaData.recommendations &&
          personaData.recommendations.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow-sm mt-6 border-t-4 border-purple-600">
              <h2 className="text-lg font-bold text-purple-600 mb-3">
                Personal Branding Recommendations
              </h2>
              <ul className="space-y-2">
                {personaData.recommendations.map((rec, index) => (
                  <li key={index} className="flex text-gray-700 text-xs">
                    <span className="text-purple-600 mr-3 font-bold">
                      {index + 1}.
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }

  // Technical Template
  if (template === "technical") {
    return (
      <div className="persona-preview p-8 bg-gray-900 text-white max-w-[8.5in] mx-auto min-h-[11in] font-mono text-xs">
        {/* Terminal-style header */}
        <div className="border-b border-green-500 pb-4 mb-6">
          <div className="text-green-500">
            <div>&gt; whoami</div>
            <div className="text-white mt-2 text-lg font-bold">
              {personaData.personaName || "user"}
            </div>
          </div>
          <div className="text-green-500 mt-3">
            &gt; title --display
            <div className="text-white">
              {personaData.professionalTitle || "Developer"}
            </div>
          </div>
          <div className="text-green-500 mt-3">
            &gt; experience --years
            <div className="text-white">
              {personaData.yearsOfExperience || 0} years
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {personaData.personaSummary && (
          <div className="mb-6">
            <div className="text-green-500">&gt; cat bio.txt</div>
            <p className="text-gray-300 mt-2 text-xs leading-relaxed">
              {personaData.personaSummary}
            </p>
          </div>
        )}

        {/* Unique Value */}
        {personaData.uniqueValue && (
          <div className="mb-6">
            <div className="text-green-500">&gt; value_prop --show</div>
            <p className="text-gray-300 mt-2 text-xs italic">
              {personaData.uniqueValue}
            </p>
          </div>
        )}

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            {/* Skills */}
            {personaData.keySkills && personaData.keySkills.length > 0 && (
              <div className="mb-6">
                <div className="text-green-500">&gt; skills --list</div>
                <div className="text-gray-300 mt-2">
                  {personaData.keySkills.map((skill, index) => (
                    <div key={index}>
                      <span className="text-green-500">◆</span> {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {personaData.achievements &&
              personaData.achievements.length > 0 && (
                <div className="mb-6">
                  <div className="text-green-500">&gt; achievements --list</div>
                  <div className="text-gray-300 mt-2">
                    {personaData.achievements.map((achievement, index) => (
                      <div key={index}>
                        <span className="text-green-500">✓</span> {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Right Column */}
          <div>
            {/* Specializations */}
            {personaData.specializations &&
              personaData.specializations.length > 0 && (
                <div className="mb-6">
                  <div className="text-green-500">
                    &gt; specializations --show
                  </div>
                  <div className="text-gray-300 mt-2">
                    {personaData.specializations.map((spec, index) => (
                      <div key={index}>
                        <span className="text-green-500">◆</span> {spec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Industry Expertise */}
            {personaData.industryExpertise &&
              personaData.industryExpertise.length > 0 && (
                <div className="mb-6">
                  <div className="text-green-500">&gt; industries --list</div>
                  <div className="text-gray-300 mt-2">
                    {personaData.industryExpertise.map((industry, index) => (
                      <div key={index}>
                        <span className="text-green-500">◆</span> {industry}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Career Goals */}
        {personaData.careerGoals && (
          <div className="mt-6 pt-4 border-t border-green-500">
            <div className="text-green-500">&gt; career_goals --show</div>
            <p className="text-gray-300 mt-2 text-xs leading-relaxed">
              {personaData.careerGoals}
            </p>
          </div>
        )}

        {/* Recommendations */}
        {personaData.recommendations &&
          personaData.recommendations.length > 0 && (
            <div className="mt-6 pt-4 border-t border-green-500">
              <div className="text-green-500">
                &gt; recommendations --display
              </div>
              <ul className="text-gray-300 mt-2 space-y-1">
                {personaData.recommendations.map((rec, index) => (
                  <li key={index} className="text-xs">
                    <span className="text-green-500">{index + 1}.</span> {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }

  // Default template (fallback)
  return (
    <div className="persona-preview p-8 bg-white max-w-[8.5in] mx-auto min-h-[11in]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {personaData.personaName || "Persona"}
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          {personaData.professionalTitle || "Professional"}
        </p>
        {personaData.personaSummary && (
          <p className="text-gray-700 mt-6">{personaData.personaSummary}</p>
        )}
        {personaData.careerGoals && (
          <div className="mt-8 pt-6 border-t border-gray-300">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Career Goals
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personaData.careerGoals}
            </p>
          </div>
        )}
        {personaData.recommendations &&
          personaData.recommendations.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-300">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Personal Branding Recommendations
              </h2>
              <ul className="space-y-2">
                {personaData.recommendations.map((rec, index) => (
                  <li key={index} className="flex text-gray-700">
                    <span className="text-gray-600 mr-3 font-bold">
                      {index + 1}.
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
