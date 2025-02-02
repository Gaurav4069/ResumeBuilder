import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const ResumeDialog = ({ open, setOpen }) => {
  const [resumeTitle, setResumeTitle] = useState();
  const onCreate=()=>{
    const uuid=uuidv4();
    console.log(resumeTitle,uuid);
  }
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold">Create New Resume</h2>
        <p className="text-gray-600 mt-2">Add a title for your new resume</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
          placeholder="Ex. Full Stack Resume"
          onChange={(e) => setResumeTitle(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md ${
              !resumeTitle ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={!resumeTitle}
            // onClick={() => setOpen(false)}
            onClick={()=>onCreate()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeDialog;
