import { UserButton } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import SummeryAi from "./SummeryAi";
import TemplateCard from "./Templates/TemplateCard";
import TemplatePreviewModal from "./Templates/TemplatePreviewModal";
import GlobalApi from "../../routes/GlobalApi.js";

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const getTemplates = async () => {
      const data = await GlobalApi.fetchTemplates();
      setTemplates(data);
    };
    getTemplates();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-opacity-40 min-h-screen flex flex-col items-center py-10">
      <div className="container w-full max-w-7xl px-6">
        <h1 className="text-4xl font-extrabold text-center text-pretty mb-8">
          Resume Templates
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={setSelectedTemplate}
              thumbnail={template.thumbnailUrl} // Pass thumbnail URL
            />
          ))}
        </div>

        {selectedTemplate && (
          <TemplatePreviewModal
            template={selectedTemplate}
            onClose={() => setSelectedTemplate(null)}
            preview_image={selectedTemplate.preview_imageUrl} // Pass preview image URL
          />
        )}
      </div>

      {/* <SummeryAi/> */}
    </div>
  );
};

export default Home;
