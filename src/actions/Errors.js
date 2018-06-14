import {
  API_ERROR,
  UPDATE_DEVICE_ERROR,
  AUTH_ERROR,
  NO_AUTH_ERROR
} from './types'

export const apiError = (dispatch, error) => {
  console.log(error)
  dispatch({
    type: API_ERROR,
    msg: error
  })
}

export const updateDeviceError = (dispatch, error) => {
  dispatch({
    type: UPDATE_DEVICE_ERROR,
    msg: error
  })
}

export const authError = (dispatch, {response, message}) => {
  window.localStorage.removeItem('token')
  let msg = 'Wrong credentials.'
  if (response) {
    if (response.status === 503 || response.status === 504) msg = 'Can\'t connect please retry'
  } else if (message === 'Network Error') {
    msg = 'Can\'t connect please retry'
  }
  dispatch({
    type: AUTH_ERROR,
    msg
  })
}

export const noAuthError = (dispatch) => {
  window.localStorage.removeItem('token')
  dispatch({
    type: NO_AUTH_ERROR
  })
}
