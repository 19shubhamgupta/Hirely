import React from "react";

export default function PersonaForm({
  personaData,
  onPersonaChange,
  onAddArrayItem,
  onRemoveArrayItem,
  onArrayItemChange,
}) {
  return (
    <div className="space-y-6">
      {/* Persona Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Persona Name
        </label>
        <input
          type="text"
          value={personaData.personaName}
          onChange={(e) => onPersonaChange("personaName", e.target.value)}
          placeholder="e.g., Tech Leader"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Professional Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Title
        </label>
        <input
          type="text"
          value={personaData.professionalTitle}
          onChange={(e) => onPersonaChange("professionalTitle", e.target.value)}
          placeholder="e.g., Senior Software Engineer"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience
        </label>
        <input
          type="number"
          value={personaData.yearsOfExperience}
          onChange={(e) =>
            onPersonaChange("yearsOfExperience", parseInt(e.target.value) || 0)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Specializations */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specializations
        </label>
        <div className="space-y-2">
          {(personaData.specializations || []).map((spec, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={spec}
                onChange={(e) =>
                  onArrayItemChange("specializations", index, e.target.value)
                }
                placeholder="e.g., Cloud Architecture"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => onRemoveArrayItem("specializations", index)}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => onAddArrayItem("specializations")}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
          >
            + Add Specialization
          </button>
        </div>
      </div>

      {/* Key Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Skills
        </label>
        <div className="space-y-2">
          {(personaData.keySkills || []).map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) =>
                  onArrayItemChange("keySkills", index, e.target.value)
                }
                placeholder="e.g., Leadership"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => onRemoveArrayItem("keySkills", index)}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => onAddArrayItem("keySkills")}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
          >
            + Add Skill
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Achievements
        </label>
        <div className="space-y-2">
          {(personaData.achievements || []).map((achievement, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                value={achievement}
                onChange={(e) =>
                  onArrayItemChange("achievements", index, e.target.value)
                }
                placeholder="e.g., Led migration of 100+ services to cloud"
                rows="2"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => onRemoveArrayItem("achievements", index)}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg h-fit"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => onAddArrayItem("achievements")}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
          >
            + Add Achievement
          </button>
        </div>
      </div>

      {/* Industry Expertise */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry Expertise
        </label>
        <div className="space-y-2">
          {(personaData.industryExpertise || []).map((industry, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={industry}
                onChange={(e) =>
                  onArrayItemChange("industryExpertise", index, e.target.value)
                }
                placeholder="e.g., FinTech"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => onRemoveArrayItem("industryExpertise", index)}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => onAddArrayItem("industryExpertise")}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
          >
            + Add Industry
          </button>
        </div>
      </div>

      {/* Career Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Career Goals
        </label>
        <textarea
          value={personaData.careerGoals}
          onChange={(e) => onPersonaChange("careerGoals", e.target.value)}
          placeholder="Describe your career aspirations..."
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Personal Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Personal Summary
        </label>
        <textarea
          value={personaData.personaSummary}
          onChange={(e) => onPersonaChange("personaSummary", e.target.value)}
          placeholder="Write a compelling summary of your professional persona..."
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Unique Value */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Unique Value Proposition
        </label>
        <textarea
          value={personaData.uniqueValue}
          onChange={(e) => onPersonaChange("uniqueValue", e.target.value)}
          placeholder="What makes you unique in your field?"
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
