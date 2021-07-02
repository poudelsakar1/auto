import React from 'react'
import './style.css'

interface IProps {
  show: boolean
  onToggle: any
  title?: string
  children?: JSX.Element
  onFormSubmit: () => void
  disableSubmit: boolean
}

const RetainerModal: React.FC<IProps> = ({
  show,
  onToggle,
  title,
  children,
  onFormSubmit,
  disableSubmit,
}) => {
  return (
    <div
      id='payretainer-modal-container'
      data-qa-payretainer-modal-container
      className={`z-20 modal fixed w-full  h-full top-0 left-0 flex items-center justify-center ${
        show ? '' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        id='payretainer-modal-toggle'
        data-qa-payretainer-modal-toggle
        className='modal-overlay absolute w-full h-full bg-gray-900 opacity-50'
        onClick={() => onToggle()}
      ></div>

      <div
        id='payretainer-modal-subcontainer'
        data-qa-payretainer-modal-subcontainer
        className='modal-container bg-white w-11/12 md:max-w-760px mx-auto custom-modal-height1 rounded-lg shadow-lg z-50 overflow-y-auto'
      >
        <div
          id='payretainer-modal-close-button'
          data-qa-payretainer-modal-close-button
          onClick={() => onToggle()}
          className='modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50 custom-orgin-icon'
        >
          <svg
            className='fill-current text-white'
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 18 18'
          >
            <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
          </svg>
          <span className='text-sm'>(Esc)</span>
        </div>

        <div
          id='payretainer-modal-close-button2'
          data-qa-payretainer-modal-close-button2
          className='modal-content py-8 text-left px-12 relative'
        >
          <div
            id='payreatiner-modal-close-button2-container'
            data-qa-payreatiner-modal-close-button2-container
            onClick={() => onToggle()}
            className='modal-close cursor-pointer z-50 absolute custom-modal-icon-position close-icon'
          >
            <svg
              className='fill-current text-white'
              xmlns='http://www.w3.org/2000/svg'
              width='26'
              height='26'
              viewBox='-1 -1 18 18'
            >
              <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
            </svg>
          </div>
          {children}
          <div
            className='flex justify-end'
            id='payretainer-modal-checkout-button'
            data-qa-payretainer-modal-checkout-button
          >
            <button
              disabled={!disableSubmit}
              onClick={() => onFormSubmit()}
              className='w-full px-4 bg-blue-500 p-3 rounded uppercase hover:bg-blue-700 font-bold text-white disabled:bg-gray-400'
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RetainerModal
