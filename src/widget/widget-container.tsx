import React, { useState } from 'react'
import Dropdown from './component/dropdown'
import { getCarMakeList } from './data/search-data'
import { IHomeSearch } from './types/home-search-params'
import queryString from 'query-string'

interface IProps {
  baseSite: string
}

export const defaultSearchParams: IHomeSearch = {
  leasemiles: 12000,
  leasemonths: 36,
  leaseregion: '07040',
  leasemoney: 3000,
  leasemaxcredit: 780,
  carmake: 'BMW',
  searchradius: 300,
  leasetradein: false,
  leasemaxpayment: 3000,
  leasemsds: 0,
}

export const onSearchParamsUpdate = (
  currentSearchParams: IHomeSearch,
  value: string | number | boolean,
  key: string,
  setSearchParams: React.Dispatch<React.SetStateAction<IHomeSearch>>,
): void => {
  setSearchParams({
    ...currentSearchParams,
    [key]: value,
  })
}

const Widget: React.FC<IProps> = ({ baseSite }) => {
  const [searchParams, setSearchParams] = useState(defaultSearchParams)

  const onSearchClicked = () => {
    const baseURL: string = baseSite || 'http://localhost:3000'
    window.location.href = `${baseURL}/results?${queryString.stringify(
      searchParams,
    )}`
  }

  return (
    <div className='widget-container'>
      <div className='flex items-end justify-center'>
        <div className='w-1/2 mr-3'>
          <input
            className='appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            defaultValue={'07040'}
            onChange={(event: any) =>
              onSearchParamsUpdate(
                searchParams,
                event.target.value,
                'leaseregion',
                setSearchParams,
              )
            }
            placeholder='Enter your zip code'
          />
        </div>
        <div className='w-3/10 mr-3'>
          <Dropdown
            options={getCarMakeList()}
            onSelected={(value: string) =>
              onSearchParamsUpdate(
                searchParams,
                value,
                'carmake',
                setSearchParams,
              )
            }
            placeholder='Make'
            selectedItem={searchParams.carmake}
          />
        </div>

        <div className='w-1/5'>
          <button
            onClick={() => onSearchClicked()}
            disabled={
              typeof searchParams.carmake === 'undefined' ||
              searchParams.leaseregion.length === 0
            }
            className='w-full bg-blue-dark hover:bg-blue-700 hover:no-underline text-white text-sm font-bold py-3 px-4 block disabled:bg-gray-400'
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default Widget
