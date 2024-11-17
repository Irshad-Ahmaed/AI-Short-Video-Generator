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
import { db } from '@/configs/db';
import { useUser } from '@clerk/nextjs';
import { Users, VideoData } from '@/configs/schema';
import PlayerDialog from '../_components/PlayerDialog';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

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

// const staticData =
// {
//   "videoScript": [
//     {
//       "imagePrompt": "A single, determined figure, silhouetted against a vibrant sunrise, standing on top of a mountain, arms outstretched towards the sky.",
//       "contentText": "Every sunrise is a new chance. "
//     },
//     {
//       "imagePrompt": "A close-up of a hand holding a small sprout, delicate and green, bursting from the earth,  with a warm, golden light illuminating the scene.",
//       "contentText": "Believe in your potential, let your dreams bloom."
//     },
//     {
//       "imagePrompt": "A person running towards a finish line,  a determined expression on their face,  surrounded by cheering crowd, sunlight dappling through the stadium.",
//       "contentText": "Keep pushing, you're closer than you think."
//     }
//   ],
//   "audioFileUrl": "https://firebasestorage.googleapis.com/v0/b/ai-short-video-generator-84fe3.appspot.com/o/ai-short-video-files%2Faudios%2F9fc5ca4f-d13f-49de-bf5a-221658dff84c.mp3?alt=media&token=92c237cf-1638-4a09-8ef9-4f63648dc668",
//   "captions": [
//     {
//       "text": "Every",
//       "start": 360,
//       "end": 520,
//       "confidence": 0.99961,
//       "speaker": null
//     },
//     {
//       "text": "sunrise",
//       "start": 520,
//       "end": 960,
//       "confidence": 0.8932,
//       "speaker": null
//     },
//     {
//       "text": "is",
//       "start": 960,
//       "end": 1112,
//       "confidence": 0.71782,
//       "speaker": null
//     },
//     {
//       "text": "a",
//       "start": 1112,
//       "end": 1248,
//       "confidence": 0.9999,
//       "speaker": null
//     },
//     {
//       "text": "new",
//       "start": 1248,
//       "end": 1456,
//       "confidence": 0.99995,
//       "speaker": null
//     },
//     {
//       "text": "chance.",
//       "start": 1497,
//       "end": 2081,
//       "confidence": 0.99727,
//       "speaker": null
//     },
//     {
//       "text": "Believe",
//       "start": 2233,
//       "end": 2545,
//       "confidence": 0.99993,
//       "speaker": null
//     },
//     {
//       "text": "in",
//       "start": 2585,
//       "end": 2713,
//       "confidence": 0.99996,
//       "speaker": null
//     },
//     {
//       "text": "your",
//       "start": 2729,
//       "end": 2953,
//       "confidence": 0.9993,
//       "speaker": null
//     },
//     {
//       "text": "potential.",
//       "start": 3009,
//       "end": 3529,
//       "confidence": 0.90398,
//       "speaker": null
//     },
//     {
//       "text": "Let",
//       "start": 3657,
//       "end": 3873,
//       "confidence": 0.99989,
//       "speaker": null
//     },
//     {
//       "text": "your",
//       "start": 3889,
//       "end": 4065,
//       "confidence": 0.99922,
//       "speaker": null
//     },
//     {
//       "text": "dreams",
//       "start": 4105,
//       "end": 4465,
//       "confidence": 0.79617,
//       "speaker": null
//     },
//     {
//       "text": "bloom.",
//       "start": 4505,
//       "end": 5113,
//       "confidence": 0.5024,
//       "speaker": null
//     },
//     {
//       "text": "Keep",
//       "start": 5249,
//       "end": 5545,
//       "confidence": 0.98484,
//       "speaker": null
//     },
//     {
//       "text": "pushing.",
//       "start": 5585,
//       "end": 5961,
//       "confidence": 0.81679,
//       "speaker": null
//     },
//     {
//       "text": "You're",
//       "start": 6033,
//       "end": 6385,
//       "confidence": 0.5142,
//       "speaker": null
//     },
//     {
//       "text": "closer",
//       "start": 6425,
//       "end": 6721,
//       "confidence": 0.99994,
//       "speaker": null
//     },
//     {
//       "text": "than",
//       "start": 6753,
//       "end": 6897,
//       "confidence": 0.99993,
//       "speaker": null
//     },
//     {
//       "text": "you",
//       "start": 6921,
//       "end": 7105,
//       "confidence": 0.99993,
//       "speaker": null
//     },
//     {
//       "text": "think.",
//       "start": 7145,
//       "end": 7225,
//       "confidence": 0.99989,
//       "speaker": null
//     }
//   ],
//   "imageList": [
//     "https://firebasestorage.googleapis.com/v0/b/ai-short-video-generator-84fe3.appspot.com/o/ai-short-video-files%2Fimages%2F1730402608199.png?alt=media&token=f7fc4307-54ea-4c4e-98e6-0d39eb25e14d",
//     "https://firebasestorage.googleapis.com/v0/b/ai-short-video-generator-84fe3.appspot.com/o/ai-short-video-files%2Fimages%2F1730402616684.png?alt=media&token=7d6e7066-97bc-4018-a13b-8f0ff3017d1f",
//     "https://firebasestorage.googleapis.com/v0/b/ai-short-video-generator-84fe3.appspot.com/o/ai-short-video-files%2Fimages%2F1730402625378.png?alt=media&token=afe1b2aa-22e2-4010-afe9-11cc7b5efddc"
//   ]
// };

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();
  const [playVideo, setPlayVideo] = useState(true);
  const [videoId, setVideoId] = useState(10);

  const {userDetail, setUserDetail} = useContext(UserDetailContext);

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
    }, { timeout: 20000 });
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
    });
    setVideoData(prev => ({
      ...prev,
      'captions': resp.data.result
    }));
    console.log(resp.data.result);
    resp.data.result && await generateImage(videoScriptData);
  };

  const generateImage = async (videoScriptData) => {
    let images = [];
    console.log("--", videoScriptData);

    for (const element of videoScriptData) {
      try {
        const res = await axios.post('/api/generate-image', {
          prompt: element?.imagePrompt
        });

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
  };

  useEffect(() => {
    console.log(videoData);
    if (videoData && Object.keys(videoData).length == 4) saveVideoData(videoData);

  }, [videoData]);

  const saveVideoData = async (videoData) => {
    console.log(videoData);

    const result = await db.insert(VideoData).values({
      videoScript: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({ id: VideoData.id });

    await updateUserCredits();
    console.log(result);
    setVideoId(result[0].id);
    setPlayVideo(false);
    setIsLoading(false);
  };

  // Update User Credits after creating the video
  const updateUserCredits = async () => {
    const result = await db.update(Users).set({credits: userDetail?.credits - 10})
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
      .returning({id: Users.id});
      
    console.log(result);
    setUserDetail(prev=> ({
      ...prev,
      'credits': userDetail?.credits - 10
    }))

    setVideoData(null);
  }

  const onCreateClickHandler = () => {
    console.log(userDetail?.credits);
    if(userDetail?.credits < 10){
      toast("You don't have enough credits");
      return;
    }
    setIsLoading(true);
    // saveVideoData(staticData);
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
        <h3 className='text-center text-yellow-800'>10 Credits Per Video</h3>
      </div>
      <CustomLoading loading={isLoading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
};

export default CreateNew;