import React, { useContext } from 'react'

export default function PersonalDetail() {

    const { resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get started with the basic information</p>
      
    </div>
  )
}
