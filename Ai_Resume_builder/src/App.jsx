import React from 'react'

function App() {
  return (
    <>
      <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Text Generator</h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleGenerate}
        >
          Generate AI Response
        </Button>
      </div>
    </div>
   </div>
    </>
  )
}

export default App