import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TemplatePreviewModal = ({ template, onClose, preview_image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (template) {
      setIsOpen(true); // Trigger animation when the modal is open
    }
  }, [template]);

  const handleUseTemplate = () => {
    // Navigate to the editing page with the template structure
    navigate(`/edit/${template.id}`, { state: { templateStructure: template.structure } });
  };

  return (
    <div
      className={`modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-all ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="modal-content bg-white rounded-lg overflow-hidden w-[70%] h-[80%] flex animate-fade-in">
        {/* Template Preview Image */}
        <div className="preview-image-container flex-1">
          <img
            src={preview_image}
            alt={template.title || "Preview Image"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Template Info */}
        <div className="template-info flex-1 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded-full"
          >
            Close
          </button>
          <h2 className="text-2xl font-semibold text-center my-4">{template.title}</h2>
          {/* Render other template details here */}
          <div className="user-template-btn-container flex justify-center mt-6">
            <button
              onClick={handleUseTemplate}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all"
            >
              Use this Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
