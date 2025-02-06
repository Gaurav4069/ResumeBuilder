import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast'; // Import toast and Toaster

export default function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
  }, []);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target; // Fixed 'e.taget' typo

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

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast.success("Details updated successfully!"); // Show success toast
      },
      (error) => {
        setLoading(false);
        // toast.error("Failed to update details. Please try again!"); // Show error toast
      }
    );
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
              defaultValue={resumeInfo?.firstName}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <input
              name="lastName"
              required
              defaultValue={resumeInfo?.lastName}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <input
              name="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded border border-gray-500 text-gray-500 flex items-center gap-2"
          >
            {loading ? <LoaderCircle className="animate-spin w-5 h-5" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
