import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/SignInPage.jsx";
import Home from "./components/Home.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import {ClerkProvider} from '@clerk/clerk-react'
import SignUpPage from "./auth/SignUpPage.jsx";
import EditResumeUser from "./components/dashboard/EditResumeUser.jsx";
import EditResume from "./components/Templates/EditResume.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/",  
    element: <App />,
    children: [
      {
        index: true,  
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeID/edit",
        element: <EditResumeUser />,
      },
      {
        path: "/edit/:templateId",
        element: <EditResume/>,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUpPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      </ClerkProvider>
  </StrictMode>
);
