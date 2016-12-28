import axios from 'axios'
import {
  FETCH_ENV_VARS,
  ADD_ENV_VAR,
  UPDATE_ENV_VAR
} from './types'

import { apiError } from './errors'

import { ROOT_URL } from './config'

export const fetchEnvVars = () => {
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
