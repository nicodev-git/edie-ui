import {
  SEARCH_INCIDENTS,
  SEARCH_INCIDENT_DEVICES,
  UPDATE_DEVICE_INCIDENT,
  FIX_ALL_INCIDENTS_BY_TYPE,
  UPDATE_SEARCH_KEYWORD
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

    case UPDATE_SEARCH_KEYWORD: {
      const keyword = action.keyword || ''
      // const ex = /([^ ()]*)=([^ ()]*)/gi
      // const matches = keyword.match(ex) || []
      // const terms = matches.map(m => /([^ ()]*)=([^ ()]*)/gi.exec(m)[2])
      // if (terms.length === 0 && keyword) terms.push(keyword)
      // console.log(terms)
      return { ...state, keyword }
    }

  }
  return state
}
