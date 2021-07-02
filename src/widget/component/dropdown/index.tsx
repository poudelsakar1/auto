import React from 'react'
import { IDropdownItem } from './type'

interface IProps {
  options: IDropdownItem[]
  selectedItem?: string
  onSelected: any
  placeholder?: string
  className?: string
  showTitle?: boolean
}

const onItemSelected = (event: any, onSelected: any) => {
  onSelected(event.target.value)
}

const renderOptions = (
  options: IDropdownItem[],
  selectedItem?: string,
  placeholder?: string,
): JSX.Element => (
  <>
    {/* { !selectedItem && placeholder && <option value="" disabled selected hidden>{placeholder}</option> } */}
    {options.map((option: IDropdownItem, index: number) => (
      <option key={index} value={option.value}>
        {option.name}
      </option>
    ))}
  </>
)

const CustomDropdown: React.FC<IProps> = (props: IProps) => {
  const { options, selectedItem, onSelected, placeholder, showTitle }: IProps =
    props

  return (
    <div className='w-full'>
      {showTitle && placeholder && (
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          {placeholder}
        </label>
      )}
      <div className='relative'>
        <select
          value={selectedItem ? selectedItem : ''}
          onChange={event => onItemSelected(event, onSelected)}
          className='block bg-white appearance-none w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none'
          id='grid-state'
        >
          {renderOptions(options, selectedItem, placeholder)}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg
            className='fill-current h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CustomDropdown
