import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PersonaForm from "../Components/PersonaForm";
import PersonaPreview from "../Components/PersonaPreview";
import toast, { Toaster } from "react-hot-toast";
import { useSavedPersonaStore } from "../store/useSavedPersonaStore";
import SavePersonaModal from "../Components/SavePersonaModal";

export default function PersonaBuilder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateFromUrl = searchParams.get("template") || "professional";
  const personaIdFromUrl = searchParams.get("personaId");
  const resumeIdFromUrl = searchParams.get("resumeId");

  const {
    createPersona,
    updatePersona,
    getPersonaById,
    isSavingPersona,
    getUserPersonas,
    createPersonaFromResume,
    isLoadingPersona,
  } = useSavedPersonaStore();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPersonaId, setCurrentPersonaId] = useState(null);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const [personaData, setPersonaData] = useState({
    personaName: "",
    templateName: templateFromUrl,
    professionalTitle: "",
    yearsOfExperience: 0,
    specializations: [],
    keySkills: [],
    achievements: [],
    industryExpertise: [],
    careerGoals: "",
    personaSummary: "",
    uniqueValue: "",
    recommendations: [],
  });

  const previewRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templateFromUrl);

  // Load existing persona if editing
  useEffect(() => {
    if (personaIdFromUrl) {
      loadPersona(personaIdFromUrl);
    } else if (resumeIdFromUrl) {
      loadPersonaFromResume(resumeIdFromUrl);
    }
  }, [
    personaIdFromUrl,
    resumeIdFromUrl,
    getPersonaById,
    createPersonaFromResume,
  ]);

  const loadPersona = async (id) => {
    try {
      const result = await getPersonaById(id);
      if (result.success && result.persona) {
        setPersonaData(result.persona);
        setCurrentPersonaId(id);
        setIsEditing(true);
        setSelectedTemplate(result.persona.templateName || templateFromUrl);
      }
    } catch (error) {
      console.error("Error loading persona:", error);
      toast.error("Failed to load persona");
    }
  };

  const loadPersonaFromResume = async (resumeId) => {
    try {
      toast.loading("Analyzing resume...", { id: "analyzing" });
      const result = await createPersonaFromResume(resumeId);
      toast.dismiss("analyzing");

      if (result.success && result.personaData) {
        // Pre-populate the form with extracted data
        setPersonaData((prev) => ({
          ...prev,
          ...result.personaData,
          templateName: selectedTemplate,
        }));
        toast.success("Resume analyzed successfully!");
      } else {
        toast.error(result.error || "Failed to analyze resume");
      }
    } catch (error) {
      toast.dismiss("analyzing");
      console.error("Error loading persona from resume:", error);
      toast.error("Failed to analyze resume");
    }
  };

  const handlePersonaChange = (key, value) => {
    setPersonaData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddArrayItem = (arrayKey) => {
    setPersonaData((prev) => ({
      ...prev,
      [arrayKey]: [...(prev[arrayKey] || []), ""],
    }));
  };

  const handleRemoveArrayItem = (arrayKey, index) => {
    setPersonaData((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].filter((_, i) => i !== index),
    }));
  };

  const handleArrayItemChange = (arrayKey, index, value) => {
    setPersonaData((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleChangeTemplate = (newTemplate) => {
    setSelectedTemplate(newTemplate);
    setPersonaData((prev) => ({
      ...prev,
      templateName: newTemplate,
    }));
  };

  const handleSavePersona = async (personaName) => {
    try {
      // Validate required fields
      if (!personaName || personaName.trim() === "") {
        toast.error("Please enter a persona name");
        return;
      }

      if (
        !personaData.professionalTitle ||
        personaData.professionalTitle.trim() === ""
      ) {
        toast.error("Please enter a professional title");
        return;
      }

      const dataToSave = {
        ...personaData,
        personaName: personaName.trim(),
        templateName: selectedTemplate,
      };

      if (isEditing && currentPersonaId) {
        const result = await updatePersona(
          currentPersonaId,
          personaName.trim(),
          selectedTemplate,
          dataToSave
        );
        if (result.success) {
          // Update local state with saved data
          setPersonaData(dataToSave);
          setSavedSuccessfully(true);
          toast.success("Persona updated successfully!");
          setShowSaveModal(false);
          // Refresh personas list and redirect
          setTimeout(async () => {
            await getUserPersonas();
            navigate("/my-personas");
          }, 2000);
        } else {
          toast.error(result.error || "Failed to update persona");
        }
      } else {
        const result = await createPersona(
          personaName.trim(),
          selectedTemplate,
          dataToSave
        );
        if (result.success) {
          // Update local state with saved data
          setPersonaData(dataToSave);
          setSavedSuccessfully(true);
          toast.success("Persona created successfully!");
          setShowSaveModal(false);
          // Refresh personas list and redirect
          setTimeout(async () => {
            await getUserPersonas();
            navigate("/my-personas");
          }, 2000);
        } else {
          toast.error(result.error || "Failed to create persona");
        }
      }
    } catch (error) {
      console.error("Error saving persona:", error);
      toast.error(error.message || "Failed to save persona");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {isEditing
              ? "Edit Persona"
              : resumeIdFromUrl
              ? "Create Persona from Resume"
              : "Create Career Persona"}
          </h1>
          <p className="text-gray-600">
            {isLoadingPersona
              ? "Analyzing resume with AI..."
              : "Build your professional persona and showcase your unique value"}
          </p>
          {savedSuccessfully && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-semibold">✓ Persona saved successfully!</p>
              <p className="text-sm">Redirecting to My Personas...</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-150px)] overflow-y-auto">
            {savedSuccessfully ? (
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <h3 className="font-bold text-green-800 mb-2">
                    Persona Saved Successfully!
                  </h3>
                  <p className="text-green-700 text-sm">
                    Your persona has been saved and is now displayed below.
                    Redirecting to My Personas...
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Persona Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {personaData.personaName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Title
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {personaData.professionalTitle}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <p className="text-gray-900">
                      {personaData.yearsOfExperience}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Template
                    </label>
                    <p className="text-gray-900 capitalize">
                      {selectedTemplate}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Template Selector */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Select Template
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: "professional", name: "Professional" },
                      { id: "creative", name: "Creative" },
                      { id: "technical", name: "Technical" },
                    ].map((template) => (
                      <button
                        key={template.id}
                        className={`px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedTemplate === template.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                        onClick={() => handleChangeTemplate(template.id)}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Component */}
                <PersonaForm
                  personaData={personaData}
                  onPersonaChange={handlePersonaChange}
                  onAddArrayItem={handleAddArrayItem}
                  onRemoveArrayItem={handleRemoveArrayItem}
                  onArrayItemChange={handleArrayItemChange}
                />

                {/* Save Button */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => {
                      const personaName = personaData.personaName?.trim();
                      const profTitle = personaData.professionalTitle?.trim();

                      if (!personaName) {
                        toast.error("Please enter a persona name");
                        return;
                      }
                      if (!profTitle) {
                        toast.error("Please enter a professional title");
                        return;
                      }

                      setShowSaveModal(true);
                    }}
                    disabled={isSavingPersona}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    {isSavingPersona ? "Saving..." : "Save Persona"}
                  </button>
                  <button
                    onClick={() => navigate("/my-personas")}
                    disabled={isSavingPersona}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-150px)] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
            <div
              ref={previewRef}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <PersonaPreview
                personaData={personaData}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <SavePersonaModal
          onClose={() => setShowSaveModal(false)}
          onSave={handleSavePersona}
          title="Save Persona"
          placeholder="Enter persona name..."
          initialValue={personaData.personaName}
          isLoading={isSavingPersona}
        />
      )}
    </div>
  );
}
