import React from 'react'
import { connect } from 'react-redux'

import { Route } from 'react-router-dom'

let Content = ({ routes }) => {
  const content = routes.map(route => {
    return <Route {...route} key={Math.random()}/>
  })
  return content
}

function mapProps(state) {
  return {
    routes: state.routes
  }
}

Content = connect(mapProps)(Content)

export default Content
