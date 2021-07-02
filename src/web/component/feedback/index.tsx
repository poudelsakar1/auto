import React from 'react'
import './style.scss'

export type IPostProps = {
  comment: string
  name: string
  email: string
}

export type TFeedbackFormProps = {
  postHandler: (param: IPostProps) => void
}

const FeedbackForm: React.FC<TFeedbackFormProps> = ({ postHandler }) => {
  return (
    <div id='feedback-container' data-qa-feedback-container>
      <p className='mx-18px lg:ml-0 text-gray-very-dark font-bold text-base'>
        Post your Feedback
      </p>
      <div
        className='flex flex-col lg:flex-row mt-17px'
        id='feedback-comment-container'
        data-qa-feedback-comment-container
      >
        <div
          id='feedback-textarea'
          data-qa-feedback-textarea
          className='mx-18px lg:ml-0'
        >
          <textarea
            placeholder='Comment'
            className='custom-feedback-width h-178px bg-gray-light rounded-10px pt-22px pl-4 placeholder-gray-very-light italic'
          />
        </div>
        <div id="feedback-form" data-qa-feedback-form className='mx-18px'>
          <div id="feedback-form-input" data-qa-feedback-form-input>
            <input
              className='bg-gray-light custom-feedback-width py-14px px-4 rounded-10px italic placeholder-gray-very-light'
              type='text'
              placeholder='Name *'
            />
          </div>
          <div className='mt-14px' id="feedback-form-email" data-qa-feedback-form-email>
            <input
              className='bg-gray-light custom-feedback-width py-14px px-4 rounded-10px italic placeholder-gray-very-light'
              type='email'
              placeholder='Email *'
            />
          </div>
          <button className='mt-14px bg-blue-main-text text-white py-14px px-8 rounded-10px'>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm
