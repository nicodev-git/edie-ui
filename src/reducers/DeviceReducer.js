import {
    FETCH_DEVICES,
    FETCH_DEVICE_INCIDENTS,
    ADD_DEVICE_INCIDENT,
    OPEN_ADD_DEVICE_INCIDENT,
    UPDATE_DEVICE_INCIDENT,
    CLOSE_ADD_DEVICE_INCIDENT,

    // FETCH_DEVICE_RULES,
    FETCH_DEVICE_WORKFLOWS,
    // FETCH_DEVICE_RAW_INCIDENTS,
    FETCH_DEVICE_EVENTS,
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

    OPEN_DEVICE_WORKFLOW_MODAL,
    CLOSE_DEVICE_WORKFLOW_MODAL,
    ADD_DEVICE_WORKFLOW,
    UPDATE_DEVICE_WORKFLOW,

    OPEN_DEVICE_RULE_MODAL,
    CLOSE_DEVICE_RULE_MODAL,

    FETCH_WORKFLOW_CATEGORIES,
    OPEN_WF_CATEGORY_MODAL,
    CLOSE_WF_CATEGORY_MODAL,
    ADD_WF_CATEGORY,

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

    // case FETCH_DEVICE_RULES:
    //   return { ...state, rules: action.data }

    case FETCH_DEVICE_WORKFLOWS:
      return { ...state, workflows: action.data }

    case OPEN_DEVICE_WORKFLOW_MODAL:
      return { ...state, workflowModalOpen: true, editWorkflow: action.data }

    case CLOSE_DEVICE_WORKFLOW_MODAL:
      return { ...state, workflowModalOpen: false }

    case ADD_DEVICE_WORKFLOW:
      return { ...state, workflows: concat(state.workflows || [], action.data) }

    case UPDATE_DEVICE_WORKFLOW:
      return { ...state, workflows: state.workflows.map(w => w.id === action.data.id ? action.data : w) }
    // case FETCH_DEVICE_RAW_INCIDENTS:
    //   return { ...state, rawIncidents: action.data }

    case OPEN_DEVICE_RULE_MODAL:
      return { ...state, ruleModalOpen: true, editRule: action.data }

    case CLOSE_DEVICE_RULE_MODAL:
      return { ...state, ruleModalOpen: false }

    case FETCH_DEVICE_EVENTS:
      return { ...state, events: action.data }

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

    case FETCH_WORKFLOW_CATEGORIES:
      return { ...state, workflowCategories: action.data }

    case OPEN_WF_CATEGORY_MODAL:
      return { ...state, wfCategoryModalOpen: true, editWfCategory: action.data }

    case CLOSE_WF_CATEGORY_MODAL:
      return { ...state, wfCategoryModalOpen: false }

    case ADD_WF_CATEGORY:
      return { ...state, workflowCategories: concat(state.workflowCategories, action.data) }
  }
  return state
}
