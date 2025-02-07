import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../Context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import GlobalApi from '../../../../routes/GlobalApi';

const formField = {
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  description: '',
};

export default function Education() {
  const [educationalList, setEducationalList] = useState([]); // Start with an empty array
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Sync resumeInfo.education with educationalList only after the form is interacted with
  useEffect(() => {
    if (resumeInfo?.education?.length > 0 && educationalList.length === 0) {
      // Only populate the educationalList if it's empty and resumeInfo has education data
      setEducationalList([...resumeInfo.education]);
    }
  }, [resumeInfo]);

  // Handle changes in form fields
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedList = educationalList.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );

    setEducationalList(updatedList);

    // Update resumeInfo in real time when any field is changed
    setResumeInfo((prev) => ({
      ...prev,
      education: updatedList,
    }));
  };

  // Add a new education entry
  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formField }]); // Add a new empty form field
  };

  // Remove the last education entry
  const RemoveNewEducation = () => {
    setEducationalList((educationList) => educationList.slice(0, -1)); // Remove the last entry
  };
 
  
      useEffect(() => {
          setResumeInfo((prev) => ({
            ...prev,
            education: educationalList,
          }));
        }, [educationalList, setResumeInfo]);



  // Handle saving the data
  const onSave = () => {
    const data = {
      data: {
        Education: educationalList.map(({ id, ...rest }) => rest), // Keep the education key
      },
    };
    console.log(data)
    console.log(params.resumeId)
    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then((res) => {
        toast.success('Details updated!');
      })
      .catch((error) => {
        toast.error('Failed to update details!');
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      <div>
        {educationalList.length === 0 ? (
          <p>No education details added yet. Click "Add More Education" to start.</p>
        ) : (
          educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                {/* University Name */}
                <div>
                  <label className="text-xs font-semibold">University Name</label>
                  <input
                    type="text"
                    name="universityName"
                    value={item.universityName}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-2 border rounded-md mt-1"
                    placeholder="Enter university name"
                  />
                </div>

                {/* Degree */}
                <div>
                  <label className="text-sm font-semibold">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={item.degree}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-2 border rounded-md mt-1"
                    placeholder="Enter degree"
                  />
                </div>

                {/* Major */}
                <div>
                  <label className="text-sm font-semibold">Major</label>
                  <input
                    type="text"
                    name="major"
                    value={item.major}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-2 border rounded-md mt-1"
                    placeholder="Enter major"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="text-sm font-semibold">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-2 border rounded-md mt-1"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="text-sm font-semibold">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-2 border rounded-md mt-1"
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    name="description"
                    value={item.description}
                    onChange={(event) => handleChange(index, event)}
                    className="w-full p-2 border rounded-md mt-1"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            onClick={AddNewEducation}
            className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-gray-100"
          >
            + Add More Education
          </button>
          <button
            onClick={RemoveNewEducation}
            className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-gray-100"
          >
            - Remove More Education
          </button>
        </div>
        <button
          type="submit"
          onClick={onSave}
          className="px-4 py-2 rounded border bg-blue-500 border-blue-700 text-white flex items-center gap-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
