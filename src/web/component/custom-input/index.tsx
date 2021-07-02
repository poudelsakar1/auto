import React from 'react'
import _isEmpty from 'lodash/isEmpty'

interface IProps {
  placeholder?: string
  subPlaceHolder?: string
  onTextChange?: (value: string) => void
  onBlur?: (value: string) => void
  defaultValue?: string
}

const CustomInput: React.FC<IProps> = ({
  onTextChange,
  onBlur,
  defaultValue,
  placeholder,
  subPlaceHolder,
}) => {
  return (
    <div className='w-full relative' id="custom-input-container" data-qa-custom-input-container>
      <label className='block absolute tracking-wide text-gray-700 text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
        {placeholder}{' '}
        {_isEmpty(subPlaceHolder) === false && (
          <span className='font-normal'>{subPlaceHolder}</span>
        )}
      </label>
      <div className='relative' id="custom-input-sub-container" data-qa-custom-input-sub-container>
        <input
          defaultValue={defaultValue}
          placeholder={placeholder}
          // value={selectedItem ? selectedItem : ''}
          // onChange={(event) => onItemSelected(event, onSelected)}
          onChange={(event: any) =>
            onTextChange ? onTextChange(event.target.value) : () => {}
          }
          onBlur={(event: any) =>
            onBlur ? onBlur(event.target.value) : () => {}
          }
          className='block bg-white appearance-none border border-gray-600 focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
        ></input>
      </div>
    </div>
  )
}

export default CustomInput
