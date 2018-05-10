import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { BrowserRouter, Route, Link } from 'react-router-dom'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { Row } from './Layout'

import rootReducer from './reducers'
import { dispatchLocationResourceAction } from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const Site = ({ location }) => {
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

ReactDOM.render(
  <TheIncrementalist />,
  document.getElementById('TheIncrementalist')
)

dispatchLocationResourceAction(store.dispatch)
