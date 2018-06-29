import store from '../store'
import actionTypes from '../actionTypes'
import Eth from 'ethjs'

import { sign } from '../helpers'

const resourceURL = (sig, msg) => {
  URL = `http://${window.location.host}/v1/resources/?sig=${sig}&msg=${msg}`
  return URL
}

export async function requestLocationResource({ pathname }) {
  const resourceId = pathname.substring(1)
  const eth = store.getState().eth
  const resourceRequest = resourceId
  const signedResourceRequest = await sign(resourceRequest)
  store.dispatch(request(signedResourceRequest, resourceRequest))
}

function fetchResource(signedResourceRequest, resourceRequest) {
  return new Promise((resolve, reject) => {
    // TODO what if the resource doesnt exist for that id?
    fetch(resourceURL(signedResourceRequest, resourceRequest))
      .then(async response => {
        let resource = await response.json()
        resolve(resource)
      }).catch(reject)
  })
}

export const request = (signedResourceRequest, resourceRequest) => dispatch => {
  dispatch({
    type: actionTypes.FETCH,
    signedResourceRequest,
    resourceRequest
  })
  fetchResource(signedResourceRequest, resourceRequest).then(resource => {
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

