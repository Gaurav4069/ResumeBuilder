import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { ResumeInfoContext } from "../../../../Context/ResumeInfoContext";
import GlobalApi from "../../../../../routes/GlobalApi";

export default function PersonalDetail() {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(params)

  // State for geocoding suggestions
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || "",
        lastName: resumeInfo.lastName || "",
        jobTitle: resumeInfo.jobTitle || "",
        address: resumeInfo.address || "",
        phone: resumeInfo.phone || "",
        email: resumeInfo.email || "",
      });
      setQuery(resumeInfo.address || ""); // Initialize query with address
    }
  }, [resumeInfo]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });

    // If the address field is being updated, update the geocoding query
    if (name === "address") {
      setQuery(value);
      fetchGeocodingResults(value);
    }
  };

  // Fetch geocoding suggestions
  const fetchGeocodingResults = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    const url = `https://api.locationiq.com/v1/autocomplete.php?key=pk.8152931c0b2b98a57bb3d874f5f97e0a&q=${query}&limit=5&dedupe=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle selecting a suggested address
  const handleSelectAddress = (selectedAddress) => {
    setQuery(selectedAddress);
    setFormData({ ...formData, address: selectedAddress });
    setResumeInfo({ ...resumeInfo, address: selectedAddress });
    setResults([]); // Clear results after selection
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { data: formData };
    console.log("Submitting Data:", data);
    console.log(params.resumeID)

    GlobalApi.UpdateResumeDetail(params?.resumeID, data)
      .then((resp) => {
        setLoading(false);
        console.log("Response:", resp);
        toast.success("Details updated successfully!");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error Response:", error.response?.data || error);
        toast.error("Failed to update details!");
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <input
              name="firstName"
              required
              value={formData?.firstName || ""}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <input
              name="lastName"
              required
              value={formData?.lastName || ""}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <input
              name="jobTitle"
              required
              value={formData?.jobTitle || ""}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2 relative">
            <label className="text-sm">Address</label>
            <input
              name="address"
              type="text"
              required
              value={query}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter address"
            />
            {/* Geocoding Suggestions Dropdown */}
            {results.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full shadow-lg">
                {results.map((result, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectAddress(result.display_name)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input
              name="phone"
              required
              value={formData?.phone || ""}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              name="email"
              required
              value={formData?.email || ""}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded border bg-blue-500 border-blue-700 text-white flex items-center gap-2"
          >
            {loading ? <LoaderCircle className="animate-spin w-5 h-5" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
