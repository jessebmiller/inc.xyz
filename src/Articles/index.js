import React from 'react'
import { connect } from 'react-redux'

let Articles = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => {
        return (
          <p key={Math.random()}>article list entry placeholder {article}</p>
        )
      })}
    </ul>
  )
}

Articles = connect((s) => {return {...s}})(Articles)

export default Articles
