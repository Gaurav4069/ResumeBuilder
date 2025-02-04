import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

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
            {text:"Check the ATS score based on scale of 0-100 and give answer in numeric value  and also suggest few changes to improve the score"},
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
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Get Ats Score</h2>

      {/* Upload Input */}
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Select Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Image Preview */}
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-lg" />
        </div>
      )}

      {/* Show File Name */}
      {image && (
        <p className="mt-2 text-gray-700 text-sm">Selected: {image.name}</p>
      )}

      {/* Get ATS Score Button */}
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        onClick={handleGetScore}
        disabled={loading}
      >
        {loading ? "Processing..." : "Get ATS Score"}
      </button>

      {/* Show ATS Score */}
      {atsScore && (
          <div className="mt-4 p-4 bg-gray-200 rounded-md">
            <p style={{ width: 200, height: 200 }} className="mx-auto">
        <CircularProgressbar value={atsScore} text={`${atsScore}%`} />
          </p>
          </div>
      )}
    </div>
  );
};

export default ImageUpload;
