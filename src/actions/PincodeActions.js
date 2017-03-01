import axios from 'axios'
import {
  GENERATE_PINCODE,
  NO_AUTH_ERROR
} from './types'

import { apiError } from './Errors'
import { ROOT_URL } from './config'

export const generatePincode = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return function (dispatch) {
    axios.get(`${ROOT_URL}/genpin`)
      .then(response => generatePincodeSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const generatePincodeSuccess = (dispatch, response) => {
  dispatch({
    type: GENERATE_PINCODE,
    data: response.data
  })
}
