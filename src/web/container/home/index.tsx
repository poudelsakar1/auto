import React, { useState, useEffect } from 'react'
import _isEmpty from 'lodash/isEmpty'
import queryString from 'query-string'
import TopDeals from '../../component/landing-page/top-deals'
import TopPannel from '../../component/landing-page/top-pannel'
import Works from '../../component/landing-page/works'
import OurDeals from '../../component/landing-page/our-deals'
import Testimorial from '../../component/testimorial'
import { defaultSearchParams } from '../../../widget/widget-container'
import { getFeatureItems } from '../../../utils/api'
import WidgetContainer from '../../container/widget/widget-container'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import { storeInfo, getMakeList } from '../../../utils/api'
import './style.scss'
import { Helmet } from 'react-helmet'

const Home = (props: any): JSX.Element => {
  const [featureItems, setFeatureItem] = useState([])
  const [searchParams, setSearchParams] = useState(defaultSearchParams)

  useEffect(() => {
    if (_isEmpty(featureItems) === true) {
      getMakeList({}).then(res => {
        let { result } = res.data
        getFeatureItems({ ...defaultSearchParams, carmake: result[0] }).then(
          (res: any) => setFeatureItem(res.data),
        )
      })
    }

    let payment_success: any
    let form_success: any

    payment_success = new URLSearchParams(props.history.location.search).get(
      'success',
    )
    form_success = new URLSearchParams(props.history.location.search).get(
      'formsuccess',
    )
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
    if (form_success === 'true') {
      store.addNotification({
        title: 'Success!',
        message: 'Submitted Successfully.',
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
    }
  }, [featureItems, props.history.location.search])

  const onUpdateSearchParams = (key: string, value: string) => {
    setSearchParams({
      ...searchParams,
      [key]: value,
    })
  }

  const onSearchClicked = () => {
    window.location.href = `${
      window.location.origin
    }/results?${queryString.stringify(searchParams)}`
  }

  return (
    <div id="home-page-container" data-qa-home-page-container className='w-full bg-gray-100 min-h-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content='Auto Lease Ninjas is the premier, car leasing site, delivering expert, efficient and concierge-level service to help you find the right car under dealer price.'
        />
      </Helmet>
      <ReactNotification />
      <TopPannel />
      <div id="home-top-deals-container" data-qa-home-top-deals className='w-full mx-auto bg-blue-main-text background-height mb-150px'>
        <div id="home-top-deals-sub-container" data-qa-home-top-deals-sub-container className='max-w-screen-lg mx-auto py-12'>
          <WidgetContainer
            baseSite={window.location.origin}
            onUpdatedGlobalSearch={onUpdateSearchParams}
          />
          <TopDeals items={featureItems} />
        </div>
      </div>
      <div id="home-top-deals-works-container" data-qa-home-top-deals-works-container className='mb-10'>
        <Works />
      </div>
      <Testimorial />
      <OurDeals onStartSearch={() => onSearchClicked()} />
      <div id="home-page-margin-bottom" data-qa-home-page-margin-bottom className='mb-10'></div>
    </div>
  )
}

export default Home
