import React, { useContext, useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import {
  BiRightArrowAlt as ArrowRight,
  BiLeftArrowAlt as ArrowLeft,
} from "react-icons/bi";
import { Home, LayoutGrid } from "lucide-react"; // Import LayoutGrid icon
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./Education";
import Skills from "./Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import { ResumeInfoContext } from "../../../Context/ResumeInfoContext";
import GlobalApi from "../../../../routes/GlobalApi";
import toast from "react-hot-toast";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const { resumeId } = useParams();
  const [showThemePopup, setShowThemePopup] = useState(false);
  const [themeColor, setThemeColor] = useState("#ffffff"); 
  const {setResumeInfo}=useContext(ResumeInfoContext);

  const colors = [
    "#f87171", "#ef4444", "#dc2626", "#b91c1c", // Red shades
    "#60a5fa", "#3b82f6", "#2563eb", "#1e40af", // Blue shades
    "#34d399", "#10b981", "#059669", "#047857", // Green shades
    "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", // Purple shades
    "#facc15", "#f59e0b", "#d97706", "#b45309" ,"#b00455" // Yellow/Orange shades
  ];


  const handleThemeChange = (color) => {
    setThemeColor(color);
    setShowThemePopup(false);

    // Update the theme color in ResumeInfoContext
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      themeColor: color,
    }));
    const data = {
      data: {
        themeColor: color,
      }
    }

      GlobalApi.UpdateResumeDetail(resumeId,data).then(resp=>{
        toast.success("Theme color updated successfully")
      })

  };


  return (
    <div>
      <div className="flex justify-between items-center">
              {/* Theme Button with LayoutGrid Icon */}
              <div className="flex gap-5">
                  <Link to={'/dashboard'}>
                      <button className="border border-gray-500 text-white bg-blue-500 px-4 py-2 rounded flex gap-2"><Home/></button>
                  </Link>
          {/* Theme Button */}
          <div className="relative">
            <button
              className="border border-gray-500 text-gray-800 px-4 py-2 rounded flex gap-2  bg-lime-500"
              onClick={() => setShowThemePopup(!showThemePopup)}
            >
              <LayoutGrid />
              Theme
            </button>

            {/* Theme Popup */}
            {showThemePopup && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 border border-gray-200 z-10">
                <p className="text-gray-600 text-sm mb-2">Select a theme color:</p>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                      onClick={() => handleThemeChange(color)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
                </div>

        <div className="flex gap-2 ">
          {activeFormIndex > 1 && (
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md 
    text-white font-medium transition-all duration-300 
       bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </button>
          )}
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md 
    text-white font-medium transition-all duration-300 
       bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg`}
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={activeFormIndex === 6}
          >
            Next <ArrowRight />
          </button>
        </div>
      </div>

      {/* Personal details */}
      {activeFormIndex == 1 ? (
        <PersonalDetail />
      ) : activeFormIndex == 2 ? (
        <Summery />
      ) : activeFormIndex == 3 ? (
        <Experience />
      ) : activeFormIndex == 4 ? (
        <Education />
      ) : activeFormIndex == 5 ? (
        <Skills />
              )
                : activeFormIndex == 6 ? (
                <Navigate to={'/my-resume/'+resumeId+"/view"} /> )
        : null}

      {/* Other sections */}
    </div>
  );
}

export default FormSection;
