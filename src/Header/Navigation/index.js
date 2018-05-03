import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import css from './index.css'

let Navigation = ({ routes }) => {
  // TODO clean this up, there is a lot of unclear logic in this return
  // for each route, if nav is true, render a link
  return (
    <ul>
      {routes.map((route) => {
        return route.nav ? (
          <li key={Math.random()}>
            <Link to={route.path}>{route.anchor}</Link>
          </li>
        ) : ''
      })}
    </ul>
  )
}

function mapProps(state) {
  return {
    routes: state.routes
  }
}

Navigation = connect(mapProps)(Navigation)

export default Navigation
