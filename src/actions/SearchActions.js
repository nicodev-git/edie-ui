import {
  UPDATE_SEARCH_KEYWORD
} from './types'

export const updateSearchKeyword = (keyword) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_SEARCH_KEYWORD,
      keyword
    })
  }
}
