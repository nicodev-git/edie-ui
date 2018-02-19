import axios from 'axios'
import {
  AUTH_USER,
  INVALIDATE_USER,
  FETCH_USER_INFO,
  UPDATE_USER_INFO,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL,
  CHANGE_PROFILE_IMG,
  OPEN_ACTIVATION_MODAL,
  CLOSE_ACTIVATION_MODAL,
  ACTIVATE_USER,
  ACTIVATE_MSG,

  AUTH_ERROR
} from './types'

import { apiError, authError } from './Errors'

import { ROOT_URL, SRA_URL } from './config'
import { getAuthConfig, getRequestConfig } from './util'

export const signUser = ({ email, password }, redirect, history) => {
  return (dispatch) => {
    dispatch({type: AUTH_ERROR, msg: ''})
    axios.post(`${SRA_URL}/api/auth/login`,
      {
        username: email,
        password: password
      },
      getRequestConfig()
    )
    .then(response => signUserSuccess(dispatch, response, redirect, history))
    .catch((res) => authError(dispatch, res))
  }
}

const signUserSuccess = (dispatch, response, redirect, history) => {
  dispatch({
    type: AUTH_USER
  })
  window.localStorage.setItem('token', response.data.token)
  if (redirect) {
    try {
      const loc = JSON.parse(redirect)
      history.push({
        pathname: loc.p,
        search: loc.q
      })
      dispatch(fetchUserInfo())
      return
    } catch (e) {

    }
  }

  dispatch(fetchUserInfo(user => {
    if ((user.defaultPage || 'dashboard') === 'dashboard') {
      history.push('/dashboard/servers')
      return
    }
    history.push('/')
  }))
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
  // browserHistory.push('/feature')
}

export const fetchUserInfo = (cb) => {
  return (dispatch) => {
    axios.get(`${SRA_URL}/api/getUserInfo`, getAuthConfig())
      .then(response => fetchUserInfoSuccess(dispatch, response, cb))
      .catch(error => authError(dispatch, error))
  }
}

const fetchUserInfoSuccess = (dispatch, response, cb) => {
  axios.get(`${SRA_URL}/user/${response.data.id}`).then(res => {
    dispatch({
      type: FETCH_USER_INFO,
      data: res.data
    })
    cb && cb(res.data)
  }).catch(error => authError(dispatch, error))
}

export const updateUserProfile = (props) => {
  return (dispatch) => {
    axios.put(`${SRA_URL}/user/${props.id}`, props)
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

export function changeProfileImg (img) {
  return dispatch => {
    dispatch({type: CHANGE_PROFILE_IMG, img})
  }
}

export function activateUser (params) {
  return dispatch => {
    dispatch({type: ACTIVATE_MSG, msg: ''})
    axios.get(`${ROOT_URL}/activate`, {params}).then(response => {
      const res = response.data
      if (res.success) {
        dispatch({type: ACTIVATE_USER})
        dispatch(closeActivationModal())
      } else {
        dispatch({type: ACTIVATE_MSG, msg: res.info})
      }
    }).catch(e => {
      console.log(e)
      dispatch({type: ACTIVATE_MSG, msg: 'Server connection failed.'})
    })
  }
}

export function openActivationModal () {
  return dispatch => {
    dispatch({type: OPEN_ACTIVATION_MODAL})
  }
}

export function closeActivationModal () {
  return dispatch => {
    dispatch({type: CLOSE_ACTIVATION_MODAL})
  }
}

export const addAudit = (userId, fullname, action) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/useraudit`, {
      userId,
      fullname,
      action
    })
  }
}
