import axios from 'axios'
import {
  FETCH_SETTING_MAPS,
  ADD_SETTING_MAP,
  UPDATE_SETTING_MAP,
  REMOVE_SETTING_MAP,
  OPEN_SETTING_MAP_MODAL,
  CLOSE_SETTING_MAP_MODAL,

  FETCH_SETTING_USERS,
  ADD_SETTING_USER,
  UPDATE_SETTING_USER,
  REMOVE_SETTING_USER,
  OPEN_SETTING_USER_MODAL,
  CLOSE_SETTING_USER_MODAL,
  OPEN_USER_PASSWORD_MODAL,
  CLOSE_USER_PASSWORD_MODAL
} from './types'

import { apiError } from './errors'

import { ROOT_URL } from './config'

export const fetchSettingMaps = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/map`)
      .then(response => fetchSettingMapsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchSettingMapsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_SETTING_MAPS,
    data: response.data._embedded.maps
  })
}

export const openSettingMapModal = (map) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_SETTING_MAP_MODAL,
      data: map
    })
  }
}

export const closeSettingMapModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SETTING_MAP_MODAL
    })
  }
}

export const addSettingMap = (props) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/map`, props)
      .then(response => addSettingMapSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addSettingMapSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_SETTING_MAP,
    data: response.data
  })
  dispatch(closeSettingMapModal())
}

export const updateSettingMap = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateSettingMapSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateSettingMapSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_SETTING_MAP,
    data: response.data
  })
  dispatch(closeSettingMapModal())
}

export const deleteSettingMap = (entity) => {
  return (dispatch) => {
    axios.delete(entity._links.self.href)
      .then(() => deleteSettingMapSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const deleteSettingMapSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_SETTING_MAP,
    data: entity
  })
}

export const fetchSettingUsers = () => {
  return (dispatch) => {
    dispatch({type: FETCH_SETTING_USERS, data: []})

    axios.get(`${ROOT_URL}/user`)
      .then(response => fetchSettingUsersSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchSettingUsersSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_SETTING_USERS,
    data: response.data._embedded.users
  })
}

export const addSettingUser = (props) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/user`, props)
      .then(response => addSettingUserSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addSettingUserSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_SETTING_USER,
    data: response.data
  })
  dispatch(closeSettingUserModal())
}

export const updateSettingUser = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateSettingUserSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateSettingUserSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_SETTING_USER,
    data: response.data
  })
  dispatch(closeSettingUserModal())
  dispatch(closeUserPasswordModal())
}

export const deleteSettingUser = (entity) => {
  return (dispatch) => {
    axios.delete(entity._links.self.href)
      .then(() => deleteSettingUserSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const deleteSettingUserSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_SETTING_USER,
    data: entity
  })
}

export const openSettingUserModal = (user) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_SETTING_USER_MODAL,
      data: user
    })
  }
}

export const closeSettingUserModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SETTING_USER_MODAL
    })
  }
}

export const openUserPasswordModal = (user) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_USER_PASSWORD_MODAL,
      data: user
    })
  }
}

export const closeUserPasswordModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_USER_PASSWORD_MODAL
    })
  }
}
