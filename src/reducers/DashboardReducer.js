import {
    UPDATE_DASHBOARD, OPEN_DEVICE, CLOSE_DEVICE,
    FETCH_MAPS,
    ADD_MAP,
    UPDATE_MAP,
    REMOVE_MAP,
    CHANGE_MAP,
    OPEN_MAP_IMPORT_MODAL,
    CLOSE_MAP_IMPORT_MODAL,
    IMPORT_MAP,

    ADD_MAP_DEVICE,
    UPDATE_MAP_DEVICE,
    DELETE_MAP_DEVICE,

    ADD_MAP_LINE,
    UPDATE_MAP_LINE,
    DELETE_MAP_LINE,

    FETCH_MAP_DEVICES_LINES,

    FETCH_DASHBOARD_INCIDENTS,
    FETCH_DASHBOARD_BIGINCIDENTS,
    UPDATE_DEVICE_INCIDENT,

    FETCH_IMAGES,
    UPLOAD_IMAGE,

    FETCH_USER_INFO,
    UPDATE_USER_INFO,
    OPEN_PROFILE_MODAL,
    CLOSE_PROFILE_MODAL,

    OPEN_NEW_INCIDENT_MODAL,

    API_ERROR
} from '../actions/types'

import {concat, difference} from 'lodash'

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_DASHBOARD:
      return { ...state, ...action.data }

    case FETCH_MAPS:
      return { ...state, maps: action.data }

    case ADD_MAP: {
      const maps = concat(state.maps || [], action.data)
      return { ...state, maps }
    }

    case UPDATE_MAP: {
      const maps = state.maps.map(u => u.id === action.data.id ? action.data : u)
      return { ...state, maps }
    }

    case REMOVE_MAP: {
      let { maps, selectedMap } = state
      maps = maps.filter(u => u.id !== action.data.id)
      if (selectedMap && selectedMap.id === action.data.id) {
        selectedMap = maps.length ? maps[0] : null
      }
      return { ...state, maps, selectedMap }
    }

    case CHANGE_MAP:
      return { ...state, selectedMap: action.map }

    case OPEN_MAP_IMPORT_MODAL:
      return { ...state, mapImportModalVisible: true }

    case CLOSE_MAP_IMPORT_MODAL:
      return { ...state, mapImportModalVisible: false }

    case IMPORT_MAP: {
      const maps = concat(state.maps || [], action.data)
      return { ...state, maps }
    }

    case ADD_MAP_DEVICE: {
      const mapDevices = concat(state.mapDevices, action.data)
      return { ...state, mapDevices }
    }

    case UPDATE_MAP_DEVICE: {
      let mapDevices = state.mapDevices.map(u => {
        if (u.id === action.data.id) return action.data
        return u
      })

      let {selectedDevice} = state
      if (selectedDevice.id === action.data.id) selectedDevice = action.data

      return {...state, mapDevices, selectedDevice}
    }

    case DELETE_MAP_DEVICE: {
      const mapDevices = difference(state.mapDevices, state.mapDevices.filter(u => u.id === action.data.id))
      return { ...state, mapDevices }
    }

    case ADD_MAP_LINE: {
      const mapLines = concat(state.mapLines, action.data)
      return { ...state, mapLines }
    }

    case UPDATE_MAP_LINE: {
      let mapLines = state.mapLines.map(u => {
        if (u.id === action.data.id) return action.data
        return u
      })
      return {...state, mapLines}
    }

    case DELETE_MAP_LINE: {
      const mapLines = difference(state.mapLines, state.mapLines.filter(u => u.id === action.data.id))
      return { ...state, mapLines }
    }

    case OPEN_DEVICE:
      return { ...state, selectedDevice: action.data }

    case CLOSE_DEVICE:
      return { ...state, selectedDevice: null }

    case FETCH_MAP_DEVICES_LINES:
      return { ...state, mapDevices: action.maps, mapLines: action.lines }

    case FETCH_DASHBOARD_INCIDENTS:
      return { ...state, incidents: action.data }

    case FETCH_DASHBOARD_BIGINCIDENTS:
      return { ...state, bigIncidents: action.data }

    case UPDATE_DEVICE_INCIDENT: {
      const incidents = state.incidents.map(u => {
        if (u.id === action.data.id) return action.data
        return u
      })
      return { ...state, incidents }
    }

    case FETCH_IMAGES:
      return { ...state, images: action.data }

    case UPLOAD_IMAGE: {
      const images = concat(state.images, action.data)
      return { ...state, images }
    }

    case FETCH_USER_INFO:
      return { ...state, userInfo: action.data }

    case UPDATE_USER_INFO:
      return { ...state, userInfo: action.data }

    case OPEN_PROFILE_MODAL:
      return { ...state, profileModalVisible: true }

    case CLOSE_PROFILE_MODAL:
      return { ...state, profileModalVisible: false }

    case OPEN_NEW_INCIDENT_MODAL:
      return { ...state }

    case API_ERROR:
      console.log(action.msg)
      return { ...state }
  }
  return state
}

