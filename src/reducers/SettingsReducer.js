import {
  FETCH_DEVICE_TEMPLATES,
  ADD_DEVICE_TEMPLATE,
  UPDATE_DEVICE_TEMPLATE,
  DELETE_DEVICE_TEMPLATE,
  OPEN_DEVICE_TEMPLATE_MODAL,
  CLOSE_DEVICE_TEMPLATE_MODAL,
  SELECT_DEVICE_TEMPLATE,
  UPDATE_DEVICE_TEMPLATE_MONITORS,
  FETCH_DEVICE_TPL_WORKFLOWS,

  SHOW_DEVICE_TPL_TAG_MODAL,
  ADD_DEVICE_TPL_TAG,
  REMOVE_DEVICE_TPL_TAG,

  SELECT_TPL_WF_ROW,
  SHOW_WF_SELECT_MODAL,
  ADD_DEVICE_TPL_WF,
  REMOVE_DEVICE_TPL_WF,

  FETCH_MONITOR_TEMPLATES,
  ADD_MONITOR_TEMPLATE,
  UPDATE_MONITOR_TEMPLATE,
  DELETE_MONITOR_TEMPLATE,
  OPEN_MONITOR_TEMPLATE_MODAL,
  CLOSE_MONITOR_TEMPLATE_MODAL,
  SHARE_MONITOR_TEMPLATE,

  SHOW_MONITOR_TPL_TAG_MODAL,
  UPDATE_MONITOR_TPL_TAGS,
  SHOW_MONITOR_TPL_CREDTYPE_PICKER,
  UPDATE_MONITOR_TPL_CREDTYPES,

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
  SELECT_CREDS,
  SHOW_CRED_LIST_MODAL,

  FETCH_WORKFLOW,
  FETCH_WORKFLOWS,
  ADD_WORKFLOW,
  UPDATE_WORKFLOW,
  REMOVE_WORKFLOW,
  OPEN_WORKFLOW_MODAL,
  CLOSE_WORKFLOW_MODAL,
  UPDATE_WORKFLOW_EDIT_TYPE,
  SHARE_WORKFLOW,
  OPEN_DEVICE_WORKFLOW_MODAL,

  SHOW_WF_TAG_MODAL,
  ADD_WORKFLOW_TAG,
  REMOVE_WORKFLOW_TAG,

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
  SELECT_USER_ROLES,
  SELECT_USER_PERMISSIONS,

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
  UPDATE_MATCH_RESULT,
  UPDATE_PARSE_RESULT,
  SHOW_FILTER_EDIT_MODAL,
  SHOW_PATTERN_EDIT_MODAL,
  UPDATE_SIM_PARSER_TYPE,
  SHOW_PT_TAG_MODAL,
  ADD_PT_TAG,
  REMOVE_PT_TAG,

  SYNC_DATA,
  SHOW_IMPORT_SYNC_MODAL,

  SHOW_COLLECTOR_MODAL,
  ADD_COLLECTOR,
  UPDATE_COLLECTOR,
  REMOVE_COLLECTOR,
  FETCH_COLLECTORS,

  SHOW_AGENT_MODAL,
  ADD_AGENT,
  UPDATE_AGENT,
  REMOVE_AGENT,
  FETCH_AGENTS,
  SHOW_AGENT_PRELOADER,
  UPDATE_AGENT_INSTALL,
  ADD_AGENT_INSTALL,
  CLEAR_AGENT_INSTALL,

  SHOW_CRED_TYPE_MODAL,
  ADD_CRED_TYPE,
  UPDATE_CRED_TYPE,
  REMOVE_CRED_TYPE,
  FETCH_CRED_TYPES,
  SELECT_CRED_TYPE,

  FETCH_DEVICE_CATEGORIES,
  TOGGLE_MAP_USER,

  SHOW_SIMULATION_MODAL,

  FETCH_MONITOR_GROUPS,
  SHOW_MONITOR_GROUPS_MODAL,
  SHOW_MONITOR_GROUP_MODAL,
  ADD_MONITOR_GROUP,
  UPDATE_MONITOR_GROUP,
  UPDATE_MONITOR_GROUPS,
  REMOVE_MONITOR_GROUP,

  FETCH_LOG_FILTERS,
  ADD_LOG_FILTER,
  UPDATE_LOG_FILTER,
  REMOVE_LOG_FILTER,
  SHOW_LOG_FILTERS_MODAL,

  SHOW_DEVICE_CREDS_PICKER,

  FETCH_ROLES,
  UPDATE_ROLE,
  FETCH_PERMISSIONS,

  SHOW_WF_PARAM_MODAL,
  ADD_WF_PARAM,
  UPDATE_WF_PARAM,
  REMOVE_WF_PARAM,

  FETCH_BRAIN_CELLS,
  ADD_BRAIN_CELL,
  UPDATE_BRAIN_CELL,
  REMOVE_BRAIN_CELL,
  SHOW_BRAIN_CELL_MODAL,
  SHOW_SCRIPT_MODAL,
  SHOW_GROK_MODAL,
  SHOW_CELL_PARAM_MODAL,

  SHOW_USER_CONNECTOR_MODAL,

  FETCH_VENDOR_PRODUCTS,
  ADD_VENDOR_PRODUCT,
  UPDATE_VENDOR_PRODUCT,
  REMOVE_VENDOR_PRODUCT,

  FETCH_PRODUCT_TYPES,
  ADD_PRODUCT_TYPE,
  UPDATE_PRODUCT_TYPE,
  REMOVE_PRODUCT_TYPE,

  FETCH_PRODUCT_VENDORS,
  ADD_PRODUCT_VENDOR,
  UPDATE_PRODUCT_VENDOR,
  REMOVE_PRODUCT_VENDOR,

  FETCH_TIMEZONE
} from 'actions/types'

