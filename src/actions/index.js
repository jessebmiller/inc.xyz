export const actionTypes = {
  FETCH: 'FETCH',
  RECIEVE: 'RECIEVE',
  HANDLE_FETCH_ERROR: 'HANDLE_FETCH_ERROR'
}

function fetchResources(resourceType) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, ["article 1", "article 2"])
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
    type: actionTypes.RECIEVE,
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

export function idempotently(func) {
  const alreadyCalled = false;
  return () => {
    if (!alreadyCalled) {
      func()
    }
  }
}
