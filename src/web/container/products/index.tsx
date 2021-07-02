// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PageHeader from '../../component/page-header'
import CardService from '../../component/card-service'
import ServiceImage3 from '../../asset/service-img-3.png'

import './style.scss'
import RetainerModal from '../../component/modal/payretainerModal'
import RetainerModal1 from '../../component/modal/payretainerModal'
import AutoComplete from '../../component/autocomplete'
import Loading from '../../component/loading'
import { BASE_URL } from '../../../utils/api'

import { loadStripe } from '@stripe/stripe-js'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'

import { storeInfo } from '../../../utils/api'

const key = process.env.STRIPE_KEY
const stripePromise = loadStripe(key)
export interface IFAQItem {
  question: string
  answer: string
}

export interface ServiceItem {
  image: string
  text: string
  price: string
}

const services: ServiceItem[] = [
  {
    image: ServiceImage3,
    text: 'Leasehackr Negotiated Car Deal Deposit',
    price: 'From $500.00',
  },
]

const ProductsPage: React.FC = (props: any) => {
  const [showModal, setShowModal] = useState(false)
  const [showLeaseModal, setShowLeaseModal] = useState(false)

  const [package1, setPackage1] = useState('')
  const [vin, setVin] = useState('')
  const [package1Error, setPackage1Error] = useState('')
  const [price, setPrice] = useState('')
  const [priceError, setPriceError] = useState('')
  const [wanttoknow, setWanttoknow] = useState('')
  const [firstname, setFirstname] = useState('')
  const [firstnameError, setFirstnameError] = useState('')
  const [lastname, setLastname] = useState('')
  const [lastnameError, setLastnameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [method, setMethod] = useState('')
  const [methodError, setMethodError] = useState('')
  const [zip, setZip] = useState('')
  const [zipError, setZipError] = useState('')
  const [leasehackr, setLeasehackr] = useState('')
  const [leasehackrError, setLeasehackrError] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (
      new URLSearchParams(props.location.search).get('type') === 'LEASEHACKR'
    ) {
      setShowModal(true)
    }
    let temp_package: any
    temp_package = new URLSearchParams(props.location.search).get('package')
    let vin: any
    vin = new URLSearchParams(props.location.search).get('VIN')
    let wanttoknow: any
    wanttoknow = new URLSearchParams(props.location.search).get('wanttoknow')
    let firstname: any
    firstname = new URLSearchParams(props.location.search).get('firstname')
    let lastname: any
    lastname = new URLSearchParams(props.location.search).get('lastname')
    let email: any
    email = new URLSearchParams(props.location.search).get('email')
    let phone: any
    phone = new URLSearchParams(props.location.search).get('phone')
    let method: any
    method = new URLSearchParams(props.location.search).get('method')
    let zip: any
    zip = new URLSearchParams(props.location.search).get('zip')
    let leasehackr: any
    leasehackr = new URLSearchParams(props.location.search).get('leasehackr')
    if (temp_package !== undefined) {
      setPackage1(temp_package)
    }
    if (vin !== undefined) {
      setVin(vin)
    }
    if (wanttoknow !== undefined) {
      setWanttoknow(wanttoknow)
    }
    if (firstname !== undefined) {
      setFirstname(firstname)
    }
    if (lastname !== undefined) {
      setLastname(lastname)
    }
    if (email !== undefined) {
      setEmail(email)
    }
    if (phone !== undefined) {
      setPhone(phone)
    }
    if (method !== undefined) {
      setMethod(method)
    }
    if (zip !== undefined) {
      setZip(zip)
    }
    if (leasehackr !== undefined) {
      setLeasehackr(leasehackr)
    }
    // window.addEventListener('resize', updateWidth)
    let payment_success: any
    payment_success = new URLSearchParams(props.history.location.search).get(
      'success',
    )
    if (payment_success === 'false') {
      store.addNotification({
        title: 'Error!',
        message: 'A problem has occurred while submitting your payment.',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      })
    }
    if (payment_success === 'true') {
      store.addNotification({
        title: 'Success!',
        message: 'Your payments has been sent successfully.',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 10000,
          onScreen: true,
        },
      })

      let temp: any
      temp = localStorage.getItem('leadinfo')
      if (temp !== null) {
        let paredQuery = JSON.parse(temp)
        storeInfo({ ...paredQuery }).finally(() => {
          localStorage.removeItem('leadinfo')
        })
      }
    }
  }, [props.history.location.search, props.location.search])

  const sendpayment = async () => {
    setLoading(true)
    let stripe: any
    stripe = await stripePromise
    const temp = {
      package: package1,
      wanttoknow,
      firstname,
      lastname,
      email,
      phone,
      method,
      zip,
      type: 'LEASEHACKR',
    }
    localStorage.setItem('leadinfo', JSON.stringify({ ...temp, VIN: vin }))
    const response = await fetch(
      `${BASE_URL}/create-checkout-session-leasehackar`,
      {
        method: 'POST',
        body: JSON.stringify({ price: price }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
    const session = await response.json()
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })
    setLoading(false)
    if (result.error) {
    }
  }

  const isEmpty = (param: string) => {
    if (param) return false
    else return true
  }

  const submitForm1 = () => {
    setShowModal(false)
    setShowLeaseModal(true)
  }

  function ValidateEmail(mail: string) {
    const reg = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    if (reg.test(mail)) return true
    else return false
  }

  function ValidatePhone(param: string) {
    const reg = new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/)
    if (reg.test(param)) return true
    else return false
  }

  function ValidateZip(param: string) {
    const reg = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/)
    if (reg.test(param)) return true
    else return false
  }

  function validatePrice(param: string) {
    const reg = new RegExp(/^[0-9]*$/)
    if (reg.test(param)) return true
    else return false
  }

  const submitForm2 = () => {
    if (
      !isEmpty(price) &&
      validatePrice(price) &&
      !isEmpty(package1) &&
      !isEmpty(firstname) &&
      !isEmpty(lastname) &&
      !isEmpty(email) &&
      !isEmpty(phone) &&
      !isEmpty(method) &&
      !isEmpty(zip) &&
      !isEmpty(leasehackr) &&
      ValidatePhone(phone) &&
      ValidateZip(zip) &&
      ValidateEmail(email)
    ) {
      setShowModal(false)
      setShowLeaseModal(false)
      setPackage1('')
      setFirstname('')
      setLastname('')
      setEmail('')
      setPhone('')
      setZip('')
      setMethod('')
      sendpayment()
    } else {
      if (isEmpty(price)) setPriceError('Price cannot be empty')
      else {
        if (!validatePrice(price)) setPriceError('Price is invalid.')
        else setPriceError('')
      }
      if (isEmpty(package1)) setPackage1Error('Package cannot be empty')
      else setPackage1Error('')
      if (isEmpty(firstname)) setFirstnameError('First Name cannot be empty')
      else setFirstnameError('')
      if (isEmpty(lastname)) setLastnameError('Last Name cannot be empty')
      else setLastnameError('')
      if (isEmpty(email)) setEmailError('Email cannot be empty')
      else {
        if (!ValidateEmail(email)) setEmailError('Email is invalid')
        else setEmailError('')
      }
      if (isEmpty(phone)) setPhoneError('Phone cannot be empty')
      else {
        if (!ValidatePhone(phone)) setPhoneError('Phone number is invalid')
        else setPhoneError('')
      }
      if (isEmpty(method)) setMethodError('Method cannot be empty')
      else setMethodError('')
      if (isEmpty(leasehackr)) setLeasehackrError('Leasehackr cannot be empty')
      else setLeasehackrError('')
      if (isEmpty(zip)) setZipError('Zip Code cannot be empty')
      else {
        if (!ValidateZip(zip)) setZipError('Zip code is invalid')
        else setZipError('')
      }
    }
  }

  return (
    <div id='products-page-container' data-qa-products-page-container>
      <ReactNotification />
      <PageHeader title='Our Products'>
        <div
          id='products-page-header-child'
          data-qa-products-page-header-child
          className='max-w-screen-lg mx-auto px-12 sm:px-0 text-center text-white font-light sm:font-normal'
        ></div>
      </PageHeader>
      {!isLoading ? (
        <div className='max-w-screen-lg mx-auto flex flex-col py-10 text-gray-card-title'>
          <div className='w-full text-center mt-5'>
            <div className='pt-10 pb-10'>
              <div className='text-3xl sm:text-50px text-blue-main-text uppercase font-extrabold sm:font-bold'>
                Our Products
              </div>
              <div
                id='products-page-service-list'
                data-qa-products-page-service-list
                className='flex flex-col sm:flex-row mt-4 sm:mt-10 justify-center'
              >
                {services.map(
                  ({ image, text, price }: ServiceItem, index: number) => (
                    <div
                      id='products-page-service-item'
                      data-qa-products-page-service-item
                      role='button'
                      onClick={e => {
                        setShowModal(true)
                      }}
                      key={index}
                      className='flex w-full sm:w-1/2 p-5 sm:p-0 justify-center'
                    >
                      <CardService image={image} text={text} price={price} />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <RetainerModal
            show={showModal}
            title='Submit data'
            onToggle={() => setShowModal(!showModal)}
            onFormSubmit={() => {
              submitForm1()
            }}
            disableSubmit={true}
          >
            <div
              id='products-page-leasehackr-modal'
              data-qa-products-page-leasehackr-modal
            >
              <div
                id='prodcuts-page-leasehackr-modal-main'
                data-qa-prodcuts-page-leasehackr-modal-main
                className='sm:flex-row justify-between mb-10'
              >
                <div
                  className='text-center'
                  id='products-page-leasehackr-price'
                  data-qa-products-page-leasehackr-price
                >
                  <h1 className='text-xl sm:text-3xl'>
                    Leasehackr Negotiated Car Deal Deposit
                  </h1>
                  <p className='mt-3 text-gray-700'>FROM $500.00</p>
                </div>
                <div
                  id='products-page-modal-serviceimage3'
                  data-qa-products-page-modal-serviceimage3
                  className='mt-2 w-full flex justify-center mt-5'
                >
                  <img
                    className='transition duration-150 transform hover:scale-105 w-2/3'
                    src={ServiceImage3}
                    alt='Service Image3'
                  />
                </div>
                <div
                  id='products-page-notes-container'
                  data-qa-products-page-notes-container
                  className='w-full mr-1'
                  style={{ color: '#6B7280' }}
                >
                  <div
                    id='products-page-notes-description'
                    data-qa-products-page-notes-description
                    className='text-gray-700 mt-5'
                  >
                    Because of limited quantities and dealer policy, In order to
                    reserve the car, our partner dealer requires a deposit.
                    Deposits are used as a way of signaling to the dealership
                    that a customer is ready to move forward with a purchase or
                    lease and allows the dealer to feel that the customer is
                    committed.
                    <div className='text-center mt-3 mb-2'>
                      Notes Regarding Deposits
                    </div>
                    <ul style={{ listStyle: 'disc' }}>
                      <li className='mb-1'>
                        Deposits act as a credit toward the due at signing
                        amount of your selected deal. For example: if your
                        selected deal is $300 Per Month with $1000 due at
                        signing and you were to pay a $500 deposit, you would
                        owe only $500 upon delivery or pick-up.
                      </li>
                      <li>
                        Deposits are fully refundable if the vehicle is out of
                        stock, or if your credit app doesn't get approved or if
                        circumstances change and you can ultimately no longer
                        proceed with the transaction
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </RetainerModal>

          {/* <!-- Modal for the long form --> */}
          <RetainerModal1
            show={showLeaseModal}
            title='Submit data'
            onToggle={() => setShowLeaseModal(!showLeaseModal)}
            onFormSubmit={() => {
              submitForm2()
            }}
            disableSubmit={true}
          >
            <div
              id='products-page-submission-form-container'
              data-qa-products-page-submission-form-container
            >
              <h1 className='text-xl'>Lease Quotes</h1>
              <div
                id='products-page-make-model-trim-container'
                data-qa-products-page-make-model-trim-container
                className='mt-3'
              >
                <span className='text-gray-600 text-sm'>
                  Type the [make+model+trim] of your desired vehicle
                </span>
                <input
                  value={package1}
                  onChange={e => {
                    setPackage1(e.target.value)
                  }}
                  placeholder='Make Model Trim Package'
                  className='form-input mt-1 block w-full h-9'
                  type='text'
                />
                <span className='text-red-500 text-sm'>{package1Error}</span>
              </div>

              <div
                id='products-page-wanttoknow-field'
                data-qa-products-page-wanttoknow-field
                className='mt-3'
              >
                <span className='text-sm'>
                  Anything Else You Want Us To Know?
                </span>
                <textarea
                  value={wanttoknow}
                  onChange={e => {
                    setWanttoknow(e.target.value)
                  }}
                  className='form-textarea mt-1 block w-full'
                  rows={4}
                ></textarea>
              </div>

              <AutoComplete price={price} setPrice={setPrice} />
              <span className='text-red-500'>{priceError}</span>

              <div
                id='products-page-contact-info-field'
                data-qa-products-page-contact-info-field
                className='mt-4'
              >
                <p className='text-sm'>Contact Info</p>
                <span className='text-gray-600 text-xs'>
                  Please enter your contact info so we can send you your lease
                  quotes!
                </span>
                <div
                  id='products-page-border-bottom'
                  data-qa-products-page-border-bottom
                  className='mt-1'
                  style={{ borderBottom: '1px solid #aaaaaa' }}
                ></div>
              </div>

              <div
                id='products-page-name-container'
                data-qa-products-page-name-container
                className='mt-3 text-sm'
              >
                <p className='text-sm'>
                  Name <span className='text-red-600'>*</span>
                </p>
                <div
                  id='products-page-name'
                  data-qa-products-page-name
                  className='flex'
                >
                  <div
                    id='products-page-firstname-error-container'
                    data-qa-products-page-firstname-error-container
                    className='w-full'
                  >
                    <input
                      value={firstname}
                      onChange={e => {
                        setFirstname(e.target.value)
                      }}
                      placeholder='First Name'
                      className='form-input mt-1 block w-full h-9'
                      type='text'
                    />
                    <span className='text-red-500'>{firstnameError}</span>
                  </div>
                  <div
                    id='products-page-lastname-error-container'
                    data-qa-products-page-lastname-error-container
                    className='w-full'
                  >
                    <input
                      value={lastname}
                      onChange={e => {
                        setLastname(e.target.value)
                      }}
                      placeholder='Last Name'
                      className='form-input mt-1 block h-9 ml-1 w-full'
                      type='text'
                    />
                    <span className='text-red-500'>{lastnameError}</span>
                  </div>
                </div>
              </div>

              <div
                id='products-page-email-field'
                data-qa-products-page-email-field
                className='mt-3 text-sm'
              >
                <p className='text-sm'>
                  Email <span className='text-red-600'>*</span>
                </p>
                <input
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  placeholder='Please type your email'
                  className='form-input mt-1 block w-full h-9'
                  type='text'
                />
                <span className='text-red-500'>{emailError}</span>
              </div>

              <div
                id='products-page-phone-field'
                data-qa-products-page-phone-field
                className='mt-3 text-sm'
              >
                <p>
                  Phone <span className='text-red-600'>*</span>
                </p>
                <input
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value)
                  }}
                  placeholder='(123) 456-7890'
                  className='form-input mt-1 block w-full h-9'
                  type='text'
                />
                <span className='text-red-500'>{phoneError}</span>
              </div>

              <div
                id='products-page-preferred-field'
                data-qa-products-page-preferred-field
                className='mt-3 text-sm'
              >
                <p>
                  Preferred Method <span className='text-red-600'>*</span>
                </p>
                <select
                  value={method}
                  onChange={e => {
                    setMethod(e.target.value)
                  }}
                  className='form-select mt-1 block w-full'
                >
                  <option>Select your preferred method</option>
                  <option value='EMAIL'>Email</option>
                  <option value='PHONE'>Phone</option>
                </select>
                <span className='text-red-500'>{methodError}</span>
              </div>

              <div
                id='products-page-zipcode-field'
                data-qa-products-page-zipcode-field
                className='mt-3 text-sm'
              >
                <p>
                  Zip Code <span className='text-red-600'>*</span>
                </p>
                <input
                  value={zip}
                  onChange={e => {
                    setZip(e.target.value)
                  }}
                  placeholder='30033'
                  className='form-input mt-1 block w-full h-9'
                  type='text'
                />
                <span className='text-red-500'>{zipError}</span>
              </div>

              <div id="products-page-leaselackr" data-qa-products-page-leasehackr className='mt-3 text-sm mb-5'>
                <p>
                  Found Us Through Leasehackr? Please write username here.{' '}
                  <span className='text-red-600'>*</span>
                </p>
                <div className='text-gray-600 text-xs'>
                  If you did not find us through leasehackr, please write n/a.
                </div>
                <input
                  value={leasehackr}
                  onChange={e => {
                    setLeasehackr(e.target.value)
                  }}
                  className='form-input mt-1 block w-full h-9'
                  type='text'
                />
                <span className='text-red-500'>{leasehackrError}</span>
              </div>
            </div>
          </RetainerModal1>
        </div>
      ) : (
        <Loading show />
      )}
    </div>
  )
}

export default ProductsPage
