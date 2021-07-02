import React from 'react'

export type TProfilePropsType = {
  image: string
  name: string
  desc: string
}

const Profile: React.FC<TProfilePropsType> = ({ image, name, desc }) => {
  return (
    <div id="profile-container" data-profile-container className='flex flex-col md:flex-row items-center'>
      <div id="profile-img-container" data-profile-img-container className='w-144px h-144px md:mr-10'>
        <img alt='profileimage' src={image} />
      </div>
      <div id="profile-desc" data-profile-desc className='max-w-527px'>
        <p className='text-gray-very-dark font-bold text-xl text-center mt-30px md:mt-0 md:text-left'>
          {name}
        </p>
        <p className='mx-18px sm:mx-0 mt-5 text-gray-very-light'>{desc}</p>
      </div>
    </div>
  )
}

export default Profile
