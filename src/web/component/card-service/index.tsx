import React from 'react'
import { ServiceItem } from '../../container/faq'

const CardService: React.FC<ServiceItem> = ({ image, text, price }) => {
  return (
    <div id="car-service-container" data-qa-car-service-container className='flex flex-col border shadow-item relative rounded-md overflow-hidden'>
      <div id="car-service-image-container" data-qa-car-service-image-container className='w-full'>
        <img
          className='transition duration-150 transform hover:scale-105'
          style={{ width: '100%' }}
          src={image}
          alt=''
        />
      </div>
      <div id="car-service-text-container" data-qa-car-service-text-container className='p-5 text-left'>
        <div id="car-service-text" data-qa-car-service-text className='text-gray-card-title font-bold uppercase mb-4'>
          {text}
        </div>
        <div id="car-service-price" data-qa-car-service-price className='text-blue-main-text text-lg sm:text-sm font-semibold'>
          From ${price}
        </div>
      </div>
    </div>
  )
}

export default CardService
