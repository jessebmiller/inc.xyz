import { request, recieve, actionTypes } from '../actions'

import Authors from '../Authors'
import Articles from '../Articles'

const initialState = {
  title: "The Incrementalist",
  landing: true, // Has the user just landed?
  articles: {
    lifecycleState: 'INITIAL',
    resources: []
  },
  authors: {
    lifecycleState: 'INITIAL',
    resources: []
  },
  routes: [
    {
      anchor: "Authors",
      path: "/authors",
      component: Authors,
      nav: true,
      action: request('authors')
    },
    {
      anchor: "Articles",
      path: "/articles",
      component: Articles,
      nav: true,
      action: request('articles')
    }
  ]
}

function rootReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)
  switch(action.type) {

  case actionTypes.FETCH:
    nextState[action.resourceType].lifecycleState = "REQUESTED"
    return nextState

  case actionTypes.RECEIVE:
    nextState[action.resourceType].resources = action.resources
    nextState[action.resourceType].lifecycleState = "RECEIVED"
    return nextState

  case actionTypes.HANDLE_FETCH_ERROR:
    nextState[action.resourceType].livecycleState = "FETCH_ERROR"

  default:
    return nextState
  }
}

export default rootReducer
