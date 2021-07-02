import React from 'react'
import carImage from '../../asset/oto.svg'
import './style.scss'

const TopPannel: React.FC = () => (
  <div
    id='top-pannel-container'
    data-qa-top-pannel-container
    className='max-w-screen-lg mx-auto relative second-container custom1-max-width'
  >
    <div
      id='top-pannel-sub-container'
      data-qa-top-pannel-sub-container
      className='second-section callout top-left mx-auto'
    >
      <div
        id='top-pannel-sub'
        data-qa-top-pannel-sub
        className='sm:w-1/1 lg:w-1/2'
      >
        <div
          id='top-pannel-description'
          data-qa-top-pannel-description
          className='mt-12 text-blue-main-text uppercase title-do-dreaming'
        >
          <p className='title-font'>You do the Dreaming,</p>
          <h5 className='font-black sm: mt-0 title-font'>
            We'll Do The Leasing!
          </h5>
        </div>
        <h5
          className='text-gray-very-light grey-font mt-reduce-10'
          style={{ textAlign: 'left' }}
        >
          Find the perfect lease deal
        </h5>
      </div>
      <div
        id='top-pannel-img-container'
        data-qa-top-pannel-img-container
        className='sm:w-1/1 lg:w-1/2'
      >
        <img
          className='w-auto sm:h-64 lg:ml-28 md:h-72 car-image-custom'
          src={carImage}
          style={{ margin: 'auto' }}
          alt='Car'
        />
      </div>
    </div>
  </div>
)

export default TopPannel
