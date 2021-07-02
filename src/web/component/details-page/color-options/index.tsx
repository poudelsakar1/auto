import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import Dropdown from '../../dropdown'

interface IProps {
  options: string[]
  labelName: string
  onSelected: (value: string) => void
  selectedItem: string
}

const ColorOptions: React.FC<IProps> = ({
  options,
  labelName,
  selectedItem,
  onSelected,
}) => {
  if (_isEmpty(options) === true) {
    return null
  }

  return (
    <div className='mt-4' id="color-options-container" data-qa-color-options-container>
      <Dropdown
        options={options.map((option: string) => ({
          value: option,
          name: option,
        }))}
        placeholder={labelName}
        onSelected={onSelected}
        showTitle
        selectedItem={selectedItem}
        className='border border-gray-600 focus:outline-none focus:border-gray-500'
      />
    </div>
  )
}

export default ColorOptions
