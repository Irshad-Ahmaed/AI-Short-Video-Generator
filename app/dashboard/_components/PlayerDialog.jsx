"use client";
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';

const PlayerDialog = ({ playVideo, videoId }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState();
    const [durationInFrame, setDurationInFrame] = useState(100);

    useEffect(() => {
        setOpenDialog(playVideo);
        videoId && GetVideoData();
    }, [playVideo]);

    const GetVideoData = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData.id, videoId));

        console.log(result);
        setVideoData(result[0]);
    };

    return (
        <Dialog open={openDialog}>
            <DialogContent className="flex flex-col justify-center items-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5 text-center">Your Video is ready</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={Number(durationInFrame.toFixed(0))}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                            controls={true}
                            inputProps={{
                                ...videoData,
                                setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
                            }}
                        />

                        <div className='flex items-center justify-around mt-8'>
                            <Button variant="ghost" >Cancel</Button>
                            <Button className="hover:-translate-y-4 hover:translate-x-1 hover:bg-gray-700 transition-all">Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default PlayerDialog;