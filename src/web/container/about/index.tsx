import React from 'react'
import AboutPerson from '../../component/about-person'
import CustomerComment from '../../component/customer-comment'
import PageHeader from '../../component/page-header'
import Ninja from '../../asset/about/ninja.png'
import './style.scss'
export interface IComment {
  content: string
  author: string
}

export interface IPerson {
  name: string
  title: string
  img: string
  content: string
}

const persons: IPerson[] = [
  {
    name: 'Thomas Horey',
    img: Ninja,
    title: 'Co-Founder & Chief Executive Officer',
    content:
      'Thomas has always been a car enthusiast.  Much of his youth was spent admiring and identifying hundreds of cars while walking the streets of his native New York City.  Even before he had a driver’s license, Thomas became the go-to expert for friends and family in search of a great car deal. As his expertise in the auto industry and its products grew, he realized how antiquated and aggravating the leasing process can be for people without insider knowledge. In 2019, he founded Auto Lease Ninjas with the goal of using technology to make the auto leasing process as transparent and as stress free as possible while delivering unbeatable deals. Thomas began his career at General Motors and is a proud Lehigh University alum.  When he’s not behind the wheel, you can find him on the basketball court.',
  },
  {
    name: 'Chris Szafranski',
    img: Ninja,
    title: 'Co-Founder & Chief Technology Officer',
    content:
      'Chris teamed up with Thomas to disrupt the traditional leasing process through his expertise in software engineering and design. He led the development of ALN’s unique user experience and maintains its cutting-edge technology. A native of New Jersey, Chris now lives in California and holds two U.S. patents with international filings. Chris is a Lehigh University graduate and enjoys philosophy, nature, and cars.',
  },
  {
    name: 'Ryan Betts',
    img: Ninja,
    title: 'Director of Operations',
    content:
      'Ryan is responsible for analyzing customer feedback and data to generate the most efficient and effective way of giving our clients the information they need to find the deal that best suits their needs. Ryan grew up not far from his alma mater, Lehigh University, where he studied both engineering and business.',
  },
]

const AboutPage: React.FC = () => (
  <div id='about-page-container' data-qa-about-page-container>
    <PageHeader title='ABOUT AUTOLEASE NINJAS' />
    <div
      id='about-page-sub-container'
      data-qa-about-page-sub-container
      className='max-w-screen-lg mx-auto flex flex-col py-10 text-gray-card-title'
    >
      <div
        id='about-person-items'
        data-qa-about-person-items
        className='flex flex-col sm:flex-row space-x-0 sm:space-x-8'
      >
        {persons.map((person: IPerson, index: number) => (
          <div
            id='about-person-item'
            data-qa-about-person-item
            className='flex-1 px-5 sm:px-0'
            key={index}
          >
            <AboutPerson data={person} />
          </div>
        ))}
      </div>
      <div
        id='about-page-customer-comment'
        data-qa-about-page-customer-comment
        className='bg-gray-light py-12 text-center mt-5'
      >
        <CustomerComment
          content='I want ALN to be the fastest and most transparent way to get a New Car Lease'
          author='— CHRIS - CTO ALN'
        />
      </div>
      <div
        id='about-page-description'
        data-qa-about-page-description
        className='flex flex-col sm:flex-row pt-0 sm:pt-8'
      >
        <div
          id='about-page-background'
          data-qa-about-page-background
          className='w-full sm:w-1/3'
          style={{
            backgroundImage: `url('https://i.imgur.com/eXE46QI.png')`,
            height: 280,
            backgroundSize: 'cover',
          }}
        ></div>
        <div className='w-full sm:w-2/3 pl-4 sm:pl-8 pr-4 sm:pr-0 flex flex-col mt-8 sm:mt-0'>
          <p className='font-extrabold text-black uppercase text-xl'>
            Mission Statement
          </p>
          <p className='text-base sm:text-sm mt-3'>
            Auto Lease Ninjas’ mission is to transform the auto leasing process
            by leveraging our proprietary technology and strong dealer
            relationships to provide transparency, excellent customer service
            and unbeatable deals to our customers.
          </p>
          <p className='font-extrabold text-black uppercase text-xl mt-5'>
            About us
          </p>
          <p className='text-base sm:text-sm mt-3'>
            The Auto Lease Ninjas LLC was founded in 2019 to help customers
            lease vehicles. The ALN team handles the auto leasing process from
            start to finish. Customers can browse our selection of deals,
            calculate their payment and work with our ninjas to identify the
            perfect vehicle for them.
          </p>
          <p className='text-sm mt-2'>
            Once the customer finalizes their choice of vehicle, all the
            preliminary paperwork can be done from the comfort of your living
            room and in most cases, the car can be delivered straight to your
            door!
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default AboutPage
