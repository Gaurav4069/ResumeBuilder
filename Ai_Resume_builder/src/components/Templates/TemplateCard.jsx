const TemplateCard = ({ template, onSelect, thumbnail }) => {
  return (
    <div
      className="border border-gray-800 rounded-xl shadow-lg p-4 bg-gradient-to-br from-[#1e293b] to-[#0f172a] 
      bg-opacity-80 backdrop-blur-md w-[270px] cursor-pointer transition-all hover:shadow-blue-500/30 hover:scale-105"
      onClick={() => onSelect(template)}
    >
      <div
        className="p-3 flex justify-center items-center bg-[#1c1f26] rounded-lg h-[300px] w-[225px] 
        hover:scale-105 transition-all hover:shadow-md border border-gray-700"
      >
        <img
          src={thumbnail}
          alt={template.title || 'Template'}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <h2 className="text-center my-3 font-semibold text-gray-200 tracking-wide">{template.title}</h2>
    </div>
  );
};

export default TemplateCard;
