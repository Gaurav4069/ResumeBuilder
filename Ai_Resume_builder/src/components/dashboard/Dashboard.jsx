import React, { useEffect, useState } from "react";
import AddResume from "./AddResume.jsx";
import ResumeDialog from "./ResumeDialog.jsx";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../../routes/GlobalApi.js";
import ResumeCardItem from "./ResumeCardItem.jsx";
const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    //whenever user have resume list or changed resume list
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
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p className="m-4 ml-0 mt-0">
        Start Creating AI resume for your next Job role
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div onClick={() => setOpenDialog(true)}>
          <AddResume />
        </div>
        {/* mapping all the resume list of user */}
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} />
          ))}
      </div>

      {/* Dialog Box */}
      <ResumeDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default Dashboard;
