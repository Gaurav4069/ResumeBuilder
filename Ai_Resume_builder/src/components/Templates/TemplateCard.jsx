export default function TemplateCard({ template, onSelect }) {
    return (
      <div className="card" onClick={() => onSelect(template)}>
        {/* <img 
          src={template.attributes.thumbnail?.url} 
          alt={template.attributes.title}
        /> */}
        <h3>{template.attributes.title}</h3>
      </div>
    );
  }