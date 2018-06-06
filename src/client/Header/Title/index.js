import React from 'react'
import { connect } from 'react-redux'

let Title = ({ siteTitle }) => {
  return <h1 style={{display: 'inline'}}>{siteTitle}</h1>
}

const mapProps = (state) => {
  return {siteTitle: state.siteTitle}
}

Title = connect(mapProps)(Title)

export default Title
