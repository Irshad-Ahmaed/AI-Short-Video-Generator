"use client";
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { db } from '@/configs/db';
import { Users, UserSubscription } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { Loader2Icon } from 'lucide-react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';

const BuySubscription = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [currentDay, setCurrentDay] = useState(moment().format("YYYY-MM-DD"));

  const CreateSubscription = () => {
    setLoading(true);
    axios.post('/api/create-subscription', {})
      .then(response => {
        console.log(response.data);
        OnPayment(response.data.id);
      }).catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const OnPayment = async (subId) => {
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription": subId,
      "name": 'StepByStep',
      description: "Monthly Subscription",
      handler: async (res) => {
        console.log(res);
        if (res) SaveSubscription(res.razorpay_payment_id);
        setLoading(false);
      }
    };
    InitializeRazorpay(options);
  };

  const InitializeRazorpay = (options) => {
    try {
      let rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("try again");
      window.location.reload();
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const SaveSubscription = async (paymentId) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format('DD/MM/YY')
    }).returning({ id: UserSubscription.id });

    const subResult = await db.update(Users).set({ subscription: true, credits: userDetail?.credits + 30 })
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
      .returning({ id: Users.id });

    setUserDetail(prev => ({
      ...prev,
      'credits': userDetail?.credits + 30
    }));

    if (subResult) window.location.reload();
  };

  const deleteSubscription = async () => {
    const result = await db.delete(UserSubscription)
      .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));

    const subResult = await db.update(Users).set({ subscription: false })
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
      .returning({ id: Users.id });

    console.log(result);
    console.log(subResult);
    if (result) window.location.reload();
  };

  useEffect(() => {
    const checkForNewDay = async () => {
      const today = moment().format("YYYY-MM-DD");
      if (today !== currentDay) {
        setCurrentDay(today); // Update state to the new day
        // Call the API or DB update logic
        const subResult = await db.update(Users).set({ credits: userDetail?.credits + 50 })
          .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
          .returning({ id: Users.id });

        setUserDetail(prev => ({
          ...prev,
          'credits': userDetail?.credits + 50
        }));

        if (subResult) window.location.reload();
      }
    };

    // Check every minute (60000ms)
    const interval = setInterval(checkForNewDay, 60000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentDay]);

  return (
    <div className='p-10 md:px-20 lg:px-40 text-center'>
      {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
      <h2 className='text-3xl font-bold text-primary'>Upgrade With Monthly Plan</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-10 gap-10 rounded-xl items-center justify-center'>

        <div className={`p-6 my-3 border rounded-2xl text-center cursor-pointer 
        hover:scale-105 hover:shadow-lg transition-all ${userDetail?.subscription === false ? 'border-primary shadow-primary' : ''} text-black`}>
          <h2>Free  </h2>
          <h2><span className='text-3xl mt-10 font-bold'>₹0</span> /month</h2>
          <ol className='flex flex-col gap-4 mt-10 text-sm lg:text-lg'>
            <li className='flex gap-3'><span>✅</span> 20 credits per day</li>
            <li className='flex gap-3'><span>✅</span> Credits Renew every day</li>
            <li className='flex gap-3'><span>❌</span> Can't use more than 20 credits per day</li>
            <li className='flex gap-3'><span>✅</span> 1 Month Validation</li>
            <li className='flex gap-3'><span>❌</span> Can't use after 1 month</li>
          </ol>

          <button disabled='true' className='my-10 p-5 border border-blue-400 rounded-full bg-gray-500 text-white'> {userDetail?.subscription === false ? 'Currently Active Plan' : 'Included With Paid Plain'}</button>


        </div>

        <div className={`p-6 my-3 border rounded-2xl text-center cursor-pointer 
        hover:scale-105 hover:shadow-lg transition-all text-black ${userDetail?.subscription === true ? 'border-primary shadow-primary' : ''}`}>
          <h2>PAID  </h2>
          <h2><span className='text-3xl mt-10 font-bold'>₹99</span> /month</h2>
          <ol className='flex flex-col gap-4 mt-10 text-sm lg:text-lg'>
            <li className='flex gap-3'><span>✅</span> 30 + 20 credits per day</li>
            <li className='flex gap-3'><span>✅</span> Credits Renew every day</li>
            <li className='flex gap-3'><span>✅</span> Unused Credits add automatically</li>
            <li className='flex gap-3'><span>✅</span> 1 Month Validation</li>
            <li className='flex gap-3'><span>✅</span> Can use Remaining credits after 1 month</li>
          </ol>

          {
            userDetail?.subscription === false ?
              <button disabled={loading} onClick={() => CreateSubscription()}
                className='my-10 p-5 hover:px-10 transition-all border border-blue-400 rounded-full 
                text-primary hover:bg-primary hover:text-white'>
                {loading && <Loader2Icon className='animate-spin' />}
                Get Started
              </button>
              :
              <div className='flex justify-around w-full gap-8 my-10'>
                <button disabled='true'
                  className='p-2 transition-all border border-green-400 bg-green-100 rounded-full 
                text-green-500'>
                  Currently Active Plan
                </button>
                <button onClick={() => deleteSubscription()}
                  className='p-2 transition-all border border-red-400 bg-red-100 rounded-full 
                text-red-500 hover:bg-white'>
                  Delete Subscription
                </button>
              </div>
          }
        </div>

      </div>


    </div>
  );
};

export default BuySubscription;