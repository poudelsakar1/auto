import React, { useState } from 'react'
import { IFAQItem } from '../../container/faq'

interface IProps {
  item: IFAQItem
}

const FAQItem: React.FC<IProps> = ({ item }) => {
  const [actived, setActived] = useState(false)

  return (
    <div
      id='faq-item-container'
      data-qa-faq-item-container
      onClick={() => setActived(!actived)}
      className='flex flex-col text-left border-b py-5'
    >
      <div
        id='faq-item-question-container'
        data-qa-faq-item-question-container
        className='cursor-pointer uppercase font-medium text-blue-main-text text-md flex flex-row leading-8'
      >
        <div
          id='faq-item-question'
          data-qa-faq-item-question
          className='w-5/6 flex-grow leading-snug sm:leading-normal'
        >
          {item.question}
        </div>
        <div
          id='faq-item-expended-icon'
          data-qa-faq-item-expended-icon
          className='w-1/6 flex justify-end'
        >
          <button
            className='border w-28px h-28px text-xl focus:outline-none text-gray-very-light border-gray-very-light leading-3'
            style={{ paddingBottom: '4px' }}
          >
            {actived ? (
              <span style={{ marginBottom: '5px' }}>+</span>
            ) : (
              <span>-</span>
            )}
          </button>
        </div>
      </div>
      <div
        id='faq-item-answer'
        data-qa-faq-item-answer
        className={`transition-opacity duration-200 font-medium sm:font-normal text-base sm:text-sm text-gray-card-title ${
          actived ? 'opacity-1 mt-4' : 'opacity-0 h-0 '
        }`}
      >
        {item.answer}
      </div>
    </div>
  )
}

export default FAQItem
