import axios from 'axios'
import {
  FETCH_WORKFLOWS,
  ADD_WORKFLOW,
  UPDATE_WORKFLOW,
  REMOVE_WORKFLOW,
  OPEN_WORKFLOW_MODAL,
  CLOSE_WORKFLOW_MODAL
} from './types'

import { apiError } from './Errors'

import { ROOT_URL } from './config'

export const fetchWorkflows = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/workflow`)
      .then(response => fetchWorkflowsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchWorkflowsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_WORKFLOWS,
    data: response.data._embedded.workflows
  })
}

export const addWorkflow = (props) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/workflow`, props)
      .then(response => addWorkflowSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addWorkflowSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_WORKFLOW,
    data: response.data
  })
  dispatch(closeWorkflowModal())
}

export const updateWorkflow = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateWorkflowSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateWorkflowSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_WORKFLOW,
    data: response.data
  })
  dispatch(closeWorkflowModal())
}

export const removeWorkflow = (entity) => {
  return (dispatch) => {
    axios.delete(entity._links.self.href)
      .then(() => removeWorkflowSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const removeWorkflowSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_WORKFLOW,
    data: entity
  })
}

export const openWorkflowModal = (entity) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_WORKFLOW_MODAL,
      data: entity
    })
  }
}

export const closeWorkflowModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_WORKFLOW_MODAL
    })
  }
}
