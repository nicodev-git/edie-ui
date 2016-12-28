import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  UPDATE_DASHBOARD,

  FETCH_DASHBOARD_INCIDENTS,
  FETCH_DASHBOARD_BIGINCIDENTS,

  API_ERROR
} from './types'

export const updateDashboard = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DASHBOARD,
      data
    })
  }
}

export const fetchIncidents = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident`, { params: { } })
      .then(response => fetchIncidentsSuccess(dispatch, response))
      .catch(error => fetchIncidentsFail(dispatch, error))
  }

  const fetchIncidentsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR, 
      msg: error
    })
  }

  const fetchIncidentsSuccess = (dispatch, response) => {
    dispatch({ 
      type: FETCH_DASHBOARD_INCIDENTS, 
      data: c.data._embedded.incidents 
    })
  }
}

export const fetchBigIncidents = (params) => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`)
      .then(response => fetchBigIncidentsSuccess(dispatch, response))
      .catch(error => fetchBigIncidentsFail(dispatch, error))
  }

  const fetchBigIncidentsFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR, 
      msg: error
    })
  }

  const fetchBigIncidentsSuccess = (dispatch, response) => {
    dispatch({ 
      type: FETCH_DASHBOARD_BIGINCIDENTS, 
      data: response.data._embedded.incidents 
    })
  }
}
