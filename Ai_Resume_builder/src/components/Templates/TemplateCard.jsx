export default function TemplateCard({ template, onSelect }) {
  // Extract thumbnail properly
  const baseUrl = "http://localhost:1337"; // Change this if deployed
  const thumbnailPath = template.thumbnail?.url || template.thumbnail;
  const imageUrl = thumbnailPath?.startsWith("/") ? baseUrl + thumbnailPath : thumbnailPath;

  return (
    <div className="card" onClick={() => onSelect(template)}>
      <img src={imageUrl} alt={template.title || "Template"} />
      <h3>{template.title}</h3>
    </div>
  );
}
