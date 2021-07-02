import React, { useState, useEffect } from 'react'
import PageHeader from '../../component/page-header'
import CardService from '../../component/card-service'
import ServiceImage2 from '../../asset/service-img-2.png'
import ServiceImage3 from '../../asset/service-img-3.png'
import './style.scss'
import RetainerModal from '../../component/modal/payretainerModal'
import RetainerModal1 from '../../component/modal/payretainerModal'
import Loading from '../../component/loading'
import { BASE_URL, verifyDiscountCode } from '../../../utils/api'
import { loadStripe } from '@stripe/stripe-js'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import axios from 'axios'
import cn from 'classnames'
import InfoIcon from '../../asset/info_icon.svg'

export interface IFAQItem {
  question: string
  answer: string
}

export interface ServiceItem {
  image: string
  text: string
  price: number
}

const services: ServiceItem[] = [
  {
    image: ServiceImage2,
    text: 'Pay Deal Retainer (Fee)',
    price: 99.99,
  },
  {
    image: ServiceImage3,
    text: 'Pay Deal Remainder (Fee)',
    price: 349.99,
  },
]

const ServicesPage: React.FC = (props: any) => {
  let stripePromise: any
  if (process.env.STRIPE_KEY) stripePromise = loadStripe(process.env.STRIPE_KEY)

  const [showModal, setShowModal] = useState(false)
  const [showLeaseModal, setShowLeaseModal] = useState(false)

  const [package1, setPackage1] = useState('')
  const [vin, setVin] = useState('')
  const [package1Error, setPackage1Error] = useState('')
  const [vinError, setVinError] = useState('')
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
  const [width, setWidth] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [product, setProduct] = useState(0)
  const [price, setPrice] = useState(349.99)
  // const [showDiscountDesc, setShowDiscountDesc] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  /*Product == 0: Retainer form
    Product == 1: Remainder form
    Prodcut == 2: LUX form  */
  const [discountCode, setDiscountCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    //http://localhost:8080/services?pay=true
    if (
      new URLSearchParams(props.location.search).get('type') === 'REMAINDER'
    ) {
      setProduct(1)
      setShowModal(true)
    }
    if (new URLSearchParams(props.location.search).get('type') === 'RETAINER') {
      setProduct(0)
      setShowModal(true)
    }
    if (new URLSearchParams(props.location.search).get('type') === 'LUX') {
      setProduct(2)
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
    setWidth(window.innerWidth)
    window.addEventListener('resize', updateWidth)
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
  }, [props.history.location.search, props.location.search])

  const sendpayment = async () => {
    //Save the data to the localstorage to send it
    setLoading(true)
    // Get Stripe.js instance
    let stripe: any
    stripe = await stripePromise

    //Get the SKU's information
    // const response_sku = await fetch(`${BASE_URL}/get-product-info`, { method: 'POST', headers: {
    //   'Content-type': 'application/json; charset=UTF-8'
    // }});
    axios
      .post(`${BASE_URL}/get-product-info`, { type: product })
      .then(res => {
        const { sku } = res.data
        let tempType = ''
        if (product === 1) tempType = 'REMAINDER'
        else tempType = 'RETAINER'
        const temp = {
          package: package1,
          wanttoknow,
          firstname,
          lastname,
          email,
          phone,
          method,
          zip,
          productid: sku.product_id,
          price: sku.price / 100,
          type: tempType,
        }
        localStorage.setItem('leadinfo', JSON.stringify({ ...temp, VIN: vin }))
      })
      .catch(err => {
        console.error(err)
      })

    // Call your backend to create the Checkout session
    const response = await fetch(`${BASE_URL}/create-checkout-session`, {
      method: 'POST',
      body: JSON.stringify({ type: product, discountAmount }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    const session = await response.json()

    //When the customer clicks the button, redirect them to Checkout
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

  const submitForm2 = () => {
    // setShowModal(false);
    // sendpayment();
    if (
      !isEmpty(package1) &&
      !isEmpty(firstname) &&
      !isEmpty(lastname) &&
      !isEmpty(email) &&
      !isEmpty(phone) &&
      !isEmpty(method) &&
      !isEmpty(zip) &&
      ValidatePhone(phone) &&
      ValidateZip(zip) &&
      ValidateEmail(email)
    ) {
      setShowModal(false)
      setShowLeaseModal(false)
      sendpayment()
      setPackage1('')
      setFirstname('')
      setLastname('')
      setEmail('')
      setPhone('')
      setZip('')
      setMethod('')
    } else {
      if (isEmpty(package1)) setPackage1Error('Package cannot be empty')
      else setPackage1Error('')
      if (product !== 0) {
        if (isEmpty(vin)) setVinError('Vin number cannot be empty')
        else setVinError('')
      }
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
      if (isEmpty(zip)) setZipError('Zip Code cannot be empty')
      else {
        if (!ValidateZip(zip)) setZipError('Zip code is invalid')
        else setZipError('')
      }
    }
  }

  const verifyDiscountCode1 = () => {
    setSubmitted(true)
    if (discountCode) {
      let param = {
        a: 'DISCOUNT',
        authtoken: 'MX6767HGHG8283HD',
        clientid: discountCode,
        clientemail: email,
        clientphone: phone,
      }
      verifyDiscountCode(param).then((res: any) => {
        if (res.status === 200) {
          if (!isVerified) {
            setPrice(price - res.data.discount)
            setDiscountAmount(res.data.discount)
            setIsVerified(true)
          }
        } else setIsVerified(false)
      })
    }
  }

  // const getInfo = () => {
  //   axios
  //     .post(`${BASE_URL}/get-DISCOUNT`)
  //     .then((res: any) => {
  //       setShowDiscountDesc(true)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }

  return (
    <div>
      <ReactNotification />
      <PageHeader title='Our Services'>
        <div className='max-w-screen-lg mx-auto px-12 sm:px-0 text-center text-white font-light sm:font-normal'></div>
      </PageHeader>
      {!isLoading ? (
        <div className='max-w-screen-lg mx-auto flex flex-col py-10 text-gray-card-title'>
          <div className='w-full text-center mt-5'>
            <div className='pt-10 pb-10'>
              <div className='text-3xl sm:text-50px text-blue-main-text uppercase font-extrabold sm:font-bold'>
                Our Services
              </div>
              <div className='flex flex-col sm:flex-row mt-4 sm:mt-10 space-x-0 sm:space-x-8'>
                {services.map(
                  ({ image, text, price }: ServiceItem, index: number) => (
                    <div
                      role='button'
                      onClick={e => {
                        setProduct(index)
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
            // onToggle={() => setShowModal(!showModal)}
            title='Submit data'
            onToggle={() => setShowModal(!showModal)}
            onFormSubmit={() => {
              submitForm1()
            }}
            disableSubmit={true}
          >
            <div>
              {width < 640 ? (
                <div className='mt-2 w-full mb-4'>
                  {product === 0 ? (
                    <img
                      className='transition duration-150 transform hover:scale-105'
                      src={ServiceImage2}
                      alt='serviceimage2'
                    />
                  ) : (
                    <img
                      className='transition duration-150 transform hover:scale-105'
                      src={ServiceImage3}
                      alt='serviceimage3'
                    />
                  )}
                </div>
              ) : null}
              {product === 0 ? (
                <h1 className='text-xl sm:text-3xl'>Pay Deal Retainer (Fee)</h1>
              ) : (
                <h1 className='text-xl sm:text-3xl'>
                  Pay Deal Remainder (Fee)
                </h1>
              )}

              <div className='flex flex-col sm:flex-row justify-between'>
                <div
                  className='w-full sm:w-1/3 mr-1'
                  style={{ color: '#6B7280' }}
                >
                  {product === 0 ? (
                    <div className='mt-3 text-gray-700'>FROM $99.99</div>
                  ) : (
                    <div className='mt-3 text-gray-700'>
                      {product === 2 ? (
                        <span>FROM ${price}</span>
                      ) : (
                        <span>FROM ${price}</span>
                      )}
                    </div>
                  )}
                  {product === 0 ? (
                    <div className='text-gray-700 mt-5'>
                      Paying the retainer allows us to lock in your deal and
                      reserve the vehicle with our partner dealership.
                    </div>
                  ) : (
                    <div className='text-gray-700 mt-5'>
                      The remainder product is paid once the credit application
                      is approved and the delivery scheduled. This represents
                      the remaining balance of our fee.
                    </div>
                  )}
                </div>
                {width > 640 ? (
                  <div className='mt-2 w-full sm:w-1/2'>
                    {product === 0 ? (
                      <img
                        className='transition duration-150 transform hover:scale-105'
                        src={ServiceImage2}
                        alt=''
                      />
                    ) : (
                      <img
                        className='transition duration-150 transform hover:scale-105'
                        src={ServiceImage3}
                        alt=''
                      />
                    )}
                  </div>
                ) : null}
              </div>
              <div className='text-gray-700 mt-5 mb-5'></div>
            </div>
          </RetainerModal>

          {/* <!-- Modal for the long form --> */}
          <RetainerModal1
            show={showLeaseModal}
            // onToggle={() => setShowModal(!showModal)}
            title='Submit data'
            onToggle={() => setShowLeaseModal(!showLeaseModal)}
            onFormSubmit={() => {
              submitForm2()
            }}
            disableSubmit={true}
          >
            <div>
              <h1 className='text-xl'>Lease Quotes</h1>

              <div className='mt-3'>
                {product === 1 || product === 2 ? (
                  <div className='text-sm'>
                    Vehicle Info <span className='text-red-600'>*</span>
                  </div>
                ) : (
                  <div className='text-sm'>
                    Vehicle to be Retained{' '}
                    <span className='text-red-600'>*</span>
                  </div>
                )}

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

              {product === 0 ? null : (
                <div className='mt-3'>
                  <div className='text-sm'>
                    VIN <span className='text-red-600'>*</span>
                  </div>
                  <input
                    value={vin}
                    onChange={e => {
                      setVin(e.target.value)
                    }}
                    placeholder='Make Model Trim Package'
                    className='form-input mt-1 block w-full h-9'
                    type='text'
                  />
                  <span className='text-red-500 text-sm'>{vinError}</span>
                </div>
              )}

              <div className='mt-3'>
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

              <div className='mt-4'>
                <div className='text-sm'>Contact Info</div>
                <span className='text-gray-600 text-xs'>
                  Please enter your contact info so we can send you your lease
                  quotes!
                </span>
                <div
                  className='mt-1'
                  style={{ borderBottom: '1px solid #aaaaaa' }}
                ></div>
              </div>

              <div className='mt-3 text-sm'>
                <div className='text-sm'>
                  Name <span className='text-red-600'>*</span>
                </div>
                <div className='flex'>
                  <div className='w-full'>
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
                  <div className='w-full'>
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

              <div className='mt-3 text-sm'>
                <div className='text-sm'>
                  Email <span className='text-red-600'>*</span>
                </div>
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

              <div className='mt-3 text-sm'>
                <div>
                  Phone <span className='text-red-600'>*</span>
                </div>
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

              <div className='mt-3 text-sm'>
                <div>
                  Preferred Method <span className='text-red-600'>*</span>
                </div>
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

              <div className='mt-3 text-sm'>
                <div className='flex'>
                  <div className='w-full'>
                    <div className='text-sm'>
                      Zip Code <span className='text-red-600'>*</span>
                    </div>
                    <div>
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
                  </div>
                  <div className='w-full'>
                    <div className='flex w-full items-center'>
                      <div className='text-sm'>Discount Code</div>
                      <img
                        // onClick={e => {
                        //   getInfo()
                        // }}
                        className='mb-info-icon pb-1 w-5 ml-1'
                        src={InfoIcon}
                        alt='Info'
                      />
                    </div>
                    <div className='w-full flex'>
                      <input
                        value={discountCode}
                        onChange={e => {
                          setDiscountCode(e.target.value)
                        }}
                        placeholder='Discount Code'
                        className='form-input mt-1 block h-9 ml-1 w-full'
                        type='text'
                      />
                      <button
                        disabled={isVerified}
                        onClick={e => {
                          verifyDiscountCode1()
                        }}
                        className={cn(
                          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded',
                          'bg-opacity-20' && isVerified,
                        )}
                      >
                        Verify
                      </button>
                    </div>
                    {!!submitted && (
                      <div>
                        {isVerified ? (
                          <div className='text-green-300'>You Qualify!</div>
                        ) : (
                          <div className='text-red-300'>
                            Discount code is not available!
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='mt-3 text-sm mb-5'>
                <div>
                  Found Us Through Leasehackr? Please write username here.
                </div>
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

export default ServicesPage
