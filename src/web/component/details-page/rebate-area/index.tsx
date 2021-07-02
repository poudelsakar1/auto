import React, { useState } from 'react'
import Tooltip from 'react-simple-tooltip'
import _includes from 'lodash/includes'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'
import { ICarIncentive } from '../../../../utils/api-types'
import { currencyFormat } from '../../../../utils/helper'
import InfoIcon from '../../../asset/info_icon.svg'
import AppliedRebates from './applied-rebates'
import queryString from 'querystring'
import { ParsedQuery } from 'query-string'
import RebateModal from '../../modal/rebateModal'
import axios from 'axios'
import { BASE_URL } from '../../../../utils/api'

interface IProps {
  selectedRebates: ICarIncentive[]
  carIncentives: ICarIncentive[]
  onValueChanged: (value: string, typeChange: string) => void
  appliedIDs: number[]
}

const OptionalRebates: React.FC<IProps> = ({
  selectedRebates,
  carIncentives,
  onValueChanged,
}) => {
  const [showRebateDetail, setShowRebateDetail] = useState(false)
  const [rebate, setRebate] = useState({
    name: '',
    description: '',
    discount: 0,
  })
  const [description, setDescription] = useState('')

  if (_isEmpty(carIncentives) === true) {
    return null
  }

  const paredQuery: ParsedQuery = queryString.parse(window.location.search)
  const appliedList: string = _get(paredQuery, 'carincentive', '') as string
  const seletedIds: number[] = _map(appliedList.split(','), (item: string) =>
    parseInt(item),
  )

  const clickRebates = (item: any) => {
    axios
      .post(`${BASE_URL}/get-rebate-desc`, {
        rebateID: item.ID,
        rebatename: item.name,
        carMake: paredQuery.carmake,
      })
      .then(res => {
        setDescription(res.data.desc)
        setRebate(item)
        setShowRebateDetail(true)
      })
      .catch(err => {
        console.error('some error to scrapping sku')
      })
  }

  return (
    <>
      <div
        className='mt-4'
        id='rebate-area-container'
        data-qa-rebate-area-container
      >
        <span className='block tracking-wide text-gray-700 font-semibold mb-2 text-base'>
          Optional Rebates & Glossary
        </span>
        <div
          className='mt-2'
          id='rebate-area-items-container'
          data-qa-rebate-area-items-container
        >
          {carIncentives.map((item: ICarIncentive, index: number) => {
            return (
              <div
                id='rebate-area-item-container'
                data-qa-rebate-area-item-container
                key={index}
                className='block w-full items-center cursor-pointer relative flex justify-between'
              >
                <span className='text-md' style={{ maxWidth: '85%' }}>
                  <span className='text-gray-very-dark text-sm'>
                    {item.name}
                  </span>
                  <span className='ml-1'>
                    <Tooltip content='Click here for more information.'>
                      <img
                        onClick={e => {
                          clickRebates(item)
                        }}
                        className='w-info-icon mb-info-icon'
                        src={InfoIcon}
                        alt='Info'
                      />
                    </Tooltip>
                  </span>
                </span>
                <input
                  type='checkbox'
                  className='form-checkbox border-1 float-right border-gray-500'
                  name='accountType'
                  value={item.ID}
                  onChange={(event: any) =>
                    onValueChanged(event.target.value, 'carincentive')
                  }
                  checked={_includes(
                    _map(seletedIds, (id: number) => id),
                    item.ID,
                  )}
                />
              </div>
            )
          })}
        </div>
      </div>
      <RebateModal
        show={showRebateDetail}
        title='Rebate Information'
        onToggle={() => setShowRebateDetail(!showRebateDetail)}
        onFormSubmit={() => {}}
        disableSubmit={true}
      >
        <div
          id='rebate-area-modal-container'
          data-qa-rebate-area-modal-container
        >
          <div
            className='flex flex-col sm:flex-row justify-between'
            id='rebate-area-descripion-container'
            data-qa-rebate-area-descripion-container
          >
            <div
              id='rebate-area-description-sub-container'
              data-qa-rebate-area-description-sub-container
              className='w-full mr-1'
              style={{ color: '#6B7280' }}
            >
              <h1 className='text-xl sm:text-3xl'>{rebate.name}</h1>
              <div
                id='rebate-area-discount'
                data-qa-rebate-area-discount
                className='mt-3 text-gray-700'
              >
                {currencyFormat(rebate.discount)}
              </div>
              <div
                id='rebate-area-description'
                data-qa-rebate-area-description
                className='text-gray-700 mt-5'
              >
                {description}
              </div>
            </div>
          </div>
        </div>
      </RebateModal>
      <AppliedRebates selectedRebates={selectedRebates} />
    </>
  )
}

export default OptionalRebates
