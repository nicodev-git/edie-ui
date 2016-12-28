import axios from 'axios'
import { browserHistory } from 'react-router'
import { assign, concat } from 'lodash'
import {
  AUTH_USER,
  AUTH_ERROR,
  INVALIDATE_USER,
  FETCH_USER_INFO,
  UPDATE_USER_INFO,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL,

  API_ERROR
} from './types'

export function signUser ({ email, password }) {
  // //console.log('signUser', email, password);
  return function (dispatch) {
    //   let config = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-Requested-With': 'XMLHttpRequest'
    //     }
    //   }
    //   // //console.log(email, password);
    //   axios.post(`${ROOT_URL}/api/auth/login`,
    //     {
    //       username: email,
    //       password: password
    //     }, config
    //     )
    //     .then(response => {
    //       dispatch({type: AUTH_USER})
    //       // console.log('token:', response.data.token);
    //       window.localStorage.setItem('token', response.data.token)
    //
    //       browserHistory.push('/')
    //     })
    //     .catch(() => {
    //       dispatch({type: AUTH_ERROR, msg: 'Wrong credentials.'})
    //     })

    const api = new XMLHttpRequest() // eslint-disable-line no-undef
    api.onreadystatechange = () => {
      if (api.readyState === 4) {
        if (api.status !== 200) {
          dispatch({type: AUTH_ERROR, msg: 'Wrong credentials.'})
        } else {
          dispatch({type: AUTH_USER})
          window.localStorage.setItem('token', JSON.parse(api.responseText).token)

          browserHistory.push('/')
        }
      }
    }
    api.open('POST', `${ROOT_URL}/api/auth/login`, true)
    // api.setRequestHeader('Origin', ROOT_URL)
    api.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    api.send(JSON.stringify({
      username: email,
      password: password
    }))
  }
}

export function signOut () {
  window.localStorage.removeItem('token')
  return {
    type: INVALIDATE_USER
  }
}

export function signup ({ email, password }) {
  // console.log('signup', email, password);
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => {
        dispatch({type: AUTH_USER})
        window.localStorage.setItem('token', response.data.token)
        browserHistory.push('/feature')
      })
      .catch(error => {
        dispatch({type: AUTH_ERROR, msg: error})
      })
  }
}

export function fetchUserInfo () {
  return function (dispatch) {
    let config = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': window.localStorage.getItem('token')
      }
    }
    axios.get(`${ROOT_URL}/api/me`, config).then(response => {
      dispatch({ type: FETCH_USER_INFO, data: response.data }) // eslint-disable-line no-unused-vars
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function updateUserProfile (props) {
  return function (dispatch) {
    axios.put(`${ROOT_URL}/user/${props.id}`, props)
      .then(response => {
        dispatch({ type: UPDATE_USER_INFO, data: response.data })
        dispatch(closeProfileModal())
      })
      .catch(error => {
        dispatch({ type: API_ERROR, msg: error })
      })
  }
}

export function openProfileModal () {
  return function (dispatch) {
    dispatch({ type: OPEN_PROFILE_MODAL })
  }
}

export function closeProfileModal () {
  return function (dispatch) {
    dispatch({ type: CLOSE_PROFILE_MODAL })
  }
}
