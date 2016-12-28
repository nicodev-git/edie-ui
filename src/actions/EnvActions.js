import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  FETCH_ENV_VARS,
  ADD_ENV_VAR,
  UPDATE_ENV_VAR,

  API_ERROR
} from './types'

import { ROOT_URL } from './config'

export const fetchEnvVars = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/setting/search/envvars`)
      .then(response => fetchEnvVarsSuccess(dispatch, response))
      .catch(error => fetchEnvVarsFail(dispatch, error))
  }

  const fetchEnvVarsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const fetchEnvVarsSuccess = (dispatch, response) => {
    dispatch({
      type: FETCH_ENV_VARS, 
      data: response.data._embedded.settingses
    })
  }
}

export const updateEnvVar = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateEnvVarSuccess(dispatch, response))
      .catch(error => updateEnvVarFail(dispatch, error))
  }

  const updateEnvVarFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const updateEnvVarSuccess = (dispatch, response) => {
    dispatch({
      type: UPDATE_ENV_VAR, 
      data: response.data
    })
  }
}

export const addEnvVar = (entity) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/setting`, entity)
      .then(response => addEnvVarSuccess(dispatch, response))
      .catch(error => addEnvVarFail(dispatch, error))
  }

  const addEnvVarFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR, 
      msg: error
    })
  }

  const addEnvVarSuccess = (dispatch, response) => {
    dispatch({
      type: ADD_ENV_VAR, 
      data: response.data
    })
  }
}
