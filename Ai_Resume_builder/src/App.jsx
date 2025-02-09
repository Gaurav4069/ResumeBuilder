import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Chatbot from "./Chatbot.jsx";
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import ATSComponent from "./AtsScoring/AtsComponent.jsx";




function App() {
  return (
    <>
      <Toaster />
      <Header />
      <ATSComponent />
      <Outlet />
      <Chatbot />
      <Footer />
   
  </>
  );
}

export default App;
