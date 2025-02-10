// {text:"Check the ATS score based on scale of 0-100 and give answer in numeric value  and also suggeest the changes to improve the score"},
import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AtsScoring = () => {
  const [atsScore, setAtsScore] = useState(null);
  const [atsSuggestions, setAtsSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  const API_KEY = "AIzaSyDvvdqVBlH0m8R_awO-336aaD1nn3SwKOQ";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const handleCheckScore = async () => {
    if (!jobDescription || !skills || !experience) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const requestBody = {
      contents: [
        {
          parts: [
            { text: `Job Description: ${jobDescription}` },
            { text: `Skills: ${skills}` },
            { text: `Experience: ${experience}` },
            { text: "Check the ATS score based on scale of 0-100 and give answer in numeric value  and also suggest few changes to improve the score" },
          ]
        }
      ]
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

      // Regular expression to capture ATS Score (numeric value)
      const scoreMatch = rawText.match(/ATS Score: (\d{1,3}(-\d{1,3})?)/);
      let score = 0;  // Default to 0 if no score found

      if (scoreMatch) {
        score = parseInt(scoreMatch[1], 10);  // Extract numeric score
      }

      // Extract suggestions by splitting the response
      const suggestions = rawText.split("\n\n")[1] || "No suggestions provided.";

      setAtsScore(score);
      setAtsSuggestions(suggestions);
    } catch (error) {
      console.error("Error checking ATS score:", error);
      setAtsScore("Error fetching score.");
      setAtsSuggestions("Error fetching suggestions.");
    }

    setLoading(false);
  };

  return (
    <div className="w-screen flex items-center justify-center bg-[#DCDCDC] text-white p-8">
      {/* Main Container */}
      <div className="flex flex-col border border-gray-600 p-6 rounded-lg shadow-2xl bg-gray-800 w-full max-w-5xl">

        {/* Full-Width Heading and Description */}
        <div className="w-full text-center lg:text-left">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">ATS Resume Score Checker</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            <span className="font-extrabold text-white">Applicant Tracking System (ATS) Score</span>
            <span className="text-yellow-400 font-semibold"> resume</span> matches a job description.
            A <span className="font-bold text-green-400">higher ATS score</span> increases your chances of getting shortlisted.
            Ensure your resume is
            <span className=""> well-structured</span>,
            <span className="font-medium text-purple-400"> keyword-optimized</span>, and
            <span className="font-medium text-green-400"> job-relevant</span>.
          </p>
        </div>

        

        {/* Form and Right-Side (Image + ATS Score) in Row Layout */}
        <div className="flex flex-col lg:flex-row mt-6">
          {/* Left Side - ATS Score Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full">
              <h2 className="text-xl font-semibold text-center text-purple-400">Check Your ATS Score</h2>

              <div className="mt-4 p-3">
                <label className="block font-medium text-gray-300">Job Description</label>
                <textarea
                  className="w-full border border-gray-700 p-3 rounded bg-gray-800 text-white focus:ring focus:ring-blue-500"
                  rows="3"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="mt-4 p-3">
                <label className="block font-medium text-gray-300">Skills</label>
                <input
                  type="text"
                  className="w-full border border-gray-700 p-3 rounded bg-gray-800 text-white focus:ring focus:ring-blue-500"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              <div className="mt-4 p-3 w-full">
                <label className="block font-medium text-gray-300">Experience</label>
                <input
                  type="text"
                  className="w-full border border-gray-700 p-3 rounded bg-gray-800 text-white focus:ring focus:ring-blue-500"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>

              <div className="w-full p-3">
                <button
                  className="w-full py-3 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-80 transition duration-300"
                  onClick={handleCheckScore}
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Check Your ATS Score"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image & ATS Score (Aligned to Form) */}
          <div className="w-full lg:w-1/3 flex flex-col items-center h-110 justify-center gap-8">
            {/* Image */}
            <img src="../../public/images/ReRKlS01.svg" alt="Icon" className="w-80 h-80 opacity-75" />

            {/* ATS Score (Aligned with Image) */}
            {atsScore !== null && (
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={atsScore}
                    text={`${atsScore}%`}
                    styles={buildStyles({
                      textColor: "#ffffff",
                      pathColor: atsScore > 75 ? "#00FF7F" : atsScore > 50 ? "#FFD700" : "#FF4500",
                      trailColor: "rgba(255, 255, 255, 0.15)",
                      strokeLinecap: "round",
                      textSize: "20px",
                    })}
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Suggestions Section - Full Width Inside Main Container */}
        {atsSuggestions && (
          <div className="w-full mt-6 p-4 bg-gray-700 text-gray-200 rounded border border-gray-600 text-center">
            <h3 className="font-semibold text-lg text-blue-300">Suggestions to Improve:</h3>
            <p className="text-green-400">{atsSuggestions}</p>
          </div>
        )}
      </div>
    </div>


  );
};

export default AtsScoring;
