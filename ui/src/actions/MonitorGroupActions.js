import axios from 'axios'
import {
  FETCH_MONITOR_GROUPS,
  SHOW_MONITOR_GROUPS_MODAL,
  SHOW_MONITOR_GROUP_MODAL,
  ADD_MONITOR_GROUP
} from './types'

import { apiError } from './Errors'
import { ROOT_URL } from './config'

export const fetchMonitorGroups = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/monitorgroup?size=1000`).then(response => {
      dispatch({type: FETCH_MONITOR_GROUPS, data: response.data._embedded.monitorGroups})
    }).catch(error => apiError(dispatch, error))
  }
}

export const addMonitorGroup = (props) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/monitorgroup`, props).then(res => {
      dispatch({type: ADD_MONITOR_GROUP, data: res.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const showMonitorGroupsModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_MONITOR_GROUPS_MODAL, visible})
  }
}

export const showMonitorGroupModal = (visible, data) => {
  return dispatch => {
    dispatch({type: SHOW_MONITOR_GROUP_MODAL, visible, data})
  }
}
