import React, { useState } from 'react'
import LogoMain from '../../asset/logo-main.png'
import BetaLogo from '../../asset/BETA_ribbon-2.png'
import { Link } from 'react-router-dom'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const AppBar: React.FC = () => {
  const [classList, setClassList] = useState('menu-items active-menu')

  const showMenuF = () => {
    if (classList === 'menu-items') setClassList('menu-items active-menu')
    else setClassList('menu-items')
  }
  return (
    <div id="app-bar-container" data-qa-app-bar className='w-full h-70px p-5 mobile-header-container relative'>
      <div id="app-bar-img-container" data-qa-app-bar-container className='absolute' style={{ right: 70 }}>
        <img
          className='w-auto image-style max-w-xs image-style'
          src={BetaLogo}
          alt='logo'
        />
      </div>
      <div id="app-bar-icons-container" data-qa-app-bar-icons-container className='max-w-screen-lg mx-auto header-style flex items-center'>
        <div id="app-bar-bars-icon" data-qa-app-bar-bars-icon className='inline-block cursor-pointer flex'>
          <FontAwesomeIcon
            role='button'
            className='hamburger-icon mt-0 sm:mt-3 mr-0 sm:mr-4'
            size='2x'
            icon={faBars}
            onClick={e => showMenuF()}
          />
        </div>
        <Link className='m-auto' to='/'>
          <img
            className='w-auto image-style max-w-xs image-style'
            src={LogoMain}
            alt='logo'
          />
        </Link>
      </div>
      <div className='max-w-screen-lg mx-auto header-style'>
        <div className={classList}>
          <div id="app-bar-home" data-qa-app-bar-home className='hover:text-gray-600 cursor-pointer menu-item'>
            <Link to='/'>Home</Link>
          </div>
          <div id="app-bar-about" data-qa-app-bar-about className='hover:text-gray-600 curs  or-pointer left-9 menu-item'>
            <Link to='/about'>About</Link>
          </div>
          <div id="app-bar-how-it-works" data-qa-app-bar-how-it-works className='hover:text-gray-600 cursor-pointer left-9 menu-item'>
            <Link to='/how-it-works'>How it works</Link>
          </div>
          <div id="app-bar-faqs" data-qa-app-bar-faqs className='hover:text-gray-600 cursor-pointer left-9 menu-item'>
            <Link to='/faq'>FAQs</Link>
          </div>
          <div id="app-bar-testimonials" data-qa-app-bar-testimonials className='hover:text-gray-600 cursor-pointer left-9 menu-item'>
            <Link to='/review'>Testimonials</Link>
          </div>
          <div id="app-bar-our-services" data-qa-app-bar-our-services className='hover:text-gray-600 cursor-pointer left-9 menu-item'>
            <Link to='/services'>Our Services</Link>
          </div>
          <div id="app-bar-our-contact" data-qa-app-bar-our-contact className='hover:text-gray-600 cursor-pointer left-9 menu-item'>
            <Link to='/contact'>Contact</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBar
