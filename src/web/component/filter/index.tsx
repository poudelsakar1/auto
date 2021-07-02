import React, { useState } from 'react'
import { IAdvanceSearch, IFilter } from '../../container/results'

interface IProps {
  onUpdate: React.Dispatch<React.SetStateAction<IAdvanceSearch>>
  searchParams: IAdvanceSearch
}

const FilterBar: React.FC<IProps> = ({ onUpdate, searchParams }) => {
  const [showAdvancedFilter, setShowAdvance] = useState(false)

  return (
    <div
      className='w-full mx-auto'
      id='filter-container'
      data-qa-filter-container
    >
      <div
        className='text-center'
        id='filter-advanced-filter-container'
        data-qa-filter-advanced-filter-container
      >
        <span
          className='cursor-pointer text-white font-bold'
          onClick={() => setShowAdvance(!showAdvancedFilter)}
        >
          Advanced Filter
          <span className='ml-2 inline-block rounded-full border-2 boder-white text-xl w-expand-button h-expand-button leading-20px'>
            {showAdvancedFilter ? '-' : '+'}
          </span>
        </span>
      </div>
      {showAdvancedFilter && (
        <div
          id='filter-advanced-container'
          data-qa-filter-advanced-container
          className='w-full items-end text-sm text-white mx-auto mt-3'
        >
          <div
            id='filter-advanced-sub-container'
            data-qa-filter-advanced-sub-container
            className='inline-block w-full sm:w-1/3 mx-auto'
          >
            <div id='filter-advanced-input-container' data-qa-filter-advanced-input-container className='flex mx-auto justify-center'>
              <span className='leading-7 mr-1'>Lease Max Payment</span>
              <div id='filter-advanced-input' data-qa-filter-advanced-input className='w-1/3 ml-1'>
                <input
                  className='appearance-none placeholder-white border border-white rounded bg-blue-main-text w-full py-1 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                  type='number'
                  value={searchParams.leasemaxpayment}
                  // onChange={(event: any) => onUpdate('leasemax', event.target.value)}
                  onChange={(event: any) =>
                    onUpdate({
                      ...searchParams,
                      leasemaxpayment: event.target.value,
                    })
                  }
                  placeholder='Max'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
