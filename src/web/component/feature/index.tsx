import React, { useState } from 'react'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _isFunction from 'lodash/isFunction'
import CarNote from '../../asset/car_note.svg'
import CarColor from '../../asset/car_color.svg'
import CarTag from '../../asset/tag.svg'
import CarEngine from '../../asset/engine.svg'
import CarHp from '../../asset/hp.svg'
import CarEngineType from '../../asset/engine_type.svg'
import CarMPG from '../../asset/mpg.svg'
import City from '../../asset/city.svg'
import HighWay from '../../asset/highway.svg'
import Weight from '../../asset/weight.svg'
import CarMSPR from '../../asset/off_market.svg'
import { ICaroptionsItem, ICarResult } from '../../../utils/api-types'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  item: ICarResult
}

const listProperties: string[] = [
  'Discount Off MSRP',
  'Car Color',
  'Car Tags',
  'Engine Type',
  'Car Engine Cylinders',
  'Horsepower (HP)',
  'MPG (Avg)',
  'MPG (City)',
  'MPG (Hwy)',
  'Curb Weight',
  'Car Notes',
]

const listPropertyMapping = [
  (item: any) => parseFloat(_get(item.meta, 'caroffmsrp', 0)).toFixed(2),
  true,
  true,
  (item: any) => _get(item.meta, 'carenginetype', ''),
  true,
  (item: any) => _get(item.meta, 'carenginehp', ''),
  (item: any) => _get(item.meta, 'carmspavg'),
  (item: any) => _get(item.meta, 'carmsrpcity', ''),
  (item: any) => _get(item.meta, 'carmsrphwy', ''),
  (item: any) => _get(item.meta, 'carcurbweight', ''),
  true,
]

const featureIcons: string[] = [
  CarMSPR,
  CarColor,
  CarTag,
  CarEngineType,
  CarEngine,
  CarHp,
  CarMPG,
  City,
  HighWay,
  Weight,
  CarNote,
]

const renderFeatureItems = (item: any, from: number, end: number) => {
  return _map(
    listProperties.slice(from, end),
    (property: string, index: number) => {
      const itemValueGenerator: any = listPropertyMapping[index + from]

      if (itemValueGenerator === true) {
        return renderRow(
          property,
          _get(item.meta, `${property.replace(/\s/g, '').toLowerCase()}`, ''),
          index,
        )
      } else if (_isFunction(itemValueGenerator)) {
        return renderRow(property, itemValueGenerator(item), index)
      }
    },
  )
}

const renderRow = (itemName: string, itemValue: string, index: number) => {
  if (itemName === 'Discount Off MSRP')
    return (
      <div
        className='w-full text-center my-2'
        key={`${itemName.replace(/\s/g, '').toLowerCase()}`}
      >
        <div className='flex-1 min-h-55px'>
          <img
            className='mx-auto mb-2'
            src={_get(featureIcons, index, _get(featureIcons, 0))}
            alt={itemName}
          />
        </div>
        <div className={`flex-1 font-bold`}>{itemName}</div>
        <div className='flex-1 font-bold'>{itemValue || 'none'}</div>
      </div>
    )
  else
    return (
      <div
        className='w-full text-center my-2'
        key={`${itemName.replace(/\s/g, '').toLowerCase()}`}
      >
        <div className='flex-1 min-h-55px'>
          <img
            className='mx-auto mb-2'
            src={_get(featureIcons, index, _get(featureIcons, 0))}
            alt={itemName}
          />
        </div>
        <div className={`flex-1 font-bold`}>{itemName}</div>
        <div className='flex-1'>{itemValue || 'none'}</div>
      </div>
    )
}

const Features: React.FC<IProps> = ({ item }) => {
  const [showFeatures, setShowFeatures] = useState(true)
  const [showOptions, setShowOptions] = useState(true)
  const inlineStyle: { [key: string]: number | string } = { height: 'auto' }
  const carOptionsList: string[] = _map(
    item.options.caroptions,
    (option: ICaroptionsItem) => option.Name,
  )

  const showFeaturesFuntion = () => {
    setShowFeatures(!showFeatures)
  }

  return (
    <div
      id='feature-container'
      data-qa-feature-container
      className='w-full ml-0 sm:ml-5 pt-4 custom-margin-top-228px'
    >
      <div
        id='feature-sub-container'
        data-qa-feature-sub-container
        className='mx-4 w-80 text-blue-main-text font-bold text-2xl sm:font-xl custom-border pb-1 flex justify-between items-center'
      >
        <p>Features</p>
        {showFeatures ? (
          <FontAwesomeIcon
            role='button'
            size='1x'
            icon={faChevronUp}
            onClick={e => {
              showFeaturesFuntion()
            }}
          />
        ) : (
          <FontAwesomeIcon
            role='button'
            size='1x'
            icon={faChevronDown}
            onClick={e => {
              showFeaturesFuntion()
            }}
          />
        )}
      </div>
      {showFeatures ? (
        <div
          id='feature-items'
          data-qa-feature-items
          className='w-full grid-cols-2 sm:grid-cols-4 grid grid-flow-row text-sm text-gray-very-dark gap-4 mt-5'
        >
          {renderFeatureItems(item, 0, listProperties.length)}
        </div>
      ) : null}
      {_isEmpty(carOptionsList) === false && (
        <div
          id="feature-car-options-container"
          data-qa-feature-car-options-container
          style={showOptions ? inlineStyle : {}}
          className={`transition-height duration-200 ease-in-out mb-0 sm:mb-2 mt-5 px-10 sm:px-0 ${
            showOptions ? '' : 'h-0 overflow-hidden'
          }`}
        >
          <ul className='grid-cols-1 sm:grid-cols-3 grid justify-center'>
            {carOptionsList.map((item: string, index: number) => (
              <li
                key={index}
                className='text-gray-very-light list-disc py-1 flex px-4'
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <label
        onClick={() => setShowOptions(!showOptions)}
        className='text-center mb-7 mt-4 sm:mt-0 cursor-pointer btn bg-white shadow py-2 rounded-full absolute w-190px font-semibold text-gray-card-title bottom-show-options-btn-bottom left-show-options-btn-left focus:outline-none'
      >
        <span className='inline-block'>
          {showOptions ? 'Hide' : 'Show'} Options
        </span>
        <span className='inline-block ml-5'>
          <svg
            className={`transform transition-transform duration-200 fill-current h-5 w-5 absolute top-left-dropdown-label right-22px ${
              showOptions ? 'rotate-180' : ''
            }`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </span>
      </label>
    </div>
  )
}

export default Features
