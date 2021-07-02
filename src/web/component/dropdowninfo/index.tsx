import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import { IDropdownItem } from './type'
import InfoIcon from '../../asset/info_icon.svg'

interface IProps {
  options: IDropdownItem[]
  selectedItem?: string
  onSelected: any
  placeholder?: string
  className?: string
  showTitle?: boolean
  subPlaceHolder?: string
  infoSelected: any
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
    {!selectedItem && placeholder && (
      <option value='' disabled hidden>
        {placeholder}
      </option>
    )}
    {options.map((option: IDropdownItem, index: number) => (
      <option key={index} value={option.value}>
        {option.name}
      </option>
    ))}
  </>
)

const CustomDropdown: React.FC<IProps> = (props: IProps) => {
  const {
    options,
    selectedItem,
    onSelected,
    placeholder,
    showTitle,
    className,
    subPlaceHolder,
    infoSelected,
  }: IProps = props

  return (
    <div
      id='dropdowninfo-container'
      data-qa-dropdowninfo-container
      className='w-full relative'
    >
      {showTitle && placeholder && (
        <div
          id='dropdowninfo-info-icon'
          data-qa-dropdowninfo-info-icon
          className='block absolute tracking-wide text-gray-700 text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold flex content-center'
        >
          {placeholder}{' '}
          {_isEmpty(subPlaceHolder) === false && (
            <span className='font-normal'>{subPlaceHolder}</span>
          )}
          <img
            onClick={event => infoSelected(event)}
            role='button'
            className='w-info-icon mb-info-icon ml-2'
            style={{ height: '23px' }}
            src={InfoIcon}
            alt='Info'
          />
        </div>
      )}
      <div
        id='dropdowninfo-select-container'
        data-qa-dropdowninfo-select-container
        className='relative'
      >
        <select
          value={selectedItem ? selectedItem : ''}
          onChange={event => onItemSelected(event, onSelected)}
          className={`block bg-white appearance-none w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight ${className}`}
        >
          {placeholder === 'Models' ? (
            <option value=''>All Models</option>
          ) : null}
          {placeholder === 'Trims' ? <option value=''>All Trims</option> : null}
          {renderOptions(options, selectedItem, placeholder)}
        </select>
        <div
          id='dropdowninfo-select-icon'
          data-qa-dropdowninfo-select-icon
          className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'
        >
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
