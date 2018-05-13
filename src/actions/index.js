export const actionTypes = {
  FETCH: 'FETCH',
  RECEIVE: 'RECEIVE',
  HANDLE_FETCH_ERROR: 'HANDLE_FETCH_ERROR'
}

function fetchResources(resourceType) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, [
      "# article 1 \n\n some stuff",
      "# Great title \n\n such learn",
      "# This is a header\n\nAnd this is a paragraph"])
  })
}

export function request(resourceType) {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH,
      resourceType: resourceType
    })
    fetchResources(resourceType).then(resources => {
      dispatch(recieve(resourceType, resources))
    }).catch(err => {
      dispatch(requestError(resourceType, err))
    })
  }
}

export function recieve(resourceType, resources) {
  return {
    type: actionTypes.RECEIVE,
    resourceType: resourceType,
    resources: resources
  }
}

export function requestError(resourceType, err) {
  return {
    type: actionTypes.HANDLE_FETCH_ERROR,
    resourceType: resourceType,
    error: err
  }
}
