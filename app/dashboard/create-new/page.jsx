"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]:fieldValue
    }))
  }

  // Get Video Script
  const GetVideoScript = async () => {
    const prompt = `Write a script to generate ${formData.duration} video on topic :${formData.topic} along with AI image prompts in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`
   
    const result = await axios.post('/api/get-video-script', {
      prompt: prompt
    })
    .then(res=>{
      console.log(res.data.result);
      setVideoScript(res.data.result);
    });

    setIsLoading(false);
  }

  const onCreateClickHandler = () =>{
    setIsLoading(true);
    GetVideoScript();
  }

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-center text-primary'>Create New Short Video</h2>

      <div className='shadow-md p-10 mt-10'>
        {/* ⁡⁢⁢⁢Select Topic⁡ */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* ⁡⁢⁢⁢Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Select Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button onClick={onCreateClickHandler} className="mt-10 w-full">Create Short Video</Button>
      </div>
      <CustomLoading loading={isLoading} />
    </div>
  )
}

export default CreateNew