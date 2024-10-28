import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between shadow-md p-3 px-5'>
        <div className='flex items-center gap-3'>
            <Image className='bg-white' src={'/lg.jpg'} width={30} height={30} />
            <h2 className='text-xl font-bold'>Ai Short Vid</h2>
        </div>
        
        <div className='flex items-center gap-5'>
          <Button>Dashboard</Button>
          <UserButton />
        </div>
    </div>
  )
}

export default Header