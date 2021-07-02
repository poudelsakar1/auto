import React from 'react'
import Slider, { Settings } from 'react-slick'
import './style.scss'
import CustomerCard from './customer-card'
import Img1 from '../../asset/customer-1.png'
import Arrow from './arrow'

const sliderSetting: Settings = {
  // dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: '10px',
  // centerMode: true,
  variableWidth: true,
  nextArrow: <Arrow />,
  prevArrow: <Arrow isBack />,
}

const customerCardData: string[] = [
  `“Thank you Thomas and Auto Lease Ninjas. In the midst of Covid, you were able to give me and my family a little bit of freedom. It was the best leasing experience I've ever had. We didn't have to deal with the dealer, finance or surprises. They delivered on an exquisite XC40 Inscription. We would not have been able to get this vehicle at an incredible price without you." - Hougant`,
  `“Thomas was easy to work with and extremely effective - he found us the exact car we needed at an excellent price point and went the extra mile to ensure that the deal went through without a hitch. In the age of COVID, having the deal completely worked out before we ever set foot in the dealership ended up being a huge advantage. We couldn’t be happier with our new SQ5, thanks AutoLeaseNinjas!” - Taylor`,
  `“Thomas was knowledgeable, patient and overall extremely easy to work with. He secured a great deal on the car we were looking for and we couldn't be happier. The transaction from beginning to end was seamless which is much appreciated during these COVID times. I would highly recommend ALN. Big thank you to Thomas and the ALN team.” - Susan`,
  `“Just bought my dream car and couldn’t have done it without help from Thomas.  He was professional, helped me find the perfect car, and negotiated a great deal.  I was very impressed with the ease of this experience from start to finish. Would highly recommend Thomas’ expertise in buying and selling cars.” `,
  `“I found @autoleaseninjas and reached out for a quote before going to test drive two different compact SUVs the next day. I decided on the CX-30 Premium and had a less than stellar experience with the dealer. Thomas had beaten their quote by $40 a month so opted to go with ALN. Thomas was professional, answering all of my questions as a first timer and hunting down the color combo I was looking for with super limited inventory. The car was delivered to me as promised and honestly I don’t know how I ever lived without one (even in NYC). I’ve already recommended ALN to friends and family and would absolutely utilize their services again. Thanks so much for a great experience!” - Mel`,
  `“Thank you to ALN for the most painless leasing experience possible. As a young woman, I had anxiety about negotiating at the dealership and I am so thankful ALN was able to help me with this process and get the best deal on my new Mazda CX-5! amazing service!” - Kiki`,
]

const Testimorial: React.FC = () => {
  return (
    <div
      id='testimorial-container'
      data-qa-testimorial-container
      className='w-full custom-height bg-gray-light overflow-x-hidden'
    >
      <div
        id='testimorial-sub-container'
        data-qa-testimorial-sub-container
        className='max-w-screen-lg mx-auto py-16 custom-display pl-8 pr-12'
      >
        <div
          id='testimorial-sub-con'
          data-qa-testimorial-sub-con
          className='custom-margin-right'
        >
          <p className='font-bold text-blue-main-text custom-font-size text-4xl  custom1-max-width'>
            OUR CUSTOMERS LOVE WHAT WE DO
          </p>

          <div
            className='custom1-max-width mt-5'
            id='testimorial-view-all-reviews-container'
            data-qa-testimorial-view-all-reviews-container
          >
            <a
              id='testimorial-view-all-reviews'
              data-qa-testimorial-view-all-reviews
              href='/blog'
              className='bg-blue-main-text hover:bg-blue-dard text-white font-light py-2 px-5 mt-5 rounded w-100px cursor-pointer'
            >
              View all reviews
            </a>
          </div>
        </div>
        <div
          className='w-full'
          id='testimorial-card-slider'
          data-qa-testimorial-card-slider
        >
          <Slider {...sliderSetting}>
            {customerCardData.map((content: string, index: number) => (
              <div
                id='testimorial-customercard-item'
                data-qa-testimorial-customercard-item
                className='mr-10'
                key={index}
              >
                <CustomerCard img={Img1} text={content} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Testimorial
