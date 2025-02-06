import React from "react";
import { Plus } from "lucide-react";

const AddResume = () => {
  return (
    <div
      className="h-[160px] w-[160px] border-4 border-cyan-400 
      flex items-center justify-center rounded-full 
      bg-blue-700 hover:bg-blue-800 cursor-pointer mt-20 
      shadow-lg hover:shadow-cyan-500/50 
      animate-scalePulse"
    >
      {/* Animated Plus Icon */}
      <Plus 
        size={65} 
        className="text-yellow-400 
        animate-bounce transition-transform 
        duration-[1500ms] ease-in-out"
      />
    </div>
  );
};

export default AddResume;
