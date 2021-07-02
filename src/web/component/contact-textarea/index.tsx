import React from 'react'
import './style.scss'

interface IOwnProps {
  inlinePlaceholder?: string
}

type IProps = IOwnProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
const ContactTextArea: React.FC<IProps> = props => {
  const { placeholder, inlinePlaceholder, ...otherProps }: IProps = props

  return (
    <div id="contact-textarea-container" data-qa-contact-textarea-container className='w-full relative'>
      <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
        {placeholder}
      </label>
      <div id="contact-textarea-input-container" data-qa-contact-textarea-input-container className='relative'>
        <textarea
          {...(inlinePlaceholder && { placeholder: inlinePlaceholder })}
          className='block bg-white min-h-page-title-area appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
          {...otherProps}
        ></textarea>
      </div>
    </div>
  )
}

export default ContactTextArea
