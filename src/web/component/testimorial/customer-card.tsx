import React from 'react'

interface IProps {
  img: any
  text: string
}

const CustomerCard: React.FC<IProps> = ({ img, text }) => {
  return (
    <div
      id='customer-card-container'
      data-qa-customer-card-container
      className='custom-width-card h-customer-card shadow-item bg-white rounded-lg mt-16'
    >
      <div
        id='customer-instagram-icon'
        data-qa-customer-instagram-icon
        className='rounded-full relative'
      >
        <img
          className='absolute'
          style={{ top: '-50px', left: '33%', width: 100 }}
          src='https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/10043059541579774615-512.png'
          alt='instagram icon'
        />
      </div>
      <div className='pt-16 px-10 text-gray-very-light text-sm'>{text}</div>
    </div>
  )
}

export default CustomerCard
