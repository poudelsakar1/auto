import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './container/home'
import ResultsPage from './container/results'
import DetailsPage from './container/details'
import './App.css'
import AppBar from './container/app-bar'
import FooterCTA from './container/footer-cta'
import HowItWorksPage from './container/how-it-works'
import FAQPage from './container/faq'
import AboutPage from './container/about'
import ContactUsPage from './container/contact'
import WebToLeadPage from './container/webtolead'
import BlogPage from './container/blog'
import ServicesPage from './container/services'
import ProductsPage from './container/products'
import ALNBusinessFeePage from './container/alnbusinessfee'

import 'reactjs-popup/dist/index.css'
import ReviewPage from './container/review'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AppBar />
        <React.Suspense fallback={<div />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path={`/results`} component={ResultsPage} />
            <Route path={`/details`} component={DetailsPage} />
            <Route path='/how-it-works' component={HowItWorksPage} />
            <Route path='/faq' component={FAQPage} />
            <Route path='/services' component={ServicesPage} />
            <Route path='/leasehackr/products' component={ProductsPage} />
            <Route
              path='/alnbusinessfee/products'
              component={ALNBusinessFeePage}
            />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactUsPage} />
            <Route path='/webtolead' component={WebToLeadPage} />
            <Route path='/blog/:id' component={BlogPage} />
            <Route path='/review' component={ReviewPage} />
          </Switch>
        </React.Suspense>
        <FooterCTA />
      </Router>
    </>
  )
}

export default App
