import React from 'react'
import { connect } from 'react-redux'

import Logo from './Logo'
import Title from './Title'
import Navigation from './Navigation'

import css from './index.css'

let Header = ({ landing }) => {
  console.log(landing)
  return (
    <header className={landing ? css.landing : ''}>
        <Logo />
        <Title />
        <Navigation />
    </header>
  )
}

function mapProps(state) {
  return {
    landing: state.landing
  }
}

Header = connect(mapProps)(Header)

export default Header
