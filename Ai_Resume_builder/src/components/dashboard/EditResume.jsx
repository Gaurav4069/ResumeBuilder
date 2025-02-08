import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../../EditResume/ResumePreview';
import { ResumeInfoContext, SummaryAi } from '../../Context/ResumeInfoContext';
import FormSection from '../../Dashboard/Resume/Components/FormSection';
import GlobalApi from '../../../routes/GlobalApi';

const EditResume = () => {
  const {resumeID} = useParams();
    const [resumeInfo, setResumeInfo] = useState();
    const [output, setOutput] = useState();
    useEffect(()=>{
         GetResumeInfo();
        
    }, [])
    
    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeID).then((resp) => { 
            setResumeInfo(resp?.data.data);
            console.log(resp);
        }).catch((err) => console.error("Error fetching resume:", err.response?.data || err));
 }
    
  return (
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
          <SummaryAi.Provider value={{output,setOutput}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* Form section */}
      <FormSection />
      {/* preview section */}
      <ResumePreview />
              </div>
              </SummaryAi.Provider>
      </ResumeInfoContext.Provider>
  )
}

export default EditResume