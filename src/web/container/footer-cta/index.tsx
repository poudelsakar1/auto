import React from 'react'
import LogoMain from '../../asset/logo-main.png'
import { Link } from 'react-router-dom'
import './style.scss'

const FooterCTA: React.FC = () => {
  return (
    <div id="footer-cta-container" data-qa-footer-cta-container className='w-full h-422px'>
      <div id="footer-cta-sub-container" data-qa-footer-cta-sub-container className='w-full bg-gray-light pt-8 px-6'>
        <div id="footer-cta-home-container" data-qa-footer-cta-home-container className='max-w-screen-lg mx-auto text-gray-very-light custom-display'>
          <div id="footer-cta-home-logo" data-qa-footer-cta-home-logo className='custom-ninja-icon inline-block cursor-pointer pb-6'>
            <Link to='/'>
              <img
                className='h-43px mt-9px mb-4'
                style={{ minWidth: 200 }}
                src={LogoMain}
                alt='logo'
              />
            </Link>
            <p className='mt-2'>
              Auto Leasing is Stressful. <br />
              We’re Here To Help!
            </p>
          </div>
          <div id="footer-cta-main-container" data-qa-footer-cta-main-container className='autoleas-info custom-display text-rightm pb-5'>
            <div id="footer-cta-links-group" data-qa-footer-cta-links-group className='custom-width-half inline-block text-left'>
              <div id="footer-cta-home-link" data-qa-footer-cta-home-link className='hover:font-medium cursor-pointer mb-1'>
                <Link to='/'>Home</Link>
              </div>
              <div id="footer-cta-about-link" data-qa-footer-cta-about-link className='hover:font-medium cursor-pointer mb-1'>
                <Link to='/about'>About</Link>
              </div>
              <div id="footer-cta-how-it-works" data-qa-footer-cta-how-it-works className='hover:font-medium cursor-pointer mb-1'>
                <Link to='/how-it-works'>How it works</Link>
              </div>
              <div id="footer-cta-faqs-link" data-qa-footer-cta-faqs-link className='hover:font-medium cursor-pointer mb-1'>
                <Link to='/faq'>FAQs</Link>
              </div>
              <div id="footer-cta-contact-link" data-qa-footer-cta-contact-link className='hover:font-medium cursor-pointer mb-1'>
                <Link to='/contact'>Contact</Link>
              </div>
            </div>
            <div id="footer-cta-contact-info" data-qa-footer-cta-contact-info className='custom-width-half inline-block text-left mt-3'>
              <p className='mb-1'>inquiries@autoleaseninjas.com</p>
              <p>(646) 360 - 0273</p>
              <br />
            </div>
          </div>
        </div>
        <p className='max-w-screen-lg mx-auto text-center text-gray-very-light pb-5'>
          {new Date().getFullYear()} Copyright The Autolease Ninjas LLC
        </p>
      </div>
    </div>
  )
}

export default FooterCTA
