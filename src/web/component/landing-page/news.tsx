import React from 'react'
import _map from 'lodash/map'
import _chunk from 'lodash/chunk'
import NewsCard from './news-card'

interface IProps {
  newsData: any
}

const News: React.FC<IProps> = ({ newsData }) => {
  const arrNews = processNews(newsData)

  return (
    <div id="news-container" data-qa-news-container className='max-w-screen-lg mx-auto text-center mt-12'>
      <h5 className='font-bold text-blue-main-text text-4xl'>FEATURED NEWS</h5>
      <p className='text-gray-very-light'>
        Picking out the right car and negotiating a great lease deal
      </p>
      <div id="news-card-list" data-qa-news-card-list className='flex flex-wrap text-center mt-10 text-gray-very-light'>
        {_map(arrNews, (col: any, index: number) => (
          <div id="news-card-item" data-qa-news-card-item key={index} className='flex-1 mx-2 text-center mt-4'>
            {_map(col, (news: any, index: number) => (
              <NewsCard
                key={index}
                title={news.title}
                publishDate={news.publishDate}
                image={news.image}
                shortDescription={news.shortDescription}
                link={news.link}
              />
            ))}
          </div>
        ))}
      </div>
      <button className='text-sm font-semibold text-blue-main-text my-16 underline'>
        See all news
      </button>
    </div>
  )
}

const processNews = (data: any) => {
  let chunkNumber = Math.floor(data.length / 3)

  return _chunk(data, chunkNumber)
}

export default News
