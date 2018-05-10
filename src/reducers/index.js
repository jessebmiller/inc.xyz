import { combineReducers } from 'redux'

import { request, recieve, actionTypes } from '../actions'

import Authors from '../Authors'
import Articles from '../Articles'

const initialResources = {
  authors: {
    anchor: "Authors",
    path: "/authors",
    resourceComponent: Authors,
    nav: true,
    action: request('authors'),
    contentType: 'authors',
    lifecycleState: 'INITIAL',
    resources: []
  },
  articles: {
    anchor: "Articles",
    path: "/articles",
    resourceComponent: Articles,
    nav: true,
    action: request('articles'),
    contentType: 'articles',
    lifecycleState: 'INITIAL',
    resources: []
  }
}

function resourceReducer(resources = initialResources, action) {

  function assignLifecycleState(resource, lifecycleState) {
    return Object.assign(
      {},
      resource,
      {lifecycleState: lifecycleState}
    )
  }

  let resource
  switch(action.type) {
  case actionTypes.FETCH:
    resource = assignLifecycleState(resources[action.resourceType], "REQUESTED")
    return Object.assign({}, resources, {[action.resourceType]: resource})

  case actionTypes.RECEIVE:
    resource = assignLifecycleState(resources[action.resourceType], "RECEIVED")
    resource.resources = action.resources
    return Object.assign({}, resources, {[action.resourceType]: resource})

  case actionTypes.HANDLE_FETCH_ERROR:
    resource = assignLifecycleState(resources[action.resourceType], "FETCH_ERROR")
    return Object.assign({}, resources, {[action.resourceType]: resource})

  default:
    return resources
  }
}

function landingReducer(landing = true, action) {
  // if the action is a type that should change the landing status
  // make it false.
  if (action.invalidateLanding) {
    return false
  }
  return landing
}

// find a way to gather this back into a single declarative spot
function titleReducer(title = "The Incrementalist", action) {
  return title
}

export default combineReducers({
  title: titleReducer,
  resources: resourceReducer,
  landing: landingReducer
})
