import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../routes/GlobalApi';
import { HtmlButton } from 'react-simple-wysiwyg';
import { ResumeInfoContext } from '../../../Context/ResumeInfoContext';
import ResumePreview from '../../../EditResume/ResumePreview';
import { RWebShare } from 'react-web-share'


function ViewResume() {
  const [resumeInfo,setResumeInfo]=useState();
  const {resumeID}=useParams();

  useEffect(()=>{
      GetResumeInfo();
  },[])
  const GetResumeInfo=()=>{
      GlobalApi.GetResumeById(resumeID).then(resp=>{
          console.log(resp.data.data);
          setResumeInfo(resp.data.data);
      })
  }

  const HandleDownload = () => {
   window.print();
 }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
    <div id="no-print">
    <Header/>

    <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <h2 className='text-center text-2xl font-medium'>
            Congrats! Your Ultimate AI generates Resume is ready ! </h2>
            <p className='text-center text-red-600'>Now you are ready to download your resume and you can share unique 
                resume url with your friends and family </p>
        <div className='flex justify-between px-44 my-10'>
            <button onClick={HandleDownload} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Download</button>

            <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeID+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
      >
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Share</button>
              </RWebShare>

        </div>
    </div>
        
    </div>
    <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
    <div id="print-area" >
          <ResumePreview />
        </div>
        </div>
</ResumeInfoContext.Provider>
  )
}

export default ViewResume