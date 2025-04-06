import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useUser();
  const text = "WELCOME TO OUR AI RESUME BUILDER WEBSITE";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let typingInterval;
    if (index < text.length) {
      typingInterval = setInterval(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 2000); // Wait for 2 seconds before restarting
    }

    return () => clearInterval(typingInterval);
  }, [index]);

  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md bg-[#1B262C] rounded-lg text-white border-b border-black dark:border-gray-600">
      {/* bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 */}
      {/* Logo */}
      <img src="/logo.png" className="w-16 h-16 rounded-full object-cover" alt="Logo" />

      {/* Welcome Text with Typewriter Effect */}
      <h2 className="text-xl font-semibold text-center min-w-[220px] text-[#FAE6D1]">
        {displayText}
        <span className="animate-pulse text-blue-500">|</span> {/* Blinking cursor effect */}
      </h2>

      {/* User Authentication Buttons */}
      <div className="flex gap-4 items-center">
        {/* Show Home button if not on the home page */}
        {location.pathname !== "/" && (
          <Link to="/">
            <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 active:scale-95 transition">
              Home
            </button>
          </Link>
        )}

        {/* User Authentication Buttons */}
        {isSignedIn ? (
          <>
            <Link to="/dashboard">
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 active:scale-95 transition">
                Dashboard
              </button>
            </Link>
            <UserButton />
          </>
        ) : (
          <Link to="/auth/sign-in">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 active:scale-95 transition">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;