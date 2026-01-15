import React, { useState, useEffect } from "react";

export default function SavePersonaModal({
  onClose,
  onSave,
  title = "Save Persona",
  placeholder = "Enter persona name...",
  initialValue = "",
  isLoading = false,
}) {
  const [personaName, setPersonaName] = useState(initialValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setPersonaName(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    if (!personaName.trim()) {
      setError("Please enter a persona name");
      return;
    }

    setError("");
    onSave(personaName.trim());
  };

  const handleClose = () => {
    setPersonaName(initialValue);
    setError("");
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border-4 border-blue-600 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={personaName}
            onChange={(e) => {
              setPersonaName(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !personaName.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
