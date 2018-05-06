import React from 'react'
import { connect } from 'react-redux'

let Articles = (state) => {
  return (
    <ul>
      {state.articles.map((article) => {
        return (
          <p key={Math.random()}>article list entry placeholder {article}</p>
        )
      })}
    </ul>
  )
}

function mapState(state) {
  let mapping = {
    articles: state.articles.resources
  }
  return mapping
}

Articles = connect(mapState)(Articles)

export default Articles
