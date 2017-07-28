import axios from 'axios'
import {
  FETCH_GAUGES
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
