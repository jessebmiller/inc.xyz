import React from 'react'
import { resourceComponents } from '../resourceTypes'

const Lifecycle = ({ lifecycleState, type }) => {
  switch(lifecycleState) {
  case "REQUESTED":
    return (
      <p>Requesting content...</p>
    )
  case "RECEIVED":
    const Resource = resourceComponents[type]
    return <Resource />
  case "FETCH_ERROR":
    return (
      <div>
        <p>Error fetching content :/ sorry this is new</p>
        <p>you can help at github.com/jessebmiller/inc.xyz</p>
      </div>
    )
  case "INITIAL":
    return (
      <p>Metamask should be asking for your signature so we can check to see if you've paid...</p>
    )
  default:
    return (
      <div>
        <p>We don't know where the content is...sorry this is new.</p>
        <p>you can help at github.com/jessebmiller/inc.xyz</p>
      </div>
    )
  }
}



export default Lifecycle


