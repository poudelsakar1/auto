import React, { useState } from 'react'

interface IProps {
  price: string
  setPrice: (value: string) => void
}

const AutoComplete: React.FC<IProps> = ({ price, setPrice }) => {
  const priceList = ['600', '700', '800', '900', '1000']
  const [show, setShow] = useState(false)

  const changedPrice = (value: string) => {
    setPrice(value)
  }

  const renderPrice = () => {
    let renderList = priceList.filter(item => item.indexOf(price) !== -1)
    let result = renderList.map((item, index) => (
      <li
        key={index}
        onClick={e => {
          clickedPriceItem(item)
        }}
        className='bg-white px-4 py-2 cursor-pointer'
      >
        ${item}
      </li>
    ))
    return result
  }

  const clickedPriceItem = (item: string) => {
    setPrice(item)
  }

  const hiddenListPrice = () => {
    setShow(false)
  }

  return (
    <div className='mt-3 relative' id='autocomplete-container' data-qa-autocomplete-container>
      <span className='text-gray-600 text-sm'>Price</span>
      <input
        value={price}
        onBlur={e => {
          setTimeout(() => {
            hiddenListPrice()
          }, 300)
        }}
        onClick={e => {
          setShow(true)
        }}
        onChange={e => {
          changedPrice(e.target.value)
        }}
        placeholder='Type the price of the product'
        className='form-input mt-1 block w-full h-9'
        type='text'
      />
      {show ? (
        <ul className='absolute z-50 w-full border-gray-300 border'>
          {renderPrice()}
        </ul>
      ) : null}
    </div>
  )
}

export default AutoComplete
