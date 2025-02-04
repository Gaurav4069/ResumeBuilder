import React from "react";
import { Plus } from "lucide-react";

const AddResume = () => {
  return (
    <div
      className="h-[200px] w-[200px] border 
      flex items-center justify-center 
      rounded-full bg-gradient-to-r from-blue-500 to-purple-500
      hover:scale-105 transition-all hover:shadow-lg 
      cursor-pointer border-dashed mt-20"
    >
      <Plus size={100} color="white" />
    </div>
  );
};

export default AddResume;
