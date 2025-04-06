
# Ai Resume Builder

The AI Resume Builder is a web-based application designed to help users create, edit, share, download, and preview professional resumes effortlessly. It integrates AI-powered enhancements, live JSON-based editing, and structured resume formatting to streamline the resume creation process. The platform is built using React, Strapi CMS, SQLite, and Clerk for authentication, ensuring a seamless user experience.

VIDEO LINK:  https://drive.google.com/file/d/18kIcubInjtP_-0yJI_Dn4zXScX74Rq9J/view?usp=sharing


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

## Screenshots of website

![Home Screen/Herosection](https://github.com/user-attachments/assets/b396d2a1-9986-4303-9bac-466e69d17ad1)
![Features](https://github.com/user-attachments/assets/1b2b5712-f0a7-497a-a0ae-8b26e552a4c8)
![PreDefined Resume Templates](https://github.com/user-attachments/assets/17d2815a-1a0a-4f72-8c17-8a4d81a08921)
![Resume Template Preview](https://github.com/user-attachments/assets/5ab4be6b-f1d2-40ca-a91d-ce7e456bcfb4)
![Edit Template and View Resume + Download](https://github.com/user-attachments/assets/dfdc378f-b093-45f7-867b-746e477582ee)
![DashBoard + CRUD options](https://github.com/user-attachments/assets/22d88295-dbb1-4a6a-96db-58f4226ded2c)
![Manually Create Resume with Live preview](https://github.com/user-attachments/assets/52b80fe5-f009-414a-a522-e4c7a33dcc41)
![build resume(upper_portion)](https://github.com/user-attachments/assets/723f6ea3-4404-43ee-b9a2-6518908247d9)
![build resume(lower portion)](https://github.com/user-attachments/assets/71ae2fcd-8de6-4971-ba80-3663fea679fb)
![Downloaad window](https://github.com/user-attachments/assets/733ea1c9-f78f-4430-9b51-a12a77d029dc)
![Share window](https://github.com/user-attachments/assets/4d56e5c7-5f52-40cf-b6b3-89511dac358f)
![ATS Resume score manually](https://github.com/user-attachments/assets/0e9b3959-5b44-4d70-b20b-1843c85bbe4a)
![ATS Resume score using resume](https://github.com/user-attachments/assets/7285b7d9-b339-4fe7-a60e-7fcd8489fe3e)
![Chat Bot assistance using Gemini Ai](https://github.com/user-attachments/assets/b8dac8a6-99c1-47b6-8ab0-5b081b8f1d81)
![Profile Details using clerk](https://github.com/user-attachments/assets/a7189f5a-7da4-4e68-b63c-033fc142e6f8)
![About Us](https://github.com/user-attachments/assets/30f59d4c-d084-451d-a25b-47a654ca5d26)
![Terms and conditions(upper portion)](https://github.com/user-attachments/assets/8d560f5a-c1c4-47ec-b90b-f953373776d9)
![Terms and conditions(lower portion)](https://github.com/user-attachments/assets/60f7ba7c-18b4-4d1b-9602-81deaf161b2b)
