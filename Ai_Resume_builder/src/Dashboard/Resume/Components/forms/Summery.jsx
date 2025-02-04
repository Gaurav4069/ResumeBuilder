import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Brain, LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function Summery(enabledNext) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const [summery, setSummery] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])


    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: { summery: summery }
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
            (resp) => {
                console.log(resp);
                enabledNext(true);
                setLoading(false);
                toast.success("Details updated successfully!"); // Show success toast
            },
            (error) => {
                setLoading(false);
                // toast.error("Failed to update details. Please try again!"); 
            }
        );
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summery</h2>
                <p>Add a summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label className="text-sm font-medium">Add Summary</label>
                        {/* cssssssss */}
                        <button size="sm" type="button" className="border border-gray-500 text-gray-500 px-4 py-2 rounded flex gap-2"> 
                           <Brain className='h-4 w-4'/> Generate from AI
                        </button>
                    </div>

                    {/* Tailwind Styled Textarea */}
                    <textarea
// cssssss
                        className="w-full mt-5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                        onChange={(e) => setSummery(e.target.value)}

                    />
                    <div className='mt-2 flex justify-end'>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded border border-gray-500 text-gray-500 flex items-center gap-2"
                        >
                            {loading ? <LoaderCircle className="animate-spin w-5 h-5" /> : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
