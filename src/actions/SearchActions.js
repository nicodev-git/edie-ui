import {
  UPDATE_SEARCH_PARAMS,
  OPEN_SEARCH_FIELD
} from './types'

export const updateSearchParams = (params) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_SEARCH_PARAMS,
      params
    })
  }
}

export const openSearchField = field => {
  return dispatch => {
    dispatch({type: OPEN_SEARCH_FIELD, field})
  }
}
