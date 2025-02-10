import React, { useEffect, useState } from "react";
import AddResume from "./AddResume.jsx";
import ResumeDialog from "./ResumeDialog.jsx";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../../routes/GlobalApi.js";
import ResumeCardItem from "./ResumeCardItem.jsx";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const { user } = useUser();
  const {resumeID}=useParams();


  useEffect(() => {
    user && GetResumeList();
  }, [user]);
  const GetResumeList = () => {
    if (!user) return;
    GlobalApi.GetUserResumes(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        setResumeList(resp?.data?.data); 
      })
      .catch((err) => console.error("Error fetching resumes:", err.response?.data || err));
  };

  const removeDeletedResume = (deletedId) => {
    setResumeList((prevList) => prevList.filter((resume) => resume.documentId !== deletedId));
  };  

  return (
    <div className="p-10 md:px-20 lg:px-32  bg-gradient-to-br from-gray-500 via-gray-700 to-black ">
     <h2 className="font-bold text-3xl text-center text-gray-100 underline underline-offset-10 decoration-red-600 decoration-4">
    My Resumes
  </h2>
  <p className="m-8 ml-0 mt-0 text-center text-yellow-400 text-lg">
    Start creating AI-powered resumes for your next job role.
  </p>
      {/* Add spacing with 'gap-6' for grid items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div onClick={() => setOpenDialog(true)}>
          <AddResume />
        </div>

        {/* Map through resumeList and render ResumeCardItem components */}
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} onDeleteSuccess={removeDeletedResume} />
          ))}
      </div>

      {/* Dialog Box */}
      <ResumeDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default Dashboard;
