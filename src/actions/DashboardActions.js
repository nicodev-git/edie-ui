import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  UPDATE_DASHBOARD,

  FETCH_DASHBOARD_INCIDENTS,
  FETCH_DASHBOARD_BIGINCIDENTS
} from './types'

import { apiError } from './errors'

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
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident`, { params: { } })
      .then(response => fetchIncidentsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
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
      .catch(error => apiError(dispatch, error))
  }

  const fetchBigIncidentsSuccess = (dispatch, response) => {
    dispatch({ 
      type: FETCH_DASHBOARD_BIGINCIDENTS, 
      data: response.data._embedded.incidents 
    })
  }
}
