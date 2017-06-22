import axios from 'axios'
import { ROOT_URL } from './config'
import {
  SHOW_TAG_MODAL,
  FETCH_TAGS,
  ADD_TAG,
  UPDATE_TAG,
  REMOVE_TAG,
  SELECT_TAG,

  API_ERROR
} from './types'

export function showTagModal (visible, tag) {
  return dispatch => {
    dispatch({type: SHOW_TAG_MODAL, visible, tag})
  }
}

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
      dispatch(showTagModal(false))
    })
  }
}

export function updateTag (entity) {
  return dispatch => {
    axios.put(entity._links.self.href, entity).then(({data}) => {
      dispatch({type: UPDATE_TAG, data})
      dispatch(showTagModal(false))
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

export function selectTag (tags) {
  return dispatch => {
    dispatch({type: SELECT_TAG, tags})
  }
}
