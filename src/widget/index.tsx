import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import Widget from './widget-container'

const widgetElement = document.getElementById('aln-react-widget')
const baseSite: string = widgetElement
  ? widgetElement.getAttribute('data-basesite') || ''
  : ''

ReactDOM.render(
  <React.StrictMode>
    <Widget baseSite={baseSite} />
  </React.StrictMode>,
  widgetElement,
)
