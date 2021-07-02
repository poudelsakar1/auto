import React, { useState } from 'react'
import {
  includes as _includes,
  remove as _remove,
  get as _get,
  map as _map,
  indexOf as _indexOf,
  xor as _xor,
} from 'lodash'
import InputRange, { Range, InputRangeClassNames } from 'react-input-range'
import defaultClassNames from 'react-input-range/src/js/input-range/default-class-names'
import { currencyFormat } from '../../../utils/helper'
import Dropdown from '../dropdown'
import DropdownInfo from '../dropdowninfo'
import { IHomeSearch } from '../../../widget/types/home-search-params'
import { onSearchParamsUpdate } from '../../../widget/widget-container'
import 'react-input-range/lib/css/index.css'
import OptionalRebates from '../details-page/rebate-area'
import CustomInput from '../custom-input'
import IconArrowCircle from '../../asset/arrow-circle.png'
import { ICarResult, IOptions, IPricing } from '../../../utils/api-types'
import { IUserCarOptions } from '../../container/details'
import PickList from '../pick-list'
import InfoIcon from '../../asset/info_icon.svg'
import RebateModal from '../modal/rebateModal'
import axios from 'axios'
import { BASE_URL } from '../../../utils/api'

interface IProps {
  item: any
  onSubmit: any
  searchParams: IHomeSearch
  onPropertyUpdated: any
  userCarOptions: IUserCarOptions
  onUpdateOption: React.Dispatch<React.SetStateAction<IUserCarOptions>>
}

interface ICarOptions {
  Code: string
  Name: string
}

