import React, { useState, useEffect, ChangeEvent, useLayoutEffect } from 'react'
import _isEmpty from 'lodash/isEmpty'
import _omit from 'lodash/omit'
import _get from 'lodash/get'
import queryString from 'query-string'
import Loading from '../../component/loading'
import {
  carDetails,
  saleforceSubmit,
  relatedResults,
  storeItem,
} from '../../../utils/api'
import InputRange, { Range, InputRangeClassNames } from 'react-input-range'
import { Carousel } from 'react-responsive-carousel'
import { number } from '@storybook/addon-knobs'
import defaultClassNames from 'react-input-range/src/js/input-range/default-class-names'
import Features from '../../component/feature'
import SubmissionForm from '../../component/submission-form'
import Modal from '../../component/modal'
import { IHomeSearch } from '../../../widget/types/home-search-params'
import Dropdown from '../../component/dropdown'
import { IDropdownItem } from '../../component/dropdown/type'
import 'react-input-range/lib/css/index.css'
import './style.scss'
import RelatedItems from '../../component/details-page/related-items'
import ArrowDown from '../../asset/arrow-down.png'
import CarBanner from '../../asset/car-banner.png'
import GoBackImage from '../../asset/goBack.png'
import GoBackImageBlue from '../../asset/goBackBlue.png'
import Popup from 'reactjs-popup'
import { FacebookShareButton, EmailShareButton } from 'react-share'

import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'

import CrossIcon from '../../asset/circle-cross.svg'

export interface IFormData {
  FirstName: string
  LastName: string
  Phone: string
  Email: string
  deliverTime: number
  referrer: string
  note: string
}

export interface IStoreSubmission extends IHomeSearch {
  clientfname: string
  clientlname: string
  clientphone: string
  leasepayupfront?: string
}

export interface IUserCarOptions {
  interiorColor?: string[]
  exteriorColor?: string[]
}

const onRequestNewFetch = (
  params: IHomeSearch,
  setSearchData: any,
  setLoading: any,
  vehicle?: any,
): void => {
  if (window.history.pushState) {
    const newurl: string =
      window.location.protocol +
      '//' +
      window.location.host +
      `/details?${queryString.stringify(params)}`
    window.history.pushState({ path: newurl }, '', newurl)
  }
  if (typeof vehicle !== 'undefined') {
    setSearchData(vehicle)
  } else {
    setLoading(true)
    carDetails(params).then((res: any) => {
      if (res.data[0] === undefined) {
        setSearchData([])
        setLoading(false)
      } else {
        setSearchData(res.data[0])
        setLoading(false)
      }
    })
  }
}

const onUpdateField = (
  formData: IFormData,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
  key: string,
  value: string,
): void => {
  setFormData({ ...formData, [key]: value })
}

