import {
    FETCH_DEVICES,
    FETCH_DEVICE_INCIDENTS,
    ADD_DEVICE_INCIDENT,
    OPEN_ADD_DEVICE_INCIDENT,
    UPDATE_DEVICE_INCIDENT,
    CLOSE_ADD_DEVICE_INCIDENT,

    FETCH_DEVICE_RULES,
    FETCH_DEVICE_RAW_INCIDENTS,
    FETCH_DEVICE_PHYSICAL_RULES,
    FETCH_DEVICE_BASIC_MONITORS,
    FETCH_DEVICE_MONITORS,
    FETCH_DEVICE_EVENTLOG,
    FETCH_DEVICE_APPS,
    FETCH_DEVICE_PROCESS,

    OPEN_DEVICE_MONITOR_PICKER,
    CLOSE_DEVICE_MONITOR_PICKER,

    OPEN_DEVICE_MONITOR_WIZARD,
    CLOSE_DEVICE_MONITOR_WIZARD,
    CLEAR_DEVICE_WIZARD_INITIAL_VALUES,

    OPEN_DEVICE_EDIT_MODAL,
    CLOSE_DEVICE_EDIT_MODAL,
    UPDATE_DEVICE_ERROR
} from '../actions/types'

import { concat } from 'lodash'

const INITIAL_STATE = { devices: [] }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DEVICES:
      return { ...state, devices: action.payload }

    case FETCH_DEVICE_INCIDENTS:
      return { ...state, incidents: action.data }

    case ADD_DEVICE_INCIDENT: {
      const incidents = concat(action.data, state.incidents || [])
      return { ...state, incidents }
    }

    case UPDATE_DEVICE_INCIDENT: {
      const incidents = state.incidents.map(u => {
        if (u.id === action.data.id) return action.data
        return u
      })
      return { ...state, incidents }
    }

    case OPEN_ADD_DEVICE_INCIDENT:
      return { ...state, addIncidentModalVisible: true }

    case CLOSE_ADD_DEVICE_INCIDENT:
      return { ...state, addIncidentModalVisible: false }

    case OPEN_DEVICE_MONITOR_PICKER:
      return { ...state, monitorPickerVisible: true }

    case CLOSE_DEVICE_MONITOR_PICKER:
      return { ...state, monitorPickerVisible: false }

    case OPEN_DEVICE_MONITOR_WIZARD:
      return { ...state, monitorWizardVisible: true, wizardInitialValues: action.data }

    case CLOSE_DEVICE_MONITOR_WIZARD:
      return { ...state, monitorWizardVisible: false, wizardInitialValues: null }

    case CLEAR_DEVICE_WIZARD_INITIAL_VALUES:
      return { ...state, wizardInitialValues: null }

    case FETCH_DEVICE_RULES:
      return { ...state, rules: action.data }

    case FETCH_DEVICE_RAW_INCIDENTS:
      return { ...state, rawIncidents: action.data }

    case FETCH_DEVICE_PHYSICAL_RULES:
      return { ...state, physicalRules: action.data }

    case FETCH_DEVICE_BASIC_MONITORS:
      return { ...state, basicMonitors: action.data }

    case FETCH_DEVICE_MONITORS:
      return { ...state, monitors: action.data }

    case FETCH_DEVICE_EVENTLOG:
      return { ...state, eventLogs: action.data }

    case FETCH_DEVICE_APPS:
      return { ...state, apps: action.data }

    case FETCH_DEVICE_PROCESS:
      return { ...state, processes: action.data }

    case OPEN_DEVICE_EDIT_MODAL:
      return { ...state, openModal: true, editDevice: action.device, updateDeviceError: '' }

    case CLOSE_DEVICE_EDIT_MODAL:
      return { ...state, openModal: false }

    case UPDATE_DEVICE_ERROR:
      return { ...state, updateDeviceError: action.msg }
  }
  return state
}
