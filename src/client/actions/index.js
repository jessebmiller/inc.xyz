import store from '../store'
import actionTypes from '../actionTypes'
import Eth from 'ethjs'

import { sign } from '../helpers'

// prepare data for a signed resource request
const prepResourceRequest = resourceId => {
  return `${new Date()}|${resourceId}`
}

const resourceURL = signedResourceRequest => {
  URL = `http://localhost:3000/v1/resources/?resource-request=${signedResourceRequest}`
  return URL
}

export async function requestLocationResource({ pathname }) {
  const resourceId = pathname.substring(1)
  const eth = store.getState().eth
  const signedResourceRequest = await sign(prepResourceRequest(resourceId))
  store.dispatch(request(signedResourceRequest))
}

function fetchResource(signedResourceRequest) {
  return new Promise((resolve, reject) => {
    // TODO what if the resource doesnt exist for that id?
    fetch(resourceURL(signedResourceRequest), {
      headers:{
        'Content-Type': "application/json"
      }
    }).then(async response => {
      // if they didn't pay, redact the content
      let resource = await response.json()
      resource = resource.paid ? resource : Object.assign({}, resource, {content: ""})
      resolve(resource)
    })
  })
}

export const request = (signedResourceRequest) => dispatch => {
  dispatch({
    type: actionTypes.FETCH,
    signedResourceRequest
  })
  fetchResource(signedResourceRequest).then(resource => {
    dispatch(recieve(resource))
  }).catch(err => {
    dispatch(requestError(err))
  })
}

export function recieve(resource) {
  return {
    type: actionTypes.RECEIVE,
    resource
  }
}

export function requestError(error) {
  return {
    type: actionTypes.HANDLE_FETCH_ERROR,
    error
  }
}

export function setEth(provider) {
  const eth = new Eth(provider)
  return {
    type: actionTypes.SET_ETH,
    eth
  }
}

