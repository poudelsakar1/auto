import React, { useState, useEffect } from 'react'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import _get from 'lodash/get'
import queryString, { ParsedQuery } from 'query-string'
import Loading from '../../component/loading'
import { searchCar } from '../../../utils/api'
import ResultItem from '../../component/result-item'
import FilterWidget from '../../component/filter-widget'
import FilterBar from '../../component/filter'
import { IHomeSearch } from '../../../widget/types/home-search-params'
import Pagination from '../../component/pagination'
import ArrowDown from '../../asset/arrow-down.png'
import './style.scss'
import CrossIcon from '../../asset/circle-cross.svg'
import CarBanner from '../../asset/car-banner.png'

let PER_PAGE: number = 12

const onRequestNewFetch = (
  params: IHomeSearch,
  setSearchData: any,
  setLoading: any,
): void => {
  localStorage.setItem('query', JSON.stringify(params))
  setLoading(true)
  searchCar(params).then((res: any) => {
    setSearchData(res.data)
    setLoading(false)
  })
}

export interface IFilter {
  leasemin?: number
  leasemax?: number
  leaseInterestRate?: number
  leaseTradeIn?: boolean
  cartradein?: string
}

export interface IAdvanceSearch {
  leasemaxpayment: number
}

const filterWrapper = (results: any, filter: IFilter): any => {
  let finalResult: any = results

  if (_isEmpty(filter.leasemin) === false) {
    finalResult = _filter(
      finalResult,
      result => result.pricing.carmonthlydefault >= _get(filter, 'leasemin', 0),
    )
  }

  if (_isEmpty(filter.leasemax) === false) {
    finalResult = _filter(
      finalResult,
      result =>
        result.pricing.carmonthlydefault <= _get(filter, 'leasemax', 99999),
    )
  }

  if (_isEmpty(filter.cartradein) === false) {
    finalResult = _filter(
      finalResult,
      result => result.terms.cartradein === _get(filter, 'cartradein', ''),
    )
  }

  return finalResult
}

const withPagination = (results: any, currentPage: number): any => {
  const beginIndex: number = (currentPage - 1) * PER_PAGE
  const endIndex: number = beginIndex + PER_PAGE

  return results.slice(beginIndex, endIndex)
}

const onChangePage = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  next?: boolean,
): void => {
  if (next === true) {
    setCurrentPage(currentPage + 1)
  } else {
    setCurrentPage(currentPage - 1)
  }
}

