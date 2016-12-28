import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  OPEN_NEW_INCIDENT_MODAL,
  CLOSE_NEW_INCIDENT_MODAL,

  FETCH_DEVICE_INCIDENTS,
  ADD_DEVICE_INCIDENT,
  UPDATE_DEVICE_INCIDENT,

  OPEN_ADD_DEVICE_INCIDENT,
  CLOSE_ADD_DEVICE_INCIDENT,

  SEARCH_INCIDENTS,
  SEARCH_INCIDENT_DEVICES,

  API_ERROR
} from './types'

export const openNewIncidentModal = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_NEW_INCIDENT_MODAL
    })
  }
}

export const closeNewIncidentModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_NEW_INCIDENT_MODAL
    })
  }
}

export const fetchDeviceIncidents = (params) => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`)
      .then(response => fetchDeviceIncidentsSuccess(dispatch, response))
      .catch(error => fetchDeviceIncidentsFail(dispatch, error))
  }

  const fetchDeviceIncidentsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const fetchDeviceIncidentsSuccess = (dispatch, response) => {
    dispatch({
      type: FETCH_DEVICE_INCIDENTS,
      data: response.data._embedded.incidents
    })
  }
}

export const addDeviceIncident = (props) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/incident`, props)
      .then(response => addDeviceIncidentSuccess(dispatch, response))
      .catch(error => addDeviceIncidentFail(dispatch, error))
  }

  const addDeviceIncidentFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const addDeviceIncidentSuccess = (dispatch, response) => {
    dispatch({
      type: ADD_DEVICE_INCIDENT,
      data: response.data
    })
    dispatch(closeAddDeviceIncident())
  }
}

export const updateDeviceIncident = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateDeviceIncidentSuccess(dispatch, response))
      .catch(error => updateDeviceIncidentFail(dispatch, error))
  }

  const updateDeviceIncidentFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const updateDeviceIncidentSuccess = (dispatch, response) => {
    dispatch({
      type: UPDATE_DEVICE_INCIDENT,
      data: response.data
    })
  }
}

export const openAddDeviceIncident = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_ADD_DEVICE_INCIDENT
    })
  }
}

export const closeAddDeviceIncident = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_ADD_DEVICE_INCIDENT
    })
  }
}

export const fixIncident = (incident) => {
  return (dispatch) => {
    incident.fixed = true
    incident.acknowledged = true
    dispatch(updateDeviceIncident(incident))
  }
}

export const ackIncident = (incident) => {
  return (dispatch) => {
    incident.acknowledged = true
    dispatch(updateDeviceIncident(incident))
  }
}

export const searchIncidents = (params) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`)
      .then(response => searchIncidentsSuccess(dispatch, response))
      .catch(error => searchIncidentsFail(dispatch, error))
  }

  const searchIncidentsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const searchIncidentsSuccess = (dispatch, response) => {
    dispatch({
      type: SEARCH_INCIDENTS,
      data: response.data._embedded.incidents
    })
  }
}

export const searchIncidentDevices = (params) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/device/search/findByName?${encodeUrlParams(params)}`)
      .then(response => searchIncidentDevicesSuccess(dispatch, response))
      .catch(error => searchIncidentDevicesFail(dispatch, error))
  }

  const searchIncidentDevicesFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR, 
      msg: error
    })
  }

  const searchIncidentDevicesSuccess = (dispatch, response) => {
    dispatch({
      type: SEARCH_INCIDENT_DEVICES,
      data: response.data._embedded.devices
    })
  }
}
