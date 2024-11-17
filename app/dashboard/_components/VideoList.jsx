import React, { useEffect, useState } from 'react';
import { Thumbnail } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

const VideoList = ({ videoList }) => {
    const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
    const [videoId, setVideoId] = useState();

    return (
        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {
                videoList.map((video, index) => (
                    <div onClick={()=> {setOpenPlayerDialog(!openPlayerDialog); setVideoId(video?.id)}} className='cursor-pointer hover:scale-105 transition-all'>
                        <Thumbnail
                            component={RemotionVideo}
                            compositionWidth={300}
                            compositionHeight={400}
                            frameToDisplay={30}
                            durationInFrames={120}
                            fps={30}
                            style={{
                                borderRadius: 15
                            }}
                            inputProps={{
                                ...video,
                                setDurationInFrame:(v)=> console.log(v)
                            }}
                        />
                    </div>
                ))
            }
           
            <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
           
        </div>
    );
};

export default VideoList;