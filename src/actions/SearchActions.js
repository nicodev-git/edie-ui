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
  REMOVE_SEARCH_OPTION,

  OPEN_SEARCH_SAVE_POPOVER,
  CLOSE_SEARCH_SAVE_POPOVER,

  OPEN_SEARCH_WF_MODAL,
  CLOSE_SEARCH_WF_MODAL,
  SELECT_SEARCH_WF_CATEGORY,
  CHANGE_SEARCH_WF_FILTER,
  SELECT_WF_ROW,
  SELECT_SEARCH_WF
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

export const addSearchOption = (user, option) => {
  if (!user) return
  return dispatch => {
    const searchOptions = JSON.parse(user.searchOptions || '[]')
    searchOptions.push(option)
    // axios.post(`${ROOT_URL}`)


    dispatch(saveEnvVar(envvars, KEY_SEARCH_OPTIONS, value1, () => {
      dispatch({type: ADD_SEARCH_OPTION, option})
    }))
  }
}

export const updateSearchOption = (envvars, userId, option) => {
  return dispatch => {
    const envVar = getEnvVar(envvars, KEY_SEARCH_OPTIONS)
    let value1 = JSON.parse(getEnvVarValue1(envVar) || '{}')
    const options = value1[userId] || []
    value1[userId] = options.map(m => m.id === option.id ? option : m)
    value1 = JSON.stringify(value1)

    dispatch(saveEnvVar(envvars, KEY_SEARCH_OPTIONS, value1, () => {
      dispatch({type: UPDATE_SEARCH_OPTION, option})
    }))
  }
}

export const removeSearchOption = (envvars, userId, option) => {
  return dispatch => {
    const envVar = getEnvVar(envvars, KEY_SEARCH_OPTIONS)
    let value1 = JSON.parse(getEnvVarValue1(envVar) || '{}')
    const options = value1[userId] || []
    value1[userId] = options.filter(m => m.id !== option.id)
    value1 = JSON.stringify(value1)

    dispatch(saveEnvVar(envvars, KEY_SEARCH_OPTIONS, value1, () => {
      dispatch({type: REMOVE_SEARCH_OPTION, option})
    }))
  }
}

export const openSearchSavePopover = (option, anchorEl) => {
  return dispatch => {
    dispatch({type: OPEN_SEARCH_SAVE_POPOVER, option, anchorEl})
  }
}

export const closeSearchSavePopover = () => {
  return dispatch => {
    dispatch({type: CLOSE_SEARCH_SAVE_POPOVER})
  }
}

export const openSearchWfModal = () => {
  return dispatch => {
    dispatch({type: OPEN_SEARCH_WF_MODAL})
  }
}

export const closeSearchWfModal = () => {
  return dispatch => {
    dispatch({type: CLOSE_SEARCH_WF_MODAL})
  }
}

export const selectSearchWfCategory = (categoryId) => {
  return dispatch => {
    dispatch({type: SELECT_SEARCH_WF_CATEGORY, categoryId})
  }
}

export const changeSeachWfFilter = (filter) => {
  return dispatch => {
    dispatch({type: CHANGE_SEARCH_WF_FILTER, filter})
  }
}

export const selectWfRow = (workflow) => {
  return dispatch => {
    dispatch({type: SELECT_WF_ROW, workflow})
  }
}

export const selectSearchWf = (workflow) => {
  return dispatch => {
    dispatch({type: SELECT_SEARCH_WF, workflow})
  }
}
