import React, { useState } from "react";
import { AichatSession } from "../Service/AiModel";
import Chatbot from "./Chatbot";
import AtsScoring from "./AtsScoring";
import ImageUpload from "./ImageUploadAts";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

import React from "react";

function App() {
 
  const {user,isLoaded,isSignedIn}=useUser();
  if(isLoaded && !isSignedIn){
    return <Navigate to={'/auth/sign-in'}/>
  }
  return (
    <>
    <Header/>
    <Outlet/>
   
  </>
  );
}

export default App;
