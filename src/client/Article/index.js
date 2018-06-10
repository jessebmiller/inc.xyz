import React from 'react'
import { connect } from 'react-redux'

import { Link, Route, withRouter } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import FundButton from '../FundButton'

let Article = ({ article }) => {
  return (
    article.paid ? (
      <ReactMarkdown source={article.content}/>
    ) : (
      <div>
        <FundButton {...article} />
        <h1>{article.title}</h1>
        <p>{article.abstract}</p>
      </div>
    )
  )
}

function mapState(state) {
  return {
    article: state.resource
  }
}

Article = withRouter(connect(mapState)(Article))

export default Article
