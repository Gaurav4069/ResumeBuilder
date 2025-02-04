import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
};

export default function Experience() {
    const [experienceList, setExperienceList] = useState([formField]);

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

    const handleChange = (index, event) => {
        const newEntries=experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const AddNewExperience=()=>{
        setExperienceList([...experienceList,formField])
    }
    const RemoveNewExperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }


    useEffect(()=>{
       setResumeInfo({
        ...resumeInfo,
        experience:experienceList
       })
    },[experienceList])

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add your previous job experience</p>

                <div>
                    {experienceList.map((item, index) => (
                        <div key={index} className=''>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                {/* Job Title */}
                                <div>
                                    <label className='text-xs font-semibold'>Position Title</label>
                                    <input
                                        type='text'
                                        name='title'
                                        value={item.title}
                                        onChange={(event) => handleChange(index, event)}
                                        className='w-full p-2 border rounded-md mt-1'
                                        placeholder='Enter job title'
                                    />
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className='text-sm font-semibold'>Company Name</label>
                                    <input
                                        type='text'
                                        name='companyName'
                                        value={item.companyName}
                                        onChange={(event) => handleChange(index, event)}
                                        className='w-full p-2 border rounded-md mt-1'
                                        placeholder='Enter company name'
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className='text-sm font-semibold'>City</label>
                                    <input
                                        type='text'
                                        name='city'
                                        value={item.city}
                                        onChange={(event) => handleChange(index, event)}
                                        className='w-full p-2 border rounded-md mt-1'
                                        placeholder='Enter city'
                                    />
                                </div>

                                {/* State */}
                                <div>
                                    <label className='text-sm font-semibold'>State</label>
                                    <input
                                        type='text'
                                        name='state'
                                        value={item.state}
                                        onChange={(event) => handleChange(index, event)}
                                        className='w-full p-2 border rounded-md mt-1'
                                        placeholder='Enter state'
                                    />
                                </div>

                                {/* Start Date */}
                                <div>
                                    <label className='text-sm font-semibold'>Start Date</label>
                                    <input
                                        type='date'
                                        name='startDate'
                                        value={item.startDate}
                                        onChange={(event) => handleChange(index, event)}
                                        className='w-full p-2 border rounded-md mt-1'
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className='text-sm font-semibold'>End Date</label>
                                    <input
                                        type='date'
                                        name='endDate'
                                        value={item.endDate}
                                        onChange={(event) => handleChange(index, event)}
                                        className='w-full p-2 border rounded-md mt-1'
                                    />
                                </div>

                                {/* Work Summary */}
                                <div className='col-span-2'>
                                    <RichTextEditor
                                    index={index}
                                    onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                    <button onClick={AddNewExperience} className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-gray-100">+ Add More Experience</button>
                    <button onClick={RemoveNewExperience} className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-gray-100">- Remove More Experience</button>

                    </div>
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}
