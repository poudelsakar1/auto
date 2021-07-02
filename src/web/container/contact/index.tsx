import React, { useEffect, useState, useLayoutEffect } from 'react'
import PageHeader from '../../component/page-header'

const ContactUsPage: React.FC = () => {
  const [width, setWidth] = useState(0)
  const [status, setStatus] = useState('inquery')
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  })
  return (
    <div id="contact-page-container" data-qa-contact-page-container>
      <PageHeader title='CONTACT US'>
      </PageHeader>
      <div className='max-w-screen-lg mx-auto flex flex-col py-10 text-gray-card-title'>
        <div id="contact-page-desc-container" data-qa-contact-page-desc-container className='text-center py-3'>
          <div id="contact-page-btn-group" data-qa-contact-page-btn-group className='py-3 px-8 sm:px-40 block sm:flex'>
            <div id="contact-page-inquery-btn" data-qa-contact-page-inquery-btn className='w-full sm:w-1/2 mb-2'>
              {status !== 'inquery' ? (
                <button
                  onClick={e => {
                    setStatus('inquery')
                  }}
                  style={{
                    border: '2px solid  #3775DF',
                    padding: '10px 10px',
                    borderRadius: '3px',
                    width: '90%',
                    color: '#3775DF',
                  }}
                >
                  General Inquiry
                </button>
              ) : (
                <button
                  onClick={e => {
                    setStatus('inquery')
                  }}
                  style={{
                    border: '2px solid  #3775DF',
                    padding: '10px 10px',
                    borderRadius: '3px',
                    width: '90%',
                    color: 'white',
                    backgroundColor: '#3775DF',
                  }}
                >
                  General Inquiry
                </button>
              )}
            </div>
            <div id="contact-page-dealership-btn" data-qa-contact-page-dealership-btn className='w-full sm:w-1/2 mb-2'>
              {status !== 'dealership' ? (
                <button
                  onClick={e => {
                    setStatus('dealership')
                  }}
                  style={{
                    border: '2px solid  #3775DF',
                    padding: '10px 10px',
                    borderRadius: '3px',
                    width: '90%',
                    color: '#3775DF',
                  }}
                >
                  Dealership Partnership
                </button>
              ) : (
                <button
                  onClick={e => {
                    setStatus('dealership')
                  }}
                  style={{
                    border: '2px solid  #3775DF',
                    padding: '10px 10px',
                    borderRadius: '3px',
                    width: '90%',
                    color: 'white',
                    backgroundColor: '#3775DF',
                  }}
                >
                  Dealership Partnership
                </button>
              )}
            </div>
          </div>
          {status !== 'inquery' ? (
            <p className='px-8 sm:px-40 py-3 text-lg sm:text-base'>
              All Dealership and Media inquiries welcome here
            </p>
          ) : (
            <p className='px-8 sm:px-40 py-3 text-lg sm:text-base'>
              Didn't find the car you wanted? Or have a general Inquery?
            </p>
          )}

          <p className='px-20 sm:px-40 text-blue-main-text uppercase font-bold text-lg sm:text-md'>
            PLEASE COMPLETE THE FORM BELOW
          </p>
        </div>
        {width > 700 ? (
          <div id="contact-page-iframe-container" data-qa-contact-page-iframe-container className='w-full px-8  sm:px-40 mt-5'>
            {status === 'inquery' ? (
              <iframe
                title='inquery-1-8qMQPduesXrL3tUvmUj4wbf4'
                src='https://docs.google.com/forms/d/e/1FAIpQLSe5oQWhk-8qMQPduesXrL3tUvmUj4wbf4-z9kSrzAYTjvj9Jg/viewform?embedded=true'
                width='700'
                height='520'
              >
                Loading…
              </iframe>
            ) : (
              <iframe
                title='inquery-1-I9TF5i3Gq88_ZmhEyjxcINtyJvNA'
                src='https://docs.google.com/forms/d/e/1FAIpQLSdX_kX1C7qJ7qejLZ_3m-I9TF5i3Gq88_ZmhEyjxcINtyJvNA/viewform?embedded=true'
                width='700'
                height='520'
              >
                Loading…
              </iframe>
            )}
          </div>
        ) : (
          <div id="contact-page-iframe-container" data-qa-contact-page-iframe-container className='w-full px-8  sm:px-40 mt-5'>
            {status === 'inquery' ? (
              <iframe
                title='inquery-2-8qMQPduesXrL3tUvmUj4wbf4'
                src='https://docs.google.com/forms/d/e/1FAIpQLSe5oQWhk-8qMQPduesXrL3tUvmUj4wbf4-z9kSrzAYTjvj9Jg/viewform?embedded=true'
                width={width * 0.9}
                height='520'
              >
                Loading…
              </iframe>
            ) : (
              <iframe
                title='inquery-2-I9TF5i3Gq88_ZmhEyjxcINtyJvNA'
                src='https://docs.google.com/forms/d/e/1FAIpQLSdX_kX1C7qJ7qejLZ_3m-I9TF5i3Gq88_ZmhEyjxcINtyJvNA/viewform?embedded=true'
                width={width * 0.9}
                height='520'
              >
                Loading…
              </iframe>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactUsPage
