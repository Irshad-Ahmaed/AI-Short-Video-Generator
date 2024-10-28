import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const EmptyState = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-5 mt-10 p-5 py-24 border-2 border-dotted'>
        <h2 className='text-4xl text-gray-700 font-light'>You don't have any short video!</h2>
        <Link href={"/dashboard/create-new"}>
            <Button>Create New Short Video</Button>
        </Link>
    </div>
  )
}

export default EmptyState