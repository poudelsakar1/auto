import React from 'react'

interface IOwnProps {
  inlinePlaceholder?: string
}

type IProps = IOwnProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const ContactInput: React.FC<IProps> = props => {
  const { placeholder, inlinePlaceholder, ...otherProps }: IProps = props

  return (
    <div className='w-full relative' id="contact-input-container" data-qa-contact-input-container>
      <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
        {placeholder}
      </label>
      <div id="contact-input2-container" data-qa-contact-input2-container className='relative'>
        <input
          {...(inlinePlaceholder && { placeholder: inlinePlaceholder })}
          className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
          {...otherProps}
        ></input>
      </div>
    </div>
  )
}

export default ContactInput
