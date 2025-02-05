import React, { useState } from "react";
import { AichatSession } from "../../Service/AiModel";

const SummeryAi = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(""); // Stores AI response
  const [isTyping, setIsTyping] = useState(false); // Typing effect state

  console.log("User Input:", input);
  console.log("AI Output:", output);

  const GenerateSummaryFromAi = async () => {
    try {
      const result = await AichatSession.sendMessage(input);
      const responseText = await result.response.text(); // Extract plain text

      console.log("AI Response:", responseText);
      setOutput(""); // Reset output before typing effect

      // Typing effect (Simulated Typewriter)
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        if (i < responseText.length) {
          setOutput((prev) => prev + responseText[i]);
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50); // Adjust speed of typewriter effect

    } catch (error) {
      console.error("Error generating response:", error);
      setOutput("Failed to generate response.");
    }
  };

  const handleGenerate = async () => {
    console.log("Generating AI response for:", input);
    await GenerateSummaryFromAi();
  };

  return (
    <div className="bg-gray-100 h-fit flex items-center justify-center p-6">
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
          disabled={isTyping} // Disable button while typing effect is active
        >
          {isTyping ? "Generating..." : "Generate AI Response"}
        </button>

        {/* Output Box with Typewriter Effect */}
        <div className="w-full mt-4 h-80 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 overflow-y-auto text-gray-800">
          {output || "AI response will appear here..."}
          {isTyping && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  );
};

export default SummeryAi;
