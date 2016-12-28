import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  FETCH_CREDENTIALS,
  ADD_CREDENTIALS,
  UPDATE_CREDENTIALS,
  REMOVE_CREDENTIALS,
  OPEN_CREDENTIALS_MODAL,
  CLOSE_CREDENTIALS_MODAL,

  API_ERROR
} from './types'

export function fetchCredentials () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/credential`)
      .then(response => fetchCredentialsSuccess(dispatch, response))
      .catch(error => fetchCredentialsFail(dispatch, error))
  }

  const fetchCredentialsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR, 
      msg: error
    })
  }

  const fetchCredentialsSuccess = (dispatch, response) => {
    dispatch({ 
      type: FETCH_CREDENTIALS, 
      data: response.data._embedded.credentials 
    })
  }
}

export function addCredentials (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/credential`, props)
      .then(response => addCredentialsSuccess(dispatch, response))
      .catch(error => addCredentialsFail(dispatch, error))
  }

  const addCredentialsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR, 
      msg: error
    })
  }

  const addCredentialsSuccess = (dispatch, response) => {
    dispatch({
      type: ADD_CREDENTIALS, 
      data: response.data
    })
    dispatch(closeCredentialsModal())
  }
}

export function updateCredentials (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity)
      .then(response => updateCredentialsSuccess(dispatch, response))
      .catch(error => updateCredentialsFail(dispatch, error))
  }

  const updateCredentialsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR, 
      msg: error
    })
  }

  const updateCredentialsSuccess = (dispatch, response) => {
    dispatch({
      type: UPDATE_CREDENTIALS, 
      data: response.data
    })
    dispatch(closeCredentialsModal())
  }
}

export function removeCredentials (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href)
      .then(() => removeCredentialsSuccess(dispatch, entity))
      .catch(error => removeCredentialsFail(dispatch, error))
  }

  const removeCredentialsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR, 
      msg: error
    })
  }

  const removeCredentialsSuccess = (dispatch, entity) => {
    dispatch({
      type: REMOVE_CREDENTIALS, 
      data: entity
    })
  }
}

export function openCredentialsModal (entity) {
  return function (dispatch) {
    dispatch({ 
      type: OPEN_CREDENTIALS_MODAL, 
      data: entity 
    })
  }
}

export function closeCredentialsModal () {
  return function (dispatch) {
    dispatch({ 
      type: CLOSE_CREDENTIALS_MODAL 
    })
  }
}