const SubmissionForm: React.FC<IProps> = ({
  item,
  onSubmit,
  searchParams,
  onPropertyUpdated,
  userCarOptions,
  onUpdateOption,
}) => {
  const [searchParamsState, setSearchParamState] = useState(searchParams)
  const [selectedInsentive, setSelectedInsentives] = useState(
    searchParams.carincentive ? searchParams.carincentive.split(',') : [],
  )
  const { terms, pricing, options }: ICarResult = item
  const {
    carmsrp,
    carsellingprice,
    carmonthlydefault,
    carmoneydown,
    fees,
    carincentivesapplied,
  }: IPricing = pricing
  const { carmonthdefault } = terms
  const [currentMoneyDown, setCurrentMoneyDown] = useState(
    parseInt(carmoneydown),
  )
  const [showMoreLeaseConfiguration, setShowMoreLeaseConfiguration] =
    useState(false)
  const { carexteriorcolors, carinteriorcolors }: IOptions = options

  const [showMSDDetail, setShowMSDDetail] = useState(false)
  const [showDueDelivery, setShowDueDelivery] = useState(false)
  const [showMonth, setShowMonth] = useState(false)
  const [showTDOD, setShowTDOD] = useState(false)

  const [dueDeliveryDesc, setDueDeliveryDesc] = useState('')
  const [msdDesc, setMSDDesc] = useState('')
  const [monthDesc, setMonthDesc] = useState('')
  const [TDODDesc, setTDODDesc] = useState('')

  const [taxType, setTaxType] = useState('custom')

  const clickTDOD = () => {
    axios
      .post(`${BASE_URL}/get-TDOD`)
      .then((res: any) => {
        setTDODDesc(res.data.result)
        setShowTDOD(true)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const clickMSD = () => {
    axios
      .post(`${BASE_URL}/get-MSD`)
      .then((res: any) => {
        setMSDDesc(res.data.result)
        setShowMSDDetail(true)
      })
      .catch(err => {
        console.error(err)
      })
  }
  const clickMonth = () => {
    axios
      .post(`${BASE_URL}/get-months`, { carMake: searchParamsState.carmake })
      .then((res: any) => {
        setMonthDesc(res.data.result)
        setShowMonth(true)
      })
  }
  const clickDue = () => {
    axios
      .post(`${BASE_URL}/get-due-on-delivery`)
      .then((res: any) => {
        setDueDeliveryDesc(res.data.result)
        setShowDueDelivery(true)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const getCarInsentiveValue = (value: string) => {
    if (_includes(selectedInsentive, value) === true) {
      return _remove([...selectedInsentive], (item: string) => item !== value)
    }
    return selectedInsentive.concat([value])
  }

  const onValueChanged = (value: string, key: string): void => {
    let updatevalue: string = value

    if (key === 'carincentive') {
      const newSelectedInsentives: string[] = getCarInsentiveValue(value)
      updatevalue = newSelectedInsentives.join(',')
      setSelectedInsentives(newSelectedInsentives)
    }

    onSearchParamsUpdate(
      searchParamsState,
      updatevalue,
      key,
      setSearchParamState,
    )
    onPropertyUpdated({ ...searchParamsState, [key]: updatevalue })
  }

  const classNames: InputRangeClassNames = {
    ...defaultClassNames,
    maxLabel: 'hidden',
    minLabel: 'hidden',
    activeTrack: `${defaultClassNames.activeTrack} bg-blue-500`,
    slider: `${defaultClassNames.slider} bg-blue-500`,
  }

  const getFeeValue = (fee_type: string) => {
    let temp = searchParamsState
    if (temp.leasepayupfront) delete temp.leasepayupfront
    if (fee_type === 'fee_only') {
      onSearchParamsUpdate(
        searchParamsState,
        'DOC',
        'leasepayupfront',
        setSearchParamState,
      )
      onPropertyUpdated({ ...temp, leasepayupfront: 'DOC' })
    } else if (fee_type === 'inception_fee') {
      onSearchParamsUpdate(
        searchParamsState,
        'ALL',
        'leasepayupfront',
        setSearchParamState,
      )
      onPropertyUpdated({ ...temp, leasepayupfront: 'ALL' })
    } else {
      onSearchParamsUpdate(
        searchParamsState,
        '',
        'leasepayupfront',
        setSearchParamState,
      )
      onPropertyUpdated({ ...temp, leasepayupfront: '' })
    }
  }

  const changedFeeType = (type: string, value: any) => {
    if (type === 'fee_only' && value) {
      setTaxType('fee_only')
      getFeeValue(type)
    } else if (type === 'inception_fee' && value) {
      setTaxType('inception_fee')
      getFeeValue(type)
    } else if ((type = 'custom' && value)) {
      setTaxType('custom')
      getFeeValue('')
    }
  }

  const appliedIds: number[] = _map(
    _get(item, 'pricing.carincentivesapplied', []),
    applied => applied.ID,
  )

  const updateColors = (type: string, selectedItem: string): void => {
    let currentList: string[] = _get(userCarOptions, type, [])

    if (
      _indexOf(currentList, selectedItem) === -1 &&
      currentList.length === 3
    ) {
      currentList = _remove(
        currentList,
        (_: string, index: number) => index > 0,
      )
    }

    onUpdateOption({
      ...userCarOptions,
      [type]: _xor(currentList, [selectedItem]),
    })
  }

  return (
    <div id="submission-form-container" data-qa-submission-form-container className='w-full shadow-lg rounded-lg sm:rounded p-5 bg-white'>
      <div id="submission-form-info-container" data-qa-submission-form-info-container className='divide-y divide-gray-400'>
        <div id="submission-form-cars-info" data-qa-submission-form-cars-info>
          <div id="submission-form-carmsrp-info" data-qa-submission-form-carmsrp-info className='w-full inline-block'>
            <span className='float-left font-medium text-gray-600'>MSRP</span>
            <span className='float-right line-through font-bold text-xl'>
              {currencyFormat(carmsrp)}
            </span>
          </div>
          <div id="submission-form-montly-price" data-qa-submission-form-monthly-price className='w-full inline-block'>
            <span className='float-left font-medium text-gray-600'>
              Monthly Price
            </span>
            <span className='float-right font-bold text-xl'>
              {currencyFormat(
                carmonthlydefault
                  ? carmonthlydefault
                  : carsellingprice / carmonthdefault,
              )}
            </span>
          </div>
        </div>
        <div className='mt-2'>
          <div id="submission-form-dod" data-qa-submission-form-dod className='w-full inline-block mt-4'>
            <span className='float-left font-medium text-gray-600 flex'>
              <span>Due on Delivery</span>{' '}
              <img
                role='button'
                onClick={e => {
                  clickDue()
                }}
                className='w-info-icon mb-info-icon ml-2'
                style={{ height: '23px' }}
                src={InfoIcon}
                alt='Info'
              />
            </span>
            <span className='float-right font-bold text-xl'>
              {currencyFormat(pricing.fees.carsumdod)}
            </span>
          </div>
          <p className='text-center text-2xl text-blue-600 font-bold mt-4'>
            Create Your Dream Deal
          </p>
          <p className='text-lg font-semibold mt-3'>I would like to pay</p>
          <div id="submission-form-fee-only" data-qa-submission-form-fee-only className='flex items-center mt-1'>
            <input
              onChange={(e: any) => {
                changedFeeType('fee_only', e.target.checked)
              }}
              checked={taxType === 'fee_only'}
              type='checkbox'
              className='form-checkbox border-1 border-gray-500 mr-2'
              name='fee1'
            />
            <span className='text-sm'>1st Month & DMV Fee ONLY</span>
          </div>
          <div id="submission-form-inception-fee" data-qa-submission-form-inception-fee className='flex items-center'>
            <input
              onChange={(e: any) => {
                changedFeeType('inception_fee', e.target.checked)
              }}
              checked={taxType === 'inception_fee'}
              type='checkbox'
              className='form-checkbox border-1 border-gray-500 mr-2'
              name='fee1'
            />
            <span className='text-sm' style={{ maxWidth: '80%' }}>
              1st Month & DMV Fee & Taxes & Inception Fees ONLY
            </span>
          </div>
          <div id="submission-form-custom-fee" data-qa-submission-form-custom-fee className='flex items-center'>
            <input
              onChange={(e: any) => {
                changedFeeType('custom', e.target.checked)
              }}
              checked={taxType === 'custom'}
              type='checkbox'
              className='form-checkbox border-1 border-gray-500 mr-2'
              name='fee1'
            />
            <span className='text-sm' style={{ maxWidth: '80%' }}>
              Custom Amount
            </span>
          </div>
          <div id="submission-form-custom-fee-range-container" data-qa-submission-form-custom-fee-range-container className='w-full flex mt-3 mb-1'>
            <div
              id="submission-form-custom-fee-range"
              data-qa-submission-form-custom-fee-range
              onClick={e => {
                setTaxType('custom')
              }}
              className='flex-1 mt-2'
            >
              <InputRange
                disabled={taxType !== 'custom'}
                formatLabel={currentValue => currencyFormat(currentValue)}
                maxValue={10000}
                minValue={0}
                step={100}
                value={currentMoneyDown}
                classNames={classNames}
                onChange={(value: number | Range): void =>
                  setCurrentMoneyDown(value as number)
                }
                onChangeComplete={(value: number | Range): void =>
                  onValueChanged(value.toString(), 'leasemoney')
                }
              />
            </div>
          </div>
          <p className='text-sm text-gray-600 flex justify-center'>
            Slide to Adjust
          </p>
        </div>
      </div>
      <div className='mt-3'>
        <div className='mt-4' id="submission-form-monthoptions-list" data-qa-submission-form-monthoptions-list>
          <DropdownInfo
            options={options.monthoptions.split(',').map((option: string) => ({
              value: option,
              name: `${option} months`,
            }))}
            placeholder='Months (Click for Best Term)'
            onSelected={(value: string) => onValueChanged(value, 'leasemonths')}
            showTitle
            selectedItem={searchParamsState.leasemonths.toString()}
            className='border border-gray-600 focus:outline-none focus:border-gray-500'
            infoSelected={() => {
              clickMonth()
            }}
          />
        </div>
        <div id="submission-form-mileoptions-list" data-qa-submission-form-mileoptions-list className='mt-4'>
          <Dropdown
            options={options.milesoptions.split(',').map((option: string) => ({
              value: option,
              name: `${option}`,
            }))}
            placeholder='MPY'
            onSelected={(value: string) => onValueChanged(value, 'leasemiles')}
            showTitle
            subPlaceHolder='(Miles Per Year)'
            selectedItem={searchParamsState.leasemiles.toString()}
            className='border border-gray-600 focus:outline-none focus:border-gray-500'
          />
        </div>
        <div className='flex mt-4' id="submission-form-leaseregion" data-qa-submission-form-leaseregion>
          <CustomInput
            onBlur={(value: string) => onValueChanged(value, 'leaseregion')}
            defaultValue={searchParams.leaseregion}
            placeholder='Zipcode (For Taxes)'
          />
        </div>
        <div className='flex mt-6' id="submission-form-leasemaxcredit" data-qa-submission-form-leasemaxcredit>
          <CustomInput
            onBlur={(value: string) => onValueChanged(value, 'leasemaxcredit')}
            defaultValue={searchParams.leasemaxcredit.toString()}
            placeholder='Credit Score'
          />
        </div>
        <OptionalRebates
          carIncentives={options.carincentives}
          selectedRebates={carincentivesapplied}
          onValueChanged={onValueChanged}
          appliedIDs={appliedIds}
        />
        <div
          id="submission-form-setting-container"
          data-qa-submission-form-setting-container
          className={`mx-reduce-5 px-5 pt-1 pb-5 border-b border-gray-300 mt-5 ${
            showMoreLeaseConfiguration === false ? 'pb-5 border-b-2' : ''
          }`}
        >
          <div
            id="submission-form-icon-arrow-container"
            data-qa-submission-form-icon-arrow-container
            onClick={() =>
              setShowMoreLeaseConfiguration(!showMoreLeaseConfiguration)
            }
            className='flex cursor-pointer'
          >
            <div id="submission-form-static-more-lease" data-qa-submission-form-static-more-lease className='uppercase tracking-wide text-gray-card-title text-base font-semibold leading-tight flex-1'>
              <p>More lease</p>
              <p>configuration options</p>
            </div>
            <div id="submission-form-icon-arrow" data-qa-submission-form-icon-arrow>
              <img
                className={`transition-transform duration-200 w-28px transform ${
                  showMoreLeaseConfiguration ? 'rotate-180' : ''
                }`}
                src={IconArrowCircle}
                alt={`${showMoreLeaseConfiguration ? 'Hide' : 'Show'}`}
              />
            </div>
          </div>
          <div
            id="submission-form-trade-info-container"
            data-qa-submission-form-trade-info-container
            className={`transition-opacity duration-1000 ${
              showMoreLeaseConfiguration
                ? 'opacity-1'
                : 'opacity-0 h-0 pointer-events-none overflow-y-hidden'
            }`}
          >
            <div className='flex mt-5' id="submission-form-trade-in-container" data-qa-submission-form-trade-in-container>
              <label className='block w-full items-center cursor-pointer'>
                <input
                  type='checkbox'
                  className='form-radio tradein border-litle-dark w-1.5 h-1.5'
                  onChange={() =>
                    onValueChanged(
                      searchParamsState.leasetradein.toString() === 'true'
                        ? 'false'
                        : 'true',
                      'leasetradein',
                    )
                  }
                  checked={searchParamsState.leasetradein.toString() === 'true'}
                />
                <span className='text-md ml-3'>Trade In</span>
              </label>
            </div>
            <div className='flex mt-8' id="submission-form-msdoptions-list" data-qa-submission-form-msdoptions-list>
              <DropdownInfo
                options={options.msdoptions
                  .split(',')
                  .map((option: string) => ({
                    value: option,
                    name: `${option}`,
                  }))}
                placeholder='Multiple Security Deposit (READ FIRST)'
                onSelected={(value: string) =>
                  onValueChanged(value, 'leasemsds')
                }
                showTitle
                selectedItem={
                  searchParamsState.leasemsds
                    ? searchParamsState.leasemsds.toString()
                    : '0'
                }
                className='border border-gray-600 focus:outline-none focus:border-gray-500'
                infoSelected={() => {
                  clickMSD()
                }}
              />
            </div>
          </div>
        </div>
        <PickList
          sectionTitle='Exterior Color(Choose up to 3)'
          items={carexteriorcolors}
          selectedItems={_get(userCarOptions, 'exteriorColor', [])}
          onItemSelect={(item: string) => updateColors('exteriorColor', item)}
        />
        <PickList
          sectionTitle='Interior Color'
          items={carinteriorcolors}
          selectedItems={_get(userCarOptions, 'interiorColor', [])}
          onItemSelect={(item: string) => updateColors('interiorColor', item)}
        />
        <div className='mt-7 text-gray-very-light'>
          <span className='block uppercase tracking-wide text-gray-card-title text-base font-bold leading-tight mb-4 text-center border-b border-gray-300 mx-reduce-5 pb-2'>
            FEES & TAXES CALCULATED IN QUOTE{' '}
          </span>
          <div className='divide-y divide-gray-300 pb-2'>
            <div className='mb-4'>
              <div id="submission-from-tax-container" data-qa-submission-form-tax-container className='w-full inline-block leading-6'>
                <div id="submission-form-taxes" data-qa-submission-form-taxes className='float-left flex'>
                  Taxes{' '}
                  <img
                    role='button'
                    onClick={e => {
                      clickMSD()
                    }}
                    className='w-info-icon mb-info-icon ml-2'
                    style={{ height: '23px' }}
                    src={InfoIcon}
                    alt='Info'
                  />
                </div>
                <p className='float-right'>
                  {currencyFormat(fees.carupfronttax)}
                </p>
              </div>
              <div id="submission-form-cardocfee-container" data-qa-submission-form-cardocfee-container className='w-full inline-block mt-2 leading-6 mb-1'>
                <div id="submission-form-cardocfee" data-qa-submission-form-cardocfee className='float-left flex'>
                  Documentation Fee{' '}
                  <img
                    role='button'
                    onClick={e => {
                      clickMSD()
                    }}
                    className='w-info-icon mb-info-icon ml-2'
                    style={{ height: '23px' }}
                    src={InfoIcon}
                    alt='Info'
                  />
                </div>
                <p className='float-right'>
                  {currencyFormat(fees.cardocfee)}
                </p>
              </div>
              <div id="submission-form-backfee-container" data-qa-submission-form-backfee-container className='w-full inline-block mt-2 leading-6 mb-1'>
                <div id="submission-form-backfee" data-qa-submission-form-backfee className='float-left flex'>
                  Bank Fee{' '}
                  <img
                    role='button'
                    onClick={e => {
                      clickMSD()
                    }}
                    className='w-info-icon mb-info-icon ml-2'
                    style={{ height: '23px' }}
                    src={InfoIcon}
                    alt='Info'
                  />
                </div>
                <p className='float-right'>
                  {currencyFormat(fees.carbankfee)}
                </p>
              </div>
              <div id="submission-form-dmvfee-container" data-qa-submission-form-dmvfee-container className='w-full inline-block mt-2 leading-6 mb-1'>
                <div id="submission-form-dmvfee" data-qa-submission-form-dmvfee className='float-left flex'>
                  DMV Fees{' '}
                  <img
                    role='button'
                    onClick={e => {
                      clickMSD()
                    }}
                    className='w-info-icon mb-info-icon ml-2'
                    style={{ height: '23px' }}
                    src={InfoIcon}
                    alt='Info'
                  />
                </div>
                <p className='float-right'>
                  {currencyFormat(fees.carregistrationfee)}
                </p>
              </div>
              <div id="submission-form-carmsdpayment-container" data-qa-submission-form-carmsdpayment-container className='w-full inline-block mt-2 leading-6 mb-1'>
                <div id="submission-form-carsdpayment" data-qa-submission-form-carsdpayment className='float-left flex'>
                  Total Security Deposit{' '}
                  <img
                    role='button'
                    onClick={e => {
                      clickMSD()
                    }}
                    className='w-info-icon mb-info-icon ml-2'
                    style={{ height: '23px' }}
                    src={InfoIcon}
                    alt='Info'
                  />
                </div>
                <p className='float-right'>
                  {currencyFormat(fees.carmsdpayment)}
                </p>
              </div>
            </div>
          </div>
          <div id="submission-form-fee-info-container" data-qa-submission-form-fee-info-container className='w-full inline-block mt-3 leading-6 mb-2 text-gray-very-dark font-bold'>
            <span className='block tracking-wide uppercase text-gray-card-title text-base font-bold leading-tight mb-4 text-center pb-3 border-b border-gray-300 mx-reduce-5'>
              What You Pay
            </span>
            <div id="submission-form-tdd" data-qa-submission-form-tdd className='float-left uppercase w-50 flex content-center'>
              Total due on delivery{' '}
              <img
                role='button'
                onClick={e => {
                  clickDue()
                }}
                className='w-info-icon mb-info-icon ml-2'
                style={{ height: '23px' }}
                src={InfoIcon}
                alt='Info'
              />
            </div>
            <p className='float-right'>{currencyFormat(fees.carsumdod)}</p>
          </div>
          {taxType === 'fee_only' ? (
            <p className='text-sm'>**1ST Month and Taxes paid upfront</p>
          ) : taxType === 'inception_fee' ? (
            <p className='text-sm'>
              **1ST Month & DMV Fee & Taxes & Inception Fees paid upfront
            </p>
          ) : (
            <p className='text-sm'>** Custom value paid upfront </p>
          )}

          <div id="submission-form-monthly-payment" data-qa-submission-form-monthly-payment className='w-full inline-block mt-2 leading-6 mb-1'>
            <p className='float-left'>
              Your Monthly Payment <span className='text-red-500'>*</span>
            </p>
            <p className='float-right'>
              {currencyFormat(
                carmonthlydefault
                  ? carmonthlydefault
                  : carsellingprice / carmonthdefault,
              )}
            </p>
          </div>
          <div id="submission-form-tddinfo" data-qa-submission-form-tddinfo className='w-full leading-6 flex items-center text-sm'>
            Your quote includes all applicable taxes, fees and first month
            payment{' '}
            <img
              role='button'
              onClick={e => {
                clickTDOD()
              }}
              className='w-info-icon ml-2'
              style={{ height: '23px' }}
              src={InfoIcon}
              alt='Info'
            />
          </div>
        </div>
        <button
          onClick={() => onSubmit()}
          className='w-full bg-blue-main-text hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mt-5'
        >
          Finalize Quote Today!
        </button>
        <RebateModal
          show={showMSDDetail}
          title='Rebate Information'
          onToggle={() => setShowMSDDetail(!showMSDDetail)}
          onFormSubmit={() => {}}
          disableSubmit={true}
        >
          <div id="submission-form-rebate-modal" data-qa-submission-form-rebate-modal>
            <div id="submission-form-rebate-modal-container" className='flex flex-col sm:flex-row justify-between mb-5'>
              <div id="submission-form-msdoptions" data-qa-submission-form-msdoptions className='w-full mr-1' style={{ color: '#6B7280' }}>
                <h1 className='text-xl sm:text-3xl'>MSD Options</h1>
                <p className='text-gray-700 mt-5'>{msdDesc}</p>
              </div>
            </div>
          </div>
        </RebateModal>
        <RebateModal
          show={showMonth}
          title='Rebate Information'
          onToggle={() => setShowMonth(!showMonth)}
          onFormSubmit={() => {}}
          disableSubmit={true}
        >
          <div id="submission-form-rebate-modal-term" data-qa-submission-form-rebate-modal-term>
            <div id="submission-form-rebate-modal-term-sub" data-qa-submission-form-rebate-modal-term-sub className='flex flex-col sm:flex-row justify-between'>
              <div id="submission-form-modal-term-container" data-qa-submission-form-modal-term-container className='w-full mr-1' style={{ color: '#6B7280' }}>
                <h1 className='text-xl sm:text-3xl uppercase'>
                  term information
                </h1>
                <div className='text-gray-700 mt-5'>{monthDesc}</div>
              </div>
            </div>
            <div className='text-gray-700 mt-5 mb-5'></div>
          </div>
        </RebateModal>
        <RebateModal
          show={showDueDelivery}
          title='Rebate Information'
          onToggle={() => setShowDueDelivery(!showDueDelivery)}
          onFormSubmit={() => {}}
          disableSubmit={true}
        >
          <div id="submission-form-modal-dod-container" data-qa-submission-form-modal-dod-container>
            <div id="submission-form-modal-dod-sub" data-qa-submission-form-modal-dod-sub className='flex flex-col sm:flex-row justify-between'>
              <div id="submission-form-modal-dod-desc" data-qa-submission-form-modal-dod-desc className='w-full mr-1' style={{ color: '#6B7280' }}>
                <h1 className='text-xl sm:text-3xl'>
                  Due On Delivery Information
                </h1>
                <p className='text-gray-700 mt-5'>{dueDeliveryDesc}</p>
              </div>
            </div>
            <div className='text-gray-700 mt-5 mb-5'></div>
          </div>
        </RebateModal>
        <RebateModal
          show={showTDOD}
          title='Rebate Information'
          onToggle={() => setShowTDOD(!showTDOD)}
          onFormSubmit={() => {}}
          disableSubmit={true}
        >
          <div id="submission-form-tdod-container" data-qa-submission-form-tdod-container>
            <div id="submission-form-tdod-sub" data-qa-submission-form-tdod-sub className='flex flex-col sm:flex-row justify-between'>
              <div id="submission-form-desc-container" data-qa-submission-form-desc-container className='w-full mr-1' style={{ color: '#6B7280' }}>
                <h1 className='text-xl sm:text-3xl'>
                  Total Due on Delivery Description
                </h1>
                <div className='text-gray-700 mt-5'>{TDODDesc}</div>
              </div>
            </div>
            <div className='text-gray-700 mt-5 mb-5'></div>
          </div>
        </RebateModal>
      </div>
    </div>
  )
}

export default SubmissionForm
