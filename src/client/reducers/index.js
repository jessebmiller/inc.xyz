import { combineReducers } from 'redux'

import actionTypes from '../actionTypes'

function resourceReducer(resource = {lifecycleState: "INITIAL"}, action) {
  switch(action.type) {
  case actionTypes.FETCH:
    return Object.assign({}, resource, {
      lifecycleState: "REQUESTED",
      type: action.resourceType,
      id: action.resourceId
    })

  case actionTypes.RECEIVE:
    return Object.assign(
      {},
      resource,
      action.resource,
      {lifecycleState: "RECEIVED"}
    )

  case actionTypes.HANDLE_FETCH_ERROR:
    return Object.assign(
      {},
      resource,
      action.error,
      {lifecycleState: "FETCH_ERROR"}
    )

  default:
    return resource
  }
}

function siteTitleReducer(siteTitle = "The Incrementalist", action) {
  if (action.type === actionTypes.SET_SITE_TITLE) {
    return action.title
  }
  return siteTitle
}

function ethReducer(eth = null, action) {
  if (action.type === actionTypes.SET_ETH) {
    return action.eth
  }
  return eth
}

function actionLogReducer(actionLog = [], action) {
  return actionLog.concat([action])
}

const rootReducer = combineReducers({
  siteTitle: siteTitleReducer,
  resource: resourceReducer,
  eth: ethReducer,
  actionLog: actionLogReducer
})

export default rootReducer


