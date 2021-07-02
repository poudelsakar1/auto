import React from 'react'
import PageHeader from '../../component/page-header'
import QuoteIcon from '../../asset/quote.png'
import DemoImg1 from '../../asset/demo-img1.png'
import DemoImg2 from '../../asset/demo-img2.png'
import DemoImg3 from '../../asset/demo-img3.png'
import DemoImg4 from '../../asset/demo-img4.png'
import './style.scss'

export interface IPerson {
  name: string
  title: string
  img: string
  content: string
}

const ReviewPage: React.FC = () => (
  <div>
    <PageHeader title='Testimonials' />
    <div className='max-w-screen-lg mx-auto flex flex-col pt-10 pb-0 sm:pb-10 text-gray-card-title'>
      <div className='flex flex-col sm:flex-row space-x-0 sm:space-x-8 mt-16'>
        <div className='flex-1 px-5 sm:px-0'>
          <div className='flex flex-col border shadow-item relative rounded-md bg-white relative items-center'>
            <div className='custom-quote-img'>
              <img
                style={{ width: 40 }}
                className='mx-auto'
                src={QuoteIcon}
                alt=''
              />
            </div>
            <div className='p-5 pt-16' style={{ color: '#60666A' }}>
              “Thank you Thomas and Auto Lease Ninjas. In the midst of Covid,
              you were able to give me and my family a little bit of freedom. It
              was the best leasing experience I’ve ever had. We didn’t have to
              deal with the dealer, finance or surprises. They delivered on an
              exquisite XC40 Inscription. We would not have been able to get
              this vehicle at an incredible price without you.” - <b>Hougant</b>
            </div>
          </div>
          <div className='flex flex-col border shadow-item relative rounded-md bg-white relative items-center mt-16'>
            <div className='custom-quote-img'>
              <img
                style={{ width: 40 }}
                className='mx-auto'
                src={QuoteIcon}
                alt=''
              />
            </div>
            <div className='p-5 pt-16' style={{ color: '#60666A' }}>
              “Thomas was easy to work with and extremely effective - he found
              us the exact car we needed at an excellent price point and went
              the extra mile to ensure that the deal went through without a
              hitch. In the age of COVID, having the deal completely worked out
              before we ever set foot in the dealership ended up being a huge
              advantage. We couldn’t be happier with our new SQ5, thanks
              AutoLeaseNinjas!” - <b>Taylor</b>
            </div>
          </div>
        </div>
        <div className='flex-1 px-5 sm:px-0 mt-16 sm:mt-0'>
          <div className='flex flex-col border shadow-item relative rounded-md bg-white relative items-center'>
            <div className='custom-quote-img'>
              <img
                style={{ width: 40 }}
                className='mx-auto'
                src={QuoteIcon}
                alt=''
              />
            </div>
            <div className='p-5 pt-16' style={{ color: '#60666A' }}>
              “I found @autoleaseninjas and reached out for a quote before going
              to test drive two different compact SUVs the next day. I decided
              on the CX-30 Premium and had a less than stellar experience with
              the dealer. Thomas had beaten their quote by $40 a month so opted
              to go with ALN. Thomas was professional, answering all of my
              questions as a first timer and hunting down the color combo I was
              looking for with super limited inventory. The car was delivered to
              me as promised and honestly I don’t know how I ever lived without
              one (even in NYC). I’ve already recommended ALN to friends and
              family and would absolutely utilize their services again. Thanks
              so much for a great experience!” - <b>Mel</b>
            </div>
          </div>
          <div className='flex flex-col border shadow-item relative rounded-md bg-white relative items-center mt-16'>
            <div className='custom-quote-img'>
              <img
                style={{ width: 40 }}
                className='mx-auto'
                src={QuoteIcon}
                alt=''
              />
            </div>
            <div className='p-5 pt-16' style={{ color: '#60666A' }}>
              “Thank you to ALN for the most painless leasing experience
              possible. As a young woman, I had anxiety about negotiating at the
              dealership and I am so thankful ALN was able to help me with this
              process and get the best deal on my new Mazda CX-5! amazing
              service!” - <b>Kiki</b>
            </div>
          </div>
        </div>
        <div className='flex-1 px-5 sm:px-0 mt-16 sm:mt-0'>
          <div className='flex flex-col border shadow-item relative rounded-md bg-white relative items-center'>
            <div className='custom-quote-img'>
              <img
                style={{ width: 40 }}
                className='mx-auto'
                src={QuoteIcon}
                alt=''
              />
            </div>
            <div className='p-5 pt-16' style={{ color: '#60666A' }}>
              “Thomas was knowledgeable, patient and overall extremely easy to
              work with. He secured a great deal on the car we were looking for
              and we couldn’t be happier. The transaction from beginning to end
              was seamless which is much appreciated during these COVID times. I
              would highly recommend ALN. Big thank you to Thomas and the ALN
              team.” - <b>Susan</b>
            </div>
          </div>
          <div className='flex flex-col border shadow-item relative rounded-md bg-white relative items-center mt-16'>
            <div className='custom-quote-img'>
              <img
                style={{ width: 40 }}
                className='mx-auto'
                src={QuoteIcon}
                alt=''
              />
            </div>
            <div className='p-5 pt-16' style={{ color: '#60666A' }}>
              “Just bought my dream car and couldn’t have done it without help
              from Thomas. He was professional, helped me find the perfect car,
              and negotiated a great deal. I was very impressed with the ease of
              this experience from start to finish. Would highly recommend
              Thomas’ expertise in buying and selling cars.”{' '}
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-screen-md mx-auto mt-16'>
        <div className='font-extrabold text-xl w-full text-center mb-3'>
          We're on Social Media
        </div>
        <div
          style={{ color: '#00172A' }}
          className='text-gray-card-title font-bold text-xl sm:text-base w-full text-center mb-10'
        >
          @autoleaseninjas
        </div>
      </div>
      <div className='flex flex-col sm:flex-row max-w-screen-md mx-auto'>
        <div className='flex flex-row sm:flex-row max-w-screen-lg mx-auto w-full sm:w-1/2'>
          <div className='w-full sm:w-1/2'>
            <img src={DemoImg1} alt='' />
          </div>
          <div className='w-full sm:w-1/2'>
            <img src={DemoImg2} alt='' />
          </div>
        </div>
        <div className='flex flex-row sm:flex-row max-w-screen-lg mx-auto w-auto w-full sm:w-1/2'>
          <div className='w-full sm:w-1/2'>
            <img src={DemoImg3} alt='' />
          </div>
          <div className='w-full sm:w-1/2'>
            <img src={DemoImg4} alt='' />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ReviewPage
