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
  className={`fixed inset-0 flex justify-center items-center bg-[#130303] bg-opacity-100 transition-all ${
    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
  }`}
>
  {/* Glassmorphism Container */}
  <div className="relative w-[75%] h-[80%] border bg-white bg-opacity-10 backdrop-blur-xl shadow-2xl rounded-2xl flex transition-transform duration-300">
    
    {/* Left: Template Image */}
    <div className="w-1/2">
      <img
        src={preview_image}
        alt={template.title || "Preview Image"}
        className="w-full h-full object-cover rounded-l-2xl"
      />
    </div>

    {/* Right: Template Info */}
    <div className="w-1/2 p-10 flex flex-col justify-between text-white">
      <h2 className="text-4xl font-bold text-center tracking-wide">{template.title}</h2>

      {/* Sections */}
      {template.structure && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Sections Included:</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(template.structure).map((section, index) => (
              <div
                key={index}
                className="bg-white text-slate-800 bg-opacity-20 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-md"
              >
                {section}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition-all"
        >
          Close
        </button>
        <button
          onClick={handleUseTemplate}
          className="px-6 py-2 rounded-lg bg-blue-500 text-white text-lg font-medium shadow-lg hover:bg-blue-600 transition-all"
        >
          Use this Template
        </button>
      </div>
    </div>

    {/* Neon Glow Effect */}
    <div className="absolute inset-0 w-full h-full rounded-2xl border border-gray-200 opacity-10 blur-2xl pointer-events-none"></div>
  </div>
</div>

  );
};

export default TemplatePreviewModal;