const Results: React.FC = () => {
  const [searchData, setSearchData] = useState([])
  const [isLoading, setLoading] = useState(false)
  let filter: IFilter = {}
  const [currentPage, setCurrentPage] = useState(1)

  const paredQuery: ParsedQuery = queryString.parse(window.location.search)
  const tempSearch: IHomeSearch = paredQuery as any as IHomeSearch

  const [advanceSearch, setAdvanceSearch] = useState({
    leasemaxpayment: tempSearch.leasemaxpayment,
  } as IAdvanceSearch)

  const [showBanner, setShowBanner] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)
  const [showfilters, setShowFilters] = useState(false)

  React.useEffect(() => {
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  })

  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    if (_isEmpty(searchData) === true) {
      onRequestNewFetch(
        paredQuery as any as IHomeSearch,
        setSearchData,
        setLoading,
      )
    }
    if (window.innerWidth < 600) PER_PAGE = 5
    localStorage.setItem('query', JSON.stringify(paredQuery))
  }, [paredQuery, searchData])

  const filteredData: any = filterWrapper(searchData, filter)
  const renderData: any = withPagination(filteredData, currentPage)

  return (
    <div id="results-page-container" data-qa-results-page-container className='w-full min-h-container'>
      <div className='w-full bg-white'>
        <div className='w-full max-w-screen-lg mx-auto py-4 relative'>
          {/* This is the banner Part */}
          <img
            className='absolute'
            style={{ right: '20px', top: '30px' }}
            src={CrossIcon}
            onClick={e => {
              setShowBanner(false)
            }}
            alt='crossicon'
          />
          {showBanner ? (
            <div
              className='flex flex-col sm:flex-row'
              style={{ backgroundColor: '#3775DF' }}
            >
              {width > 768 ? (
                <img
                  src={CarBanner}
                  style={{ opacity: '0.6', width: '283px' }}
                  alt='carbanner'
                />
              ) : null}

              <div id="results-page-desc-container" data-qa-results-page-desc-container className='p-3 text-white'>
                <p className='font-semibold leading-tight text-base w-2/3 sm:w-full'>
                  LOOKING FOR A DIFFERENT CONFIGURATION OF THIS PARTICULAR
                  MODEL?
                </p>
                <p className='font-normal mt-2 sm:mt-0 text-sm leading-tight w-5/6 sm:w-full'>
                  We have plenty more inventory and can help with that too!{' '}
                  <br /> Click <b>"Finalize Quote Today!"</b> to contact a Ninja
                  regarding other configurations!
                  <br />
                  *Deals are subject to availability
                </p>
              </div>
              {width < 768 ? (
                <img
                  src={CarBanner}
                  style={{ opacity: '0.6', width: '283px' }}
                  alt='carbanner'
                />
              ) : null}
            </div>
          ) : null}

          {/* This is the banner End Part */}

          {/* This is the warning Banner Part */}

          {/* <img className="absolute" style={{right: '20px', top: '30px'}} src={CrossIcon} onClick={(e) => {setShowBanner(false)}} alt="" />
          {showBanner?
              <div className="flex flex-col sm:flex-row bg-red-600 items-center">
              {width > 768?<img src={EngineBanner} className="p-1 mx-5" style={{opacity: '0.6', width: '80px', height: '80px'}}/>: null}
              <div className="p-3 text-white">
                <div className="font-semibold leading-tight text-base w-2/3 sm:w-full">ALN Quoting Calculation in Progress</div>
                <div className="font-normal mt-2 sm:mt-0 text-sm leading-tight w-5/6 sm:w-full">We are currently updating our deals for March. <br /> Please fill out an inquriy on the <a href="/contact">Contact Us</a> Page or check back on our site at Friday, March 5th at 8am EST,<br /> for the updated deals</div>
              </div>
              {width < 768?<img src={EngineBanner} className="my-3" style={{opacity: '0.6', width: '80px', height: "80px"}}/>: null}
            </div>:null
          }
          {
            width<640?<img role="button" width={40} onClick={(e) => {goback()}} src={GoBackImageBlue} style={{position: 'absolute', marginTop: 24, marginLeft: 10}} className="mb-2"/>: null
          } */}

          {/* This is the warning Banner End Part */}
        </div>
      </div>
      <div className='w-full max-w-screen-lg mx-auto px-2 py-4 text-center'>
        <div className='w-full text-blue-main-text font-bold uppercase title-font text-center'>
          CHOOSE YOUR CAR!
        </div>
        <div className='aln-top-desc text-gray-very-light text-xl'>
          ALN helps you find the best lease deals from approved suppliers
        </div>
      </div>
      {width < 768 ? (
        <div
          className='text-center border-2 w-1/2 m-auto border-blue-400 rounded-lg py-2'
          onClick={e => {
            setShowFilters(!showfilters)
          }}
        >
          Show Search Filters
        </div>
      ) : null}
      {width > 768 || showfilters ? (
        <div>
          <div className='w-full h-blue-background bg-blue-main-text absolute z-background'>
            <img
              className='w-auto image-style max-w-xs mx-auto'
              style={{ width: 40, height: 20 }}
              src={ArrowDown}
              alt='logo'
            />
          </div>
          <div className='w-full flex max-w-screen-lg mx-auto px-4 py-10'>
            <FilterWidget
              searchParams={paredQuery as any as IHomeSearch}
              advanceSearch={advanceSearch}
              onSubmit={(data: IHomeSearch) => {
                onRequestNewFetch(data, setSearchData, setLoading)
                setCurrentPage(1)
              }}
            />
          </div>
          <div className='w-full flex max-w-screen-lg mx-auto px-2 py-1'>
            <FilterBar
              searchParams={advanceSearch}
              currentFilter={filter}
              onUpdate={setAdvanceSearch}
              // onSubmit={(data: IHomeSearch) => onRequestNewFetch(data, setSearchData, setLoading)}
              // onUpdate={(key: string, value: any) => setFilter({ ...filter, [key]: value })}
            />
          </div>
        </div>
      ) : null}

      <div className='w-full flex flex-wrap max-w-screen-lg mx-auto mb-12 justify-center'>
        {_isEmpty(renderData) === false &&
          renderData.map(
            (item: any, index: number): JSX.Element => (
              <ResultItem
                showYear={true}
                item={item}
                key={index}
                searchParams={paredQuery}
              />
            ),
          )}
        {filteredData.length > PER_PAGE && (
          <div className='w-full mt-10'>
            <Pagination
              itemLength={filteredData.length}
              perPage={PER_PAGE}
              currentPage={currentPage}
              onNext={() => onChangePage(currentPage, setCurrentPage, true)}
              onPrevious={() => onChangePage(currentPage, setCurrentPage)}
              onSetPage={(page: number) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
      <Loading show={isLoading} />
    </div>
  )
}

export default Results
