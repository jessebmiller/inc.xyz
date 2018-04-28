import React from 'react'

import Logo from './Logo'
import Title from './Title'
import Navigation from './Navigation'

import css from './index.css'

const Header = ({ title }) => {
  return (
    <header>
      <div>
        <Logo />
      </div>
      <div>
        <Title text={title} />
      </div>
      <div>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
