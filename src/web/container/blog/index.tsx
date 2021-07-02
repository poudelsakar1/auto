import React, { useState, useEffect } from 'react'
import _isEmpty from 'lodash/isEmpty'
import SearchInput from '../../component/search-input'
import Categories from '../../component/categories'
import ImageSlider from '../../component/imgslider'
import Profile from '../../component/profile'

import { getFeatureItems, getMakeList } from '../../../utils/api'
import { defaultSearchParams } from '../../../widget/widget-container'

import { ICarResult } from '../../../utils/api-types'

import BusinessMan from '../../asset/images/img-business_man.png'
import CarRunning from '../../asset/images/img-car-running.png'
import EmailShareIcon from '../../asset/icons/ico-share-email.svg'
import FacebookShareIcon from '../../asset/icons/ico-share-facebook.svg'
import LinkedinShareIcon from '../../asset/icons/ico-share-linkedin.svg'
import TwitterShareIcon from '../../asset/icons/ico-share-twitter.svg'
import ProfileAvatar from '../../asset/images/img-profile-avatar.png'
import FeedbackForm from '../../component/feedback'
import ResultItem from '../../component/result-item'

const data = [
  'All',
  'Guides',
  'Brands',
  'News',
  'Spotlight'
]

const blog = {
  title: 'Everything Wrong With Car Leasing',
  date: 'June 22, 2021 by Chris Szafranski',
  contents: [
    {
      title: 'The Perfect Lease Deal',
      content:
        'Like everything else worth having in life, cars are in limited supply and the good ones are a point of envy. With conventions shifting away from car ownership, more people are considering car leasing. The perfect car at the perfect price exists, but not at the dealership you might be in contact with. Searching advertising sites will show you a single lease deal, or even get you to the dealership door, but that is when the work starts. Is this the best lease deal? What is the best lease configuration for me? What can I afford? Why does buying or leasing a car feel like an uphill battle? Obscured with mathematical, industry specific or other confusing terms? The Auto Lease Ninjas set out to solve and simplify this, by not advertising you a car, but the cheapest car lease deal in your region.',
      img: [BusinessMan],
    },
    {
      title: 'Why can’t dealerships get it right?',
      content:
        "It’s true, dealerships can be a stressful place. Buying or leasing a car is an important life decision, which usually involves a binding lease agreement that can elevate anyone's heart rate. You might be one of the lucky few with a family friend you know working at a dealership that can get you a car deal, better still if they have the car you want. Yet, more often the lease deal offered at one dealership is conditional and you may not qualify for. Unlike an appliance or tool which might have a sale from month to month, car prices can change every week due to depreciation and daily inventory changes. This introduces outdated advertising and many misunderstandings. With the Auto Lease Ninjas auto lease calculator you can build your own lease deal that our trusted dealership partners will honor. We are that family friend who can help with everything from lease swaps to finding the best suv deals so that you can focus on what's important to you.",
      img: [CarRunning, BusinessMan],
      imgdesc:
        'We have built out our own custom lease calculator to best serve clients like you! We can search and maintain thousands of cars and real time pricing across many dealerships so you don’t have to! Far beyond spreadsheets Auto Lease Ninjas uses the latest technologies to serve you the best leasing service on the market.',
    },
    {
      title: 'What do ninjas have to do with car leasing?',
      content:
        'Ninjas are regarded as disciplined defenders of territory. These spirited, experts of agility is the mentality we bring to defending the integrity and fun of car leasing and ownership. We are inspired to change the existing car leasing agreement process and share our patented car lease calculator with everyone, so everyone can be a leasing ninja. Together with the Auto Lease Ninjas you can write and understand your own lease agreements, lifting the veil of obscurity and bringing back the fun of driving the best of new car technology. ',
      img: [],
    },
  ],
}

