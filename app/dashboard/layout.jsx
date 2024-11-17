"use client"
import React, { useEffect, useState } from 'react'
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';
import { VideoDataContext } from '../_context/VideoDataContext';
import { UserDetailContext } from '../_context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { eq } from 'drizzle-orm';

const DashboardLayout = ({children, isOpen}) => {
  const [videoData, setVideoData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const {user} = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(()=> {
    user && getUserDetail();
  }, [user])

  const getUserDetail= async() =>{
    const result = await db.select().from(Users)
    .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    setUserDetail(result[0]);
  }

  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <VideoDataContext.Provider value={{videoData, setVideoData}}>
      <div>
        <div className='bg-white fixed mt-[65px] z-30'>
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div>
          <Header/>
          <div className={`${isSidebarOpen && 'lg:ml-64'} p-10`}>
            {children}
          </div>
        </div>
      </div>
      </VideoDataContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default DashboardLayout