import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/SignInPage.jsx";
import Home from "./components/Home.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import {ClerkProvider} from '@clerk/clerk-react'
import SignUpPage from "./auth/SignUpPage.jsx";
import EditResume from "./components/dashboard/EditResume.jsx";
import EditResumeWindow from "./components/Templates/EditResumeWindow.jsx"
import ViewResume from "./my-resume/[resumeId]/view/index.jsx";
import AtsScoring from "./AtsScoring/AtsScoring.jsx";
import ImageUpload from "./AtsScoring/ImageUploadAts.jsx";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import AboutUs from "./components/Templates/AboutUs.jsx";

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
        element: <EditResume/>,
      },
      {
        path: "/edit/:templateId",
        element: <EditResumeWindow/>,
      },
      {
        path: "/ManualAtsScoring",
        element: <AtsScoring />,
      },
      {
        path: "/ImageAtsScoring",
        element: <ImageUpload />,
      },
      {
        path: "/ManualAtsScoring",
        element: <AtsScoring />,
      },
      {
        path: "/ImageAtsScoring",
        element: <ImageUpload />,
      },
      {
        path: '/termsandconditions',
        element: <TermsAndConditions/>,
      },
      {
        path: '/aboutus',
        element: <AboutUs/>,
      }
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
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume />,
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      </ClerkProvider>
  </StrictMode>
);
