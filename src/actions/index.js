import axios from 'axios'
import {
  FETCH_MESSAGE,
  FETCH_ATTACKERS,

  GENERATE_PINCODE,

  NO_AUTH_ERROR
} from './types'

import { apiError, authError } from './Errors'

import { ROOT_URL } from './config'

export * from './AuthActions'
export * from './CredentialsActions'
export * from './DashboardActions'
export * from './DeviceActions'
export * from './EnvActions'
export * from './IdentityActions'
export * from './ImageActions'
export * from './IncidentActions'
export * from './MapActions'
export * from './MonitorActions'
export * from './SettingsActions'
export * from './WorkflowActions'

export const fetchMessage = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    let config = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': window.localStorage.getItem('token')
      }
    }
    axios.get(`${ROOT_URL}/api/me`, config)
      .then(response => fetchMessageSuccess(dispatch, response))
      .catch(error => authError(error)) // TODO: here may be another error action
  }
}

const fetchMessageSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_MESSAGE,
    payload: response.data.username
  })
}

export const fetchAttackers = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/attacker`, {params: {}})
      .then(response => fetchAttackersSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchAttackersSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_ATTACKERS,
    data: response.data._embedded.attackers
  })
}

export const generatePincode = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return function (dispatch) {
    axios.get(`${ROOT_URL}/genpin`)
      .then(response => generatePincodeSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const generatePincodeSuccess = (dispatch, response) => {
  dispatch({
    type: GENERATE_PINCODE,
    data: response.data
  })
}
