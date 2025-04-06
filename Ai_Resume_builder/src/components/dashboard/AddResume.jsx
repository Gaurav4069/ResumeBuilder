import React from "react";
import { Plus } from "lucide-react";

const AddResume = () => {
  return (
    <div
      className="h-[160px] w-[160px] border border-gray-700 
      flex items-center justify-center rounded-full 
      bg-gradient-to-br from-sky-800 to-stone-700
      backdrop-blur-md  bg-opacity-70 
      cursor-pointer mt-20 shadow-xl 
      transition-all duration-300 hover:scale-105 hover:shadow-blue-600/50"
    >
      {/* Plus Icon with Elegant Glow */}
      <Plus 
        size={60} 
        className="text-gray-200 transition-transform duration-300 animate-bounce
        ease-in-out hover:scale-110 hover:text-blue-400"
      />
    </div>
  );
};

export default AddResume;
