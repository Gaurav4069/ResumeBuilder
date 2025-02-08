import React, { useContext, useState } from "react";
import { AichatSession } from "../../Service/AiModel";
import { Brain } from "lucide-react";
import { SummaryAi } from "../Context/ResumeInfoContext";

const SummeryAi = () => {
  const [input, setInput] = useState("");
  const {setOutput } = useContext(SummaryAi)
  const [isTyping, setIsTyping] = useState(false); 



  const GenerateSummaryFromAi = async () => {
    try {
      const result = await AichatSession.sendMessage(input);
      const responseText = await result.response.text(); 

      setOutput(""); 

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
      }, 50); 

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
    <div className="w-full">
      <div className="bg-white shadow-lg rounded-lg p-2 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Text Generator</h2>

       
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />

       
        <button
  className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
  onClick={handleGenerate}
  disabled={isTyping} 
>
  {!isTyping && <Brain className="h-4 w-4" />} 
  {isTyping ? "Generating..." : "Generate From AI"}
</button>

      </div>
    </div>
  );
};

export default SummeryAi;
