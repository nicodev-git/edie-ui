import axios from 'axios'
import { ROOT_URL } from './config'
import {
  FETCH_TAGS,
  ADD_TAG,
  SELECT_TAG
} from './types'

export function fetchTags () {
  return dispatch => {
    axios.get(`${ROOT_URL}/tag`).then(res => {
      dispatch({type: FETCH_TAGS, data: res.data._embedded.tags})
    })
  }
}

export function addTag (props) {
  return dispatch => {
    axios.post(`${ROOT_URL}/tag`, props).then(res => {
      dispatch({type: ADD_TAG, data: res.data})
    })
  }
}

export function selectTag (tag) {
  return dispatch => {
    dispatch({type: SELECT_TAG, tag})
  }
}
