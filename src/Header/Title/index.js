import React from 'react'
import { connect } from 'react-redux'

let Title = ({ title }) => {
  return <h1 style={{display: 'inline'}}>{title}</h1>
}

const mapProps = (state) => {
  return {title: state.title}
}

Title = connect(mapProps)(Title)

export default Title
