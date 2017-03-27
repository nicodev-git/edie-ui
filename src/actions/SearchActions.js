import axios from 'axios'
import {
  UPDATE_SEARCH_PARAMS,
  UPDATE_SEARCH_FIELDS,
  OPEN_SEARCH_FIELD
} from './types'
import { ROOT_URL } from './config'
import { apiError } from './Errors'

export const updateSearchParams = (params) => {
  return function (dispatch) {
    dispatch(fetchSearchFields(params))
    dispatch({
      type: UPDATE_SEARCH_PARAMS,
      params
    })
  }
}

export const fetchSearchFields = (params) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/search/fields`, {params}).then(res => {
      dispatch({type: UPDATE_SEARCH_FIELDS, data: res.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const openSearchField = field => {
  return dispatch => {
    dispatch({type: OPEN_SEARCH_FIELD, field})
  }
}
