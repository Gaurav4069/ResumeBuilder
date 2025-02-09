import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom";

const buttons = [
  { id: 1, text: "Check Your ATS Score Manually", className: "btn btn-primary", path: "/ManualAtsScoring" },
  { id: 2, text: "Check Your ATS Score via Resume", className: "btn btn-success", path: "/ImageAtsScoring" },
];

const ATSComponent = () => {
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="relative  h-10 bg-slate-900 overflow-hidden flex items-center">
      <motion.button
        key={buttons[currentButtonIndex].id}
        className={buttons[currentButtonIndex].className}
        initial={{ x: "0" }} // Start outside from the left
        animate={{ x: "100vw" }} // Move to the right
        transition={{ duration: 12, ease: "linear" }}
        onClick={() => navigate(buttons[currentButtonIndex].path)} // Navigate on click
        onAnimationComplete={() =>
          setCurrentButtonIndex((prev) => (prev + 1) % buttons.length)
        }
      >
        {buttons[currentButtonIndex].text}
      </motion.button>
    </div>
  );
};

export default ATSComponent;
