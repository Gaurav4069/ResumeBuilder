import React, { useState } from 'react'
import { PlusSquare } from 'lucide-react'

const AddResume = () => {
  
  return (
    <div className='p-14 py-24 border 
    items-center flex 
    justify-center bg-slate-200
    rounded-lg h-[300px] w-[250px]
    hover:scale-105 transition-all hover:shadow-md
    cursor-pointer border-dashed'>
        <PlusSquare/>
    </div>
  )
}

export default AddResume