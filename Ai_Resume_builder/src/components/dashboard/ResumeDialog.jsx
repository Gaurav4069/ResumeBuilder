import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from "../../../routes/GlobalApi.js";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResumeDialog = ({ open, setOpen }) => {
  const [resumeTitle, setResumeTitle] = useState();
  const [loading,setLoading]=useState(false);
  const navigation=useNavigate();
  const {user}=useUser();
  const onCreate=()=>{
    setLoading(true);
    const uuid=uuidv4();
    const data={
      data:{
        title:resumeTitle,
        resumeID:uuid,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName
      }
    }
    GlobalApi.CreateNewResume(data).then(resp=>{
      if(resp){
        setLoading(false)
        navigation(`/dashboard/resume/:${resp.data.data.documentId}/edit`)//document id by strapi, uuid can also be used
      }
      console.log(resp)
    },(error)=>{
      setLoading(false)
    })
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
            {loading?
            <Loader2 className='animate-spin' />:'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeDialog;
