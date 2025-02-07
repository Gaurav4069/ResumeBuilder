import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { ResumeInfoContext } from '../../../../Context/ResumeInfoContext';
import GlobalApi from '../../../../../routes/GlobalApi';

export default function PersonalDetail() {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

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
    }
  }, [resumeInfo]);

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
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { data: formData };
    console.log("Submitting Data:", data);

    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
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
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <input
              name="address"
              required
              value={formData?.address || ""}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
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
