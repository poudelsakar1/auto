import React from 'react'
import { IPerson } from '../../container/about'

interface IProps {
  data: IPerson
}

const AboutPerson: React.FC<IProps> = ({ data }) => (
  <div id="about-person-container" data-qa-about-person-container  className='w-full text-center py-5'>
    <div
      id="about-person-sub-container"
      data-qa-about-person-sub-container
      className='rounded-full mx-auto'
      style={{
        width: 150,
        height: 150,
        backgroundImage: `url(${data.img})`,
        backgroundSize: 'cover',
      }}
    />
    <div id="about-person-name" data-qa-about-person-name className='font-extrabold uppercase mt-3 text-lg'>{data.name}</div>
    <div id="about-person-title" data-qa-about-person-title>{data.title}</div>
    <div id="about-person-content" data-qa-about-person-content className='mt-3 text-base sm:text-sm text-left'>{data.content}</div>
  </div>
)

export default AboutPerson
