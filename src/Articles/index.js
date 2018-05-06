import React from 'react'
import { connect } from 'react-redux'

let Articles = ({ articles, lifecycleState }) => {
  switch(lifecycleState) {
  case "REQUESTED":
    return (
      <p>Requested articles...</p>
    )
  case "RECEIVED":
    return (
    <ul>
      {articles.map((article) => {
        return (
          <p key={Math.random()}>article list entry placeholder {article}</p>
        )
      })}
    </ul>
  )
  case "FETCH_ERROR":
    return (
      <p>Error fetching articles :/ sorry this is new..</p>
    )
  case "INITIAL":
    return (
      <p>We still need to load articles when you refresh on this URL...</p>
    )
  default:
    return (
      <p>We don't know where the articles are...sorry this is new.</p>
    )
  }
}

function mapState(state) {
  let mapping = {
    articles: state.articles.resources,
    lifecycleState: state.articles.lifecycleState
  }
  return mapping
}

Articles = connect(mapState)(Articles)

export default Articles
