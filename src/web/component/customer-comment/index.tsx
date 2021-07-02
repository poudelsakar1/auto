import React from 'react'
import QuoteIcon from '../../asset/quote.svg'
import { IComment } from '../../container/about'

const CustomerComment: React.FC<IComment> = ({ content, author }) => (
  <div
    className='flex flex-col text-center'
    id='customer-comment-container'
    data-qa-customer-comment-container
  >
    <div
      id='customer-comment-img-container'
      data-qa-customer-comment-img-container
    >
      <img className='mx-auto' src={QuoteIcon} alt='' />
    </div>
    <div
      id='customer-comment-content'
      data-qa-customer-comment-content
      className='mt-5 text-gray-card-title font-semibold px-8 sm:px-0 sm:font-normal text-xl sm:text-base'
      style={{ color: '#00172A' }}
    >
      “{content}”
    </div>
    <div
      id='customer-comment-author'
      data-qa-customer-comment-author
      className='mt-5 text-blue-main-text text-sm uppercase'
    >
      {author}
    </div>
  </div>
)

export default CustomerComment
