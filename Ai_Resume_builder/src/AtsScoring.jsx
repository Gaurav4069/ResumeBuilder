// {text:"Check the ATS score based on scale of 0-100 and give answer in numeric value  and also suggeest the changes to improve the score"},
import React, { useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
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
            {text:"Check the ATS score based on scale of 0-100 and give answer in numeric value  and also suggest few changes to improve the score"},
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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">ATS Resume Score Checker</h1>

      <p className="text-gray-800 mb-6 text-center max-w-xl text-lg leading-relaxed">
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Applicant Tracking System (ATS) Score
        </span> 
        evaluates how well your <span className="font-semibold text-blue-600">resume</span> matches a job description.
        A <span className="font-bold text-green-600">higher ATS score</span> increases your chances of getting shortlisted.
        Ensure your resume is <span className="underline decoration-wavy decoration-blue-500">well-structured</span>, 
        <span className="font-medium text-purple-600"> keyword-optimized</span>, and <span className="font-medium text-green-600">job-relevant</span>.
      </p>

      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Check Your Ats Score</h2>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Job Description</label>
          <textarea 
            className="w-full border border-gray-300 p-2 rounded mt-1"
            rows="4"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Skills</label>
          <input 
            type="text"
            className="w-full border border-gray-300 p-2 rounded mt-1"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Experience</label>
          <input 
            type="text"
            className="w-full border border-gray-300 p-2 rounded mt-1"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          onClick={handleCheckScore}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Your ATS Score"}
        </button>

        {atsScore && (
          <div className="mt-4 p-4 bg-gray-200 rounded-md">
            <p style={{ width: 200, height: 200 }} className="mx-auto">
        <CircularProgressbar value={atsScore} text={`${atsScore}%`} />
      </p>
          </div>
        )}

        {atsSuggestions && (
          <div className="mt-4 p-4 bg-gray-200 rounded-md">
            <h3 className="font-semibold text-lg">Suggestions to Improve:</h3>
            <p className="text-green-700">{atsSuggestions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtsScoring;
