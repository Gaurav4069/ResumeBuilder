import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

export default function App() {
  const {user,isLoaded,isSignedIn}=useUser();
  if(isLoaded && !isSignedIn){
    return <Navigate to={'/auth/sign-in'}/>
  }
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}