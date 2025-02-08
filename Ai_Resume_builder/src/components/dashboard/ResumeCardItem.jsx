import { FileText } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeCardItem = ({ resume }) => {
  return (
    <div
      className="border border-gray-300 rounded-xl shadow-lg p-2 bg-slate-400 
      transform hover:scale-105 transition-all duration-300 "
    >
      <Link to={"/dashboard/resume/"+ resume.documentId +"/edit"}>
<div
  className="p-16 py-24 border-2 border-dashed border-gray-400 flex flex-col 
    justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 
    rounded-xl h-72 w-full hover:bg-gray-300 hover:shadow-lg 
    transition-all duration-300 cursor-pointer"
>
  <FileText className="w-20 h-20 text-gray-500 hover:text-gray-700 transition-all duration-300" />
  <p className="mt-4 text-gray-600 text-lg font-semibold">Resume Preview</p>
</div>


        {/* Resume Title - More Readable and Bold */}
        <h2
          className="text-center mt-4 font-bold text-gray-900 text-xl tracking-wide 
          hover:text-blue-600 transition-colors duration-300"
        >
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
