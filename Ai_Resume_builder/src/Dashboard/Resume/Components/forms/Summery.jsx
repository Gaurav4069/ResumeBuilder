import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ResumeInfoContext, SummaryAi } from '../../../../Context/ResumeInfoContext';
import SummeryAi from '../../../../components/SummeryAi';
import GlobalApi from '../../../../../routes/GlobalApi';

export default function Summery() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { output } = useContext(SummaryAi);

    useEffect(() => {
        if (output) {
            setSummery(output); 
        }
    }, [output]);

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery
            });
        }
    }, [summery]);

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: { summery }
        };

        try {
            const resp = await GlobalApi.UpdateResumeDetail(params?.resumeID, data);
            console.log(resp);
            toast.success("Details updated successfully!");
        } catch (error) {
            console.error("Error Response:", error.response?.data || error);
            toast.error("Failed to update details. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg bg-gray-800 border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-white text-lg">Summary</h2>
            <p className='text-gray-300'>Add a summary for your job title</p>

            <form className="mt-7" onSubmit={onSave}>
                <div className="w-full">
                    <SummeryAi className="w-full" />
                </div>

                <textarea
                    className="w-full mt-5 p-3 border bg-gray-700 text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    value={summery}
                    onChange={(e) => setSummery(e.target.value)}
                />

                <div className="mt-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded border bg-blue-700 hover:bg-blue-800 border-blue-700 text-white flex items-center gap-2"
                    >
                        {loading ? <LoaderCircle className="animate-spin w-5 h-5" /> : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}
