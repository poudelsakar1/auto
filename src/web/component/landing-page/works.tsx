import React from 'react'
import { HowItWorksContent } from '../../container/how-it-works'

const Works: React.FC = () => (
  <div id="work-container" data-qa-work-container className='max-w-screen-lg mx-auto text-center'>
    <div id="work-iframe-container" data-qa-work-iframe-container className='works-part-margin'>
      <div id="work-iframe" data-qa-work-iframe className='flex justify-center mx-6 mt-3 mb-5 sm:mx-0 '>
        <iframe
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          title='YouTube video player'
          width='512'
          height='288'
          src='https://www.youtube.com/embed/D0q_8KomIyI?autoplay=0&amp;mute=0&amp;controls=0&amp;origin=https%3A%2F%2Fautoleaseninjas.net&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1'
          id='youtube-video'
          data-gtm-yt-inspected-1_25='true'
        ></iframe>
      </div>
      <h5 className='font-bold text-blue-main-text text-4xl'>HOW IT WORKS</h5>
    </div>

    <div id="how-it-works-content-container" data-qa-how-it-works-content-container className='flex text-center text-gray-very-light'>
      <HowItWorksContent video={false} />
    </div>
  </div>
)

export default Works
