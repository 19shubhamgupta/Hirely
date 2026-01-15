export default function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
}) {
  const templates = [
    { id: "template1", name: "Classic Professional" },
    { id: "template2", name: "Modern Clean" },
    { id: "template3", name: "Creative Modern" },
    { id: "template4", name: "Minimalist Black & White" },
    { id: "template5", name: "Two Column Layout" },
    { id: "template6", name: "Modern Tech" },
    { id: "template7", name: "Corporate Executive" },
  ];

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">
        Select Template
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              selectedTemplate === template.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}
