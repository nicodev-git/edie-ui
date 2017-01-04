import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  AUTH_USER,
  INVALIDATE_USER,
  FETCH_USER_INFO,
  UPDATE_USER_INFO,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL
} from './types'

import { apiError, authError } from './Errors'

import { ROOT_URL } from './config'

export const signUser = ({ email, password }) => {
  return (dispatch) => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
    axios.post(`${ROOT_URL}/api/auth/login`,
      {
        username: email,
        password: password
      },
      config
    )
    .then(response => signUserSuccess(dispatch, response))
    .catch(() => authError(dispatch))
  }
}

const signUserSuccess = (dispatch, response) => {
  dispatch({
    type: AUTH_USER
  })
  window.localStorage.setItem('token', response.data.token)
  browserHistory.push('/')
}

export const signOut = () => {
  window.localStorage.removeItem('token')
  return {
    type: INVALIDATE_USER
  }
}

export const signup = ({ email, password }) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => signupSuccess(dispatch, response))
      .catch(error => authError(dispatch, error))
  }
}

const signupSuccess = (dispatch, response) => {
  console.log(response)
  dispatch({
    type: AUTH_USER
  })
  window.localStorage.setItem('token', response.data.token)
  browserHistory.push('/feature')
}

export const fetchUserInfo = () => {
  return (dispatch) => {
    let config = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': window.localStorage.getItem('token')
      }
    }
    axios.get(`${ROOT_URL}/api/me`, config)
      .then(response => fetchUserInfoSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchUserInfoSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_USER_INFO,
    data: response.data
  })
}

export const updateUserProfile = (props) => {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/user/${props.id}`, props)
      .then(response => updateUserProfileSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateUserProfileSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_USER_INFO,
    data: response.data
  })
  dispatch(closeProfileModal())
}

export const openProfileModal = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_PROFILE_MODAL
    })
  }
}

export const closeProfileModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_PROFILE_MODAL
    })
  }
}
