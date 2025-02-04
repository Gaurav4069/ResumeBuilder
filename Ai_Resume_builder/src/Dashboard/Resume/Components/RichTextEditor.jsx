import { Brain } from 'lucide-react';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';

const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

export default function RichTextEditor(onRichTextEditorChange,index) {

    const [value, setValue] = useState();
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

    const GenerateSummeryFromAI=()=>{
       if (resumeInfo.experience[index].title)
       {
        toast('Please Add Position title');
        return ;
       }
       const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
    }
    return (
        <div>
            <div className='flex justify-between my-2'>
            <label className='text-xs' >Summery</label>
            <button size="sm" 
            onClick={GenerateSummeryFromAI} className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-gray-100 flex gap-2"><Brain className='h-4 w-4'/> Generate with AI</button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>

                </Editor>
            </EditorProvider>
        </div>
    )
}
