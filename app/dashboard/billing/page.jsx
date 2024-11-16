"use client";
import { db } from '@/configs/db';
import { UserSubscription } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';

const BuySubscription = () => {
  const {user} = useUser();
  const [loading, setLoading] = useState(false);

  const CreateSubscription = () => {
    setLoading(true);

    axios.post('/api/create-subscription', {})
    .then(response => { 
      console.log(response.data);
      OnPayment(response.data.id);
    }).catch(error=>{
      console.log(error);
      setLoading(false);
    })

  }

  const OnPayment=(subId)=>{
    const options = {
      "key":process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription": subId,
      "name":'StepByStep',
      description: "Monthly Subscription",
      handler:async(res)=>{
        console.log(res);
        if(res) SaveSubscription(res?.razorpay_payment_id)
        setLoading(false);
      }
    }

    const rzp = new Razorpay(options);
    e.preventDefault();
    rzp.open();
  }

  const SaveSubscription = async(paymentId) => {
    const result = await db.insert(UserSubscription)
    .values({
      email:user?.primaryEmailAddress?.emailAddress,
      userName: user?.username,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format(DD/MM/YY)
    })

    console.log(result);
  }

  return (
    <div className='min-h-screen p-10 md:px-20 lg:px-40 text-center'>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <h2 className='text-3xl font-bold text-primary'>Upgrade With Monthly Plan</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 rounded-xl items-center justify-center'>

        <div className={`p-6 flex md:flex-col justify-center items-center my-3 border rounded-2xl text-center cursor-pointer 
        hover:scale-105 hover:shadow-lg transition-all border-primary shadow-primary text-black`}>
          <h2>Free  </h2>
          <h2><span className='text-3xl mt-10 font-bold'>₹0</span> /month</h2>
          <ol className='flex flex-col items-start justify-center gap-4 mt-10 text-xl'>
            <li className='flex gap-3'>✅ 20 credits per day</li>
            <li className='flex gap-3'>✅ Credits Renew every day</li>
            <li className='flex gap-3'>❌ Can't use more than 20 credits per day</li>
            <li className='flex gap-3'>✅ 1 Month Validation</li>
            <li className='flex gap-3'>❌ Can't use after 1 month</li>
          </ol>

          <button className='my-10 p-5 border border-blue-400 rounded-full bg-gray-500 text-white'>Currently Active Plan</button>
        </div>

        <div className={`p-6 flex md:flex-col justify-center items-center my-3 border rounded-2xl text-center cursor-pointer 
        hover:scale-105 hover:shadow-lg transition-all text-black`}>
          <h2>PAID  </h2>
          <h2><span className='text-3xl mt-10 font-bold'>₹100</span> /month</h2>
          <ol className='flex flex-col items-start justify-center gap-4 mt-10 text-xl'>
            <li className='flex gap-3'>✅ 100 credits per day</li>
            <li className='flex gap-3'>✅ Credits Renew every day</li>
            <li className='flex gap-3'>✅ Remaining Credits add automatically per day</li>
            <li className='flex gap-3'>✅ 1 Month Validation</li>
            <li className='flex gap-3'>✅ Can use Remaining credits after 1 month</li>
          </ol>

          <button disabled={loading} onClick={()=> CreateSubscription()} 
            className='my-10 flex items-center p-5 hover:px-10 transition-all border border-blue-400 rounded-full 
            text-primary hover:bg-primary hover:text-white'>
            {loading && <Loader2Icon className='animate-spin'/>}
            Get Started
          </button>
        </div>

      </div>


    </div>
  );
};

export default BuySubscription;