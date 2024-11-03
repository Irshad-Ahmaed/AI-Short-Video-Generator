import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useContext } from 'react'

const Header = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  return (
    <div className='flex items-center justify-between shadow-md p-3 px-5'>
        <div className='flex items-center gap-3'>
            <Image className='bg-white' src={'/lg.jpg'} width={30} height={30} />
            <h2 className='text-xl font-bold'>Ai Short Vid</h2>
        </div>

        <div className='flex items-center gap-5'>
          <div className='flex items-center justify-center gap-1'>
            <Image src={'/star.png'} width={25} height={25} />
            <h2 className={`font-semibold ${userDetail?.credits >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>{userDetail?.credits}</h2>
          </div>
          <Button>Dashboard</Button>
          <UserButton />
        </div>
    </div>
  )
}

export default Header