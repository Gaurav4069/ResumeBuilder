import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Chatbot from "./Chatbot.jsx";
import Footer from "./components/Footer.jsx";


function App() {
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
