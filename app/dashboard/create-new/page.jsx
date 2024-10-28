"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]:fieldValue
    }))
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-center text-primary'>Create New Short Video</h2>

      <div className='shadow-md p-10 mt-10'>
        {/* ⁡⁢⁢⁢Select Topic⁡ */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* ⁡⁢⁢⁢Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Select Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button className="mt-10 w-full">Create Short Video</Button>
      </div>
    </div>
  )
}

export default CreateNew