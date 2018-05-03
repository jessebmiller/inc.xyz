import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { BrowserRouter, Route, Link } from 'react-router-dom'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { Row } from './Layout'
import Authors from './Authors'
import Articles from './Articles'

const initialState = {
  title: "The Incrementalist",
  landing: true, // Has the user just landed?
  articles: [1,2,3,4,5],
  routes: [
    {
      anchor: "Authors",
      path: "/authors",
      component: Authors,
      nav: true
    },
    {
      anchor: "Articles",
      path: "/articles",
      component: Articles,
      nav: true
    }
  ]
}

function rootReducer(state = initialState, action) {
  return state
}

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

const Incrementalist = () => {
  return (
    <Provider store={createStore(rootReducer)}>
      <BrowserRouter>
        <Route path="/" component={Site}/>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<Incrementalist />, document.getElementById('Incrementalist'))
