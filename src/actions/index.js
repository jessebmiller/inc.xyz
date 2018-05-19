export const actionTypes = {
  FETCH: 'FETCH',
  RECEIVE: 'RECEIVE',
  HANDLE_FETCH_ERROR: 'HANDLE_FETCH_ERROR'
}

function fetchResources(resourceType) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, {
      mockID01: {
        title: "Article Title",
        abstract: "Article abstract...",
        full: "# Article \n\n full article about some stuff",
        fundingAddress: "0x123",
        fundingGoal: 100,
        funded: true
      },
      mockID02: {
        title: "Another Title",
        abstract: "Just the abstract...",
        fundingAddress: "0x456",
        fundingGoal: 100000,
        funded: false
      }
    })
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
