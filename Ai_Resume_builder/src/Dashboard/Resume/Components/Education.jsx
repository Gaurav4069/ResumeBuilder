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
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  
  const [educationalList,setEducationalList]=useState([])
 
  useEffect(() => {
      if (resumeInfo?.Education?.length > 0) {
          setEducationalList([...resumeInfo.Education]);
      } else {
        setEducationalList([formField]);
      }
    }, [resumeInfo]);

  const handleChange=(index,event)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
    setResumeInfo((prev) => ({
      ...prev,
      Education: newEntries, 
    }));
  }

  const AddNewEducation = () => {
    const updatedEducationList = [...educationalList, { ...formField }];
    setEducationalList(updatedEducationList);
    setResumeInfo((prev) => ({
      ...prev,
      Education: updatedEducationList,
    }));
  }
  const RemoveEducation = () => {
    const updatedEducationList = educationalList.slice(0, -1); 
    setEducationalList(updatedEducationList);
    setResumeInfo((prev) => ({
      ...prev,
      Education: updatedEducationList,
    }));

  }

  const onSave=()=>{
    const data={
      data:{
        Education:educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params?.resumeID,data).then(resp=>{
      toast.success('Details updated !');
      setResumeInfo((prev) => ({
        ...prev,
        Education: educationalList,
      }));
    },(error)=>{
      toast.error('Server Error, Please try again!')
    })

  }


  return (
    <div className="p-5 shadow-2xl bg-gray-800 rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-white text-lg">Education</h2>
      <p className='text-gray-300'>Add your educational details</p>

      <div>
        {educationalList.length === 0 ? (
          <p className='text-gray-300'>No education details added yet. Click "Add More Education" to start.</p>
        ) : (
          educationalList.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs text-white font-semibold">University Name</label>
                <input
                  type="text"
                  name="universityName"
                  value={item.universityName}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 bg-gray-700 text-white border rounded-md mt-1"
                  placeholder="Enter university name"
                />
              </div>

              <div>
                <label className="text-sm text-white font-semibold">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={item.degree}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 bg-gray-700 text-white border rounded-md mt-1"
                  placeholder="Enter degree"
                />
              </div>

              <div>
                <label className="text-sm text-white font-semibold">Major</label>
                <input
                  type="text"
                  name="major"
                  value={item.major}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 bg-gray-700 text-white border rounded-md mt-1"
                  placeholder="Enter major"
                />
              </div>

              <div>
                <label className="text-sm text-white font-semibold">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 bg-gray-700 text-white border rounded-md mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-white font-semibold">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 bg-gray-700 text-white border rounded-md mt-1"
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm text-white font-semibold">Description</label>
                <textarea
                  name="description"
                  value={item.description}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 bg-gray-700 text-white border rounded-md mt-1"
                  placeholder="Enter description"
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <button onClick={AddNewEducation} className="border px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded-md text-primary ">
            + Add More Education
          </button>
          <button onClick={RemoveEducation} className="border px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-900 text-primary ">
            - Remove More Education
          </button>
        </div>
        <button onClick={onSave} className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800">
          Save
        </button>
      </div>
    </div>
  );
}