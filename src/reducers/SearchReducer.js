import {
  SEARCH_INCIDENTS,
  SEARCH_INCIDENT_DEVICES,
  UPDATE_DEVICE_INCIDENT,
  FIX_ALL_INCIDENTS_BY_TYPE,
  UPDATE_SEARCH_PARAMS
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SEARCH_INCIDENTS:
      return {...state, incidents: action.data}
    case UPDATE_DEVICE_INCIDENT: {
      const incidents = state.incidents.map(u => {
        if (u.id === action.data.id) return action.data
        return u
      })
      return {...state, incidents}
    }

    case SEARCH_INCIDENT_DEVICES: {
      return {...state, incidentDevices: action.data}
    }

    case FIX_ALL_INCIDENTS_BY_TYPE:
      return { ...state, incidentDraw: state.incidentDraw + 1 }

    case UPDATE_SEARCH_PARAMS: {
      return { ...state, params: action.params }
    }

  }
  return state
}
