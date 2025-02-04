import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeCardItem = ({ resume }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-gradient-to-r from-blue-500 to-purple-500 w-[270px]">
      <Link to={"/dashboard/resume/" + resume.resumeID + "/edit"}>
        <div
          className="p-14 py-24 border 
        items-center flex justify-center bg-gradient-to-r from-blue-300 to-purple-300
        rounded-lg h-[300px] w-[235px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed"
        >
          <Notebook />
        </div>
        <h2 className="text-center my-2 font-semibold">{resume.title}</h2>
        <p className="text-center text-sm text-white">
          Created on: {new Date(resume.createdAt).toLocaleDateString()}
        </p>
      </Link>
    </div>
  );
};

export default ResumeCardItem;
