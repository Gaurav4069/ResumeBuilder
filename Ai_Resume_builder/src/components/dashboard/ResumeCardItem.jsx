import {
  Trash2,
  Download,
  Edit,
  Eye,
  FileText,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import GlobalApi from "../../../routes/GlobalApi";
import toast from "react-hot-toast";

const ResumeCardItem = ({ resume, onDeleteSuccess }) => {
  const navigation = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const onDelete = () => {
    GlobalApi.DeleteResumeById(resume.documentId)
      .then(() => {
        toast.success("Deleted Successfully");
        onDeleteSuccess(resume.documentId);
        navigation("/dashboard");
      })
      .catch(() => {
        toast.error("Error deleting resume");
      });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative border rounded-lg shadow-md bg-slate-500 
      transform hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-auto p-4"
    >
      {/* Dropdown - Top Left */}
      <div className="absolute top-2 left-2" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-transparent border-none p-0"
        >
          <FaChevronDown size={20} className="text-white hover:text-red-400 transition-colors" />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-6 left-0 w-auto bg-white backdrop-blur-md p-2 rounded-md shadow-md">
            <ul className="space-y-2 text-black">
              <li
                className="cursor-pointer hover:text-blue-400 transition"
                onClick={() => navigation(`/dashboard/resume/${resume.documentId}/edit`)}
              >
                <Edit className="inline-block mr-2 text-blue-500" /> Edit
              </li>
              <li
                className="cursor-pointer hover:text-green-400 transition"
                onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}
              >
                <Eye className="inline-block mr-2 text-green-500" /> View
              </li>
              <li
                className="cursor-pointer hover:text-blue-600 transition"
                onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}
              >
                <Download className="inline-block mr-2 text-blue-700" /> Download
              </li>
              <li
                className="cursor-pointer hover:text-red-400 transition"
                onClick={onDelete}
              >
                <Trash2 className="inline-block mr-2 text-red-600" /> Delete
              </li>
            </ul>
          </div>
        )}
      </div>

      <Link
        to={`/dashboard/resume/${resume.documentId}/edit`}
        className="flex-grow"
      >
        {/* Resume Preview Box */}
        <div
          className="flex flex-col justify-center items-center bg-gray-300 rounded-lg 
          border-2 border-dashed border-gray-300 py-10 px-6 hover:bg-gray-100 
          transition-all duration-300 cursor-pointer"
        >
          <FileText className="w-16 h-16 text-gray-700 hover:text-gray-900 transition-all duration-300" />
          <p className="mt-3 text-gray-700 text-lg font-semibold">
            Resume Preview
          </p>
        </div>

        {/* Title & Created Date */}
        <div className="mt-4 text-center">
          <h2
            className="font-bold text-black text-lg tracking-wide 
            hover:text-black transition-colors duration-300"
          >
            {resume.title}
          </h2>
          <p className="text-sm text-white italic mt-1 font-bold">
            Created on:
            <span className="font-semibold ml-1">
              {new Date(resume.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ResumeCardItem;
