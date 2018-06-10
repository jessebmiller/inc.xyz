import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Lifecycle from '../Lifecycle'

let Content = ({ resource }) => {
  return (
    <Route
      {...resource}
      component={() => <Lifecycle {...resource} />}
      />
  )
}

function mapState(state) {
  return { resource: state.resource }
}

Content = withRouter(connect(mapState)(Content))

export default Content
