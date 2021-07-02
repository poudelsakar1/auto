import React from 'react'
import _range from 'lodash/range'
import _map from 'lodash/map'
import _uniqWith from 'lodash/uniqWith'
import _isEqual from 'lodash/isEqual'

let CORNER_PAGES: number = 2

interface IProps {
  perPage: number
  itemLength: number
  currentPage: number
  onNext: () => void
  onPrevious: () => void
  onSetPage: (page: number) => void
}

const renderPageNumber = (
  itemLength: number,
  perPage: number,
  currentPage: number,
  onSetPage: (page: number) => void,
): JSX.Element[] => {
  if (window.innerWidth > 600) CORNER_PAGES = 3
  const totalPage: number = Math.ceil(itemLength / perPage)

  return _uniqWith(
    _map(_range(1, totalPage + 1), (item: number, index) => {
      if (item <= CORNER_PAGES || totalPage - item < CORNER_PAGES) {
        return (
          <button
            key={index}
            type='button'
            onClick={() => onSetPage(item)}
            className={`relative inline-flex items-center px-3 py-1 border rounded-lg bg-white text-sm leading-5 font-medium hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 mx-2 ${
              item === currentPage
                ? 'border-blue-main-text text-blue-main-text'
                : 'border-gray-very-dark text-gray-700'
            }`}
          >
            {item}
          </button>
        )
      }

      return (
        <span className='relative inline-flex items-center px-2 py-1 border border-gray-very-dark bg-white text-sm leading-5 font-medium text-gray-700'>
          ...
        </span>
      )
    }),
    _isEqual,
  )
}

const Pagination: React.FC<IProps> = ({
  perPage,
  itemLength,
  currentPage,
  onNext,
  onPrevious,
  onSetPage,
}) => {
  const firstItemOnPage: number = (currentPage - 1) * perPage
  const lastItemOnPage: number = firstItemOnPage + perPage

  return (
    <div
      id='pagination-container'
      data-qa-pagination-container
      className='bg-white px-2 py-3 flex items-center justify-between'
    >
      <div
        id='pagination-sub-container'
        data-qa-pagination-sub-container
        className='flex-1 flex items-center justify-between'
      >
        <div className='hidden' id="pagination-description" data-qa-pagination-description>
          <p className='text-sm leading-5 text-gray-700'>
            Showing
            <span className='font-medium mx-1'>{firstItemOnPage + 1}</span>
            to
            <span className='font-medium mx-1'>
              {lastItemOnPage > itemLength ? itemLength : lastItemOnPage}
            </span>
            of
            <span className='font-medium mx-1'>{itemLength}</span>
            results
          </p>
        </div>
        <div id="pagination-button-group" data-qa-pagination-button-group className='mx-auto'>
          <nav className='relative z-0 inline-flex'>
            <button
              disabled={firstItemOnPage === 0}
              onClick={() => onPrevious()}
              type='button'
              className='relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm leading-5 font-medium text-black hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150'
              aria-label='Previous'
            >
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {renderPageNumber(itemLength, perPage, currentPage, onSetPage)}
            <button
              disabled={lastItemOnPage >= itemLength}
              onClick={() => onNext()}
              type='button'
              className='-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm leading-5 font-medium text-black hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150'
              aria-label='Next'
            >
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
