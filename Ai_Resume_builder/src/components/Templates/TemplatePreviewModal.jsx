import { useNavigate } from 'react-router-dom';

export default function TemplatePreviewModal({ template, onClose }) {
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    navigate(`/edit/${template.id}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <img 
          src={template.attributes.preview_image.url} 
          alt="Template Preview"
        />
        <button onClick={handleUseTemplate} className="use-btn">
          Use Template
        </button>
      </div>
    </div>
  );
}