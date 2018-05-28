import Article from '../Article'
import store from '../store'
import actionTypes from '../actionTypes'
import Eth from 'ethjs'

import { sign } from '../helpers'

const resources = {
  "0x123": {
    title: "Article Title",
    abstract: "Article abstract...",
    content: "# Article \n\n full article about some stuff",
    fundingAddress: "0x123",
    price: 100000,
    resourceComponent: Article
  },
  "0x456": {
    title: "Another Title",
    abstract: "Just the abstract...",
    content: "# Full Content \n\n shouldn't be allowed",
    fundingAddress: "0x456",
    price: 100000,
    resourceComponent: Article
  }
}

export async function requestLocationResource({ pathname }) {
  const resourceId = pathname.substring(1)
  const eth = store.getState().eth
  const signature = await sign("anything")
  store.dispatch(request(resourceId, signature))
}

function fetchResource(resourceId, signature) {
  // TODO
  // mock out account 0x76bc4C780Dd85558Bc4B24a4f262f4eB0bE78ca7 having paid
  // but no other payments 0x123
  let paid = false
  return new Promise((resolve, reject) => {
    let resource = Object.assign({}, resources[resourceId])
    // if they didn't pay, redact the content
    resource = paid ? resource : Object.assign({}, resource, {content: ""})
    setTimeout(resolve, 1000, resource)
  })
}

export const request = (resourceId, signature) => dispatch => {
  dispatch({
    type: actionTypes.FETCH,
    resourceId,
    signature
  })
  fetchResource(resourceId, signature).then(resource => {
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

