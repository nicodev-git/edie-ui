import axios from 'axios'
import { ROOT_URL } from './config'
import {
  FETCH_TAGS,
  ADD_TAG,
  UPDATE_TAG,
  REMOVE_TAG,
  SELECT_TAG,

  API_ERROR
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

export function updateTag (entity) {
  return dispatch => {
    axios.put(entity._links.self.href, entity).then(({data}) => {
      dispatch({type: UPDATE_TAG, data})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function removeTag (entity) {
  return (dispatch) => {
    axios.delete(entity._links.self.href).then(() => {
      dispatch({type: REMOVE_TAG, entity})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function selectTag (tag) {
  return dispatch => {
    dispatch({type: SELECT_TAG, tag})
  }
}
