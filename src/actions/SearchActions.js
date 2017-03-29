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
import { updateEnvVar, addEnvVar, fetchEnvVars } from './EnvActions'

import { KEY_SEARCH_OPTIONS, getEnvVar, getEnvVarValue1, setEnvVarValue1, createEnvVar } from 'shared/Global'

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

export const fetchSearchOptions = (userId) => {
  return dispatch => {
    dispatch({type: FETCH_SEARCH_OPTIONS, data: []})
    dispatch(fetchEnvVars((envvars) => {
      const envVar = getEnvVar(envvars, KEY_SEARCH_OPTIONS)
      const value = getEnvVarValue1(envVar) || '{}'
      const data = JSON.parse(value)[userId] || []
      dispatch({type: FETCH_SEARCH_OPTIONS, data})
    }))
  }
}

const saveEnvVar = (envvars, key, value1, cb) => {
  let envVar = getEnvVar(envvars, key)

  let fnSaveEnvVar
  if (envVar) {
    envVar = setEnvVarValue1(envVar, value1)
    fnSaveEnvVar = addEnvVar
  } else {
    envVar = createEnvVar(key, value1, '')
    fnSaveEnvVar = updateEnvVar
  }

  return fnSaveEnvVar(envVar, cb)
}

export const addSearchOption = (envvars, userId, option) => {
  return dispatch => {
    const envVar = getEnvVar(envvars, KEY_SEARCH_OPTIONS)
    let value1 = JSON.parse(getEnvVarValue1(envVar) || '{}')
    const options = value1[userId] || []
    options.push(option)
    value1[userId] = options
    value1 = JSON.stringify(value1)

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
