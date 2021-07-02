import React from 'react'
import cn from 'classnames'

export type TCategoryProps = {
  data: Array<string>
  label: string
  selected: Array<string>
}

const Categories: React.FC<TCategoryProps> = ({ data, label, selected }) => {
  return (
    <div id="categories-container" data-qa-categories-container>
      <p className='text-gray-very-dark uppercase font-bold mt-34px'>{label}</p>
      <div id="categories-items-container" data-qa-categories-items-container className='flex mt-22px max-m-full flex-wrap'>
        {data.map((item, index) => (
          <div
            id="categories-item"
            categories-item-data-qa
            key={index}
            className={cn(
              `mt-11px lg:mt-0 mr-13px rounded-full px-19px py-2 cursor-pointer font-semibold`,
              selected.includes(item)
                ? 'bg-blue-main-text text-white'
                : 'bg-gray-light text-gray-very-dark',
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
