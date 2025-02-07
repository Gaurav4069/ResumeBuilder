import React, { useState } from "react";
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
import { Link } from "react-router-dom";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  return (
    <div>
      <div className="flex justify-between items-center">
              {/* Theme Button with LayoutGrid Icon */}
              <div className="flex gap-5">
                  <Link to={'/dashboard'}>
                      <button className="border border-gray-500 text-white bg-blue-500 px-4 py-2 rounded flex gap-2"><Home/></button>
                  </Link>
        <button className="border border-gray-500 text-gray-500 px-4 py-2 rounded flex gap-2">
          <LayoutGrid /> {/* Add icon inside the button */}
          Theme
                  </button>
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
            disabled={activeFormIndex === 5}
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
      ) : null}

      {/* Other sections */}
    </div>
  );
}

export default FormSection;
