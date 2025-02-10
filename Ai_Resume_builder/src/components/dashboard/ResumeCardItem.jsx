import { Trash2, Download, Edit, Eye, FileText, MoreVertical } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import GlobalApi from "../../../routes/GlobalApi";
import toast from "react-hot-toast";

const ResumeCardItem = ({ resume ,onDeleteSuccess}) => {
  const navigation = useNavigate();
  const onDelete = () => {
    GlobalApi.DeleteResumeById(resume.documentId).then((resp) => {
      toast.success("Deleted Successfully");
      console.log('resume.documentId',resume.documentId);
      onDeleteSuccess(resume.documentId);
      navigation('/dashboard');
    }).catch((err) => {
      toast.error("Error deleting resume");
    })
  }

  return (
    <div
      className="relative border rounded-lg shadow-md bg-slate-500 
      transform hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-auto p-4"
    >
      {/* Dropdown - Top Left */}
      <div className="absolute top-2 left-2">
        <Dropdown>
          <Dropdown.Toggle
            variant="blank"
            className="p-0 border-none bg-transparent shadow-none 
            hover:bg-transparent rounded-full transition-all duration-200"
          >
            <MoreVertical size={20} className="text-white hover:text-red-400 transition-colors" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-auto">
            <Dropdown.Item onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")} > <Edit className="text-blue-500"/> Edit</Dropdown.Item>
            <Dropdown.Item  onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}> <Eye/>View </Dropdown.Item>
            <Dropdown.Item  onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}> <Download className="text-blue-700"/> Download </Dropdown.Item>
            <Dropdown.Item onClick={onDelete}><Trash2 className="text-red-600"/> Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    

      <Link to={`/dashboard/resume/${resume.documentId}/edit`} className="flex-grow">
        {/* Resume Preview Box */}
        <div
          className="flex flex-col justify-center items-center bg-gray-300 rounded-lg 
          border-2 border-dashed border-gray-300 py-10 px-6 hover:bg-gray-100 
          transition-all duration-300 cursor-pointer"
        >
          <FileText className="w-16 h-16 text-gray-700 hover:text-gray-900 transition-all duration-300" />
          <p className="mt-3 text-gray-700 text-lg font-semibold">Resume Preview</p>
        </div>

        {/* Title & Created Date */}
        <div className="mt-4 text-center">
          <h2
            className="font-bold text-gray-300 text-lg tracking-wide 
            hover:text-red-600 transition-colors duration-300"
          >
            {resume.title}
          </h2>
          <p className="text-sm text-white italic mt-1 font-bold">
            Created on:
            <span className=" font-semibold ml-1">
              {new Date(resume.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ResumeCardItem;
