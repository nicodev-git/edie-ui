import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  FETCH_IDENTITIES,
  ADD_IDENTITY,
  UPDATE_IDENTITY,
  REMOVE_IDENTITY,
  OPEN_IDENTITY_MODAL,
  CLOSE_IDENTITY_MODAL
} from './types'

import { apiError } from './errors'

import { ROOT_URL } from './config'

export const fetchIdentities = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/setting/search/identities`)
      .then(response => fetchIdentitiesSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }

  const fetchIdentitiesSuccess = (dispatch, response) => {
    dispatch({
      type: FETCH_IDENTITIES, 
      data: response.data._embedded.settingses
    })
  }
}

export const addIdentity = (props) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/setting`, props)
      .then(response => addIdentitySuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }

  const addIdentitySuccess = (dispatch, response) => {
    dispatch({
      type: ADD_IDENTITY, 
      data: response.data
    })
    dispatch(closeIdentityModal())
  }
}

export const updateIdentity = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateIdentitySuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }

  const updateIdentitySuccess = (dispatch, response) => {
    dispatch({
      type: UPDATE_IDENTITY, 
      data: response.data
    })
    dispatch(closeIdentityModal())
  }
}

export const removeIdentity = (entity) => {
  return (dispatch) => {
    axios.delete(entity._links.self.href)
      .then(() => removeIdentitySuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }

  const removeIdentitySuccess = (dispatch, entity) => {
    dispatch({
      type: REMOVE_IDENTITY, 
      data: entity
    })
  }
}

export const openIdentityModal = (entity) => {
  return (dispatch) => {
    dispatch({ 
      type: OPEN_IDENTITY_MODAL, 
      data: entity 
    })
  }
}

export const closeIdentityModal = () => {
  return (dispatch) => {
    dispatch({ 
      type: CLOSE_IDENTITY_MODAL 
    })
  }
}
