"use client"
import { Button } from '@/components/ui/button';
import { CircleUser, FileVideo, Key, LucideLogOut, MenuSquareIcon, PanelsTopLeftIcon, ShieldPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import DashboardLayout from '../layout';

const Sidebar = ({isSidebarOpen, setIsSidebarOpen}) => {
    const MenuOptions = [
        {
            id: 1,
            name: "Dashboard",
            path: "/dashboard",
            icon: PanelsTopLeftIcon
        },
        {
            id: 1,
            name: "Create New",
            path: "/dashboard/create-new",
            icon: FileVideo
        },
        {
            id: 1,
            name: "Upgrade",
            path: "/dashboard/billing",
            icon: ShieldPlus
        },
        {
            id: 1,
            name: "Account",
            path: "/dashboard/account",
            icon: CircleUser
        }
    ]

    const path = usePathname();

  return (
    
    isSidebarOpen ?
    <div className='w-64 shadow-md p-5 flex justify-between items-end flex-col'>
        <div className='grid gap-3'>
        {
            MenuOptions.map((menu, index)=>(
                <Link href={menu.path} key={index}>
                    <div className={`cursor-pointer rounded-md flex items-center 
                        gap-3 p-3 hover:bg-purple-500 hover:text-white ${path==menu.path ? 'bg-primary text-white' : 'bg-white'}`}>
                        {<menu.icon/>}
                        <h3 className='text-xl'>{menu.name}</h3>
                    </div>
                </Link>
            ))
        }
        </div>
        <LucideLogOut onClick={()=>setIsSidebarOpen(!isSidebarOpen)} className='rotate-180 h-screen cursor-pointer' width={24} height={24} />
    </div>
    :
    <MenuSquareIcon onClick={()=> setIsSidebarOpen(!isSidebarOpen)} width={30} height={30} className='fixed text-gray-500 cursor-pointer top-24 lg:top-20' />
    
  )
}

export default Sidebar