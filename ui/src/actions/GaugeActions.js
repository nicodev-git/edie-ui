import axios from 'axios'
import {
  FETCH_GAUGES,
  FETCH_GAUGE_ITEMS,
  ADD_GAUGE_ITEM,
  UPDATE_GAUGE_ITEM,
  REMOVE_GAUGE_ITEM
} from './types'

import { apiError } from './Errors'

import { ROOT_URL } from './config'

export const fetchGauges = (cb) => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/gauge`).then(response => {
      dispatch({type: FETCH_GAUGES, data: response.data._embedded.gauges})
    }).catch(error => apiError(dispatch, error))
  }
}

export const fetchGaugeItems = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/gaugeitem`).then(res => {
      dispatch({type: FETCH_GAUGE_ITEMS, data: res.data._embedded.gaugeItems})
    })
  }
}

export const addGaugeItem = (props) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/gaugeitem`, props).then(res => {
      dispatch({type: ADD_GAUGE_ITEM, data: res.data})
    })
  }
}

export const updateGaugeItem = (entity) => {
  return dispatch => {
    axios.put(entity._links.self.href, entity).then(res => {
      dispatch({type: UPDATE_GAUGE_ITEM, data: res.data})
    })
  }
}

export const removeGaugeItem = (entity) => {
  return dispatch => {
    axios.delete(entity._links.self.href, entity).then(() => {
      dispatch({type: REMOVE_GAUGE_ITEM, data: entity})
    })
  }
}
