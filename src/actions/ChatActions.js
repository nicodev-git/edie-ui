import axios from 'axios'
import {
  LOAD_CHAT_INCIDENTS,
  LOAD_CHAT_INCIDENT_USERS,
  UPLOAD_CHAT_IMAGE,
  SET_CHAT_INCIDENTS,
  SET_CHAT_ROOMS,
  SELECT_CHAT_INCIDENT
} from './types'

import { apiError } from './Errors'
import { showAlert } from '../components/shared/Alert'
import { ROOT_URL } from './config'
import { getAuthConfig, getParamsConfig } from './util'
import { encodeUrlParams } from 'shared/Global'

export const loadIncidents = (params, rooms) => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`)
      .then(response => loadIncidentsSuccess(dispatch, response, rooms))
      .catch(error => apiError(dispatch, error))
  }
}

const loadIncidentsSuccess = (dispatch, response, rooms) => {
  if (typeof response.data !== 'undefined') {
    const {incidents} = response.data._embedded
    incidents.forEach(item => {
      rooms[item.id] = {
        unread: item.unread || 0,
        lastMsgId: 0,
        messages: [],
        timerScroll: 0,
        timerSync: 0,
        usersTyping: [],
        userNamesTyping: [],
        joined: false
      }
    })

    dispatch({
      type: LOAD_CHAT_INCIDENTS,
      incidents,
      rooms: rooms
    })
  }
}

export const loadIncidentUsers = (params) => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/chat/users`, getParamsConfig(params))
      .then(response => loadIncidentUsersSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const loadIncidentUsersSuccess = (dispatch, response) => {
  if (response.success) {
    let roomUsers = response.object.map(user => {
      return {
        'timerTyping': 0,
        'pictureId': user.pictureId,
        'userId': user.userId,
        'userName': user.userName,
        'fullName': user.fullName,
        'online': user.online
      }
    })

    dispatch({
      type: LOAD_CHAT_INCIDENT_USERS,
      roomUsers: roomUsers
    })
  }
}

export const uploadChatImage = (data) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/api/upload/uploadImage`, data, getAuthConfig())
      .then(response => uploadImageSuccess(dispatch, response))
      .catch(error => uploadError(dispatch, error))
  }
}

const uploadError = (dispatch, error) => {
  apiError(dispatch, error)
  showAlert('Failed to load')
}

const uploadImageSuccess = (dispatch, response) => {
  if (typeof response.error === 'undefined' && response.success) {
    dispatch({
      type: UPLOAD_CHAT_IMAGE,
      image: response.info
    })
  } else {
    showAlert('Failed to load')
  }
}

export const setIncidents = (incidents) => {
  return (dispatch) => {
    dispatch({
      type: SET_CHAT_INCIDENTS,
      incidents: incidents
    })
  }
}

export const setRoomUsers = (roomUsers) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_CHAT_INCIDENT_USERS,
      roomUsers: roomUsers
    })
  }
}

export const setRooms = (rooms) => {
  return (dispatch) => {
    dispatch({
      type: SET_CHAT_ROOMS,
      rooms: rooms
    })
  }
}

export const selectIncident = (incident, rooms) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_CHAT_INCIDENT,
      selected: incident,
      rooms: rooms
    })
  }
}
