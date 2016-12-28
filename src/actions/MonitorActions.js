import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  FETCH_MONITOR_TEMPLATES,
  ADD_MONITOR_TEMPLATE,
  UPDATE_MONITOR_TEMPLATE,
  DELETE_MONITOR_TEMPLATE,
  OPEN_MONITOR_TEMPLATE_MODAL,
  CLOSE_MONITOR_TEMPLATE_MODAL
} from './types'

import { apiError } from './errors'

import { ROOT_URL } from './config'

export const fetchMonitorTemplates = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/monitortemplate`)
      .then(response => fetchMonitorTemplatesSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }

  const fetchMonitorTemplatesSuccess = (dispatch, response) => {
    dispatch({
      type: FETCH_MONITOR_TEMPLATES, 
      data: response.data._embedded.monitorTemplates
    })
  }
}

export const addMonitorTemplate = (props) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/monitortemplate`, props)
      .then(response => addMonitorTemplateSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }

  const addMonitorTemplateSuccess = (dispatch, response) => {
    dispatch({
      type: ADD_MONITOR_TEMPLATE,
      data: response.data
    })
    dispatch(closeMonitorTplModal())
  }
}

export const updateMonitorTemplate = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateMonitorTemplateSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }

  const updateMonitorTemplateSuccess = (dispatch, response) => {
    dispatch({
      type: UPDATE_MONITOR_TEMPLATE,
      data: response.data
    })
    dispatch(closeMonitorTplModal())
  }
}

export const deleteMonitorTemplate = (entity) => {
  return (dispatch) => {
    axios.delete(entity._links.self.href, entity)
      .then(() => deleteMonitorTemplateSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }

  const deleteMonitorTemplateSuccess = (dispatch, entity) => {
    dispatch({
      type: DELETE_MONITOR_TEMPLATE,
      data: entity
    })
  }
}

export const openMonitorTplModal = (tpl) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_MONITOR_TEMPLATE_MODAL,
      data: tpl
    })
  }
}

export const closeMonitorTplModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MONITOR_TEMPLATE_MODAL
    })
  }
}
