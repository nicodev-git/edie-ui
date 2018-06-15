import axios from 'axios'
import {
  FETCH_CREDENTIALS,
  ADD_CREDENTIALS,
  UPDATE_CREDENTIALS,
  REMOVE_CREDENTIALS,
  OPEN_CREDENTIALS_MODAL,
  CLOSE_CREDENTIALS_MODAL,

  SELECT_CREDS,

  SHOW_CRED_LIST_MODAL,

  NO_AUTH_ERROR
} from './types'

import { apiError } from './Errors'

import { ROOT_URL } from './config'

export const fetchCredentials = (cb) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/credential?size=1000`).then(response => {
      fetchCredentialsSuccess(dispatch, response)
      cb && cb(response.data._embedded.credentials)
    }).catch(error => apiError(dispatch, error))
  }
}

const fetchCredentialsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_CREDENTIALS,
    data: response.data._embedded.credentials
  })
}

export const addCredentials = (props) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/credential`, props)
      .then(response => addCredentialsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addCredentialsSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_CREDENTIALS,
    data: response.data
  })
  dispatch(fetchCredentials())
  dispatch(closeCredentialsModal())
}

export const updateCredentials = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.put(`${ROOT_URL}/credential/${entity.id}`, entity)
      .then(response => updateCredentialsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateCredentialsSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_CREDENTIALS,
    data: response.data
  })
  dispatch(fetchCredentials())
  dispatch(closeCredentialsModal())
}

export const removeCredentials = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/credential/${entity.id}`)
      .then(() => removeCredentialsSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const removeCredentialsSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_CREDENTIALS,
    data: entity
  })
  dispatch(fetchCredentials())
}

export const openCredentialsModal = (entity) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_CREDENTIALS_MODAL,
      data: entity
    })
  }
}

export const closeCredentialsModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_CREDENTIALS_MODAL
    })
  }
}

export const selectCreds = (creds) => {
  return dispatch => {
    dispatch({type: SELECT_CREDS, creds})
  }
}

export const addDeviceCredential = (creds, deviceId) => {
  return dispatch => {
    if (!creds || (creds.id && creds.default)) return

    const entity = {
      ...creds,
      deviceIds: [...(creds.deviceIds || []), deviceId]
    }

    if (creds.id) {
      dispatch(updateCredentials(entity))
    } else {
      dispatch(addCredentials(entity))
    }
  }
}

export const showCredListModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_CRED_LIST_MODAL, visible})
  }
}
