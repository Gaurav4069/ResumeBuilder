import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Chatbot from "./Chatbot.jsx";
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <>
      <Toaster />
    <Header/>
      <Outlet />
      <Chatbot />
      <Footer />
   
  </>
  );
}

export default App;