const BlogPage: React.FC = () => {
  const [featureItems, setFeatureItem] = useState<Array<ICarResult>>([])

  useEffect(() => {
    if (_isEmpty(featureItems) === true) {
      getMakeList({}).then(res => {
        let { result } = res.data
        getFeatureItems({ ...defaultSearchParams, carmake: result[0] }).then(
          (res: any) => setFeatureItem(res.data),
        )
      })
    }
  }, [featureItems])

  return (
    <div id="blog-page-container" data-qa-blog-page-container className='blog-page sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto'>
      <div id="blog-page-search-container" data-qa-blog-page-search-container className='mt-26px mx-18px sm:mx-0'>
        <SearchInput
          changeHandler={value => {}}
          classes='w-546px h-50px placeholder-gray-very-dark pl-19px'
          placeholder='What Are You Looking For?'
        />
      </div>
      <div id="blog-page-categories-container" data-qa-blog-page-categories-container className='mx-18px sm:mx-0'>
        <Categories data={data} label='Categories' selected={['Popular']} />
      </div>

      <div className='flex flex-col lg:flex-row mt-50px'>
        <div className='max-w-806px'>
          <p className='mx-18px lg:mx-0 text-30px text-gray-very-dark font-bold'>
            {blog.title}
          </p>
          <p className='mx-18px lg:mx-0 text-gray-very-light font-sm italic mt-3'>
            {blog.date}
          </p>
          {blog.contents.map(item => (
            <div id="blog-page-content-info" data-qa-blog-page-content-info className='mt-37px'>
              <p className='mx-18px lg:mx-0 text-xl text-gray-very-dark font-bold'>
                {item.title}
              </p>
              <p className='mx-18px lg:mx-0 text-gray-very-light mt-30px'>
                {item.content}
              </p>
              <div id="blog-page-imgslider-container" data-qa-blog-page-imgslider-container className='mt-4'>
                {!!item.imgdesc ? (
                  <ImageSlider images={item.img} imgdesc={item.imgdesc} />
                ) : (
                  <ImageSlider images={item.img} />
                )}
              </div>
            </div>
          ))}
          <div id="blog-page-share-icons-container" data-qa-blog-page-share-icons-container className='mx-18px lg:mx-0 flex mt-33px border-b border-gray-300 pb-5 lg:pb-43px'>
            <img
              className='mr-11px'
              src={EmailShareIcon}
              alt='Email share Icon'
            />
            <img
              className='mr-11px'
              src={FacebookShareIcon}
              alt='Facebook share Icon'
            />
            <div id="blog-page-linkedinshareicon" data-qa-blog-page-linkedinshareicon className='mr-11px h-10 w-10 bg-blue-main-text rounded-full flex justify-center items-center'>
              <img
                className=''
                src={LinkedinShareIcon}
                alt='Linkedin share Icon'
              />
            </div>
            <img src={TwitterShareIcon} alt='Twitter share Icon' />
          </div>

          <div id="blog-page-profile-container" data-qa-blog-page-profile-container className='mt-47px'>
            <Profile
              image={ProfileAvatar}
              name='James Pattinson'
              desc='James Patt’nson is a content writer in the car space based in Vancouver, Canada. James is is a serial entrepreneur, blogger, podcaster and digital nomad.'
            />
          </div>
          <div id="blog-page-feedbackform-container" data-qa-blog-page-feedbackform-container className='mt-57px mb-20'>
            <FeedbackForm postHandler={param => {}} />
          </div>
        </div>

        <div className='mx-18px'>
          <p className='text-gray-very-dark font-bold text-xl pb-25px border-b border-gray-300 border-opacity-20'>
            See this month top deals
          </p>
          <div className='lg:ml-33px' id="blog-page-result-items" data-qa-blog-page-result-items>
            {featureItems.map((item, index) => (
              <div id="blogpage-result-item-container" data-qa-blogpage-result-item-container className='mx-auto mt-92px'>
                <ResultItem
                  showYear={false}
                  index={index}
                  item={item}
                  key={index}
                  searchParams={{
                    ...defaultSearchParams,
                    carmake: item.meta.carmake,
                    carmodel: item.meta.carmodel,
                  }}
                  isLandingItem={true}
                />
              </div>
            ))}
            <div id="blog-page-footer-container" data-qa-blog-page-footer-container className='mt-41px'>
              <div id="blog-page-footer-sub-container" data-qa-blog-page-footer-sub-container>
                <span className='text-xl text-gray-very-dark font-bold'>
                  We on social{' '}
                </span>
                <a href='/' className='text-xl font-bold text-blue-main-text'>
                  #autoleaseninjas
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
