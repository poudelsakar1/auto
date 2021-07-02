import React from 'react'

interface IProps {
  onClick?: any
  className?: string
  isBack?: boolean
}

const Arrow: React.FC<IProps> = ({ onClick, className, isBack }) => {
  const strokeColor: string = onClick === null ? '#BEBEBE' : '#3775df'

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${className} ${
        isBack ? 'transform rotate-180' : ''
      }`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='55.927'
        height='55.927'
        viewBox='0 0 55.927 55.927'
      >
        <g
          id='Icon_feather-arrow-right-circle'
          data-name='Icon feather-arrow-right-circle'
          transform='translate(1.5 1.5)'
        >
          <path
            id='Path_14'
            data-name='Path 14'
            d='M55.927,29.463A26.463,26.463,0,1,1,29.463,3,26.463,26.463,0,0,1,55.927,29.463Z'
            transform='translate(-3 -3)'
            fill='none'
            stroke={strokeColor}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='3'
          />
          <path
            id='Path_15'
            data-name='Path 15'
            d='M18,33.171,28.585,22.585,18,12'
            transform='translate(8.463 3.878)'
            fill='none'
            stroke={strokeColor}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='3'
          />
          <path
            id='Path_16'
            data-name='Path 16'
            d='M12,18H33.171'
            transform='translate(3.878 8.463)'
            fill='none'
            stroke={strokeColor}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='3'
          />
        </g>
      </svg>
    </div>
  )
}

export default Arrow
