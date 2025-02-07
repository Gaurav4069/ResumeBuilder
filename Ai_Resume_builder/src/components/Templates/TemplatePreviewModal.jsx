import { useUser } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TemplatePreviewModal = ({ template, onClose, preview_image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {user,isLoaded,isSignedIn}=useUser();

  useEffect(() => {
    if (template) {
      setIsOpen(true);
    }
  }, [template]);

  const handleUseTemplate = () => {
    if(!user && isLoaded && !isSignedIn){
      navigate("/auth/sign-in");
    }
    else{
      navigate(`/edit/${template.id}`, { state: { templateStructure: template.structure } });
    } 
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-all ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg overflow-hidden w-[70%] h-[90%] flex flex-col shadow-lg animate-fade-in">
        <div className="flex flex-1 overflow-hidden">
          {/* Template Preview Image */}
          <div className="w-1/2 h-full">
            <img
              src={preview_image}
              alt={template.title || "Preview Image"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Template Info */}
          <div className="w-1/2 p-6 flex flex-col justify-between overflow-auto">
            <div>
              <h2 className="text-2xl font-semibold text-center text-black">{template.title}</h2>

              {/* Close Button */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={onClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all"
                >
                  Close
                </button>
              </div>

              {/* Resume Sections */}
              {template.structure && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-700">Sections:</h3>
                  <ul className="list-disc pl-5 mt-2 text-gray-600">
                    {Object.keys(template.structure).map((section, index) => (
                      <li key={index} className="capitalize">
                        {section}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Use Template Button */}
            <div className="flex justify-center mt-4 mb-4">
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
    </div>
  );
};

export default TemplatePreviewModal;
