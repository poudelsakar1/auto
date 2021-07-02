import React, { useState, useEffect } from 'react'
import { IHomeSearch } from '../../../widget/types/home-search-params'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { onSearchParamsUpdate } from '../../../widget/widget-container'
import Dropdown from '../dropdown'
import { IAdvanceSearch } from '../../container/results'
import './style.scss'
import { defaultSearchParams } from '../../../widget/widget-container'
import { getMakeList, getModelList, getTrimList } from '../../../utils/api'
interface IProps {
  searchParams: IHomeSearch
  onSubmit: any
  advanceSearch: IAdvanceSearch
}

const FilterWidget: React.FC<IProps> = ({
  searchParams,
  onSubmit,
  advanceSearch,
}) => {
  const [searchParamsState, setSearchParamState] = useState(searchParams)
  const [makeList, setMakeList] = useState([])
  const [make, setMake] = useState(searchParamsState.carmake)
  const [modelList, setModelList] = useState([])
  const [model, setModel] = useState(searchParamsState.carmodel)
  const [trimList, setTrimList] = useState([])
  const [width, setWidth] = useState(0)
  const [zip, setZip] = useState('')

  useEffect(() => {
    setWidth(window.innerWidth)
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
    })
  }, [])

  useEffect(() => {
    getModelList({ make }).then(res => {
      let { result } = res.data
      let tempData: any
      tempData = []
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          tempData.push({ name: result[i], value: result[i] })
        }
      }
      setModelList(tempData)
    })
  }, [make])

  useEffect(() => {
    if (!!make && !!model)
      getTrimList({ make, model }).then(res => {
        let { result } = res.data
        let tempData: any
        tempData = []
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            tempData.push({ name: result[i], value: result[i] })
          }
        }
        setTrimList(tempData)
      })
  }, [make, model])

  const resetFilters = () => {
    setSearchParamState({
      ...defaultSearchParams,
      carmake: searchParamsState.carmake,
    })
    onSubmit({ ...defaultSearchParams, carmake: searchParamsState.carmake })
  }
  const validateZip = (param: string) => {
    const reg = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/)
    if (reg.test(param)) return true
    else return false
  }

  useEffect(() => {
    setZip(searchParamsState.leaseregion)
  }, [searchParamsState.leaseregion])

  return (
    <div
      id='filter-widget-container'
      data-qa-filter-widget-container
      className='w-full mx-auto mt-3'
    >
      <div
        className='w-full custom-display items-end'
        id='filter-widget-upper'
        data-qa-filter-widget-upper
      >
        <div
          className='w-full sm:w-1/3'
          id='filter-widget-location-field'
          data-qa-filter-widget-location-field
        >
          <label className='text-white text-sm font-thin leading-8'>
            Location
          </label>
          <input
            className='appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            value={searchParamsState.leaseregion}
            onChange={(event: any) => {
              setZip(event.target.value)
              onSearchParamsUpdate(
                searchParamsState,
                event.target.value,
                'leaseregion',
                setSearchParamState,
              )
            }}
            placeholder='Enter your zip code'
          />
        </div>
        <div
          className='w-full w-1/5 ml-1'
          id='filter-widget-make-field'
          data-qa-filter-widget-make-field
        >
          <label className='text-white text-sm font-thin leading-8'>Make</label>
          <Dropdown
            options={makeList}
            onSelected={(value: string) => {
              onSearchParamsUpdate(
                searchParamsState,
                value,
                'carmake',
                setSearchParamState,
              )
              setSearchParamState({
                ...searchParamsState,
                carmake: value,
                carmodel: '',
                cartrim: '',
              })
              setMake(value)
            }}
            placeholder='Make'
            selectedItem={searchParamsState.carmake}
            className='focus:outline-none'
          />
        </div>
        <div
          className='w-full w-1/6 ml-1'
          id='filter-widget-model-field'
          data-qa-filter-widget-model-field
        >
          <label className='text-white text-sm font-thin leading-8'>
            Model
          </label>
          <Dropdown
            options={modelList}
            onSelected={(value: string) => {
              onSearchParamsUpdate(
                searchParamsState,
                value,
                'carmodel',
                setSearchParamState,
              )
              onSearchParamsUpdate(
                { ...searchParamsState, carmodel: value },
                '',
                'cartrim',
                setSearchParamState,
              )
              setModel(value)
            }}
            placeholder='Models'
            selectedItem={searchParamsState.carmodel}
            className='focus:outline-none'
          />
        </div>
        <div className='w-full w-1/4 ml-1'>
          <label className='text-white text-sm font-thin leading-8'>Trim</label>
          <Dropdown
            options={trimList}
            onSelected={(value: string) =>
              onSearchParamsUpdate(
                searchParamsState,
                value,
                'cartrim',
                setSearchParamState,
              )
            }
            placeholder='Trims'
            selectedItem={searchParamsState.cartrim}
            className='focus:outline-none'
          />
        </div>
        {width > 600 ? (
          <Link
            id='filter-search'
            className='w-1/4 ml-1'
            to={`/results?${queryString.stringify({
              ...searchParamsState,
              leasemaxpayment: advanceSearch.leasemaxpayment,
            })}`}
          >
            {validateZip(zip) ? (
              <div
                id='filter-widget-search-button'
                data-qa-filter-widget-search-button
                className='w-full bg-blue-dark hover:bg-blue-700 hover:no-underline text-white text-sm font-bold py-3 px-4 block'
                onClick={() => {
                  onSubmit({
                    ...searchParamsState,
                    leasemaxpayment: advanceSearch.leasemaxpayment,
                  })
                }}
              >
                Search
              </div>
            ) : (
              <div
                id='filter-widget-search-button'
                data-qa-id='filter-widget-search-button'
                className='w-full bg-blue-dark hover:bg-blue-700 hover:no-underline text-white text-sm font-bold py-3 px-4 block'
              >
                Search
              </div>
            )}
          </Link>
        ) : null}
      </div>
      {!validateZip(zip) ? (
        <div
          id='filter-widget-zipcode-error'
          data-qa-filter-widget-zipcode-error
          className='text-sm text-red-600'
        >
          Zip Code is invalid.
        </div>
      ) : null}
      <div
        id='filter-widget-down-part'
        data-qa-filter-widget-down-part
        className='w-full custom-display items-end'
      >
        <div
          id='filter-widget-mileage-field'
          data-qa-filter-widget-mileage-field
          className='w-full sm:w-1/5'
        >
          <label className='text-white text-sm font-thin leading-8'>
            Mileage
          </label>
          <Dropdown
            options={[
              {
                name: '7500',
                value: '7500',
              },
              {
                name: '10000',
                value: '10000',
              },
              {
                name: '12000',
                value: '12000',
              },
              {
                name: '15000',
                value: '15000',
              },
            ]}
            onSelected={(value: string) =>
              onSearchParamsUpdate(
                searchParamsState,
                value,
                'leasemiles',
                setSearchParamState,
              )
            }
            placeholder='Mileage'
            selectedItem={searchParamsState.leasemiles.toString()}
            className='focus:outline-none'
          />
        </div>
        <div
          className='w-full sm:w-1/5 ml-1'
          id='filter-widget-term-field'
          data-qa-filter-widget-term-field
        >
          <label className='text-white text-sm font-thin leading-8'>Term</label>
          <Dropdown
            options={[
              {
                name: '24 months',
                value: '24',
              },
              {
                name: '27 months',
                value: '27',
              },
              {
                name: '30 months',
                value: '30',
              },
              {
                name: '33 months',
                value: '33',
              },
              {
                name: '36 months',
                value: '36',
              },
              {
                name: '39 months',
                value: '39',
              },
              {
                name: '42 months',
                value: '42',
              },
            ]}
            onSelected={(value: string) =>
              onSearchParamsUpdate(
                searchParamsState,
                value,
                'leasemonths',
                setSearchParamState,
              )
            }
            placeholder='Term'
            selectedItem={searchParamsState.leasemonths.toString()}
            className='focus:outline-none'
          />
        </div>
        <div id="filter-widget-due-on-delivery-field" data-qa-filter-widget-due-on-delivery-field className='w-full sm:w-1/4 ml-1 relative'>
          <span
            className='absolute text-gray-700'
            style={{ top: '42px', left: '10px' }}
          >
            $
          </span>
          <label className='text-white text-sm font-thin leading-8'>
            Due on Delivery
          </label>
          <input
            className='appearance-none rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            value={searchParamsState.leasemoney}
            onChange={(event: any) =>
              onSearchParamsUpdate(
                searchParamsState,
                event.target.value,
                'leasemoney',
                setSearchParamState,
              )
            }
            placeholder='Due on Delivery'
          />
        </div>
        <div id="filter-widget-credit-score-field" data-qa-filter-widget-credit-score-field className='w-full sm:w-1/3 ml-1'>
          <label className='text-white text-sm font-thin leading-8'>
            Credit Score
          </label>
          <input
            className='appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            value={searchParamsState.leasemaxcredit}
            onChange={(event: any) =>
              onSearchParamsUpdate(
                searchParamsState,
                event.target.value,
                'leasemaxcredit',
                setSearchParamState,
              )
            }
            placeholder='Credit Score'
          />
        </div>
        <button
          className='w-full sm:w-1/4 ml-1 bg-gray-very-dark hover:bg-gray-700 hover:no-underline text-white text-sm font-bold py-3 px-4 block mt-4'
          onClick={e => {
            resetFilters()
          }}
        >
          <span className='transform rotate-45 inline-block'>&#8635;</span>
          &nbsp;Reset
        </button>
        {width < 600 ? (
          <Link
            className='w-1/4 ml-1'
            to={`/results?${queryString.stringify({
              ...searchParamsState,
              leasemaxpayment: advanceSearch.leasemaxpayment,
            })}`}
          >
            <button
              className='w-full bg-blue-dark hover:bg-blue-700 hover:no-underline text-white text-sm font-bold py-3 px-4 block ml-1'
              onClick={() =>
                onSubmit({
                  ...searchParamsState,
                  leasemaxpayment: advanceSearch.leasemaxpayment,
                })
              }
            >
              Search
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export default FilterWidget
