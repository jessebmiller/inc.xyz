import React from 'react'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'

let Articles = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => {
        return <ReactMarkdown key={Math.random()} source={article} />
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
