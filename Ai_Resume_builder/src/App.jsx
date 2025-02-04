import React, { useState } from "react";
import { AichatSession } from "../Service/AiModel";
import Chatbot from "./Chatbot";
import AtsScoring from "./AtsScoring";
import ImageUpload from "./ImageUploadAts";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(""); // State to store AI response
  console.log(input);
  console.log(output);  

  const GenerateSummaryFromAi = async () => {
    try {
      const result = await AichatSession.sendMessage(input);
      const responseText = await result.response.text(); // Ensure async handling
      console.log("AI response:", responseText);
      setOutput(responseText); // Store response in state
    } catch (error) {
      console.error("Error generating response:", error);
      setOutput("Failed to generate response.");
    }
  };

  const handleGenerate = async () => {
    console.log("Generating AI response for:", input);
    await GenerateSummaryFromAi(input);
  };

  return (
    <>
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Text Generator</h2>
        
        {/* Input Box */}
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        {/* Generate Button */}
        <button
          className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleGenerate}
        >
          Generate AI Response
        </button>

        {/* Output Box */}
        <textarea
          className="w-full mt-4 h-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="AI response will appear here..."
          value={output}
          readOnly
        />
      </div>
      </div>
      <Chatbot />
      {/* <AtsScoring /> */}
      <div className="bg-gray-500 h-screen flex items-center justify-center">
      <ImageUpload/>
      </div>
      </>
  );
}

export default App;
