import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Chatbot from "./Chatbot.jsx";
import Footer from "./components/Footer.jsx";


function App() {
 
  const {isLoaded,isSignedIn}=useUser();
  if(isLoaded && !isSignedIn){
    return <Navigate to={'/auth/sign-in'}/>
  }
  return (
    <>
    <Header/>
      <Outlet />
      <Chatbot />
      <Footer />
   
  </>
  );
}

export default App;