import {concat, difference, findIndex, keys, sortBy} from 'lodash'

const initialState = {
  envVarAvailable: false,
  envVars: [],
  identities: [],
  credentials: [],
  credentialDraw: 1,

  deviceCategories: [],
  deviceTemplates: [],
  monitorTemplates: [],
  tplImageModalVisible: false,
  selectedDeviceMonitors: [],
  editTplWorkflows: [],

  maps: [],
  editMap: null,

  editUser: null,
  editUserPin: '',

  parserTypeDraw: 1,
  parserTypes: [],
  editParserTypeTags: [],

  workflows: [],
  editWorkflowTags: [],
  editWfParams: [],

  monitorTplTags: [],
  monitorTplCredTypes: [],

  collectorDraw: 1,
  agentDraw: 1,
  credentialTypeDraw: 1,
  credentialTypes: [],

  agents: [],
  installAgents: [],
  collectors: [],

  users: [],
  mapUsers: [],
  monitorGroups: [],

  logFilters: [],

  roles: [],
  permissions: [],

  brainCells: [],

  vendorProducts: [],
  productTypes: [],
  productVendors: [],

  workflowDraw: 1,

  timezoneOffset: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DEVICE_TEMPLATES:
      return { ...state, deviceTemplates: action.data }
    case SELECT_DEVICE_TEMPLATE: {
      const deviceTpl = action.tpl
      const editDeviceTplTags = deviceTpl ? (deviceTpl.tags || []) : []
      return { ...state, selectedDeviceTpl: deviceTpl, selectedDeviceMonitors: (action.tpl ? action.tpl.monitors : []) || [], editTplWorkflows: [], editDeviceTplTags }
    }

    case UPDATE_DEVICE_TEMPLATE_MONITORS:
      return { ...state, selectedDeviceMonitors: action.monitors }
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
    case OPEN_DEVICE_TEMPLATE_MODAL: {
      const deviceTpl = action.data
      const editDeviceTplTags = deviceTpl ? (deviceTpl.tags || []) : []
      const editTplWorkflows = []
      return { ...state, deviceTplModalVisible: true, deviceTpl, selectedTplImage: null, editDeviceTplTags, editTplWorkflows }
    }

    case CLOSE_DEVICE_TEMPLATE_MODAL:
      return { ...state, deviceTplModalVisible: false, deviceTpl: null }

    case FETCH_DEVICE_TPL_WORKFLOWS:
      return { ...state, editTplWorkflows: action.data || [] }
    case SELECT_TPL_WF_ROW:
      return { ...state, selectedRowWf: action.workflow }
    case SHOW_WF_SELECT_MODAL:
      return { ...state, wfSelectModalOpen: action.visible, selectedRowWf: null }
    case ADD_DEVICE_TPL_WF:
      return { ...state, editTplWorkflows: concat(state.editTplWorkflows || [], action.workflow) }
    case REMOVE_DEVICE_TPL_WF:
      return { ...state, editTplWorkflows: state.editTplWorkflows.filter(m => m.id !== action.workflow.id) }

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
      return {...state, monitorTemplates}
    }
    case OPEN_MONITOR_TEMPLATE_MODAL: {
      const monitorTpl = action.data
      const monitorTplTags = monitorTpl ? (monitorTpl.tags || []) : []
      const monitorTplCredTypes = monitorTpl ? (monitorTpl.credentialTypes || []) : []
      return { ...state, monitorTplModalVisible: true, monitorTpl, selectedTplImage: null, monitorTplTags, monitorTplCredTypes }
    }
    case CLOSE_MONITOR_TEMPLATE_MODAL:
      return { ...state, monitorTplModalVisible: false }
    case OPEN_TPL_IMAGE_MODAL:
      return { ...state, tplImageModalVisible: true }
    case CLOSE_TPL_IMAGE_MODAL:
      return { ...state, tplImageModalVisible: false, selectedTplImage: action.data || state.selectedTplImage }
    case SHARE_MONITOR_TEMPLATE:
      return { ...state, shareMonitorTplResult: action.data }

    case FETCH_SETTING_MAPS:
      return { ...state, maps: action.data }

    case OPEN_SETTING_MAP_MODAL:
      return { ...state, mapModalVisible: true, editMap: action.data, mapUsers: action.data ? (action.data.users || []) : [] }

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
      return { ...state, credentials, credentialDraw: state.credentialDraw + 1 }
    }

    case REMOVE_CREDENTIALS: {
      const credentials = state.credentials.filter(u => u.id !== action.data.id)
      return { ...state, credentials }
    }

    case SHOW_DEVICE_CREDS_PICKER:
      return { ...state, editCredentials: action.data }

    case OPEN_CREDENTIALS_MODAL: {
      return { ...state, credentialsModalVisible: true, editCredentials: action.data }
    }

    case CLOSE_CREDENTIALS_MODAL: {
      return { ...state, credentialsModalVisible: false }
    }

    case SELECT_CREDS:
      return { ...state, selectedCreds: action.creds }

    case SHOW_CRED_LIST_MODAL:
      return { ...state, credListModalOpen: action.visible }

    // ///////////////////////////////////////////////////

    case FETCH_WORKFLOW:{
      return { ...state, editWfParams: [] }
    }
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
      return { ...state, workflows, workflowDraw: state.workflowDraw + 1 }
    }

    case OPEN_WORKFLOW_MODAL: {
      const editWorkflow = action.data
      const editWorkflowTags = editWorkflow ? (editWorkflow.tags || []) : []

      const paramKeys = keys(editWorkflow ? (editWorkflow.params || {}) : {})
      const editWfParams = []
      paramKeys.forEach(k => {
        editWfParams.push({
          key: k, value: editWorkflow.params[k]
        })
      })
      return { ...state, workflowModalVisible: true, editWorkflow, workflowEditType: 'wizard', editWorkflowTags, editWfParams }
    }
    case OPEN_DEVICE_WORKFLOW_MODAL: {
      const editWorkflow = action.data
      const editWorkflowTags = editWorkflow ? (editWorkflow.tags || []) : []
      const paramKeys = keys(editWorkflow ? (editWorkflow.params || {}) : {})
      const editWfParams = []
      paramKeys.forEach(k => {
        editWfParams.push({
          key: k, value: editWorkflow.params[k]
        })
      })
      return { ...state, editWorkflowTags, editWfParams }
    }

    case CLOSE_WORKFLOW_MODAL: {
      return { ...state, workflowModalVisible: false }
    }

    case UPDATE_WORKFLOW_EDIT_TYPE:
      return { ...state, workflowEditType: action.editType }

    case SHARE_WORKFLOW:
      return { ...state, shareWorkflowResult: action.data }
        // ///////////////////////////////////////////////////

    case FETCH_SETTING_USERS:
      return { ...state, users: action.data }

    case OPEN_SETTING_USER_MODAL:
      return {
        ...state, userModalVisible: true, editUser: action.data, editUserPin: '',
        selectedRoles: action.data ? (action.data.roles || []).map(p => p.id) : [],
        selectedPermissions: action.data ? (action.data.permissions || []).map(p => p.id) : []
      }

    case CLOSE_SETTING_USER_MODAL:
      return { ...state, userModalVisible: false, editUser: null }

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

    case SELECT_USER_ROLES:
      return { ...state, selectedRoles: action.data }

    case SELECT_USER_PERMISSIONS:
      return { ...state, selectedPermissions: action.data }

    case FETCH_PARSER_TYPES:
      return { ...state, parserTypes: action.data }

    case ADD_PARSER_TYPE:
    case UPDATE_PARSER_TYPE:
    case REMOVE_PARSER_TYPE:
      return { ...state, parserTypeDraw: state.parserTypeDraw + 1 }

    case OPEN_PARSER_TYPE_MODAL: {
      const editParserType = action.data
      const editParserTypeTags = editParserType ? (editParserType.tags || []) : []
      return { ...state, parserTypeModalOpen: true, editParserType, editParserTypeTags }
    }

    case CLOSE_PARSER_TYPE_MODAL:
      return { ...state, parserTypeModalOpen: false }

    case OPEN_PARSER_PATTERN_MODAL:
      return { ...state, parserPatternModalOpen: true, editParserPattern: action.data }

    case CLOSE_PARSER_PATTERN_MODAL:
      return { ...state, parserPatternModalOpen: false }

    case OPEN_SIMULATION_MODAL:
      return { ...state, simulationModalOpen: true, editParserType: action.data, matchResult: '', parseResult: {} }

    case CLOSE_SIMULATION_MODAL:
      return { ...state, simulationModalOpen: false }

    case UPDATE_SIM_PARSER_TYPE:
      return { ...state, editParserType: action.data }

    case UPDATE_MATCH_RESULT:
      return { ...state, matchResult: action.data }

    case UPDATE_PARSE_RESULT:
      return { ...state, parseResult: action.data }

    case SHOW_FILTER_EDIT_MODAL:
      return { ...state, filterModalOpen: !!action.visible, editFilter: action.filter }
    case SHOW_PATTERN_EDIT_MODAL:
      return { ...state, patternModalOpen: !!action.visible, editPattern: action.pattern }

    case FETCH_DEVICE_CATEGORIES:
      return { ...state, deviceCategories: action.data }

    case SYNC_DATA:
      return { ...state, syncStatus: action.data }

    case ADD_WORKFLOW_TAG:
      return { ...state, editWorkflowTags: [...state.editWorkflowTags, action.tag] }
    case REMOVE_WORKFLOW_TAG:
      return { ...state, editWorkflowTags: state.editWorkflowTags.filter((a, i) => i !== action.index) }
    case SHOW_WF_TAG_MODAL:
      return { ...state, wfTagModalOpen: !!action.visible }

    case ADD_PT_TAG:
      return { ...state, editParserTypeTags: [...state.editParserTypeTags, action.tag] }
    case REMOVE_PT_TAG:
      return { ...state, editParserTypeTags: state.editParserTypeTags.filter((a, i) => i !== action.index) }
    case SHOW_PT_TAG_MODAL:
      return { ...state, parserTypeTagModalOpen: !!action.visible }

    case ADD_DEVICE_TPL_TAG:
      return { ...state, editDeviceTplTags: [...state.editDeviceTplTags, action.tag] }
    case REMOVE_DEVICE_TPL_TAG:
      return { ...state, editDeviceTplTags: state.editDeviceTplTags.filter((a, i) => i !== action.index) }
    case SHOW_DEVICE_TPL_TAG_MODAL:
      return { ...state, deviceTplTagModalOpen: !!action.visible }

    case SHOW_IMPORT_SYNC_MODAL:
      return { ...state, importSyncModalOpen: !!action.visible }

    case SHOW_MONITOR_TPL_TAG_MODAL:
      return { ...state, monitorTplTagModalOpen: !!action.visible }
    case UPDATE_MONITOR_TPL_TAGS:
      return { ...state, monitorTplTags: action.tags || [] }

    case SHOW_COLLECTOR_MODAL:
      return { ...state, collectorModalOpen: !!action.visible, editCollector: action.collector}
    case ADD_COLLECTOR:
      return { ...state, collectorDraw: state.collectorDraw + 1, collectors: [...state.collectors, action.data] }
    case UPDATE_COLLECTOR:
      return { ...state, collectorDraw: state.collectorDraw + 1, collectors: state.collectors.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_COLLECTOR:
      return { ...state, collectorDraw: state.collectorDraw + 1, collectors: state.collectors.filter(p => p.id !== action.data.id) }
    case FETCH_COLLECTORS:
      return { ...state, collectors: action.data }

    case FETCH_AGENTS:
      return { ...state, agents: action.data }
    case SHOW_AGENT_MODAL:
      return { ...state, agentModalOpen: !!action.visible, editAgent: action.agent}
    case ADD_AGENT:
    case UPDATE_AGENT:
    case REMOVE_AGENT:
      return { ...state, agentDraw: state.agentDraw + 1 }

    case SHOW_CRED_TYPE_MODAL:
      return { ...state, credTypeModalOpen: !!action.visible, editCredType: action.credType}
    case ADD_CRED_TYPE:
    case UPDATE_CRED_TYPE:
    case REMOVE_CRED_TYPE:
      return { ...state, credentialTypeDraw: state.credentialTypeDraw + 1 }
    case FETCH_CRED_TYPES:
      return { ...state, credentialTypes: action.data }
    case SELECT_CRED_TYPE:
      return { ...state, selectedCredType: action.data }
    case SHOW_MONITOR_TPL_CREDTYPE_PICKER:
      return { ...state, monitorTplCredTypePickerOpen: !!action.visible }
    case UPDATE_MONITOR_TPL_CREDTYPES:
      return { ...state, monitorTplCredTypes: action.data }
    case SHOW_AGENT_PRELOADER:
      return { ...state, agentPreloader: !!action.visible }
    case ADD_AGENT_INSTALL: {
      const index = findIndex(state.installAgents, {id: action.data.id})
      if (index < 0) return { ...state, installAgents: [...state.installAgents, {id: action.data.id, status: 'installing'}] }
      return { ...state, installAgents: state.installAgents.map(p => p.id === action.data.id ? {...p, status: 'installing'} : p) }
    }
    case UPDATE_AGENT_INSTALL:
      return { ...state, installAgents: state.installAgents.map(p => p.id === action.data.id ? {...p, status: action.status} : p)}
    case CLEAR_AGENT_INSTALL:
      return { ...state, installAgents: [] }

    case SHOW_SIMULATION_MODAL:
      return { ...state, simulationModalOpen: !!action.visible }

    case TOGGLE_MAP_USER: {
      let {mapUsers} = state
      if (mapUsers.indexOf(action.data) >= 0) {
        mapUsers = mapUsers.filter(p => p !== action.data)
      } else {
        mapUsers = [ ...mapUsers, action.data ]
      }
      return { ...state, mapUsers}
    }
    case FETCH_MONITOR_GROUPS:
      return { ...state, monitorGroups: action.data }

    case SHOW_MONITOR_GROUPS_MODAL:
      return { ...state, monitorGroupsModalOpen: action.visible }

    case SHOW_MONITOR_GROUP_MODAL:
      return { ...state, monitorGroupModalOpen: action.visible, editMonitorGroup: action.data }

    case ADD_MONITOR_GROUP:
      return { ...state, monitorGroups: [...state.monitorGroups, action.data] }
    case UPDATE_MONITOR_GROUP:
      return { ...state, monitorGroups: state.monitorGroups.map(p => p.id === action.data.id ? action.data : p) }
    case UPDATE_MONITOR_GROUPS:
      return { ...state, monitorGroups: state.monitorGroups.map(p => {
          const index = findIndex(action.data, {id: p.id})
          if (index < 0) return p
          return action.data[index]
      })}
    case REMOVE_MONITOR_GROUP:
      return { ...state, monitorGroups: state.monitorGroups.filter(p => p.id !== action.data.id)}

    case FETCH_LOG_FILTERS:
      return { ...state, logFilters: action.data }
    case ADD_LOG_FILTER:
      return { ...state, logFilters: [...state.logFilters, action.data] }
    case UPDATE_LOG_FILTER:
      return { ...state, logFilters: state.logFilters.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_LOG_FILTER:
      return { ...state, logFilters: state.logFilters.filter(p => p.id !== action.data.id)}
    case SHOW_LOG_FILTERS_MODAL:
      return { ...state, logFiltersModalOpen: action.visible }

    case FETCH_ROLES:
      return { ...state, roles: action.data }
    case UPDATE_ROLE:
      return { ...state, roles: state.roles.map(p => p.id === action.data.id ? action.data : p) }
    case FETCH_PERMISSIONS:
      return { ...state, permissions: action.data }

    case SHOW_WF_PARAM_MODAL:
      return { ...state, wfParamModalOpen: action.visible, editWfParam: action.param }
    case ADD_WF_PARAM:
      return { ...state, editWfParams: concat(state.editWfParams, action.param) }
    case UPDATE_WF_PARAM:
      return { ...state, editWfParams: state.editWfParams.map(p => p.key === action.oldParam.key ? action.newParam : p) }
    case REMOVE_WF_PARAM:
      return { ...state, editWfParams: state.editWfParams.filter(p => p.key !== action.param.key) }

    case FETCH_BRAIN_CELLS:
      return { ...state, brainCells: action.data }
    case ADD_BRAIN_CELL:
      return { ...state, brainCells: [...state.brainCells, action.data] }
    case UPDATE_BRAIN_CELL:
      return { ...state, brainCells: state.brainCells.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_BRAIN_CELL:
      return { ...state, brainCells: state.brainCells.filter(p => p.id !== action.data.id) }
    case SHOW_BRAIN_CELL_MODAL:
      return { ...state, brainCellModalOpen: action.visible, editBrainCell: action.data }
    case SHOW_SCRIPT_MODAL:
      return { ...state, scriptModalOpen: action.visible }
    case SHOW_GROK_MODAL:
      return { ...state, grokModalOpen: action.visible }
    case SHOW_CELL_PARAM_MODAL:
      return { ...state, cellParamModalOpen: action.visible, editCellParam: action.data }
    case SHOW_USER_CONNECTOR_MODAL:
      return { ...state, userConnectorModalOpen: action.visible, editUserConnector: action.userConnector }

    case FETCH_VENDOR_PRODUCTS:
      return { ...state, vendorProducts: action.data }
    case ADD_VENDOR_PRODUCT:
      return { ...state, vendorProducts: sortBy([...state.vendorProducts, action.data], p => p.name ? p.name.toLowerCase() : '') }
    case UPDATE_VENDOR_PRODUCT:
      return { ...state, vendorProducts: sortBy(state.vendorProducts.map(p => p.id === action.data.id ? action.data : p), p => p.name ? p.name.toLowerCase() : '') }
    case REMOVE_VENDOR_PRODUCT:
      return { ...state, vendorProducts: state.vendorProducts.filter(p => p.id !== action.data.id) }

    case FETCH_PRODUCT_TYPES:
      return { ...state, productTypes: action.data }
    case ADD_PRODUCT_TYPE:
      return { ...state, productTypes: sortBy([...state.productTypes, action.data], p => p.name ? p.name.toLowerCase() : '') }
    case UPDATE_PRODUCT_TYPE:
      return { ...state, productTypes: sortBy(state.productTypes.map(p => p.id === action.data.id ? action.data : p), p => p.name ? p.name.toLowerCase() : '') }
    case REMOVE_PRODUCT_TYPE:
      return { ...state, productTypes: state.productTypes.filter(p => p.id !== action.data.id) }

    case FETCH_PRODUCT_VENDORS:
      return { ...state, productVendors: action.data }
    case ADD_PRODUCT_VENDOR:
      return { ...state, productVendors: sortBy([...state.productVendors, action.data], p => p.name ? p.name.toLowerCase() : '') }
    case UPDATE_PRODUCT_VENDOR:
      return { ...state, productVendors: sortBy(state.productVendors.map(p => p.id === action.data.id ? action.data : p), p => p.name ? p.name.toLowerCase() : '') }
    case REMOVE_PRODUCT_VENDOR:
      return { ...state, productVendors: state.productVendors.filter(p => p.id !== action.data.id) }

    case FETCH_TIMEZONE:
      return { ...state, timezoneOffset: action.data }
    default:
      return state
  }
}
