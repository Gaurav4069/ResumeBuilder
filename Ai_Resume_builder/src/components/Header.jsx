import React from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img src="/logo.svg" width={100} height={100} />
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 active:scale-95 transition">
              Dashboard
            </button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 active:scale-95 transition">
            Get Started
          </button>
        </Link>
      )}
    </div>
  );
};

export default Header;
