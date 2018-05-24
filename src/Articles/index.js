import React from 'react'
import { connect } from 'react-redux'

import { Link, Route, withRouter } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import FundButton from '../FundButton'

let Article = ({ articles, match: {params: {id}} }) => {
  const article = articles[id]
  return (
    article.funded ? (
      <ReactMarkdown source={article.full}/>
    ) : (
      <div>
        <FundButton {...article} />
        <h1>{article.title}</h1>
        <p>{article.abstract}</p>
      </div>
    )
  )
}

let Articles = ({ articles, match: {isExact: showAll} }) => {
  return (
    // If it's an exact url match "/articles" we are showing the list of links
    showAll ? (
      <ul>
        {Object.entries(articles).map(([id, article]) => {
          return (
            <li key={Math.random()}>
              <FundButton {...article}/>
              <Link to={`/articles/${id}`}>
                <h1 className="articleTitle">{article.title}</h1>
              </Link>
              <p>{article.abstract}</p>
            </li>
          )
        })}
      </ul>
    ) : (
      // otherwise we show the article at this id
      // TODO generalize this for all resource types using match.path
      <Route path="/articles/:id" component={Article}/>
    )
  )
}

function mapArticles(state) {
  let mapping = {
    // TODO ... awkward (resources.type.resources) :/
    articles: state.resources.articles.resources
  }
  return mapping
}

Articles = withRouter(connect(mapArticles)(Articles))
Article = withRouter(connect(mapArticles)(Article))

module.exports = { Article, Articles }

