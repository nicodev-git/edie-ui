import {
    FETCH_DEVICE_TEMPLATES,
    ADD_DEVICE_TEMPLATE,
    UPDATE_DEVICE_TEMPLATE,
    DELETE_DEVICE_TEMPLATE,
    OPEN_DEVICE_TEMPLATE_MODAL,
    CLOSE_DEVICE_TEMPLATE_MODAL,

    FETCH_MONITOR_TEMPLATES,
    ADD_MONITOR_TEMPLATE,
    UPDATE_MONITOR_TEMPLATE,
    DELETE_MONITOR_TEMPLATE,
    OPEN_MONITOR_TEMPLATE_MODAL,
    CLOSE_MONITOR_TEMPLATE_MODAL,

    OPEN_TPL_IMAGE_MODAL,
    CLOSE_TPL_IMAGE_MODAL,

    FETCH_ENV_VARS,
    ADD_ENV_VAR,
    UPDATE_ENV_VAR,

    FETCH_IDENTITIES,
    ADD_IDENTITY,
    UPDATE_IDENTITY,
    REMOVE_IDENTITY,
    OPEN_IDENTITY_MODAL,
    CLOSE_IDENTITY_MODAL,

    FETCH_CREDENTIALS,
    ADD_CREDENTIALS,
    UPDATE_CREDENTIALS,
    REMOVE_CREDENTIALS,
    OPEN_CREDENTIALS_MODAL,
    CLOSE_CREDENTIALS_MODAL,

    FETCH_WORKFLOWS,
    ADD_WORKFLOW,
    UPDATE_WORKFLOW,
    REMOVE_WORKFLOW,
    OPEN_WORKFLOW_MODAL,
    CLOSE_WORKFLOW_MODAL,

    FETCH_SETTING_MAPS,
    ADD_SETTING_MAP,
    UPDATE_SETTING_MAP,
    REMOVE_SETTING_MAP,
    OPEN_SETTING_MAP_MODAL,
    CLOSE_SETTING_MAP_MODAL,
    OPEN_MAP_USERS_MODAL,
    CLOSE_MAP_USERS_MODAL,
    FETCH_MAP_USERS,
    ADD_MAP_USER,
    REMOVE_MAP_USER,

    FETCH_SETTING_USERS,
    ADD_SETTING_USER,
    UPDATE_SETTING_USER,
    REMOVE_SETTING_USER,
    OPEN_SETTING_USER_MODAL,
    CLOSE_SETTING_USER_MODAL,
    OPEN_USER_PASSWORD_MODAL,
    CLOSE_USER_PASSWORD_MODAL,

    FETCH_PARSER_TYPES,
    ADD_PARSER_TYPE,
    UPDATE_PARSER_TYPE,
    REMOVE_PARSER_TYPE,
    OPEN_PARSER_TYPE_MODAL,
    CLOSE_PARSER_TYPE_MODAL,
    OPEN_PARSER_PATTERN_MODAL,
    CLOSE_PARSER_PATTERN_MODAL,
    OPEN_SIMULATION_MODAL,
    CLOSE_SIMULATION_MODAL,

    FETCH_DEVICE_CATEGORIES

} from '../actions/types'

