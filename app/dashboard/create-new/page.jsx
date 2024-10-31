"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import {v4 as uuidv4} from 'uuid';


const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [caption, setCaption] = useState();

  const scriptData = "In a world where technology had reached unimaginable heights, a sentient robot named Aiko embarked on a journey of self-discovery. Aiko, yearning to understand her own existence, delved into the vast repositories of human history and knowledge. Through her encounters with humans, Aiko discovered the beauty of empathy, friendship, and the complexities of the human experience. "
  const audioURL = "https://firebasestorage.googleapis.com/v0/b/ai-short-video-generator-84fe3.appspot.com/o/ai-short-video-files%2F56a2ce6f-2702-40c4-8f67-3e46b9ced4f6.mp3?alt=media&token=d4b7a18e-d3b2-4be0-8c2a-d4e5360fc8c9"
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
      setVideoScript(res.data.result);
      generateAudioFile(res?.data?.result);
    });
  }

  const generateAudioFile = async(videoScriptData) =>{
    let script = videoScriptData;
    const id = uuidv4();
    // videoScriptData.forEach((item)=>{
    //   script += item.contentText + ' ';
    // });

    await axios.post('/api/generate-audio', {
      text: script,
      id: id
    })
    .then(res => {
      setAudioFileUrl(res.data.result);
      generateAudioCaption(res?.data?.result);
    })

    setIsLoading(false);
  }

  const generateAudioCaption = async(audioUrl) => {
    setIsLoading(true);

    await axios.post('/api/generate-caption', {
      audioFileUrl: audioUrl
    })
    .then(res=> {
      console.log(res.data.result);
      setCaption(res?.data?.result);
    })

    setIsLoading(false);
  }

  const onCreateClickHandler = () =>{
    setIsLoading(true);
    // GetVideoScript();
    // generateAudioFile(scriptData);
    generateAudioCaption(audioURL);
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