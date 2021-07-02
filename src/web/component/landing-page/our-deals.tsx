import React, { useState, useEffect } from 'react'
import carImage from '../../asset/carAds.png'

const OurDeals: React.FC<{ onStartSearch: () => void }> = ({
  onStartSearch,
}) => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  return (
    <div id="our-deals-container" data-qa-our-deals-container className='max-w-screen-lg mx-auto custom-display mt-12'>
      {width < 900 ? (
        <div id="our-deals-static-description" data-qa-our-deals-static-description className='text-blue-main-text text-3xl mt-reduce-15 header-text-order'>
          <p
            className='font-light text-center px-8'
            style={{ lineHeight: 1.1 }}
          >
            AUTO LEASING IS STRESSFUL.
          </p>
          <p className='font-bold mt-reduce-9 text-center px-3'>
            WE’RE HERE TO HELP!
          </p>
        </div>
      ) : null}
      <div id="our-deals-carimage-container" data-qa-our-deals-carimage-container className='custom-image-width mt-4 divide-y divide-gray-400 rounded-lg mx-auto'>
        <img
          className='mt-auto w-full custom-image-own'
          src={carImage}
          alt='Car'
        />
      </div>
      <div id="car-deals-description-container" data-qa-car-deals-description-container className='custom-text-width mt-4 pl-8 pr-12'>
        {width > 900 ? (
          <div id="our-deals-static-description" data-our-deals-static-description className='text-blue-main-text text-3xl mt-reduce-15 header-text-order'>
            <p className='font-light header-text'>
              AUTO LEASING IS STRESSFUL.
            </p>
            <p className='font-bold mt-reduce-10'>WE’RE HERE TO HELP!</p>
          </div>
        ) : null}

        <p className='mt-2 text-gray-very-light leading-tight'>
          Picking out the right car and negotiating a great lease deal is
          stressful, time consuming, and outdated. According to a recent study
          by Cox Automotive, the average new car buyer or lessee spends over 14
          hours from start to finish. We’re here to change all of this, by
          enabling you to make an informed decision, with ninja-like confidence!
        </p>
        <p className='mt-4 text-gray-very-light leading-tight'>
          Our Auto Lease Ninjas will work with you to understand your needs,
          build a deal that fits your budget, and then secure that deal at a
          partner dealership. We use data aggregation and proprietary
          calculation tools to find great deals and provide penny perfect quotes
          every time. Additionally, almost all of the paperwork can be done from
          the comfort of your living room!! Better yet, our lease ninjas will
          work with you to schedule a home delivery or dealership pick-up
          depending on your preference! All your paperwork is prepared and
          securely sent to you!
        </p>
        <p className='mt-4 text-gray-very-light leading-tight'>
          The best news? All of this can be done in the comfort of your living
          room. You won’t have to spend hours on the phone or at a dealership,
          and never overpay! Some clients report spending less than 30 minutes
          at the dealership!
        </p>
        {/* <p className="font-bold mt-4 text-blue-main-text leading-tight">
        Experience the only True sign and drive service with <br />
         our Lease Negotiation Service! Inquire for Free  <br />
          today!
        </p> */}
        <button
          onClick={() => onStartSearch()}
          className='w-full bg-blue-main-text hover:bg-blue-dard text-white font-light py-2 px-4 mt-4 rounded w-300px'
        >
          View our Deals
        </button>
      </div>
    </div>
  )
}

export default OurDeals
