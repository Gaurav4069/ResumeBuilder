import React, { useState } from "react";
import AddResume from "./AddResume.jsx";
import ResumeDialog from "./ResumeDialog.jsx";

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);

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
      </div>

      {/* Dialog Box */}
      <ResumeDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default Dashboard;
