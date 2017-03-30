import {
  SEARCH_INCIDENTS,
  SEARCH_INCIDENT_DEVICES,
  UPDATE_DEVICE_INCIDENT,
  FIX_ALL_INCIDENTS_BY_TYPE,
  UPDATE_SEARCH_PARAMS,
  UPDATE_SEARCH_FIELDS,
  OPEN_FIELDS_POPOVER,
  CLOSE_FIELDS_POPOVER,
  FETCH_FIELD_TOP_VALUES,
  UPDATE_QUERY_CHIPS,

  FETCH_SEARCH_OPTIONS,
  ADD_SEARCH_OPTION,
  UPDATE_SEARCH_OPTION,
  REMOVE_SEARCH_OPTION,

  OPEN_SEARCH_SAVE_POPOVER,
  CLOSE_SEARCH_SAVE_POPOVER
} from '../actions/types'
import { concat } from 'lodash'

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

    case UPDATE_SEARCH_PARAMS:
      return { ...state, params: action.params }

    case UPDATE_SEARCH_FIELDS:
      return { ...state, fields: action.data.filter(k => k.count > 0) }
    case OPEN_FIELDS_POPOVER:
      return { ...state, fieldPopoverOpen: true, selectedField: action.selectedField, anchorEl: action.anchorEl }
    case CLOSE_FIELDS_POPOVER:
      return { ...state, fieldPopoverOpen: false }

    case FETCH_FIELD_TOP_VALUES:
      return { ...state, fieldTopValues: action.data }
    case UPDATE_QUERY_CHIPS:
      return { ...state, queryChips: action.chips }

    case FETCH_SEARCH_OPTIONS:
      return { ...state, searchOptions: action.data }
    case ADD_SEARCH_OPTION:
      return { ...state, searchOptions: concat([], state.searchOptions, action.option) }
    case UPDATE_SEARCH_OPTION:
      return { ...state, searchOptions: state.searchOptions.map(u => u.id === action.option.id ? action.option : u) }
    case REMOVE_SEARCH_OPTION:
      return { ...state, searchOptions: state.searchOptions.filter(u => u.id !== action.option.id) }

    case OPEN_SEARCH_SAVE_POPOVER:
      return { ...state, savePopoverOpen: true, selectedOption: action.option, anchorEl: action.anchorEl }
    case CLOSE_SEARCH_SAVE_POPOVER:
      return { ...state, savePopoverOpen: false }
  }
  return state
}
