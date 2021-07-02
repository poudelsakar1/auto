import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import queryString from 'query-string'
import { ICarResult } from '../../../../utils/api-types'
import { IHomeSearch } from '../../../../widget/types/home-search-params'
import ResultItem from '../../result-item'
import SmallSpinner from '../../loading/small-spinner'

interface IProps {
  results: ICarResult[]
  carName: string
  onClickView?: () => void
}

const RelatedItems: React.FC<IProps> = ({ results, carName, onClickView }) => {
  const paredQuery: IHomeSearch = queryString.parse(
    window.location.search,
  ) as any as IHomeSearch

  return (
    <>
      <div
        id='related-items-text'
        data-qa-related-items-text
        className='w-full text-blue-main-text font-bold text-center uppercase text-xl sm:text-3xl'
      >
        People who viewed {carName}
        <br /> Also considered
      </div>
      <div
        id='related-items-results-container'
        data-qa-related-items-results-container
        className='flex flex-col sm:flex-row items-center justify-center'
      >
        {_isEmpty(results) === false ? (
          results.map(
            (vehicle: ICarResult, index: number) =>
              index < 3 && (
                <ResultItem
                  key={vehicle.carid}
                  item={vehicle}
                  isDetailsPage
                  searchParams={paredQuery}
                  showYear={false}
                  // onClickView={onClickView}
                />
              ),
          )
        ) : (
          <div
            id='related-items-smallspinner'
            data-qa-related-items-smallspinner
            className='h-300px'
          >
            <SmallSpinner />
          </div>
        )}
      </div>
    </>
  )
}

export default RelatedItems
