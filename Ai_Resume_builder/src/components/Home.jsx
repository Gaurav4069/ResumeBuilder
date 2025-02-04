import { UserButton } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import SummeryAi from "./SummeryAi";
import TemplateCard from "./Templates/TemplateCard";
import TemplatePreviewModal from "./Templates/TemplatePreviewModal";
import GlobalApi from "../../routes/GlobalApi.js"

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
    <div>
      <Header />

      <div className="home">
        <h1>Resume Templates</h1>
        <div className="template-grid">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={setSelectedTemplate}
            />
          ))}
        </div>

        {selectedTemplate && (
          <TemplatePreviewModal
            template={selectedTemplate}
            onClose={() => setSelectedTemplate(null)}
          />
        )}
      </div>

      {/* <SummeryAi/> */}
    </div>
  );
};

export default Home;
