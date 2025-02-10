
# Ai Resume Builder

The AI Resume Builder is a web-based application designed to help users create, edit, share, download, and preview professional resumes effortlessly. It integrates AI-powered enhancements, live JSON-based editing, and structured resume formatting to streamline the resume creation process. The platform is built using React, Strapi CMS, SQLite, and Clerk for authentication, ensuring a seamless user experience.


## Tech Stack

**Client:** React.js, TailwindCSS, BootStrap, Clerk Authentication, Ai Enhancements

**Server:** Node, Strapi CMS with SQLite


## Features

- Dashboard:

    1. Displays all user-created resumes. Provides an option to create a new resume via the Add Resume button

    2. Uses ResumeCardItem to render each resume with edit, view, download, and delete options.

    3. A clickable button that allows users to create a new resume. Generates a UUID for the resume and saves it in the database.
- Edit Resume:

    1. Allows users to modify their resume details. Includes a form section for input and a live preview of the resume.

    2. Uses context providers to manage resume data and AI-generated summaries.

    3. Represents each resume as a card in the dashboard. Uses GlobalApi to handle backend interactions.

- Resume Templates:

    1. Users can browse and select from pre-designed resume templates.

    2. Handles JSON-based resume editing. Users can modify their resume structure in JSON format and save changes to Strapi. Provides validation and updates the UI in real time.

    3. Generates a professional PDF preview of the resume using @react-pdf/renderer. Dynamically formats sections like experience, education, skills, and publications from JSON data.

    4. Provides a modal view of a selected resume template. Displays template details, sections, and a preview image. Allows users to proceed with editing or creating a resume based on the template.
- AI Integration:

    1. Chatbot Assistance- An interactive AI chatbot guides users through resume creation. Answers job-related queries and formatting best practices.

    2. ATS Score Analyzer- Evaluates the resume against Applicant Tracking System (ATS) standards. Scores the resume based on keywords, formatting, and readability. Provides real-time suggestions to improve ATS compatibility.

    3. AI-Powered Summary Generator- Automatically generates professional summaries based on user experience. Enhances resume content with well-structured and impactful statements. Allows one-click enhancements to refine job descriptions and achievements.

    4. Geocoding Suggestions- As users type their address, the system fetches location suggestions using the LocationIQ API. Users can select an address from the dropdown to auto-fill the address field. Selected addresses are saved and updated in Strapi CMS.







## Other Features
    1. Resume Download & Share
    
        1. Users can download their resume as a PDF.
        2. Option to share the resume link via email or social media.

    2. Feedback & Email Notifications
    
        1. Users receive email notifications for important updates.
        2. Employers or recruiters can provide feedback for Website.
    
    3. Login & Sign Up
    
        1. Secure email-based authentication using Clerk.
        2. OTP-based authentication for enhanced security.
        3. Users receive a welcome email upon successful registration.

