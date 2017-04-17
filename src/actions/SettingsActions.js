import axios from 'axios'
import {reset} from 'redux-form'
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
  CLOSE_USER_PASSWORD_MODAL,

  FETCH_PARSER_TYPES,
  ADD_PARSER_TYPE,
  UPDATE_PARSER_TYPE,
  REMOVE_PARSER_TYPE,
  OPEN_PARSER_TYPE_MODAL,
  CLOSE_PARSER_TYPE_MODAL,

  OPEN_PARSER_PATTERN_MODAL,
  CLOSE_PARSER_PATTERN_MODAL,

  OPEN_SIMULATION_MODAL,
  CLOSE_SIMULATION_MODAL,
  UPDATE_MATCH_RESULT,
  UPDATE_PARSE_RESULT,
  SHOW_FILTER_EDIT_MODAL,
  SHOW_PATTERN_EDIT_MODAL,
  UPDATE_SIM_PARSER_TYPE,

  FETCH_DEVICE_CATEGORIES,

  SYNC_DATA,

  SELECT_DEVICE_TEMPLATE,

  NO_AUTH_ERROR
} from './types'

import { apiError } from './Errors'

import { ROOT_URL } from './config'

export const fetchSettingMaps = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
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
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
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
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
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
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
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
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
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
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
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
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
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
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
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

export const fetchParserTypes = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/parsertype`)
      .then(response => fetchParserTypesSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

function fetchParserTypesSuccess (dispatch, response) {
  dispatch({
    type: FETCH_PARSER_TYPES,
    data: response.data._embedded.parserTypes
  })
}

export const addParserType = (props) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/parsertype`, props)
      .then(response => addParserTypeSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addParserTypeSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_PARSER_TYPE,
    data: response.data
  })
  dispatch(closeParserTypeModal())
}

export const updateParserType = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateParserTypeSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateParserTypeSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_PARSER_TYPE,
    data: response.data
  })
  dispatch(closeParserTypeModal())
}

export const removeParserType = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.delete(entity._links.self.href)
      .then(() => removeParserTypeSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const removeParserTypeSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_PARSER_TYPE,
    data: entity
  })
}

export const openParserTypeModal = (parserType) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_PARSER_TYPE_MODAL,
      data: parserType
    })
  }
}

export const closeParserTypeModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_PARSER_TYPE_MODAL
    })
  }
}

export const openSimulationModal = (data) => {
  return dispatch => {
    dispatch({type: OPEN_SIMULATION_MODAL, data})
  }
}

export const closeSimulationModal = () => {
  return dispatch => {
    dispatch({type: CLOSE_SIMULATION_MODAL})
  }
}

export const updateSimParserType = (data) => {
  return dispatch => {
    dispatch({type: UPDATE_SIM_PARSER_TYPE, data})
  }
}

export const matchFilter = (text, filter) => {
  return dispatch => {
    dispatch({type: UPDATE_MATCH_RESULT, data: ''})
    axios.post(`${ROOT_URL}/parsertypes/matchfilter`, {text, filter}).then(res => {
      dispatch({type: UPDATE_MATCH_RESULT, data: res.data ? 'True' : 'False'})
    }).catch(() => {
      dispatch({type: UPDATE_MATCH_RESULT, data: 'Error'})
    })
  }
}

export const parseFilter = (text, parserType) => {
  return dispatch => {
    dispatch({type: UPDATE_PARSE_RESULT, data: ''})
    axios.post(`${ROOT_URL}/parsertypes/parse`, {text, parserType}).then(res => {
      dispatch({type: UPDATE_PARSE_RESULT, data: res.data || {}})
    })
  }
}

export const showFilterEditModal = (visible, filter) => {
  return dispatch => {
    dispatch({type: SHOW_FILTER_EDIT_MODAL, visible, filter})
  }
}

export const showPatternEditModal = (visible, pattern) => {
  return dispatch => {
    dispatch({type: SHOW_PATTERN_EDIT_MODAL, visible, pattern})
  }
}

export const openParserPatternModal = (pattern) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_PARSER_PATTERN_MODAL,
      data: pattern
    })
  }
}

export const closeParserPatternModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_PARSER_PATTERN_MODAL
    })
  }
}

export const fetchDeviceCategories = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/devicecategory?sort=order`).then(response => {
      dispatch({type: FETCH_DEVICE_CATEGORIES, data: response.data._embedded.deviceCategories})
    }).catch(error => apiError(dispatch, error))
  }
}

export const syncData = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return dispatch => {
    dispatch({type: SYNC_DATA, data: null})
    axios.get(`${ROOT_URL}/pullSyncDataFromImadmin`).then(response => {
      dispatch({type: SYNC_DATA, data: response.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const selectDeviceTemplate = (tpl) => {
  return dispatch => {
    dispatch({type: SELECT_DEVICE_TEMPLATE, tpl})
    dispatch(reset('deviceTplView'))
  }
}
