"use client"
import { Button } from '@/components/ui/button';
import { CircleUser, FileVideo, Key, PanelsTopLeftIcon, ShieldPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Sidebar = () => {
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
    <div className='w-64 shadow-md h-screen p-5'>
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
    </div>
  )
}

export default Sidebar