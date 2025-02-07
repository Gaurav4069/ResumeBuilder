import React, { useState } from "react";
import saveUserResume from "../../../routes/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const API_URL = "http://localhost:1337";

const EditJson = ({ jsonData, onUpdate }) => {
  const [editedData, setEditedData] = useState(JSON.stringify(jsonData, null, 2));
  const { user } = useUser(); // Get Clerk user
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

  const handleChange = (event) => {
    setEditedData(event.target.value);
    try {
      const parsedJson = JSON.parse(event.target.value);
      onUpdate(parsedJson);
    } catch (error) {
      console.error("Invalid JSON format", error);
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save the resume.");
      return;
    }
  
    try {
      const parsedJson = JSON.parse(editedData);
  
      await axios.post(
        `${API_URL}/api/data-templates`,
        {
          data: {
            title: `${user?.fullName}'s Resume`,
            structure: parsedJson,
            user_id: user?.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error.response ? error.response.data : error);
      alert(`Failed to save. ${error.response?.data?.error?.message || "Ensure the JSON format is correct."}`);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Resume JSON</h2>

      {/* JSON Textarea Editor */}
      <textarea
        className="w-full h-96 border p-2 rounded font-mono text-sm"
        value={editedData}
        onChange={handleChange}
      />

      <button
        onClick={handleSave}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditJson;
