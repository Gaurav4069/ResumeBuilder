import { Brain } from 'lucide-react';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { ResumeInfoContext } from '../../../Context/ResumeInfoContext';

const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

export default function RichTextEditor({ onRichTextEditorChange, index,defaultValue}) {
    const [value, setValue] = useState(defaultValue);
   
    return (
        <div>
            <EditorProvider>
            <Editor className="bg-gray-900 text-white" value={value} onChange={(e)=>{
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
    );
}
