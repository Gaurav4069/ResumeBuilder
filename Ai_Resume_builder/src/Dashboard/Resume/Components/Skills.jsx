import React, { useContext, useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom';
import { ResumeInfoContext } from '../../../Context/ResumeInfoContext';
import GlobalApi from '../../../../routes/GlobalApi';
import toast from 'react-hot-toast';


function Skills() {

    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }])
    const { resumeId } = useParams();

    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        resumeInfo && setSkillsList(resumeInfo?.Skills)
    }, [])

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0
        }])
    }

    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                Skills: skillsList.map(({ id, ...rest }) => rest)
            }
      }
      console.log(data)

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                console.log(resp);
                setLoading(false);
                toast.success('Details updated !')
            }, (error) => {
                setLoading(false);
                toast.error('Server Error, Try again!')
            })
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            Skills: skillsList
        })
    }, [skillsList])

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>

            <div>
            {skillsList.map((item, index) => (
    <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>

                        <div>
                            <label className='text-xs'>Name</label>
                            <input
                                className="w-full border p-2 rounded-md"
                                type="text"
                                value={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                placeholder="Enter skill name"
                            />
                        </div>

                        <div>
                            <label className='text-xs'>Rating</label>
                            <select
                                className="border p-2 rounded-md"
                                value={item.rating}
                                onChange={(e) => handleChange(index, 'rating', Number(e.target.value))}
                            >
                                {[...Array(6).keys()].map((value) => (
                                    <option key={value} value={value}>{'⭐'.repeat(value)}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <button
                        onClick={AddNewSkills}
                        className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        + Add More Skill
                    </button>
                    <button
                        onClick={RemoveSkills}
                        className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        - Remove
                    </button>
                </div>
                <button
                    disabled={loading}
                    onClick={onSave}
                    className="px-4 py-2 rounded bg-blue-500 text-white border border-blue-700 flex items-center gap-2"
                >
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </button>
            </div>
        </div>
    )
}

export default Skills
