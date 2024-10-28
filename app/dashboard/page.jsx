"use client"
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'
import EmptyState from './_components/EmptyState';
import Link from 'next/link';

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
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

      {videoList?.length == 0 &&
        <div>
          <EmptyState/>
        </div>
      }
    </div>
  )
}

export default Dashboard