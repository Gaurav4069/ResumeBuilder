import React, { useState } from 'react';
import PersonalDetail from './forms/PersonalDetail';
import { BiRightArrowAlt as ArrowRight, BiLeftArrowAlt as ArrowLeft } from 'react-icons/bi';
import { LayoutGrid } from 'lucide-react'; // Import LayoutGrid icon
import Summery from './forms/Summery';
import Experience from './forms/Experience';


function FormSection() {
    const [ activeFromIndex, setActiveFormIndex ] = useState(1);
    const [enaleNext,setEnableNext]=useState(false);
    return (
        <div>
            <div className='flex justify-between items-center'>
                {/* Theme Button with LayoutGrid Icon */}
                <button className="border border-gray-500 text-gray-500 px-4 py-2 rounded flex gap-2">
                    <LayoutGrid />  {/* Add icon inside the button */}
                    Theme
                </button>

                <div className='flex gap-2'>
                    {activeFormIndex > 1
                        && <button size="sm" 
                        onClick={()=>setActiveFormIndex(activeFromIndex-1)}>
                        <ArrowLeft /></button>
                    }
                    <button disabled={!enableNext} className='flex gap-2' size="sm"
                    onClick={()=>setActiveFormIndex(activeFromIndex+1)}>
                        Next <ArrowRight />
                    </button>
                </div>
            </div>

            {/* Personal details */}
            {activeFromIndex==1?    <PersonalDetail enabledNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==2?
            <Summery enabledNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==3?
            <Experience enabledNext={(v)=>setEnableNext(v)}/>
            :null
        
        }

            {/* Other sections */}
        </div>
    );
}

export default FormSection;
