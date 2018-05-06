import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import css from './index.css'

let Navigation = ({ routes, dispatch }) => {
  // TODO clean this up, there is a lot of unclear logic in this return
  // for each route, if nav is true, render a link
  return (
    <ul>
      {routes.map((route) => {
        return route.nav ? (
          <li key={Math.random()}>
            <Link
              to={route.path}
              onClick={() => {dispatch(route.action)}}
              >{route.anchor}</Link>
          </li>
        ) : ''
      })}
    </ul>
  )
}

function mapState(state) {
  return {
    routes: state.routes
  }
}

function mapDispatch(dispatch) {
  return { dispatch: dispatch }
}

Navigation = connect(mapState, mapDispatch)(Navigation)

export default Navigation
