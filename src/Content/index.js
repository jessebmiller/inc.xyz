import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Lifecycle from '../Lifecycle'

let Content = (state) => {
  console.log("Content called with", state)
  const content = Object.keys(state.resources).map(resourceType => {
    const resource = state.resources[resourceType]
    return <Route {...resource}
    component={() => {
      return (
        <Lifecycle
          lifecycleState={resource.lifecycleState}
          resourceComponent={resource.resourceComponent}
          />
      )
    }}
    key={Math.random()}/>
  })
  return content
}

const mapProps = (state) => {
  // TODO is this a bottleneck?
  return Object.assign({}, state)
}

Content = connect(mapProps)(Content)

export default Content
