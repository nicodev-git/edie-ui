import axios from 'axios'
import { ROOT_URL } from './config'
import {
  FETCH_TAGS
} from './types'

export function fetchTags () {
  return dispatch => {
    axios.get(`${ROOT_URL}/tag`).then(res => {
      dispatch({type: FETCH_TAGS, data: res.data._embedded.tags})
    })
  }
}
