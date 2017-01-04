import axios from 'axios'
import {
  FETCH_ENV_VARS,
  ADD_ENV_VAR,
  UPDATE_ENV_VAR,

  NO_AUTH_ERROR
} from './types'

import { apiError } from './Errors'

import { ROOT_URL } from './config'

export const fetchEnvVars = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/setting/search/envvars`)
      .then(response => fetchEnvVarsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchEnvVarsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_ENV_VARS,
    data: response.data._embedded.settingses
  })
}

export const updateEnvVar = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateEnvVarSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateEnvVarSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_ENV_VAR,
    data: response.data
  })
}

export const addEnvVar = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/setting`, entity)
      .then(response => addEnvVarSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addEnvVarSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_ENV_VAR,
    data: response.data
  })
}
