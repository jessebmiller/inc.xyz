import React from 'react'
import { connect } from 'react-redux'

let Articles = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => {
        return (
          <p key={Math.random()}>{article}</p>
        )
      })}
    </ul>
  )
}

function mapState(state) {
  let mapping = {
    // TODO ... awkward (resources.type.resources) :/
    articles: state.resources.articles.resources
  }
  return mapping
}

Articles = connect(mapState)(Articles)

export default Articles
