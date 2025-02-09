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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">ATS Resume Score Checker</h1>

      <p className="text-gray-300 mt-3 max-w-lg text-md leading-relaxed">
          <span className="font-extrabold text-white">Applicant Tracking System (ATS) Score</span>  
          evaluates how well your <span className="text-yellow-400 font-semibold">resume</span>  
          matches a job description.  
          A <span className="font-bold text-green-400">higher ATS score</span>  
          increases your chances of getting shortlisted.  
          Ensure your resume is  
          <span className="underline decoration-wavy decoration-blue-500"> well-structured</span>,  
          <span className="font-medium text-purple-400"> keyword-optimized</span>, and  
          <span className="font-medium text-green-400"> job-relevant</span>.
        </p>

    
      <div className="bg-gray-800 p-6 shadow-lg rounded-lg w-full max-w-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-center text-purple-400">Check Your ATS Score</h2>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block font-medium text-gray-300">Job Description</label>
          <textarea 
            className="w-full border border-gray-600 p-3 rounded bg-gray-700 text-white shadow-md focus:ring focus:ring-blue-500 focus:outline-none"
            rows="4"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-300">Skills</label>
          <input 
            type="text"
            className="w-full border border-gray-600 p-3 rounded bg-gray-700 text-white shadow-md focus:ring focus:ring-blue-500 focus:outline-none"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-300">Experience</label>
          <input 
            type="text"
            className="w-full border border-gray-600 p-3 rounded bg-gray-700 text-white shadow-md focus:ring focus:ring-blue-500 focus:outline-none"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
    

        <button 
          className="w-full py-3 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition duration-300"
          onClick={handleCheckScore}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Your ATS Score"}
        </button>

        {atsScore !== null && (
          <div className="mt-6 flex flex-col items-center">
            <div style={{ width: 150, height: 150 }}>
              <CircularProgressbar 
                value={atsScore} 
                text={`${atsScore}%`} 
                styles={buildStyles({
                  textColor: "#ffffff",
                  pathColor: atsScore > 75 
                    ? "rgba(0, 255, 127, 1)" 
                    : atsScore > 50 
                    ? "rgba(255, 215, 0, 1)"  
                    : "rgba(255, 69, 0, 1)",  
                  trailColor: "rgba(255, 255, 255, 0.15)", 
                  strokeLinecap: "round",
                  textSize: "20px",
                })}
                
              />
            </div>
          </div>
        )}
           {atsSuggestions && (
          <div className="mt-4 p-4 bg-gray-700 text-gray-200 rounded-md border border-gray-600">
            <h3 className="font-semibold text-lg text-blue-300">Suggestions to Improve:</h3>
            <p className="text-green-400">{atsSuggestions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtsScoring;
