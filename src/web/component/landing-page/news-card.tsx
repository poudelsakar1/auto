import React from 'react'
import featuredCar1 from '../../asset/featured-car-1.png'

interface IProps {
  image?: string
  title: string
  publishDate: string
  shortDescription: string
  link: string
}

const Card: React.FC<IProps> = ({
  title,
  publishDate,
  shortDescription,
  link,
  image = '',
}) => {
  return (
    <div
      id='new-card-container'
      data-qa-new-card-container
      className='max-w-sm rounded-lg overflow-hidden shadow-item mt-5'
    >
      {image !== '' ? (
        <img
          className='w-full'
          src={featuredCar1}
          alt='Sunset in the mountains'
        />
      ) : (
        ''
      )}
      <div
        id='new-card-descrption-container'
        data-qa-new-card-descrption-container
        className='px-6'
      >
        <p className='font-extrabold text-xl mb-2 text-gray-card-title text-left mt-5'>
          {title}
        </p>
        <p className='font-thin text-xs text-left mt-reduce-12 italic'>
          {publishDate}
        </p>
        <p className='text-gray-very-light text-left mt-4 leading-tight'>
          {shortDescription}
        </p>
      </div>
      <div id="news-card-link-container" data-qa-news-card-link-container className='px-6 mb-12 mt-2'>
        <a
          id="news-card-read-more" data-qa-news-card-read-more
          href={link}
          className='text-sm font-semibold text-blue-main-text float-right'
        >
          Read More
        </a>
      </div>
    </div>
  )
}

export default Card
