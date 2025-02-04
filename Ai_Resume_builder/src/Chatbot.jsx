import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
 
  const API_KEY = "AIzaSyDvvdqVBlH0m8R_awO-336aaD1nn3SwKOQ";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;



  const generateBotResponse = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: input }]
        }]
      }),
    }

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { text: data.candidates[0].content.parts[0].text, sender: "bot" }]);
      if (!response.ok) throw new Error(data.error.message);
      console.log(data);
    } catch (error) {
      console.error("Error generating response:", error);
      
    }
  }

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

 
    generateBotResponse();

    setInput(""); // Clear input field
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Chatbot</h2>
      <div className="flex-grow bg-white p-4 shadow-md rounded-lg overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow border p-2 rounded-l-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
