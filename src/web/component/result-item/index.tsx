import React from 'react'
import _isEmtpy from 'lodash/isEmpty'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import { currencyFormat, getCarLogo } from '../../../utils/helper'
import './style.scss'

interface IProps {
  item: any
  searchParams: any
  onClickView?: () => void
  isLandingItem?: boolean
  isDetailsPage?: boolean
  showYear?: boolean
  index?: Number
}

const generateURL = (id: string, searchParams: any): string =>
  `/details?${queryString.stringify({ ...searchParams, a: id })}`

const ResultItem: React.FC<IProps> = ({
  item,
  searchParams,
  onClickView,
  isLandingItem = false,
  isDetailsPage,
  index,
  showYear,
}) => {
  const { pricing, meta } = item
  const { carmsrp } = pricing
  const renderText = (tempstring: string) => {
    if (tempstring.length > 16) return tempstring.slice(0, 16) + '...'
    else return tempstring
  }
  return (
    <div
      id="result-item-container"
      data-qa-result-item-container
      className={cn(
        isLandingItem
          ? 'flex-1 mx-auto h-235px'
          : 'w-full justify-center sm:flex-4 custom-height-card',
        'card-car-style',
        isDetailsPage ? 'mx-2' : 'mx-4',
        'text-center shadow-item h-40 mt-8 divide-y divide-gray-400 bg-white rounded-lg',
        index === 1 ? 'custom-margin-top-first' : 'custom-margin-top',
      )}
    >
      <div
        id="result-item-car-upper"
        data-qa-result-item-car-upper
        className={
          (isLandingItem === true
            ? 'h-50percent'
            : 'h-110percent sm:h-65percent') + ' w-full p-4 relative'
        }
      >
        {showYear ? (
          <div id="result-item-caryear" data-qa-result-item-caryear className='text-blue-600 absolute'>{item.meta.caryear}</div>
        ) : null}
        {_isEmtpy(item.meta.carimg) === false && (
          <div id="result-item-car-logo-container" data-qa-result-item-car-logo-container className='mx-auto'>
            <img
              className={isLandingItem === true ? 'mt-reduce-custom-80' : ''}
              src={item.meta.carimg}
              alt={item.carid}
            />
          </div>
        )}
        <div className='flex absolute bottom-2' id="result-item-car-info-container" data-qa-result-item-car-info-container>
          <div id="result-item-img-container" data-qa-result-item-img-container className='w-43px h-43px pt-2'>
            <img
              src={getCarLogo(searchParams.carmake)}
              alt={item.meta.carmake}
            />
          </div>
          <div id="result-item-car-info" data-qa-result-item-car-info className='text-sm text-left ml-2 pr-4 w-4/5 '>
            <p className='text-gray-very-light capitalize font-medium'>
              {renderText(meta.carmake.toLowerCase())}
            </p>
            <p className='text-black text-xs'>
              {renderText(meta.carmodel)}
            </p>
            <p className='text-black text-xs'>{renderText(meta.cartrim)}</p>
          </div>
        </div>
      </div>
      <div id="result-item-info-container" data-qa-result-item-info-container className='p-3 py-3 text-sm'>
        <div id="result-item-msrp-info" data-qa-result-item-msrp-info className='w-full inline-block'>
          <span className='float-left font-medium text-gray-600'>MSRP</span>
          <span className='float-right line-through font-bold'>
            {currencyFormat(carmsrp)}
          </span>
        </div>
        <div id="result-item-caroffmsrp-info" data-qa-result-item-caroffmsrp-info className='w-full inline-block'>
          <span className='float-left font-medium text-gray-600'>Discount</span>
          <span className='float-right font-bold'>
            {meta.caroffmsrp.toFixed(1)} %
          </span>
        </div>
        {onClickView ? (
          <button
            className='custom-padding w-full bg-blue-main-text hover:bg-blue-800 hover:no-underline text-white font-light py-1 px-4 rounded block'
            onClick={() => onClickView()}
          >
            Click Here to View Deal
          </button>
        ) : isDetailsPage === true ? (
          <button
            className='custom-padding w-full bg-blue-main-text hover:bg-blue-800 hover:no-underline text-white font-light py-1 px-4 rounded block'
            onClick={() =>
              (window.location.href = generateURL(item.carid, searchParams))
            }
          >
            Click Here to View Deal
          </button>
        ) : (
          <Link
            to={generateURL(item.carid, searchParams)}
            className='custom-padding bg-blue-main-text hover:bg-blue-800 hover:no-underline text-white py-1 px-4 rounded block'
          >
            Click Here to View Deal
          </Link>
        )}
      </div>
    </div>
  )
}

export default ResultItem
