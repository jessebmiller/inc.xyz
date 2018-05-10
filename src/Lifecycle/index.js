import React from 'react'

const Lifecycle = ({ lifecycleState, resourceComponent }) => {
  console.log("Lifecycle gets", lifecycleState, resourceComponent)
  switch(lifecycleState) {
  case "REQUESTED":
    return (
      <p>Requesting content...</p>
    )
  case "RECEIVED":
    const Resource = resourceComponent
    return <Resource />
  case "FETCH_ERROR":
    return (
      <p>Error fetching content :/ sorry this is new..</p>
    )
  case "INITIAL":
    return (
      <p>We still need to load content when you refresh on this URL...</p>
    )
  default:
    return (
      <p>We don't know where the content is...sorry this is new.</p>
    )
  }
}



export default Lifecycle


