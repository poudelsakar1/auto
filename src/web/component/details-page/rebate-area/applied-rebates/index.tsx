import React from 'react'
import { ICarIncentive } from '../../../../../utils/api-types'
import { currencyFormat } from '../../../../../utils/helper'

interface IProps {
  selectedRebates: ICarIncentive[]
}

const renderAppliedRow = (incentive: ICarIncentive): JSX.Element => (
  <div key={incentive.ID} className='text-gray-very-dark py-1 flex'>
    <span className='flex-auto'>{incentive.name}</span>
    <span className='font-bold'>{`(${currencyFormat(
      incentive.discount,
    )})`}</span>
  </div>
)

const AppliedRebates: React.FC<IProps> = ({ selectedRebates }) => {
  return (
    <div id="applied-rebates-container" data-qa-applied-rebates-container className='mt-4 bg-gray-light mx-reduce-5 p-5'>
      <div id="applied-rebates-label" data-qa-applied-rebates-label className='text-gray-very-dark font-semibold w-full text-center mb-2'>
        Rebates Applied in Quote
      </div>
      <div id="applied-rebates-items" data-qa-applied-rebates-items>
        {selectedRebates.map((item: ICarIncentive) => renderAppliedRow(item))}
      </div>
    </div>
  )
}

export default AppliedRebates
