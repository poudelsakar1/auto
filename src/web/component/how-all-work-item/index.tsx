import React from 'react'
import './style.scss'

interface IProps {
  title: string
  description: string
  icon: JSX.Element
}

const HowAllWorkItem: React.FC<IProps> = ({ title, description, icon }) => {
  return (
    <div
      id='how-all-work-item-container'
      data-qa-how-all-work-item-container
      className='text-center flex flex-col w-full sm:w-1/3 px-4 custom-max-width mx-auto mb-10'
    >
      <div
        id='how-all-work-item-icon'
        data-qa-how-all-work-item-icon
        className='mb-10 mx-auto'
      >
        {icon}
      </div>
      <div
        id='how-all-work-item-title'
        data-qa-how-all-work-item-title
        className='font-bold uppercase text-22px mb-5 w-2/3 mx-auto'
      >
        {title}
      </div>
      <div
        id='how-all-work-item-description'
        data-qa-how-all-work-item-description
        className='text-gray-very-light w-4/5 mx-auto text-center'
      >
        {description}
      </div>
    </div>
  )
}

export default HowAllWorkItem
