"use client";
import React, { useEffect, useState } from 'react';
import Script from 'next/script';

const BuyCredits = () => {
  const creditsOptions = [
    {
      id: 1,
      price: 69,
      credits: 50
    },
    {
      id: 2,
      price: 89,
      credits: 80
    },
    {
      id: 3,
      price: 109,
      credits: 100
    },
    {
      id: 4,
      price: 149,
      credits: 180
    }
  ];

  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (typeof google !== 'undefined' && selectedOption) {
      initializeGooglePay();
    }
  }, [selectedOption]);

  const initializeGooglePay = () => {
    const paymentsClient = new google.payments.api.PaymentsClient({
      environment: 'TEST' // Change to 'PRODUCTION' when you go live
    });

    const selectedOptionDetails = creditsOptions.find(option => option.id === selectedOption);

    const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD', // This line is for testing purposes.
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
          }
        },
        {
          type: 'UPI',
          parameters: {
            allowedTypes: ['UPI'],
          }
        }
      ],
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: selectedOptionDetails ? selectedOptionDetails.price.toString() : '0',
        currencyCode: 'INR'
      },
      merchantInfo: {
        merchantName: 'AI-Video-Credits',
        merchantId: 'BCR2DN4TUPPM773Z'
      }
    };

    console.log('Payment Request:', paymentRequest); // Log payment request
    
    paymentsClient
      .isReadyToPay(paymentRequest)
      .then(response => {
        if (response.result) {
          const button = paymentsClient.createButton({
            onClick: () => {
              paymentsClient
                .loadPaymentData(paymentRequest)
                .then(paymentData => {
                  console.log('Payment successful', paymentData);
                  // Handle successful payment here
                })
                .catch(error => {
                  console.error('Payment failed', error);
                });
            }
          });
          const container = document.getElementById('google-pay-button');
          container.innerHTML = '';
          container.appendChild(button);
        }
      })
      .catch(error => {
        console.error('isReadyToPay failed', error);
      });
  };

  return (
    <div className='min-h-screen p-10 md:px-20 lg:px-40 text-center'>
      <h2 className='text-3xl font-bold text-primary'>Add More Credits</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 items-center justify-center'>
        <div>
          {
            creditsOptions.map((option, index) => (
              <div className={`p-6 my-3 border rounded-lg text-center text-white cursor-pointer 
              hover:scale-105 hover:shadow-lg transition-all ${selectedOption == option.id ? 'bg-gray-700 scale-105' : 'bg-primary'}`}
                onClick={() => setSelectedOption(option.id)}>
                <h2>Get {option.credits} Credits = {option.credits / 10} Videos</h2>
                <h2 className='font-bold text-2xl'>₹ {option.price}</h2>
              </div>
            ))
          }
        </div>

        {/* Payment Gateway */}
        <div id="payment-container">
          <Script src="https://pay.google.com/gp/p/js/pay.js" onLoad={initializeGooglePay} />
          <div id="google-pay-button" className="mt-5">
            {/* Google Pay button will be rendered here */}
          </div>
        </div>
      </div>


    </div>
  );
};

export default BuyCredits;