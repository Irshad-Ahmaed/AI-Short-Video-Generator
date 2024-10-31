"use client";
import React, { useContext, useEffect, useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';

// const scriptData = "In a world where technology had reached unimaginable heights, a sentient robot named Aiko embarked on a journey of self-discovery. Aiko, yearning to understand her own existence, delved into the vast repositories of human history and knowledge. Through her encounters with humans, Aiko discovered the beauty of empathy, friendship, and the complexities of the human experience. ";
// const audioURL = "https://firebasestorage.googleapis.com/v0/b/ai-short-video-generator-84fe3.appspot.com/o/ai-short-video-files%2Faudios%2F1d8bd612-ff59-49b2-85d1-d7beebb0786a.mp3?alt=media&token=8b9f85bb-d625-4f04-badc-44822041ef21";
// const VideoScripT = [
//   {
//     "imagePrompt": "A bustling medieval marketplace, full of people, stalls, and animals, with a castle in the background. Realistic style.",
//     "ContentText": "In the heart of medieval Europe, a bustling marketplace thrived, filled with the sounds of bartering and the aroma of roasting meats. A young woman named Eleanor, known for her sharp wit and even sharper tongue, was selling her wares, her eyes constantly scanning the crowd."
//   },
//   {
//     "imagePrompt": "A bustling medieval marketplace, full of people, stalls, and animals, with a castle in the background. Realistic style.",
//     "ContentText": "In the heart of medieval Europe, a bustling marketplace thrived, filled with the sounds of bartering and the aroma of roasting meats. A young woman named Eleanor, known for her sharp wit and even sharper tongue, was selling her wares, her eyes constantly scanning the crowd."
//   }
// ];

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {videoData, setVideoData} = useContext(VideoDataContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  // Get Video Script
  const GetVideoScript = async () => {
    const prompt = `Write a script to generate ${formData.duration} video on topic :${formData.topic} along with AI image prompts in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;

    const result = await axios.post('/api/get-video-script', {
      prompt: prompt
    });
    if (result.data.result) {
      setVideoData(prev => ({
        ...prev,
        'videoScript': result.data.result
      }));
      await generateAudioFile(result.data.result);
    };
  };

  // Generate Audio File and save it to the firebase
  const generateAudioFile = async (videoScriptData) => {
    let script = '';
    const id = uuidv4();
    console.log(videoScriptData);

    videoScriptData.forEach(item => {
      script += item.contentText + ' ';
    });

    console.log(script);
    const resp = await axios.post('/api/generate-audio', {
      text: script,
      id: id
    });
    console.log(resp.data.Request);
    setVideoData(prev => ({
      ...prev,
      'audioFileUrl': resp.data.Request
    }));
    resp.data.Request && await generateAudioCaption(resp.data.Request, videoScriptData);
  };

  // Generate Audio Caption from audio file:
  const generateAudioCaption = async (audioUrl, videoScriptData) => {
    const resp = await axios.post('/api/generate-caption', {
      audioFileUrl: audioUrl
    })
    setVideoData(prev => ({
      ...prev,
      'captions': resp.data.result
    }));
    console.log(resp.data.result);
    resp.data.result && await generateImage(videoScriptData);
  };

  const generateImage = async(videoScriptData) => {
    let images = [];
    console.log("--", videoScriptData);
    
    for (const element of videoScriptData){
      try {
        const res = await axios.post('/api/generate-image', {
          prompt: element?.imagePrompt
        })
          
        console.log(res.data.downloadUrl);
        images.push(res.data.downloadUrl);
      } catch (error) {
        console.log('Error:' + error);
      }
    }

    setVideoData(prev => ({
      ...prev,
      'imageList': images
    }));
    setIsLoading(false);
  };

  useEffect(()=>{
    console.log(videoData);
  }, [videoData])

  const onCreateClickHandler = () => {
    setIsLoading(true);
    GetVideoScript();
    // generateAudioFile(scriptData);
    // generateAudioCaption(audioURL);
    // generateImage();
  };

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
  );
};

export default CreateNew;