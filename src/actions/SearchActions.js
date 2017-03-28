import axios from 'axios'
import { assign } from 'lodash'
import {
  UPDATE_SEARCH_PARAMS,
  UPDATE_SEARCH_FIELDS,
  OPEN_FIELDS_POPOVER,
  CLOSE_FIELDS_POPOVER,
  FETCH_FIELD_TOP_VALUES,
  UPDATE_QUERY_CHIPS,

  FETCH_SEARCH_OPTIONS,
  ADD_SEARCH_OPTION,
  UPDATE_SEARCH_OPTION,
  REMOVE_SEARCH_OPTION
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

export const openFieldsPopover = (selectedField, anchorEl) => {
  return dispatch => {
    dispatch({type: OPEN_FIELDS_POPOVER, selectedField, anchorEl})
  }
}

export const closeFieldsPopover = () => {
  return dispatch => {
    dispatch({type: CLOSE_FIELDS_POPOVER})
  }
}

export const fetchFieldTopValues = (name, params) => {
  return dispatch => {
    dispatch({type: FETCH_FIELD_TOP_VALUES, data: []})
    const config = {
      params: assign({}, params, {name})
    }
    axios.get(`${ROOT_URL}/search/topValueCount`, config).then(res => {
      dispatch({type: FETCH_FIELD_TOP_VALUES, data: res.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const updateQueryChips = (chips) => {
  return dispatch => {
    dispatch({type: UPDATE_QUERY_CHIPS, chips})
  }
}

export const fetchSearchOptions = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/searchoption`).then(res => {
      dispatch({type: FETCH_SEARCH_OPTIONS, data: res._embedded.searchOptions})
    }).catch(error => apiError(dispatch, error))
  }
}

export const addSearchOption = (props) => {

}
