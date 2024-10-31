"use client"
import React, { useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

  
const SelectTopic = ({onUserSelect}) => {
    const options =[
        {
            id: 1,
            value:'Custom Prompts'
        },
        {
            id: 2,
            value:'Random AI Story'
        },
        {
            id: 3,
            value:'Scary Story'
        },
        {
            id: 4,
            value:'Historical Facts'
        },
        {
            id: 5,
            value:'Bed Time Story'
        },
        {
            id: 6,
            value:'Motivational'
        },
        {
            id: 7,
            value:'Fun Facts'
        },
    ]

    const [selectedOption, setSelectedOption] = useState();

  return (
    <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-2xl text-primary'>Content</h2>
        <p className='text-gray-500'>What is the topic of your video?</p>

        {/* ShadCN Select functionality */}
        <Select onValueChange={(value)=> {
            setSelectedOption(value)
            value!="Custom Prompts" && onUserSelect('topic', value)
            }}>
            <SelectTrigger className="w-full p-6 text-lg">
                <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
                {options.map((item, index) => (
                    <SelectItem key={index} value={item.value}>{item.value}</SelectItem>
                ))}
            </SelectContent>
        </Select>

        {
            selectedOption == 'Custom Prompts' &&
            <Textarea onChange={(e)=> onUserSelect('topic', e.target.value)} placeholder="write the prompt which you want to generate"/>
        }
    </div>
  )
}

export default SelectTopic