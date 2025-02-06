import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeCardItem = ({ resume }) => {
  return (
    <div className="border border-gray-300 rounded-xl shadow-lg p-5 bg-white w-[270px] 
      transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      <Link to={"/dashboard/resume/" + resume.resumeID + "/edit"}>
        <div
          className="p-14 py-20 border flex justify-center items-center 
          bg-gray-100 rounded-lg h-[260px] w-full hover:bg-gray-200 
          transition-all duration-300 cursor-pointer border-dashed"
        >
          <Notebook className="w-16 h-16 text-gray-600 hover:text-gray-800 transition-all duration-300" />
        </div>

        {/* Resume Title - More Readable and Bold */}
        <h2 className="text-center mt-4 font-bold text-gray-900 text-xl tracking-wide 
          hover:text-blue-600 transition-colors duration-300">
          {resume.title}
        </h2>

        {/* Created Date - Subtle but Elegant */}
        <p className="text-center text-sm text-gray-500 font-medium italic mt-2">
          Created on: 
          <span className="text-gray-700 font-semibold ml-1">
            {new Date(resume.createdAt).toLocaleDateString()}
          </span>
        </p>
      </Link>
    </div>
  );
};

export default ResumeCardItem;
