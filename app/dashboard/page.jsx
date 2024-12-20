"use client"
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import VideoList from './_components/VideoList';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useUser();

  useEffect(()=>{
    user && getVideoList();
  }, [user])

  // Used to get User Videos
  const getVideoList = async()=> {
    const result = await db.select().from(VideoData)
    .where(eq(VideoData.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    setVideoList(result);
    setLoading(!loading);
  }

  return (
    <div>
      <div className=' flex items-center justify-between'>
        <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button className='flex items-center p-2 shadow-md hover:bg-purple-500
            hover:-translate-y-0.5 duration-1000 ease-in-out'>
            <PlusCircle/> Create New
          </Button>
        </Link>
        
      </div>

      {
        loading &&
        <div className='mt-52 flex justify-center items-center text-gray-600 text-2xl font-bold'>
          Loading...
        </div>
      }

      {!loading && videoList?.length == 0 &&
        <div>
          <EmptyState/>
        </div>
      }

      {/* List Of Videos */}
      <VideoList videoList={videoList} />
    </div>
  )
}

export default Dashboard