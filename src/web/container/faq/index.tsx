import React, { useState } from 'react'
import FAQItem from '../../component/faq-item'
import PageHeader from '../../component/page-header'
import IconPhone from '../../asset/icon-phone.svg'
import { Link } from 'react-router-dom'
import ServiceImage2 from '../../asset/service-img-2.png'
import './style.scss'
import RetainerModal from '../../component/modal/payretainerModal'
import RetainerModal1 from '../../component/modal/payretainerModal'
import { BASE_URL } from '../../../utils/api'
import { loadStripe } from '@stripe/stripe-js'

export interface IFAQItem {
  question: string
  answer: string
}

export interface ServiceItem {
  image: string
  text: string
  price: number
}

const FAQs: IFAQItem[] = [
  {
    question:
      'Why can’t I see prices on some vehicles for the first couple days of the month?',
    answer:
      'In the beginning of each month, our system updates it’s leasing programs and we work with our partner dealers to ensure our pricing is accurate and aggressive.',
  },
  {
    question: 'Can my car be delivered?',
    answer:
      'Yes, you can absolutely have your car delivered. If you happen to live outside the region or a very long distance away from our partner dealership, we would likely arrange a pick-up instead. Please browse our deals and submit an inquiry to discuss options!',
  },
  {
    question: 'Does my calculated payment include all taxes and fees?',
    answer:
      'Yes! Your quoted payment will always include all taxes, fees, as well as the first month payment. Your quoted payment will always be exactly what appears on the contract and we can, upon request, provide a copy of the contract prior to delivery or pickup.',
  },
  {
    question: 'How do we get such aggressive pricing?',
    answer:
      'We aim to make the auto leasing process as efficient as possible. We do most of the legwork for the dealership and reduce their customer acquisition cost. Because of this, we are able to negotiate rock bottom pricing and pass the savings along to our clients!',
  },
  {
    question: 'What are multiple security deposits?',
    answer:
      'Multiple Security Deposits (MSDs) function as a deposit paid in advance to protect the lessor against damage or nonpayment. MSDs can significantly lower your monthly payments by lowering your interest rate associated with your lease. Not all brands offer MSD programs so please discuss with your Auto Leasing Ninja if you’d like to take advantage of them!',
  },
  {
    question: 'Can you handle my lease return?',
    answer:
      'Yes! We can find a partner dealership in our network to process the return of your current lease. In most cases you can hand us the keys to your old lease upon pick up or delivery of your new lease.',
  },
  {
    question: 'What is a retainer and why should I pay a fee?',
    answer: `The majority of our competitors often get paid large, variable commissions by the dealership, creating a disincentive to provide the customer with the very best deal. We have made the decision to charge our clients a flat fee instead so that you know exactly how we get paid. Please see our fee structure for each brand here.

    Our fee is charged in two parts. Once you find a car that you like and decide to move forward with your lease or purchase after talking with an Auto Leasing Ninja, we ask our clients to pay a retainer. A retainer allows us to reserve the car for you and then the remainder of our fee is due the day of delivery.
    `,
  },
]

const FAQPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [showLeaseModal, setShowLeaseModal] = useState(false)

  // Form Values
  const [type, setType] = useState('')
  const [typeError, setTypeError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [quantityError, setQuantityError] = useState('')
  //Second From Values
  const [package1, setPackage1] = useState('')
  const [package1Error, setPackage1Error] = useState('')
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

  let stripePromise: any
  if (process.env.STRIPE_KEY) stripePromise = loadStripe(process.env.STRIPE_KEY)

  const sendpayment = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise

    //Call your backend to create the Checkout session
    const response = await fetch(`${BASE_URL}/create-checkout-session`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    const session = await response.json()

    //When the customer clicks the button, redirect them to Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  const isEmpty = (param: string) => {
    if (param) return false
    else return true
  }

  const submitForm1 = () => {
    if (!isEmpty(type) && quantity > 0) {
      setShowModal(false)
      setShowLeaseModal(true)
    } else {
      if (isEmpty(type)) setTypeError('Type cannot be empty')
      if (quantity < 0 || quantity === 0)
        setQuantityError('Quantity should be over zero')
    }
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
      !isEmpty(leasehackr) &&
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
      setLeasehackr('')
      setMethod('')
    } else {
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
      if (isEmpty(zip)) setZipError('Zip Code cannot be empty')
      else {
        if (!ValidateZip(zip)) setZipError('Zip code is invalid')
        else setZipError('')
      }
      if (isEmpty(leasehackr)) setLeasehackrError('This field cannot be empty')
      else setLeasehackrError('')
    }
  }

  return (
    <div id="faq-page-container">
      <PageHeader title='FAQ'>
        <p className='max-w-screen-lg mx-auto px-12 sm:px-0 text-center text-white font-light sm:font-normal'>
          Got a question? We’re here to answer! If you don’t see your question
          here,
          <br />
          Drop us a line on our Contact Page.
        </p>
      </PageHeader>
      <div id="faq-page-sub-container" data-qa-fq-page-sub-container className='max-w-screen-lg mx-auto flex flex-col py-10 text-gray-card-title'>
        <div id="faq-page-faqs-list-container" data-qa-faq-page-faqs-list-container className='w-full text-center mt-5'>
          <div id="faq-page-faqs-list" data-qa-faq-page-faqs-list className='m-full px-6 mx-auto'>
            {FAQs.map((faq: IFAQItem, index: number) => (
              <FAQItem item={faq} key={index} />
            ))}
          </div>
          <div id="faq-page-contact-link" data-qa-faq-page-contact-link className='py-8 sm:py-16 px-5 sm:px-0'>
            <a
              href='/contact'
              className='py-4 rounded-md custom-width-inquire px-10 border-2 border-blue-main-text text-blue-main-text text-sm focus:outline-none cursor-pointer'
            >
              Inquire Today!
            </a>
          </div>
          <div id="faq-page-contact-container" data-qa-faq-page-contact-container className='bg-gray-light py-16'>
            <div id="faq-page-icon-phone" data-qa-faq-page-icon-phone className='mb-8'>
              <img className='mx-auto' src={IconPhone} alt='' />
            </div>
            <p className='font-extrabold px-8 sm:px-0 text-blue-main-text text-lg sm:text-base uppercase w-full sm:w-1/2 mx-auto mb-3'>
              HOW DO I CONTACT A LEASE NINJAS (CONSULTANT)?
            </p>
            <div id="faq-page-contact-info-container" data-qa-faq-page-contact-info-container className='font-semibold pt-4 sm:pt-0 px-10 sm:px-0 w-full sm:w-1/2 mx-auto text-base sm:text-sm'>
              You can contact us by filling out our{' '}
              <span className='text-blue-main-text cursor-pointer'>
                <Link to='/contact'>Free Inquiry Form</Link>
              </span>{' '}
              or emailing{' '}
              <span className='text-blue-main-text'>
                <a href='mailto:inquiries@autoleaseninjas.com'>
                  inquiries@autoleaseninjas.com
                </a>
              </span>{' '}
              today!
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
          <div id="faq-page-pay-detail-retainer-modal" data-qa-faq-page-pay-detail-retainer-modal>
            <h1 className='text-xl sm:text-3xl'>Pay Deal Retainer (Fee)</h1>
            <div className='flex flex-col sm:flex-row justify-between'>
              <div style={{ color: '#6B7280' }}>
                <p className='mt-3 text-gray-700'>FROM $99.99</p>
                <div id="faq-page-type-container" data-qa-faq-page-type-container className='text-gray-700 mt-5'>
                  TYPE:
                  <select
                    value={type}
                    onChange={e => {
                      setType(e.target.value)
                    }}
                    placeholder='Select Type'
                    className='form-select mt-1 block w-full h-10'
                  >
                    <option value=''>Select Type</option>
                    <option value='retainer'>Retainer</option>
                  </select>
                  <span className='text-red-500'>{typeError}</span>
                </div>
                <div id="faq-page-quantity-container" data-qa-faq-page-quantity-container className='text-gray-700 mt-5'>
                  <span className='text-gray-700'>QUANTITY</span>
                  <input
                    value={quantity}
                    onChange={e => {
                      setQuantity(parseInt(e.target.value))
                    }}
                    className='form-input mt-1 block w-full'
                    type='number'
                  />
                  <span className='text-red-500'>{quantityError}</span>
                </div>
              </div>
              <div className='mt-2' id="faq-page-image2-container" data-qa-faq-page-image2-container>
                <img
                  className='transition duration-150 transform hover:scale-105'
                  src={ServiceImage2}
                  alt='Serivce Image 2'
                />
              </div>
            </div>
            <p className='text-gray-700 mt-5 mb-5'>
              Please ReadDeals are first come first serve while supplies last!
              This retainer allows us to confirm the offer communicated to you
              and lock in the deal with our partner ...
            </p>
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
          <div id="faq-page-lease-quotes" data-faq-page-lease-quotes>
            <h1 className='text-xl'>Lease Quotes</h1>
            <div id="faq-page-make-model-trim-container" data-qa-faq-page-make-model-trim-container className='mt-3'>
              <p className='text-sm'>
                Vehicle to be Retained <span className='text-red-600'>*</span>
              </p>
              <span className='text-gray-600 text-sm'>
                Type the [make+model+trim] of your desired vehicle
              </span>
              <input
                onChange={e => {
                  setPackage1(e.target.value)
                }}
                placeholder='Make Model Trim Package'
                className='form-input mt-1 block w-full h-9'
                type='text'
              />
              <span className='text-red-500 text-sm'>{package1Error}</span>
            </div>
            <div id="faq-page-anything-field" data-qa-faq-page-anything-field className='mt-3'>
              <span className='text-sm'>
                Anything Else You Want Us To Know?
              </span>
              <textarea
                className='form-textarea mt-1 block w-full'
                rows={4}
              ></textarea>
            </div>
            <div id="faq-page-contact-info-container" data-qa-faq-page-contact-info-container className='mt-4'>
              <p className='text-sm'>Contact Info</p>
              <span className='text-gray-600 text-xs'>
                Please enter your contact info so we can send you your lease
                quotes!
              </span>
              <div
                id="faq-page-border-bottom"
                data-qa-faq-page-border-bottom
                className='mt-1'
                style={{ borderBottom: '1px solid #aaaaaa' }}
              ></div>
            </div>

            <div className='mt-3 text-sm' id="faq-page-lease-quotes-upper-form" data-qa-faq-page-lease-quotes-upper-form>
              <p className='text-sm'>
                Name <span className='text-red-600'>*</span>
              </p>
              <div className='flex' id="faq-page-lease-quotes-name" data-qa-faq-page-lease-quotes-name>
                <div id="faq-page-lease-quotes-firstname" data-qa-faq-page-lease-quites-firstname className='w-full'>
                  <input
                    onChange={e => {
                      setFirstname(e.target.value)
                    }}
                    placeholder='First Name'
                    className='form-input mt-1 block w-full h-9'
                    type='text'
                  />
                  <span className='text-red-500'>{firstnameError}</span>
                </div>
                <div id="faq-page-lease-quotes-lastname" data-qa-faq-page-lease-quotes-lastname className='w-full'>
                  <input
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

            <div id="faq-page-lease-quotes-email-field" className='mt-3 text-sm'>
              <p className='text-sm'>
                Email <span className='text-red-600'>*</span>
              </p>
              <input
                onChange={e => {
                  setEmail(e.target.value)
                }}
                placeholder='Please type your email'
                className='form-input mt-1 block w-full h-9'
                type='text'
              />
              <span className='text-red-500'>{emailError}</span>
            </div>

            <div id="faq-page-lease-quotes-phone-field" data-qa-faq-page-lease-quotes-phone-field className='mt-3 text-sm'>
              <p>
                Phone <span className='text-red-600'>*</span>
              </p>
              <input
                onChange={e => {
                  setPhone(e.target.value)
                }}
                placeholder='(123) 456-7890'
                className='form-input mt-1 block w-full h-9'
                type='text'
              />
              <span className='text-red-500'>{phoneError}</span>
            </div>

            <div id="faq-page-lease-quotes-preferred-method" data-qa-faq-page-lease-quotes-preferred-method className='mt-3 text-sm'>
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
                <option>Email</option>
                <option>Phone</option>
              </select>
              <span className='text-red-500'>{methodError}</span>
            </div>

            <div id="faq-page-lease-quotes-zipcode-field" data-qa-faq-page-lease-quotes-zipcode-field className='mt-3 text-sm'>
              <p>
                Zip Code <span className='text-red-600'>*</span>
              </p>
              <input
                onChange={e => {
                  setZip(e.target.value)
                }}
                placeholder='30033'
                className='form-input mt-1 block w-full h-9'
                type='text'
              />
              <span className='text-red-500'>{zipError}</span>
            </div>

            <div id="faq-page-lease-quotes-leasehackr-field" data-qa-faq-page-lease-quotes-leasehackr-field className='mt-3 text-sm mb-5'>
              <p>
                Found Us Through Leasehackr? Please write username here.
                <span className='text-red-600'>*</span>
              </p>
              <p className='text-gray-600 text-xs'>
                If you did not find us through leasehackr, please write n/a.
              </p>
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
    </div>
  )
}

export default FAQPage
