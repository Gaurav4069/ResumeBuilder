import React, { useContext } from 'react'
import { ResumeInfoContext } from '../Context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {
  const {resumeInfo,setReumeInfo}=useContext(ResumeInfoContext)
  
  return (
    <div  className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
      borderColor: resumeInfo?.themeColor
    }}>
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      <SummeryPreview resumeInfo={resumeInfo} />
      
      <ExperiencePreview resumeInfo={resumeInfo} />

      <EducationalPreview resumeInfo={resumeInfo} />
      <SkillsPreview resumeInfo={resumeInfo} />

    </div>
  )
}

export default ResumePreview