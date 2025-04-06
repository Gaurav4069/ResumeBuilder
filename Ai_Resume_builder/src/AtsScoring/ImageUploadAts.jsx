import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://api.api-ninjas.com/v1/imagetotext"; // Replace with the correct ATS API URL
  const API_KEY = "iZOdXT1R4ibM5Uebupb1tw==7yarSwHxx0PPw2cz"; // Replace with your actual API Key

  const Gemini_API_KEY = "AIzaSyDvvdqVBlH0m8R_awO-336aaD1nn3SwKOQ";
  const Gemini_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${Gemini_API_KEY}`;

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Function to Upload Image and Get ATS Score
  const handleCheckScore = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      console.log("i am here");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "X-Api-Key": API_KEY },
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      return data;


    } catch (error) {
      console.error("Error fetching ATS Score:", error);
    }

    setLoading(false);
  };



  const handleGetScore = async () => {
    const data = await handleCheckScore();
    console.log(data)
    const extractedText = data.map(item => item.text).join(" ");
    console.log(extractedText);

    setLoading(true);

    const requestBody = {
      contents: [
        {
          parts: [
            { text: `Job Description: ${extractedText}` },
            {text:`Based on the job description provided, please evaluate the resume and return the output strictly in the following format:
              ATS Score: <numeric_score>/100`},
              
          ]
        }
      ]
    };

    try {
      const response = await fetch(Gemini_API_URL, {
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
    } catch (error) {
      console.error("Error checking ATS score:", error);
      setAtsScore("Error fetching score.");
    }

    setLoading(false);
  };
  return (

    <div className="flex flex-col items-center p-6 bg-gray-900 shadow-lg w-full mx-auto text-white border p-32 border-gray-700 transition-all duration-300">

  <div className="flex flex-col border border-gray-600 p-6 rounded-lg shadow-2xl bg-gray-800 w-full max-w-5xl">

    {/* 🔹 Introduction Section (Full Width) */}
    <div className="w-full text-center lg:text-left mb-6">
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

    {/* 🔹 Main Flex Container (Upload Section + Image/Score Side-by-Side) */}
    <div className="flex flex-col lg:flex-row w-full justify-between gap-8">

      {/* 🔹 Left Section - Upload & Button */}
      <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start">
        <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 flex justify-center transition-all duration-200">

            Select Image (Max size 200KB)
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          {/* 🖼 Image Preview */}

          {preview && (
            <div className="mt-4 flex justify-center">
              <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-lg shadow-md border border-gray-700 transition-all duration-300 hover:scale-105" />
            </div>
          )}

          {/* 📁 File Name Display */}
          {image && <p className="mt-2 text-gray-400 text-sm text-center">Selected: {image.name}</p>}
        </div>

        {/* 🔹 Get ATS Score Button */}
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 disabled:opacity-50 w-full transition-all duration-200"
          onClick={handleGetScore}
          disabled={loading}
        >
          {loading ? "Processing..." : "Get ATS Score"}
        </button>
      </div>

      {/* 🔹 Right Section - Image & ATS Score */}
      <div className="w-full lg:w-1/3 flex flex-col items-center justify-center gap-4">
        <img src="../../public/images/ReRKlS01.svg" alt="Icon" className="w-40 h-40 opacity-75" />

        {atsScore !== null && (
          <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center w-full border border-gray-700">
            <h3 className="text-lg font-semibold text-white">📊 Your ATS Score</h3>
            <div className="mt-4" style={{ width: 150, height: 150, margin: "auto" }}>
              <CircularProgressbar
                value={atsScore}
                text={`${atsScore}%`}
                styles={buildStyles({
                  textColor: "#ffffff",
                  pathColor:
                    atsScore > 75
                      ? "rgba(0, 255, 127, 1)" // Green
                      : atsScore > 50
                        ? "rgba(255, 215, 0, 1)" // Gold
                        : "rgba(255, 69, 0, 1)", // Red
                  trailColor: "rgba(255, 255, 255, 0.15)",
                  strokeLinecap: "round",
                  textSize: "18px",
                  strokeWidth: 8,
                  pathTransition: "stroke-dashoffset 1.5s ease-in-out",
                })}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  </div>
</div>

  );
};

export default ImageUpload;