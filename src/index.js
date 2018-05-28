import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { BrowserRouter, Route, Link } from 'react-router-dom'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { Row } from './Layout'

import { setEth, requestLocationResource } from './actions'

import store from './store'

const Site = ({ location }) => {
  requestLocationResource(location)
  return (
    <div className="site">
      <Row>
        <Header />
      </Row>
      <Row>
        <Content location={location}/>
      </Row>
      <Row>
        <Footer />
      </Row>
    </div>
  )
}

const TheIncrementalist = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Site}/>
      </BrowserRouter>
    </Provider>
  )
}

window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {

    // Use the browser's ethereum provider
    store.dispatch(setEth(web3.currentProvider))

  } else {
    console.log('No web3? You should consider trying MetaMask!')
  }

  ReactDOM.render(
    <TheIncrementalist />,
    document.getElementById('TheIncrementalist')
  )
})
