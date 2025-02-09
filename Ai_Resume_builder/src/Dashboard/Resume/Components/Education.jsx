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
  
  const [educationalList,setEducationalList]=useState([
    {
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ])
  console.log('resumeinfo',resumeInfo)
console.log('educationalList',educationalList)  
  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.Education)
  },[])

  const handleChange=(index,event)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{
    setEducationalList([...educationalList,
      {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }
  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))

  }

  const onSave=()=>{
    const data={
      data:{
        Education:educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
      console.log(resp);
      toast.success('Details updated !')
    },(error)=>{
      toast.error('Server Error, Please try again!')
    })

  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      <div>
        {educationalList.length === 0 ? (
          <p>No education details added yet. Click "Add More Education" to start.</p>
        ) : (
          educationalList.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
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
          ))
        )}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <button onClick={AddNewEducation} className="border px-4 py-2 rounded-md text-primary">
            + Add More Education
          </button>
          <button onClick={RemoveEducation} className="border px-4 py-2 rounded-md text-primary">
            - Remove More Education
          </button>
        </div>
        <button onClick={onSave} className="px-4 py-2 rounded bg-blue-500 text-white">
          Save
        </button>
      </div>
    </div>
  );
}