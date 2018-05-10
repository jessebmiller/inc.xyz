import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import css from './index.css'

let Navigation = ({ resourceList, dispatch }) => {
  // TODO clean this up, there is a lot of unclear logic in this return
  // for each route, if nav is true, render a link
  return (
    <ul>
      {resourceList.map((resource) => {
        return resource.nav ? (
          <li key={Math.random()}>
            <Link
              to={resource.path}
              onClick={() => {dispatch(resource.action)}}
              >{resource.anchor}</Link>
          </li>
        ) : ''
      })}
    </ul>
  )
}

function mapState(state) {

  const resourceList = Object.keys(state.resources).map(key => {
    return state.resources[key]
  }).filter(route => route.nav)

  return {
    resourceList: resourceList
  }
}

function mapDispatch(dispatch) {
  return { dispatch: dispatch }
}

Navigation = connect(mapState, mapDispatch)(Navigation)

export default Navigation
