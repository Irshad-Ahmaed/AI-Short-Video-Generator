"use client"
import Image from 'next/image';
import React, { useState } from 'react'

const SelectStyle = ({onUserSelect}) => {
    const styleOptions = [
        {
            name: "Realistic",
            image: "/realistic.webp"
        },
        {
            name: "Cartoon",
            image: "/cartoon.webp"
        },
        {
            name: "Comic",
            image: "/comic.jpg"
        },
        {
            name: "WaterColor",
            image: "/water.jpg"
        },
        {
            name: "GTA",
            image: "/gta.jpeg"
        },
    ]

    const [selectedOption, setSelectedOption] = useState();

  return (
    <div className='mt-7 flex flex-col gap-3'>
        <h2 className='font-bold text-2xl text-primary'>Style</h2>
        <p className='text-gray-500'>Select Your video Style</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
            {
                styleOptions.map((item, index)=> (
                    <div key={index}
                    className={`relative hover:scale-105 hover:shadow-lg hover:shadow-gray-600 rounded-xl 
                    transition-all cursor-pointer ${selectedOption==item.name && 'border-4 border-primary'}`}
                    onClick={()=> {
                        setSelectedOption(item.name);
                        onUserSelect('imageStyle', item.name)
                    }}>
                        <Image src={item.image} width={200} height={200}
                        className='rounded-lg w-full h-48 object-cover' />

                        <h2 className='absolute bottom-0 rounded-b-lg w-full text-center text-white p-1 bg-black'>{item.name}</h2>
                    </div>
                ))
            }
            
        </div>
    </div>
  )
}

export default SelectStyle