import {concat, difference} from 'lodash'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_DEVICE_TEMPLATES:
      return { ...state, deviceTemplates: action.data }

    case ADD_DEVICE_TEMPLATE: {
      const deviceTemplates = concat(state.deviceTemplates || [], action.data)
      return { ...state, deviceTemplates }
    }

    case UPDATE_DEVICE_TEMPLATE: {
      let deviceTemplates = state.deviceTemplates.map(u => u.id === action.data.id ? action.data : u)
      return {...state, deviceTemplates}
    }

    case DELETE_DEVICE_TEMPLATE: {
      const deviceTemplates = difference(state.deviceTemplates,
                state.deviceTemplates.filter(u => u.id === action.data.id))
      return {...state, deviceTemplates}
    }

    case OPEN_DEVICE_TEMPLATE_MODAL:
      return { ...state, deviceTplModalVisible: true, deviceTpl: action.data, selectedTplImage: null }

    case CLOSE_DEVICE_TEMPLATE_MODAL:
      return { ...state, deviceTplModalVisible: false }

    case FETCH_MONITOR_TEMPLATES:
      return { ...state, monitorTemplates: action.data }

    case ADD_MONITOR_TEMPLATE: {
      const monitorTemplates = concat(state.monitorTemplates || [], action.data)
      return { ...state, monitorTemplates }
    }

    case UPDATE_MONITOR_TEMPLATE: {
      let monitorTemplates = state.monitorTemplates.map(
                u => u.id === action.data.id ? action.data : u)
      return { ...state, monitorTemplates }
    }

    case DELETE_MONITOR_TEMPLATE: {
      const monitorTemplates = difference(state.monitorTemplates,
                state.monitorTemplates.filter(u => u.id === action.data.id))
      return { ...state, monitorTemplates }
    }

    case OPEN_MONITOR_TEMPLATE_MODAL:
      return { ...state, monitorTplModalVisible: true, monitorTpl: action.data, selectedTplImage: null }

    case CLOSE_MONITOR_TEMPLATE_MODAL:
      return { ...state, monitorTplModalVisible: false }

    case OPEN_TPL_IMAGE_MODAL:
      return { ...state, tplImageModalVisible: true }

    case CLOSE_TPL_IMAGE_MODAL:
      return { ...state, tplImageModalVisible: false, selectedTplImage: action.data || state.selectedTplImage }

    case FETCH_SETTING_MAPS:
      return { ...state, maps: action.data }

    case OPEN_SETTING_MAP_MODAL:
      return { ...state, mapModalVisible: true, editMap: action.data }

    case CLOSE_SETTING_MAP_MODAL:
      return { ...state, mapModalVisible: false }

    case OPEN_MAP_USERS_MODAL:
      return { ...state, mapUsersModalVisible: true, editMap: action.data, mapUsers: [] }

    case CLOSE_MAP_USERS_MODAL:
      return { ...state, mapUsersModalVisible: false }

    case FETCH_MAP_USERS:
      return { ...state, mapUsers: action.data }

    case ADD_MAP_USER: {
      const mapUsers = concat(state.mapUsers || [], action.data)
      return { ...state, mapUsers }
    }

    case REMOVE_MAP_USER: {
      const mapUsers = state.mapUsers.filter(u => u.id !== action.data.id)
      return { ...state, mapUsers }
    }

    case ADD_SETTING_MAP: {
      const maps = concat(state.maps || [], action.data)
      return { ...state, maps }
    }

    case UPDATE_SETTING_MAP: {
      const maps = state.maps.map(u => u.id === action.data.id ? action.data : u)
      return { ...state, maps }
    }

    case REMOVE_SETTING_MAP: {
      let { maps } = state
      maps = maps.filter(u => u.id !== action.data.id)
      return { ...state, maps }
    }

        // ///////////////////////////////////////////////////

    case FETCH_ENV_VARS:
      return { ...state, envVars: action.data, envVarAvailable: true }

    case ADD_ENV_VAR: {
      const envVars = concat(state.envVars || [], action.data)
      return { ...state, envVars }
    }

    case UPDATE_ENV_VAR: {
      const envVars = state.envVars.map(u => u.id === action.data.id ? action.data : u)
      return { ...state, envVars }
    }

    case FETCH_IDENTITIES:
      return { ...state, identities: action.data }

    case ADD_IDENTITY: {
      const identities = concat(state.identities || [], action.data)
      return { ...state, identities }
    }

    case UPDATE_IDENTITY: {
      const identities = state.identities.map(u => u.id === action.data.id ? action.data : u)
      return { ...state, identities }
    }

    case REMOVE_IDENTITY: {
      const identities = state.identities.filter(u => u.id !== action.data.id)
      return { ...state, identities }
    }

    case OPEN_IDENTITY_MODAL: {
      return { ...state, identityModalVisible: true, editIdentity: action.data }
    }

    case CLOSE_IDENTITY_MODAL: {
      return { ...state, identityModalVisible: false }
    }

        // ///////////////////////////////////////////////////

    case FETCH_CREDENTIALS:
      return { ...state, credentials: action.data }

    case ADD_CREDENTIALS: {
      const credentials = concat(state.credentials || [], action.data)
      return { ...state, credentials }
    }

    case UPDATE_CREDENTIALS: {
      const credentials = state.credentials.map(u => u.id === action.data.id ? action.data : u)
      return { ...state, credentials }
    }

    case REMOVE_CREDENTIALS: {
      const credentials = state.credentials.filter(u => u.id !== action.data.id)
      return { ...state, credentials }
    }

    case OPEN_CREDENTIALS_MODAL: {
      return { ...state, credentialsModalVisible: true, editCredentials: action.data }
    }

    case CLOSE_CREDENTIALS_MODAL: {
      return { ...state, credentialsModalVisible: false }
    }

        // ///////////////////////////////////////////////////

    case FETCH_WORKFLOWS:
      return { ...state, workflows: action.data }

    case ADD_WORKFLOW: {
      const workflows = concat(state.workflows || [], action.data)
      return { ...state, workflows }
    }

    case UPDATE_WORKFLOW: {
      const workflows = state.workflows.map(u => u.id === action.data.id ? action.data : u)
      return { ...state, workflows }
    }

    case REMOVE_WORKFLOW: {
      const workflows = state.workflows.filter(u => u.id !== action.data.id)
      return { ...state, workflows }
    }

    case OPEN_WORKFLOW_MODAL: {
      return { ...state, workflowModalVisible: true, editWorkflow: action.data }
    }

    case CLOSE_WORKFLOW_MODAL: {
      return { ...state, workflowModalVisible: false }
    }

        // ///////////////////////////////////////////////////

    case FETCH_SETTING_USERS:
      return { ...state, users: action.data }

    case OPEN_SETTING_USER_MODAL:
      return { ...state, userModalVisible: true, editUser: action.data, editUserPin: '' }

    case CLOSE_SETTING_USER_MODAL:
      return { ...state, userModalVisible: false }

    case ADD_SETTING_USER: {
      const users = concat(state.users || [], action.data)
      return { ...state, users }
    }

    case UPDATE_SETTING_USER: {
      const users = state.users.map(u => u.id === action.data.id ? action.data : u)
      return { ...state, users }
    }

    case REMOVE_SETTING_USER: {
      let { users } = state
      users = users.filter(u => u.id !== action.data.id)
      return { ...state, users }
    }

    case OPEN_USER_PASSWORD_MODAL:
      return { ...state, userPasswordModalVisible: true }

    case CLOSE_USER_PASSWORD_MODAL:
      return { ...state, userPasswordModalVisible: false }

    case FETCH_PARSER_TYPES:
      return { ...state, parserTypes: action.data }

    case ADD_PARSER_TYPE:
    case UPDATE_PARSER_TYPE:
    case REMOVE_PARSER_TYPE:
      return { ...state, parserTypeDraw: state.parserTypeDraw + 1 }

    case OPEN_PARSER_TYPE_MODAL:
      return { ...state, parserTypeModalOpen: true, editParserType: action.data }

    case CLOSE_PARSER_TYPE_MODAL:
      return { ...state, parserTypeModalOpen: false }

    case OPEN_PARSER_PATTERN_MODAL:
      return { ...state, parserPatternModalOpen: true, editParserPattern: action.data }

    case CLOSE_PARSER_PATTERN_MODAL:
      return { ...state, parserPatternModalOpen: false }

    case OPEN_SIMULATION_MODAL:
      return { ...state, simulationModalOpen: true }

    case CLOSE_SIMULATION_MODAL:
      return { ...state, simulationModalOpen: false }

    case FETCH_DEVICE_CATEGORIES:
      return { ...state, deviceCategories: action.data }
  }
  return state
}
