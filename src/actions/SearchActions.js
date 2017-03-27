import {
  UPDATE_SEARCH_PARAMS
} from './types'

export const updateSearchParams = (params) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_SEARCH_PARAMS,
      params
    })
  }
}