const Details: React.FC = () => {
  const [searchData, setSearchData] = useState({} as any)
  const [carOptionsData, setCarOptionsData] = useState({} as IUserCarOptions)
  const [relatedVehicles, setRelatedVehicles] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({} as IFormData)
  const [deliveryTime, setDeliveryTime] = useState(1)
  const [showBanner, setShowBanner] = useState(true)
  const [width, setWidth] = useState(0)
  const paredQuery: IHomeSearch = queryString.parse(
    window.location.search,
  ) as any as IHomeSearch

  //Error Message
  const [firstnameError, setFirstnameError] = useState('')
  const [lastnameError, setLastnameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const onShowAlert = () => {
    store.addNotification({
      title: 'Sucess!',
      message: 'Your information sent successfully.',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 1500,
        onScreen: true,
      },
    })
  }
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  })

  const onSubmit = () => {
    setLoading(true)
    storeItem({
      ...paredQuery,
      clientfname: formData.FirstName,
      clientlname: formData.LastName,
      clientphone: formData.Phone,
    }).finally(() => {
      saleforceSubmit({
        ...formData,
        ...paredQuery,
        ...searchData,
        ...carOptionsData,
      })
        .then(res => {
          setLoading(false)
          setShowModal(false)
          onShowAlert()
          setTimeout(() => {
            initForm()
          }, 1500)
        })
        .catch(e => {
          setLoading(false)
        })
    })
  }

  const initForm = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (_isEmpty(searchData) === true) {
      onRequestNewFetch(paredQuery, setSearchData, setLoading)
    }
    if (_isEmpty(relatedVehicles) === true) {
      relatedResults(_omit(paredQuery, 'a')).then((res: any) => {
        setRelatedVehicles(res.data)
      })
    }
  }, [paredQuery, relatedVehicles, searchData])

  const { meta }: any = searchData
  const carName: string =
    _isEmpty(meta) === true
      ? ''
      : `${meta.caryear} ${meta.carmake} ${meta.carmodel}`
  const refererOptions: IDropdownItem[] = [
    {
      name: 'Social Media',
      value: 'Social Media',
    },
    {
      name: 'Return Customer',
      value: 'Return Customer',
    },
    {
      name: 'Referral',
      value: 'Referral',
    },
    {
      name: 'Internet Search',
      value: 'Internet Search',
    },
    {
      name: 'Forum',
      value: 'Forum',
    },
    {
      name: 'Other',
      value: 'Other',
    },
  ]
  const classNames: InputRangeClassNames = {
    ...defaultClassNames,
    labelContainer: 'hidden',
    activeTrack: `${defaultClassNames.activeTrack} bg-blue-500 delivery-slider`,
    track: `${defaultClassNames.track} delivery-slider bg-gray-slider`,
    slider: `${defaultClassNames.slider} bg-blue-500 chosen-cursor`,
  }

  const onDeliveryTimeChosen = (value: number) => {
    setFormData({ ...formData, deliverTime: value })
  }

  const getConfigurableProps = () => ({
    showArrows: true,
    showStatus: false,
    showIndicators: false,
    infiniteLoop: true,
    showThumbs: false,
    useKeyboardArrows: true,
    swipeable: true,
    dynamicHeight: true,
  })

  //Validation function
  const ValidateEmail = (mail: string) => {
    const reg = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    if (reg.test(mail)) return true
    else return false
  }

  const ValidatePhone = (param: string) => {
    const reg = new RegExp(/^[0-9]{10,11}$/)
    if (reg.test(param)) return true
    else return false
  }

  const validateName = (param: string) => {
    const reg = new RegExp(/^[A-Z]+(([a-zA-Z])?[a-zA-Z]*)*$/)
    if (reg.test(param) && param.length > 1) return true
    else return false
  }

  const isEmpty = (param: string) => {
    if (param) return false
    else return true
  }

  const submitForm = () => {
    let firstname = _get(formData, 'FirstName')
    let lastname = _get(formData, 'LastName')
    let phone = _get(formData, 'Phone')
    let email = _get(formData, 'Email')
    if (
      !isEmpty(firstname) &&
      !isEmpty(lastname) &&
      !isEmpty(phone) &&
      !isEmpty(email) &&
      ValidateEmail(email) &&
      ValidatePhone(phone) &&
      validateName(firstname) &&
      validateName(lastname)
    ) {
      onSubmit()
      setShowModal(false)
    } else {
      if (isEmpty(firstname)) setFirstnameError('First name cannot be empty.')
      else {
        if (!validateName(firstname)) setFirstnameError('First name is invalid')
        else setFirstnameError('')
      }
      if (isEmpty(lastname)) setLastnameError('Last Name cannot be empty.')
      else {
        if (!validateName(lastname)) setLastnameError('LastName is invalid')
        else setLastnameError('')
      }
      if (isEmpty(phone)) setPhoneError('Phone Number cannot be empty.')
      else {
        if (!ValidatePhone(phone)) setPhoneError('Phone is invalid.')
        else setPhoneError('')
      }
      if (isEmpty(email)) setEmailError('Email cannot be empty.')
      else {
        if (!ValidateEmail(email)) setEmailError('Email is invalid.')
        else setEmailError('')
      }
    }
  }

  const goback = () => {
    let temp: any = paredQuery
    delete temp['a']
    const newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      `/results?${queryString.stringify(temp)}`
    window.location.href = newurl
  }

  const validateForm = (name: any, value: any) => {
    if (name === 'FirstName') {
      if (!value) setFirstnameError('First Name cannot be empty.')
      else if (!validateName(value)) setFirstnameError('First name is invalid.')
      else setFirstnameError('')
    }
    if (name === 'LastName') {
      if (!value) setLastnameError('Last Name cannot be empty.')
      else if (!validateName(value)) setLastnameError('Last name is invalid.')
      else setLastnameError('')
    }
    if (name === 'Phone') {
      if (!value) setPhoneError('Phone Number cannot be empty.')
      else if (!ValidatePhone(value)) setPhoneError('Phone is invalid.')
      else setPhoneError('')
    }
    if (name === 'Email') {
      if (!value) setEmailError('Email cannot be empty.')
      else if (!ValidateEmail(value)) setEmailError('Email is invalid.')
      else setEmailError('')
    }
  }

  if (_isEmpty(searchData) === false) {
    return (
      <div
        id='details-page-empty-searchdata-container'
        data-qa-details-page-empty-searchdata-container
        className='w-full min-h-container z-background bg-gray-light'
      >
        <ReactNotification />
        <div
          id='details-page-banner-container'
          data-qa-details-page-banner-container
          className='w-full bg-white'
        >
          <div
            id='details-page-banner-sub-container'
            data-qa-details-page-banner-sub-container
            className='w-full max-w-screen-lg mx-auto py-4 relative'
          >
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
                id='details-page-showbanner-container'
                data-qa-details-page-showbanner-container
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

                <div
                  id='details-page-static-label'
                  data-qa-details-page-static-label
                  className='p-3 text-white'
                >
                  <p className='font-semibold leading-tight text-base w-2/3 sm:w-full'>
                    LOOKING FOR A DIFFERENT CONFIGURATION OF THIS PARTICULAR
                    MODEL?
                  </p>
                  <p className='font-normal mt-2 sm:mt-0 text-sm leading-tight w-5/6 sm:w-full'>
                    We have plenty more inventory and can help with that too!{' '}
                    <br /> Click <b>"Finalize Quote Today!"</b> to contact a
                    Ninja regarding other configurations!
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

            {width < 640 ? (
              <img
                alt='gobackimageblue'
                role='button'
                width={40}
                onClick={() => {
                  goback()
                }}
                src={GoBackImageBlue}
                style={{ position: 'absolute', marginTop: 24, marginLeft: 10 }}
                className='mb-2'
              />
            ) : null}

            {/* This is the end of the banner part */}

            {/* This is the warning banner part */}
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
            {/* This is the end of the warning banner part */}
            <div
              id='details-page-data-group'
              data-qa-details-page-data-group
              className='flex items-center justify-between relative'
            >
              <p className='w-full text-blue-main-text font-bold uppercase text-3xl sm:text-5xl text-center sm:text-left'>
                {carName}
              </p>

              <Popup
                trigger={
                  <img
                    alt='share-img'
                    src='https://img.icons8.com/nolan/50/share.png'
                    className='mr-3'
                  />
                }
                position='bottom right'
              >
                <div
                  id='details-page-sharebtn-group'
                  data-qa-details-page-sharebtn-group
                  className='flex items-center'
                >
                  <EmailShareButton
                    url={window.location.href}
                    subject='NetNinjas sharing'
                    className='Demo__some-network__share-button'
                  >
                    <img
                      alt='email-share-icon'
                      role='button'
                      className='mr-2'
                      width='25'
                      src='https://img.icons8.com/nolan/64/email.png'
                    />
                  </EmailShareButton>

                  <FacebookShareButton
                    url={window.location.href}
                    quote='Netninjas sharing'
                    className='Demo__some-network__share-button mr-2'
                  >
                    <img
                      alt='facebook-share-icon'
                      width='25'
                      src='https://img.icons8.com/nolan/64/facebook-new.png'
                    />
                  </FacebookShareButton>
                  <img
                    alt='sms-share-icon'
                    width='25'
                    src='https://img.icons8.com/nolan/64/sms.png'
                  />
                </div>
              </Popup>
            </div>

            <p className='w-full text-blue-main-text text-xl uppercase text-center sm:text-left'>
              {meta.cartrim}
            </p>
          </div>
        </div>
        {width > 768 ? (
          <div
            id='details-page-submssionform'
            data-qa-details-page-submssionform
            className='w-full max-w-screen-lg mx-auto relative order-last'
          >
            <div
              id='details-page-goback-icon-container'
              data-qa-details-page-goback-icon-container
              className='custom-width-1-3-full custom-display-relative-absolute z-10 top-car-custom-image-top'
            >
              <img
                alt='gobackimage'
                role='button'
                width={50}
                onClick={() => {
                  goback()
                }}
                src={GoBackImage}
                className='mb-2'
              />
              <SubmissionForm
                item={searchData}
                onSubmit={() => setShowModal(true)}
                onPropertyUpdated={(value: IHomeSearch) =>
                  onRequestNewFetch(
                    {
                      ...value,
                      a: searchData.carid,
                      carmake: searchData.meta.carmake,
                      carmodel: searchData.meta.carmodel,
                    },
                    setSearchData,
                    setLoading,
                  )
                }
                searchParams={
                  {
                    ...paredQuery,
                    a: searchData.carid,
                    carmake: searchData.meta.carmake,
                    carmodel: searchData.meta.carmodel,
                  } as any as IHomeSearch
                }
                userCarOptions={carOptionsData}
                onUpdateOption={setCarOptionsData}
              />
            </div>
            <Modal
              show={showModal}
              onToggle={() => setShowModal(!showModal)}
              onFormSubmit={() => submitForm()}
              disableSubmit={true}
            >
              <div
                id='details-page-submission-form-container'
                data-qa-details-page-submission-form-container
              >
                <div
                  id='details-page-name-field'
                  className='flex flex-col sm:flex-row flex-wrap'
                >
                  <div
                    id='details-page-firstname-field'
                    data-qa-details-page-firstname-field
                    className='custom-width-modal pl-1 pr-3 pt-1 mb-5'
                  >
                    <input
                      placeholder='First Name*'
                      onChange={(event: any) => {
                        let temp = event.target.value
                        temp = temp.charAt(0).toUpperCase() + temp.slice(1)
                        onUpdateField(formData, setFormData, 'FirstName', temp)
                        validateForm('FirstName', temp)
                      }}
                      value={formData.FirstName}
                      className='w-full border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-16 py-2 px-4 leading-tight focus:outline-none'
                      type='text'
                    />
                    <span className='text-red-500 text-sm'>
                      {firstnameError}
                    </span>
                  </div>
                  <div
                    id='details-page-lastname-field'
                    data-qa-details-page-lastname-field
                    className='custom-width-modal pl-3 pr-1 pt-1 mb-5'
                  >
                    <input
                      placeholder='Last Name*'
                      onChange={(event: any) => {
                        let temp = event.target.value
                        temp = temp.charAt(0).toUpperCase() + temp.slice(1)
                        onUpdateField(formData, setFormData, 'LastName', temp)
                        validateForm('LastName', temp)
                      }}
                      value={formData.LastName}
                      className='w-full border border-gray-550 rounded h-16 placeholder-gray-very-dark text-gray-very-dark py-2 px-4 leading-tight focus:outline-none'
                      type='text'
                    />
                    <span className='text-red-500 text-sm'>
                      {lastnameError}
                    </span>
                  </div>
                </div>
                <div
                  id='details-page-phone-field'
                  data-qa-details-page-phone-field
                  className='w-full px-1 mb-5'
                >
                  <input
                    placeholder='Phone*'
                    value={formData.Phone}
                    onChange={(event: any) => {
                      onUpdateField(
                        formData,
                        setFormData,
                        'Phone',
                        event.target.value,
                      )
                      validateForm('Phone', event.target.value)
                    }}
                    className='w-full border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-16 py-2 px-4 leading-tight focus:outline-none'
                    type='text'
                  />
                  <span className='text-red-500 text-sm'>{phoneError}</span>
                </div>
                <div
                  id='details-page-email-field'
                  data-qa-details-page-email-field
                  className='w-full px-1 mb-5'
                >
                  <input
                    placeholder='Email*'
                    value={formData.Email}
                    onChange={(event: any) => {
                      onUpdateField(
                        formData,
                        setFormData,
                        'Email',
                        event.target.value,
                      )
                      validateForm('Email', event.target.value)
                    }}
                    className='w-full border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-16 py-2 px-4 leading-tight focus:outline-none'
                    type='email'
                  />
                  <span className='text-red-500 text-sm'>{emailError}</span>
                </div>
                <p className='w-full px-1 mb-10 font-medium'>
                  Timeframe to take delivery
                </p>
                <div
                  id='details-page-delivery-field'
                  data-qa-details-page-delivery-field
                  className='w-full px-1 mb-12'
                >
                  <InputRange
                    maxValue={4}
                    minValue={0}
                    step={1}
                    value={deliveryTime}
                    classNames={classNames}
                    onChange={(value: number | Range): void =>
                      setDeliveryTime(value as number)
                    }
                    onChangeComplete={(value: number | Range): void =>
                      onDeliveryTimeChosen(value as number)
                    }
                  />
                  {width > 768 ? (
                    <div
                      id='details-page-delivery-list'
                      data-qa-details-page-delivery-list
                      className='w-full flex flex-wrap mt-4'
                    >
                      <p className='w-1/5 text-left'>ASAP</p>
                      <p className='w-1/5 text-left'>1 Week</p>
                      <p className='w-1/5 text-center'>2 Weeks</p>
                      <p className='w-1/5 text-right'>3 Weeks</p>
                      <p className='w-1/5 text-right'>1 Month</p>
                    </div>
                  ) : (
                    <div
                      id='details-page-delivery-list'
                      data-qa-details-page-delivery-list
                      className='w-full flex flex-wrap mt-4'
                    >
                      <p className='w-1/5 text-left'>ASAP</p>
                      <p className='w-1/5 text-left'>1 W</p>
                      <p className='w-1/5 text-center'>2 W</p>
                      <p className='w-1/5 text-right'>3 W</p>
                      <p className='w-1/5 text-right'>1 M</p>
                    </div>
                  )}
                </div>
                <div
                  id='details-page-referer-field'
                  data-qa-details-page-referer-field
                  className='w-full px-1 mb-5'
                >
                  <Dropdown
                    options={refererOptions}
                    placeholder='How did you hear of us? (Optional)'
                    onSelected={(value: string) =>
                      onUpdateField(formData, setFormData, 'referrer', value)
                    }
                    selectedItem={formData.referrer}
                    className='w-full border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-16 py-2 px-4 leading-tight focus:outline-none'
                  />
                </div>
                <div
                  id='details-page-note-field'
                  data-qa-details-page-note-field
                  className='w-full px-1 mb-5'
                >
                  <textarea
                    value={formData.note}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({ ...formData, note: event.target.value })
                    }
                    className='w-full h-36 border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-14 py-2 px-4 leading-tight focus:outline-none'
                    placeholder='Please list any must have packages, additional questions or anything else we should know.'
                  />
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
        <div
          id='details-page-arrowdown-icon'
          data-qa-details-page-arrowdown-icon
          className='w-full custom-height-detail bg-blue-main-text absolute z-0'
        >
          <img
            className='w-auto image-style max-w-xs mx-auto'
            style={{ width: 40, height: 20 }}
            src={ArrowDown}
            alt='logo'
          />
        </div>
        <div
          id='details-page-image-feature-container'
          data-qa-details-page-image-feature-container
          className='w-full flex flex-wrap max-w-screen-lg mx-auto mb-12 order-1 '
        >
          <div
            id='details-page-empty-container'
            data-qa-details-page-empty-container
            className='custom-width-1-3-full'
          ></div>
          <div
            id='details-page-image-meta-sub-container'
            data-qa-details-page-image-meta-sub-container
            className='custom-width-2-3-full min-h-feature-area-custom relative'
          >
            <div
              id='details-page-image-meta'
              data-qa-details-page-image-meta
              className='carousel-wrapper absolute w-full mt-32 sm:mt-0 ml-0 sm:ml-5 p-0 sm:p-4'
            >
              <Carousel
                centerMode
                centerSlidePercentage={number(
                  'centerSlidePercentage',
                  90,
                  {},
                  'Main',
                )}
                {...getConfigurableProps()}
              >
                {_isEmpty(meta.carimages) === false
                  ? meta.carimages.map((image: string, index: number) => (
                      <div key={index}>
                        <img src={image} alt={`imagemeta${index}`} />
                      </div>
                    ))
                  : null}
              </Carousel>
            </div>
            <div
              id='details-page-features'
              data-qa-details-page-features
              className='pt-24'
            >
              <Features item={searchData} />
            </div>
          </div>
        </div>
        {width < 768 ? (
          <div
            id='details-page-submissionform'
            data-qa-details-page-submissionform
            className='w-full max-w-screen-lg mx-auto relative order-last'
          >
            <div
              id='details-page-submissionform-container'
              data-qa-details-page-submissionform-container
              className='custom-width-1-3-full custom-display-relative-absolute z-10 top-car-custom-image-top'
            >
              <img
                alt='gobackimage'
                role='button'
                width={50}
                onClick={e => {
                  goback()
                }}
                src={GoBackImage}
                className='mb-2'
              />
              <SubmissionForm
                item={searchData}
                onSubmit={() => setShowModal(true)}
                onPropertyUpdated={(value: IHomeSearch) =>
                  onRequestNewFetch(
                    {
                      ...value,
                      a: searchData.carid,
                      carmake: searchData.meta.carmake,
                      carmodel: searchData.meta.carmodel,
                    },
                    setSearchData,
                    setLoading,
                  )
                }
                searchParams={
                  {
                    ...paredQuery,
                    a: searchData.carid,
                    carmake: searchData.meta.carmake,
                    carmodel: searchData.meta.carmodel,
                  } as any as IHomeSearch
                }
                userCarOptions={carOptionsData}
                onUpdateOption={setCarOptionsData}
              />
            </div>
            <Modal
              show={showModal}
              onToggle={() => setShowModal(!showModal)}
              onFormSubmit={() => submitForm()}
              disableSubmit={true}
            >
              <div
                id='details-page-modal-container'
                data-qa-details-page-modal-container
              >
                <div
                  id='details-page-name-container'
                  data-qa-details-page-name-container
                  className='flex flex-col sm:flex-row flex-wrap'
                >
                  <div
                    id='details-page-firstname-container'
                    data-qa-details-page-firstname-container
                    className='custom-width-modal pt-1 mb-5'
                  >
                    <input
                      placeholder='First Name*'
                      onChange={(event: any) => {
                        let temp = event.target.value
                        temp = temp.charAt(0).toUpperCase() + temp.slice(1)
                        onUpdateField(formData, setFormData, 'FirstName', temp)
                        validateForm('FirstName', temp)
                      }}
                      value={formData.FirstName}
                      className='w-full border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-16 py-2 px-4 leading-tight focus:outline-none'
                      type='text'
                    />
                    <span className='text-red-500 text-sm'>
                      {firstnameError}
                    </span>
                  </div>
                  <div
                    id='details-page-lastname-container'
                    data-qa-details-page-lastname-container
                    className='custom-width-modal pt-1 mb-5'
                  >
                    <input
                      placeholder='Last Name*'
                      onChange={(event: any) => {
                        let temp = event.target.value
                        temp = temp.charAt(0).toUpperCase() + temp.slice(1)
                        onUpdateField(formData, setFormData, 'LastName', temp)
                        validateForm('LastName', temp)
                      }}
                      value={formData.LastName}
                      className='w-full border border-gray-550 rounded h-16 placeholder-gray-very-dark text-gray-very-dark py-2 px-4 leading-tight focus:outline-none'
                      type='text'
                    />
                    <span className='text-red-500 text-sm'>
                      {lastnameError}
                    </span>
                  </div>
                </div>
                <div
                  id='details-page-phone-container'
                  data-qa-details-page-phone-container
                  className='w-full mb-5'
                >
                  <input
                    placeholder='Phone*'
                    value={formData.Phone}
                    onChange={(event: any) => {
                      onUpdateField(
                        formData,
                        setFormData,
                        'Phone',
                        event.target.value,
                      )
                      validateForm('Phone', event.target.value)
                    }}
                    className='w-full border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-16 py-2 px-4 leading-tight focus:outline-none'
                    type='text'
                  />
                  <span className='text-red-500 text-sm'>{phoneError}</span>
                </div>
                <div
                  id='details-page-email-container'
                  data-qa-details-page-email-container
                  className='w-full mb-5'
                >
                  <input
                    placeholder='Email*'
                    value={formData.Email}
                    onChange={(event: any) => {
                      onUpdateField(
                        formData,
                        setFormData,
                        'Email',
                        event.target.value,
                      )
                      validateForm('Email', event.target.value)
                    }}
                    className='w-full border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-16 py-2 px-4 leading-tight focus:outline-none'
                    type='email'
                  />
                  <span className='text-red-500 text-sm'>{emailError}</span>
                </div>
                <p className='w-full mb-10 font-medium'>
                  Timeframe to take delivery
                </p>
                <div
                  id='details-page-deliverytime-container'
                  data-qa-details-page-deliverytime-container
                  className='w-full mb-12'
                >
                  <InputRange
                    maxValue={4}
                    minValue={0}
                    step={1}
                    value={deliveryTime}
                    classNames={classNames}
                    onChange={(value: number | Range): void =>
                      setDeliveryTime(value as number)
                    }
                    onChangeComplete={(value: number | Range): void =>
                      onDeliveryTimeChosen(value as number)
                    }
                  />
                  {width > 768 ? (
                    <div
                      id='details-page-delivertime-list'
                      data-qa-details-page-delivertime-list
                      className='w-full flex flex-wrap mt-4'
                    >
                      <p className='w-1/5 text-left'>ASAP</p>
                      <p className='w-1/5 text-left'>1 Week</p>
                      <p className='w-1/5 text-center'>2 Weeks</p>
                      <p className='w-1/5 text-right'>3 Weeks</p>
                      <p className='w-1/5 text-right'>1 Month</p>
                    </div>
                  ) : (
                    <div
                      id='details-page-delivertime-list'
                      data-qa-details-page-delivertime-list
                      className='w-full flex flex-wrap mt-4'
                    >
                      <p className='w-1/5 text-left'>ASAP</p>
                      <p className='w-1/5 text-left'>1 W</p>
                      <p className='w-1/5 text-center'>2 W</p>
                      <p className='w-1/5 text-right'>3 W</p>
                      <p className='w-1/5 text-right'>1 M</p>
                    </div>
                  )}
                </div>
                <div
                  id='details-page-referrer-container'
                  data-qa-details-page-referrer-container
                  className='w-full px-1 mb-5'
                >
                  <Dropdown
                    options={refererOptions}
                    placeholder='How did you hear of us? (Optional)'
                    onSelected={(value: string) =>
                      onUpdateField(formData, setFormData, 'referrer', value)
                    }
                    selectedItem={formData.referrer}
                    className='w-full border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-16 py-2 px-4 leading-tight focus:outline-none'
                  />
                </div>
                <div
                  id='details-page-note-container'
                  data-qa-details-page-note-container
                  className='w-full px-1 mb-5'
                >
                  <textarea
                    value={formData.note}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({ ...formData, note: event.target.value })
                    }
                    className='w-full h-36 border border-gray-550 rounded placeholder-gray-very-dark text-gray-very-dark h-14 py-2 px-4 leading-tight focus:outline-none'
                    placeholder='Please list any must have packages, additional questions or anything else we should know.'
                  />
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
        <div
          id='details-page-related-container'
          data-qa-details-page-related-container
          className='w-full bg-white mb-5'
        >
          <div
            id='details-page-related-sub-container'
            data-qa-details-page-related-sub-container
            className='flex flex-col sm:flex-row w-full mx-auto max-w-screen-lg '
          >
            <div
              id='details-page-empty-div'
              data-qa-details-page-empty-div
              className='w-full sm:w-1/3'
            ></div>
            <div
              id='details-page-related-items'
              data-qa-details-page-related-items
              className='w-full sm:w-2/3 py-10 px-5'
            >
              <RelatedItems results={relatedVehicles} carName={carName} />
            </div>
          </div>
        </div>
        <Loading show={isLoading} />
      </div>
    )
  } else if (isLoading) return <Loading show={isLoading} />
  else
    return (
      <div
        id='details-page-no-data-container'
        data-qa-details-page-no-data-container
        style={{ textAlign: 'center' }}
      >
        <div
          id='details-page-no-data-sub-container'
          data-qa-details-page-no-data-sub-container
          className='text-2xl mb-5'
          style={{
            marginTop: '30vh',
            marginBottom: '34vh',
            textAlign: 'center',
          }}
        >
          <p>No results found! Please go back to the search page.</p>
          <div
            id='details-page-back-icon'
            data-qa-details-page-back-icon
            className='mt-2'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img
              role='button'
              onClick={() => {
                goback()
              }}
              width={50}
              src={GoBackImageBlue}
              className='mb-2'
              alt='gobackimageblue'
            />
          </div>
        </div>
      </div>
    )
}

export default Details
