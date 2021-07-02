import React from 'react'
import './style.scss'

interface IProps {
  title: string
  children?: React.ReactNode
}

const PageHeader: React.FC<IProps> = ({ title, children }) => {
  const width = window.innerWidth
  return (
    <div
      id='page-header-container'
      data-qa-page-header-container
      className='w-full min-h-page-title-area-custom bg-blue-main-text py-4 sm:py-6 pb-6 page-header-title relative'
    >
      {width > 768 || title !== 'ABOUT AUTOLEASE NINJAS' ? (
        <div
          id='page-header-sub-container'
          data-qa-page-header-sub-container
          className='max-w-screen-lg mx-auto'
        >
          <p className='w-full pt-0 sm:pt-2 text-center font-extrabold tracking-wide px-2 sm:font-bold text-white text-3xl sm:text-4xl uppercase'>
            {title}
          </p>
          {children}
        </div>
      ) : (
        <div
          id='page-header-sub-container'
          data-qa-page-header-sub-container
          className='max-w-screen-lg mx-auto'
        >
          <p className='w-full text-center font-extrabold tracking-wide px-2 sm:font-bold text-white text-3xl sm:text-5xl uppercase'>
            About <br /> Autolease ninjas
          </p>
          {children}
        </div>
      )}
    </div>
  )
}

export default PageHeader
