import React, { useState, useEffect } from 'react'
import Dropdown from '../../component/dropdown'
import { IHomeSearch } from '../../../widget/types/home-search-params'
import queryString from 'query-string'
import './style.scss'
import { getMakeList } from '../../../utils/api'
interface IProps {
  baseSite: string
  onUpdatedGlobalSearch: (key: string, value: string) => void
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

const Widget: React.FC<IProps> = ({ baseSite, onUpdatedGlobalSearch }) => {
  const [searchParams, setSearchParams] = useState({
    ...defaultSearchParams,
  })
  const [makeList, setMakeList] = useState([])
  const [zip, setZip] = useState('07040')

  const onSearchClicked = () => {
    if (validateZip(zip)) {
      const baseURL: string = baseSite || 'http://localhost:3000'
      window.location.href = `${baseURL}/results?${queryString.stringify(
        searchParams,
      )}`
    }
  }

  useEffect(() => {
    getMakeList({}).then(res => {
      let { result } = res.data
      let tempData: any
      tempData = []
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          tempData.push({ name: result[i], value: result[i] })
        }
      }
      setMakeList(tempData)

      let temp = searchParams
      temp.carmake = tempData[0].value
      setSearchParams(temp)
    })
  }, [searchParams])

  const onUpdateField = (key: string, value: string): void => {
    onSearchParamsUpdate(searchParams, value, key, setSearchParams)
    onUpdatedGlobalSearch(key, value)
  }

  const validateZip = (param: string) => {
    const reg = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/)
    if (reg.test(param)) return true
    else return false
  }

  return (
    <div className='max-w-screen-lg'>
      <div className='search-form justify-center'>
        <div className='search-form-item w-1/2 mr-3'>
          <label className='text-white'>ZIP</label>
          <div className='relative'>
            <input
              className='appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              defaultValue={'07040'}
              onChange={(event: any) => {
                setZip(event.target.value)
                if (validateZip(event.target.value))
                  onUpdateField('leaseregion', event.target.value)
              }}
              placeholder='Enter your zip code'
            />
            {!validateZip(zip) ? (
              <div className='text-sm text-red-600 absolute custom-error'>
                Zip Code is invalid.
              </div>
            ) : null}
          </div>
        </div>
        <div className='search-form-item w-3/10 mr-3'>
          <label className='text-white'>BRAND</label>
          <Dropdown
            options={makeList}
            onSelected={(value: string) => onUpdateField('carmake', value)}
            selectedItem={searchParams.carmake}
          />
        </div>
        <div className={`search-form-item w-1/5 flex items-end`}>
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
