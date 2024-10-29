import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const SelectDuration = ({onUserSelect}) => {
  return (
    <div className='mt-7 flex flex-col gap-3'>
        <h2 className='font-bold text-2xl text-primary'>Duration</h2>
        <p className='text-gray-500'>Select the video duration</p>
        <Select onValueChange={(value)=> onUserSelect('duration', value)}>
            <SelectTrigger className="w-full p-6 text-lg">
                <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="15 Seconds">15 Seconds</SelectItem>
                <SelectItem value="30 Seconds">30 Seconds</SelectItem>
                <SelectItem value="60 Seconds">60 Seconds</SelectItem>
            </SelectContent>
        </Select>
    </div>
  )
}

export default SelectDuration