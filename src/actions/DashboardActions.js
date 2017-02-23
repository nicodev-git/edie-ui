import axios from 'axios'
import {
  UPDATE_DASHBOARD,

  FETCH_DASHBOARD_INCIDENTS,
  FETCH_DASHBOARD_BIGINCIDENTS,

  CLOSE_API_ERROR_MODAL,

  REQUIRE_FULLSCREEN,

  OPEN_DASHBOARD_NEW_INCIDENT_MODAL,
  CLOSE_DASHBOARD_NEW_INCIDENT_MODAL,

  FIX_ALL_INCIDENTS_BY_TYPE,

  NO_AUTH_ERROR
} from './types'

import { apiError } from './Errors'

import { ROOT_URL } from './config'

import { encodeUrlParams } from '../shared/Global'

export const updateDashboard = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DASHBOARD,
      data
    })
  }
}

export const fetchIncidents = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident`, {params: {}})
      .then(response => fetchIncidentsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchIncidentsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_DASHBOARD_INCIDENTS,
    data: response.data._embedded.incidents
  })
}

export const fetchBigIncidents = (params) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`)
      .then(response => fetchBigIncidentsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchBigIncidentsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_DASHBOARD_BIGINCIDENTS,
    data: response.data._embedded.incidents
  })
}

export const closeApiErrorModal = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_API_ERROR_MODAL
    })
  }
}

export function requireFullScreen (enabled) {
  return dispatch => {
    dispatch({
      type: REQUIRE_FULLSCREEN,
      enabled
    })
  }
}

export const openDashboardNewIncidentModal = () => {
  return dispatch => {
    dispatch({
      type: OPEN_DASHBOARD_NEW_INCIDENT_MODAL
    })
  }
}

export const closeDashboardNewIncidentModal = () => {
  return dispatach => {
    dispatach({
      type: CLOSE_DASHBOARD_NEW_INCIDENT_MODAL
    })
  }
}

export function fixAllIncidentsByType (type) {
  return dispatch => {
    axios.get(`${ROOT_URL}/incident/fixall/${type}/deviceid`).then(res => {
      dispatch({ type: FIX_ALL_INCIDENTS_BY_TYPE })
    }).catch(error => apiError(dispatch, error))
  }
}
