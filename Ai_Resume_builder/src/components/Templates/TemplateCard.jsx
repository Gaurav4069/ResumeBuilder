const TemplateCard = ({ template, onSelect, thumbnail }) => {
  return (
    <div
      className="border rounded-lg shadow-md p-4 bg-gradient-to-r from-blue-500 to-purple-500 w-[270px] cursor-pointer"
      onClick={() => onSelect(template)}
    >
      <div
        className="p-4 flex justify-center items-center bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg h-[300px] w-[235px] hover:scale-105 transition-all hover:shadow-md border-dashed"
      >
        <img
          src={thumbnail}
          alt={template.title || "Template"}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h2 className="text-center my-2 font-semibold text-white">{template.title}</h2>
    </div>
  );
};

export default TemplateCard;
