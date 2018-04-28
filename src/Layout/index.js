import React from 'react'

import css from './index.css'

const Row = ({ children }) => {
  return (
    <div className={css.row}>
      {children}
    </div>
  )
}

module.exports = { Row }
