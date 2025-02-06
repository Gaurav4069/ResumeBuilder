import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EditJson from "./EditJson";
import ResumePreview from "./ResumePreview"; // ✅ Import the preview component

const EditResume = () => {
  const location = useLocation();
  const [resumeData, setResumeData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [previewMode, setPreviewMode] = useState(false); // ✅ Add preview mode state

  useEffect(() => {
    if (location.state?.templateStructure) {
      const templateCopy = JSON.parse(JSON.stringify(location.state.templateStructure)); // Deep copy
      setResumeData(templateCopy);
      setEditedData(templateCopy);
    }
  }, [location.state]);

  const handleUpdate = (updatedJson) => {
    setEditedData(updatedJson);
    setPreviewMode(false); // Reset preview when editing
  };

  const handlePreview = () => {
    if (!editedData) {
      alert("No resume data available for preview.");
      return;
    }
    setPreviewMode(true); // ✅ Enable preview mode
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Resume</h2>

      {resumeData && (
        <div className="flex gap-6">
          {/* Left: JSON Editor */}
          <div className="w-1/2 p-4 border rounded shadow bg-white">
            <EditJson jsonData={editedData} onUpdate={handleUpdate} />
          </div>

          {/* Right: Resume Preview */}
          <div className="w-1/2">
            <button
              onClick={handlePreview}
              className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-600"
            >
              Preview Resume
            </button>

            {/*  Show Resume Preview when previewMode is true */}
            {previewMode && <ResumePreview jsonData={editedData} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditResume;
