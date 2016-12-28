import axios from 'axios'
import { assign, concat } from 'lodash'
import {
    FETCH_MESSAGE,
    FETCH_ATTACKERS,

    GENERATE_PINCODE,

    API_ERROR
} from './types'

import { ROOT_URL } from './config'

export const fetchMessage = () => {
  return (dispatch) => {
    let config = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': window.localStorage.getItem('token')
      }
    }
    axios.get(`${ROOT_URL}/api/me`, config)
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.username
      })
    })
// .catch(error => {
//    dispatch(authError(error));
// });
  }
}

export function fetchAttackers () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/attacker`, {
      params: { }
    }).then(response => {
      dispatch({ type: FETCH_ATTACKERS, data: response.data._embedded.attackers })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}



export function generatePincode () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/genpin`).then(response => {
      dispatch({type: GENERATE_PINCODE, data: response.data})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}


