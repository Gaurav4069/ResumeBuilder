import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditResumeUser = () => {
    const params=useParams();
    useEffect(()=>{
        console.log(params.resumeID);
    },[])
  return (
    <div>
        EditResume
    </div>
  )
}

export default EditResumeUser