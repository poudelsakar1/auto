import React from 'react'
import _indexOf from 'lodash/indexOf'
import _isEmpty from 'lodash/isEmpty'

interface IProps {
  items: string[]
  selectedItems: string[]
  onItemSelect: (item: string) => void
  sectionTitle: string
}

const ItemList: React.FC<{
  text: string
  selected: boolean
  onItemSelect: () => void
}> = ({ text, selected, onItemSelect }) => (
  <div
    className={`rounded-full px-4 py-2 inline-block m-1 text-xs cursor-pointer ${
      selected
        ? 'bg-blue-main-text text-white'
        : 'text-gray-very-dark bg-gray-light'
    }`}
    onClick={() => onItemSelect()}
  >
    <span>{text}</span>
    {selected && <span className='ml-1 text-xl leading-4'>x</span>}
  </div>
)

const PickList: React.FC<IProps> = ({
  items,
  selectedItems,
  onItemSelect,
  sectionTitle,
}) => {
  if (_isEmpty(items) === true) {
    return null
  }

  return (
    <div id="pick-list-container" data-qa-pick-list-container className='mt-3'>
      <p className='text-sm font-semibold'>{sectionTitle}</p>
      <div id="pick-list-items" data-qa-pick-list-items className='-mx-1'>
        {items.map((itemData: string, index: number) => (
          <ItemList
            text={itemData}
            key={index}
            selected={_indexOf(selectedItems, itemData) !== -1}
            onItemSelect={() => onItemSelect(itemData)}
          />
        ))}
      </div>
    </div>
  )
}

export default PickList
