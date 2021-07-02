import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import ResultItem from '../result-item'
import { defaultSearchParams } from '../../../widget/widget-container'
import SmallSpinner from '../loading/small-spinner'
import './style.scss'

interface IProps {
  items: any
}

const TopDeals: React.FC<IProps> = ({ items }) => {
  return (
    <div id="top-deals-container" data-qa-top-deals-container className='top-deals-container'>
      <p className='font-bold text-white mt-6 sm:text-4xl md:text-5xl'>
        TOP DEALS
      </p>
      <p className='small-text text-white mt-reduce-10'>
        Here are some of our best deals this month
      </p>
      <div id="top-deals-result-items" data-qa-top-deals-result-items className='w-full flex flex-col sm:flex-row max-w-screen-lg search-result-car'>
        {_isEmpty(items) === false ? (
          items.map(
            (item: any, index: number): JSX.Element => (
              <ResultItem
                showYear={false}
                index={index}
                item={item}
                key={index}
                searchParams={{
                  ...defaultSearchParams,
                  carmake: item.meta.carmake,
                  carmodel: item.meta.carmodel,
                }}
                isLandingItem={true}
              />
            ),
          )
        ) : (
          <div id="top-deals-smallspinner" data-qa-top-deals-smallspinner className='h-300px text-center w-full pt-10'>
            <SmallSpinner />
          </div>
        )}
      </div>
    </div>
  )
}
export default TopDeals
