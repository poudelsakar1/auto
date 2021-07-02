import React from 'react'
import { Helmet } from 'react-helmet'

const Widget: React.FC = () => {
  return (
    <>
      <div id='aln-react-widget' data-qa-aln-react-widget data-basesite={window.location.origin}></div>
      <Helmet>
        <script
          type='text/javascript'
          src='https://d1ofzickm9beb6.cloudfront.net/aln-react-widget.js'
        />
      </Helmet>
    </>
  )
}

export default Widget
