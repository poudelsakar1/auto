import React, { useState } from 'react'
import cn from 'classnames'
import NextIcon from '../../asset/icons/ico-slider-next.svg'
import PrevIcon from '../../asset/icons/ico-slider-prev.svg'

export type TImageSliderProps = {
  images: Array<string>
  imgdesc?: string
}

const styles = {
  leftSlider: {
    top: `calc(50% - 30px)`,
  },
}

const ImageSlider: React.FC<TImageSliderProps> = ({ images = [], imgdesc }) => {
  const [showNumber, setShowNumber] = useState(0)
  const changeImage = (type: 'next' | 'prev') => {
    type === 'next' && setShowNumber(showNumber + 1)
    type === 'prev' && setShowNumber(showNumber - 1)
  }
  return (
    <div id='imgslider-container' data-qa-imgslider-container>
      <div id='imgslider-images' data-qa-imgslider-images className='relative'>
        {images.length > 0 && (
          <img
            alt={`icon${images[showNumber]}`}
            src={images[showNumber]}
            className='w-806px'
          />
        )}
        {images.length > 1 && (
          <div
            id='imgslider-nexticon-container'
            data-qa-imgslider-nexticon-container
            className='absolute right-0'
            style={styles.leftSlider}
          >
            <img
              alt='nexticon'
              onClick={() => {
                showNumber !== images.length - 1 && changeImage('next')
              }}
              className={cn(
                `cursor-pointer`,
                showNumber === images.length - 1 && 'opacity-50',
              )}
              src={NextIcon}
            />
          </div>
        )}
        {images.length > 1 && (
          <div
            id='imgslider-previcon-container'
            data-qa-imgslider-previcon-container
            className='absolute left-0'
            style={styles.leftSlider}
          >
            <img
              alt='previcon'
              onClick={() => {
                showNumber !== 0 && changeImage('prev')
              }}
              className={cn(`cursor-pointer`, showNumber === 0 && 'opacity-50')}
              src={PrevIcon}
            />
          </div>
        )}
      </div>
      <div id='imgslider-imgdesc-container' data-qa-imgslider-imgdesc-container>
        {!!imgdesc && (
          <div
            id='imgslider-imgdesc'
            data-qa-imgslider-imgdesc
            className='bg-gray-light text-gray-very-light text-base py-29px px-11'
          >
            {imgdesc}
          </div>
        )}

        {images.length > 1 && (
          <div
            id='imgslider-images-list-container'
            data-qa-imgslider-images-list-container
            className='flex justify-center mt-26px'
          >
            <div
              id='imgslider-images-list'
              data-qa-imgslider-images-list
              className='flex'
            >
              {images.map((item, index) => {
                if (index === images.length - 1)
                  return (
                    <div
                      id='imgslider-image-item'
                      data-qa-imgslider-image-item
                      className={cn(
                        `w-11px h-11px rounded-full`,
                        index === showNumber
                          ? 'bg-blue-main-text'
                          : 'bg-gray-light ',
                      )}
                    ></div>
                  )
                return (
                  <div
                    id='imgslider-image-item'
                    data-qa-imgslider-image-item
                    className={cn(
                      `w-11px h-11px mr-11px rounded-full`,
                      index === showNumber
                        ? 'bg-blue-main-text'
                        : 'bg-gray-light ',
                    )}
                  ></div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageSlider
