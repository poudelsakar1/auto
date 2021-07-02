import React from 'react'
import SearchIcon from '../../asset/icons/ico-search-icon.svg'

export type TSearchInputProps = {
  placeholder: string
  classes: string
  changeHandler: (param: string) => void
}

const SearchInput: React.FC<TSearchInputProps> = ({
  placeholder,
  changeHandler,
  classes = 'w-546px h-50px placeholder-gray-very-dark pl-19px',
}) => {
  return (
    <div
      id='search-input-container'
      data-qa-search-input-container
      className='flex justify-center items-center'
    >
      <input
        onChange={e => {
          changeHandler(e.target.value)
        }}
        placeholder={placeholder}
        className={`rounded-5px bg-gray-light ${classes}`}
      />
      <img alt='searchicon' className='ml-2' src={SearchIcon} />
    </div>
  )
}

export default SearchInput
