import axios from 'axios'
import {reset} from 'redux-form'
import {assign, sortBy} from 'lodash'

import {
  FETCH_SETTING_MAPS,
  ADD_SETTING_MAP,
  UPDATE_SETTING_MAP,
  REMOVE_SETTING_MAP,
  OPEN_SETTING_MAP_MODAL,
  CLOSE_SETTING_MAP_MODAL,

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
  SHOW_PT_TAG_MODAL,
  ADD_PT_TAG,
  REMOVE_PT_TAG,

  OPEN_PARSER_PATTERN_MODAL,
  CLOSE_PARSER_PATTERN_MODAL,

  OPEN_SIMULATION_MODAL,
  CLOSE_SIMULATION_MODAL,
  UPDATE_MATCH_RESULT,
  UPDATE_PARSE_RESULT,
  SHOW_FILTER_EDIT_MODAL,
  SHOW_PATTERN_EDIT_MODAL,
  UPDATE_SIM_PARSER_TYPE,

  FETCH_DEVICE_CATEGORIES,

  SYNC_DATA,

  SELECT_DEVICE_TEMPLATE,
  UPDATE_DEVICE_TEMPLATE_MONITORS,
  FETCH_DEVICE_TPL_WORKFLOWS,
  SELECT_TPL_WF_ROW,
  SHOW_WF_SELECT_MODAL,
  ADD_DEVICE_TPL_WF,
  REMOVE_DEVICE_TPL_WF,
  SHOW_DEVICE_TPL_TAG_MODAL,
  ADD_DEVICE_TPL_TAG,
  REMOVE_DEVICE_TPL_TAG,

  SHARE_MONITOR_TEMPLATE,
  SHARE_WORKFLOW,

  UPDATE_USER_INFO,
  SHOW_IMPORT_SYNC_MODAL,

  SHOW_MONITOR_TPL_TAG_MODAL,
  UPDATE_MONITOR_TPL_TAGS,
  SHOW_MONITOR_TPL_CREDTYPE_PICKER,
  UPDATE_MONITOR_TPL_CREDTYPES,

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

  SHOW_CRED_TYPE_MODAL,
  ADD_CRED_TYPE,
  UPDATE_CRED_TYPE,
  REMOVE_CRED_TYPE,
  FETCH_CRED_TYPES,
  SELECT_CRED_TYPE,

  SHOW_SIMULATION_MODAL,
  TOGGLE_MAP_USER,

  FETCH_LOG_FILTERS,
  ADD_LOG_FILTER,
  UPDATE_LOG_FILTER,
  REMOVE_LOG_FILTER,
  SHOW_LOG_FILTERS_MODAL,

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

  FETCH_TIMEZONE,

  NO_AUTH_ERROR
} from './types'

import { apiError } from './Errors'

import { ROOT_URL, SRA_URL } from './config'
import { encodeUrlParams } from 'shared/Global'

import {fetchEnvVars} from './EnvActions'
import { getAuthConfig } from './util'

export const fetchSettingMaps = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/map`)
      .then(response => fetchSettingMapsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchSettingMapsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_SETTING_MAPS,
    data: response.data._embedded.maps
  })
}

export const openSettingMapModal = (map) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_SETTING_MAP_MODAL,
      data: map
    })
  }
}

export const closeSettingMapModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SETTING_MAP_MODAL
    })
  }
}

export const addSettingMap = (props) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    if (props) {
      axios.post(`${ROOT_URL}/map`, props)
      .then(response => addSettingMapSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
    } else {
      addSettingMapSuccess(dispatch, {data: [{}]})
    }
  }
}

const addSettingMapSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_SETTING_MAP,
    data: response.data
  })
  dispatch(closeSettingMapModal())
}

export const updateSettingMap = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.put(`${ROOT_URL}/map/${entity.id}`, entity)
      .then(response => updateSettingMapSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateSettingMapSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_SETTING_MAP,
    data: response.data
  })
  dispatch(closeSettingMapModal())
}

export const deleteSettingMap = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/map/${entity.id}`)
      .then(() => deleteSettingMapSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const deleteSettingMapSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_SETTING_MAP,
    data: entity
  })
}

export const fetchSettingUsers = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    dispatch({type: FETCH_SETTING_USERS, data: []})

    axios.get(`${ROOT_URL}/getUsers`, getAuthConfig()).then(response => {
      dispatch({
        type: FETCH_SETTING_USERS,
        data: response.data
      })
    }).catch(error => apiError(dispatch, error))
  }
}

export const addSettingUser = (props) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/user`, props)
      .then(response => addSettingUserSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addSettingUserSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_SETTING_USER,
    data: response.data
  })
  dispatch(closeSettingUserModal())
}

export const addSettingUser2 = (entity) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/addUser`, entity, getAuthConfig())
      .then(response => addSettingUserSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

export const updateSettingUser = (entity, keepModal) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/saveUser`, entity)
      .then(response => updateSettingUserSuccess(dispatch, response, keepModal))
      .catch(error => apiError(dispatch, error))
  }
}

const updateSettingUserSuccess = (dispatch, response, keepModal) => {
  dispatch({
    type: UPDATE_SETTING_USER,
    data: response.data
  })
  if (keepModal) return
  dispatch(closeSettingUserModal())
  dispatch(closeUserPasswordModal())
}

export const updateSettingUser2 = (entity, keepModal) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/saveUser`, entity)
      .then(response => updateSettingUserSuccess(dispatch, response, keepModal))
      .catch(error => apiError(dispatch, error))
  }
}

export const deleteSettingUser = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.delete(entity._links.self.href)
      .then(() => deleteSettingUserSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

export const deleteSettingUser2 = (entity) => {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/deleteUser?userId=${entity.id}`).then(res => {
      if (res.data.success) {
        dispatch({type: REMOVE_SETTING_USER, data: entity})
      }
    }).catch(error => apiError(dispatch, error))
  }
}

const deleteSettingUserSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_SETTING_USER,
    data: entity
  })
}

export const openSettingUserModal = (user) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_SETTING_USER_MODAL,
      data: user
    })
  }
}

export const closeSettingUserModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SETTING_USER_MODAL
    })
  }
}

export const selectUserRoles = (data) => {
  return dispatch => {
    dispatch({type: SELECT_USER_ROLES, data})
  }
}

export const selectUserPermissions = (data) => {
  return dispatch => {
    dispatch({type: SELECT_USER_PERMISSIONS, data})
  }
}

export const openUserPasswordModal = (user) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_USER_PASSWORD_MODAL,
      data: user
    })
  }
}

export const closeUserPasswordModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_USER_PASSWORD_MODAL
    })
  }
}

export const fetchParserTypes = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/parsertype`)
      .then(response => fetchParserTypesSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

function fetchParserTypesSuccess (dispatch, response) {
  dispatch({
    type: FETCH_PARSER_TYPES,
    data: response.data._embedded.parserTypes
  })
}

export const addParserType = (props) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/parsertype`, props)
      .then(response => addParserTypeSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addParserTypeSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_PARSER_TYPE,
    data: response.data
  })
  dispatch(closeParserTypeModal())
}

export const updateParserType = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.put(`${ROOT_URL}/parsertype/${entity.id}`, entity)
      .then(response => updateParserTypeSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateParserTypeSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_PARSER_TYPE,
    data: response.data
  })
  dispatch(closeParserTypeModal())
}

export const removeParserType = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/parsertype/${entity.id}`)
      .then(() => removeParserTypeSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const removeParserTypeSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_PARSER_TYPE,
    data: entity
  })
}

export const openParserTypeModal = (parserType) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_PARSER_TYPE_MODAL,
      data: parserType
    })
  }
}

export const closeParserTypeModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_PARSER_TYPE_MODAL
    })
  }
}

export const openSimulationModal = (data) => {
  return dispatch => {
    dispatch({type: OPEN_SIMULATION_MODAL, data})
  }
}

export const closeSimulationModal = () => {
  return dispatch => {
    dispatch({type: CLOSE_SIMULATION_MODAL})
  }
}

export const updateSimParserType = (data) => {
  return dispatch => {
    dispatch({type: UPDATE_SIM_PARSER_TYPE, data})
  }
}

export const matchFilter = (text, filter) => {
  return dispatch => {
    dispatch({type: UPDATE_MATCH_RESULT, data: ''})
    axios.post(`${ROOT_URL}/parsertypes/matchfilter`, {text, filter}).then(res => {
      dispatch({type: UPDATE_MATCH_RESULT, data: res.data ? 'True' : 'False'})
    }).catch(() => {
      dispatch({type: UPDATE_MATCH_RESULT, data: 'Error'})
    })
  }
}

export const parseFilter = (text, parserType) => {
  return dispatch => {
    dispatch({type: UPDATE_PARSE_RESULT, data: ''})
    axios.post(`${ROOT_URL}/parsertypes/parse`, {text, parserType}).then(res => {
      dispatch({type: UPDATE_PARSE_RESULT, data: res.data || {}})
    })
  }
}

export const showFilterEditModal = (visible, filter) => {
  return dispatch => {
    dispatch({type: SHOW_FILTER_EDIT_MODAL, visible, filter})
  }
}

export const showPatternEditModal = (visible, pattern) => {
  return dispatch => {
    dispatch({type: SHOW_PATTERN_EDIT_MODAL, visible, pattern})
  }
}

export const openParserPatternModal = (pattern) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_PARSER_PATTERN_MODAL,
      data: pattern
    })
  }
}

export const closeParserPatternModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_PARSER_PATTERN_MODAL
    })
  }
}

export const fetchDeviceCategories = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/devicecategory?sort=order`).then(response => {
      dispatch({type: FETCH_DEVICE_CATEGORIES, data: response.data._embedded.deviceCategories})
    }).catch(error => apiError(dispatch, error))
  }
}

export const syncData = (full) => {
  return dispatch => {
    dispatch({type: SYNC_DATA, data: null})
    axios.get(`${ROOT_URL}/pullSyncDataFromImadmin?full=${full}`).then(response => {
      dispatch({type: SYNC_DATA, data: response.data})
      dispatch(fetchEnvVars())
    }).catch(error => apiError(dispatch, error))
  }
}

export const selectDeviceTemplate = (tpl) => {
  return dispatch => {
    dispatch({type: SELECT_DEVICE_TEMPLATE, tpl})
    dispatch(reset('deviceTplView'))
  }
}

export const updateSelectedDeviceTplMonitors = (monitors) => {
  return dispatch => {
    dispatch({type: UPDATE_DEVICE_TEMPLATE_MONITORS, monitors})
  }
}

export const fetchDeviceTplWorkflows = (workflowIds) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/flow/search/findByUuidIn?size=1000&sort=name&${encodeUrlParams({uuid: workflowIds})}`).then(res => {
      dispatch({type: FETCH_DEVICE_TPL_WORKFLOWS, data: res.data._embedded.flows})
    }).catch(error => apiError(dispatch, error))
  }
}

export const selectTplWfRow = (workflow) => {
  return dispatch => {
    dispatch({type: SELECT_TPL_WF_ROW, workflow})
  }
}

export const showWfSelectModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_WF_SELECT_MODAL, visible})
  }
}

export const addDeviceTplWf = (workflow) => {
  return dispatch => {
    dispatch({type: ADD_DEVICE_TPL_WF, workflow})
  }
}

export const removeDeviceTplWf = (workflow) => {
  return dispatch => {
    dispatch({type: REMOVE_DEVICE_TPL_WF, workflow})
  }
}

export const shareMonitorTemplate = (props) => {
  return dispatch => {
    dispatch({type: SHARE_MONITOR_TEMPLATE, data: null})
    axios.post(`${ROOT_URL}/shareMonitorTemplate`, props).then(({data}) => {
      if (data.success) dispatch({type: SHARE_MONITOR_TEMPLATE, data: 'OK'})
      else dispatch({type: SHARE_MONITOR_TEMPLATE, data: 'Error'})
    }).catch(error => apiError(dispatch, error))
  }
}

export const shareWorkflow = props => {
  return dispatch => {
    dispatch({type: SHARE_WORKFLOW, data: null})
    axios.post(`${ROOT_URL}/shareWorkflow`, props).then(({data}) => {
      if (data.success) dispatch({type: SHARE_WORKFLOW, data: 'OK'})
      else dispatch({type: SHARE_WORKFLOW, data: 'Error'})
    }).catch(error => apiError(dispatch, error))
  }
}

const updateUserSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_USER_INFO,
    data: response.data
  })
}

export const updateUserOption = (user, key, value) => {
  if (!user) return
  return dispatch => {
    axios.put(user._links.self.href, assign({}, user, {
      [key]: value
    })).then(res => updateUserSuccess(dispatch, res)).catch(error => apiError(dispatch, error))
  }
}

export const addParserTypeTag = (tag) => {
  return dispatch => {
    dispatch({type: ADD_PT_TAG, tag})
  }
}

export const removeParserTypeTag = (index) => {
  return dispatch => {
    dispatch({type: REMOVE_PT_TAG, index})
  }
}

export const showParserTypeTagModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_PT_TAG_MODAL, visible})
  }
}

export const addDeviceTplTag = (tag) => {
  return dispatch => {
    dispatch({type: ADD_DEVICE_TPL_TAG, tag})
  }
}

export const removeDeviceTplTag = (index) => {
  return dispatch => {
    dispatch({type: REMOVE_DEVICE_TPL_TAG, index})
  }
}

export const showDeviceTplTagModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_DEVICE_TPL_TAG_MODAL, visible})
  }
}

export const showImportSyncModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_IMPORT_SYNC_MODAL, visible})
  }
}

export const importSyncData = (formData) => {
  return dispatch => {
    dispatch({type: SYNC_DATA, data: null})
    window.$.ajax({
      url: `${ROOT_URL}/importSyncData`,
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: (data, textStatus, jqXHR) => {
        dispatch({type: SYNC_DATA, data: data ? 'OK' : 'Failed'})
      },
      error: (jqXHR, textStatus, errorThrown) => {
        apiError(dispatch, errorThrown)
      }
    })
  }
}

export const showMonitorTplTagModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_MONITOR_TPL_TAG_MODAL, visible})
  }
}

export const updateMonitorTplTags = (tags) => {
  return dispatch => {
    dispatch({type: UPDATE_MONITOR_TPL_TAGS, tags})
  }
}

export const showCollectorModal = (visible, collector) => {
  return dispatch => {
    dispatch({type: SHOW_COLLECTOR_MODAL, visible, collector})
  }
}

export const addCollector = (entity) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/connector/save`, entity).then(res => {
      if (res.data) dispatch({type: ADD_COLLECTOR, data: res.data})
    }).catch(error => apiError(dispatch, error))
    dispatch(showCollectorModal(false))
  }
}

export const updateCollector = (entity) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/connector/save`, entity).then(res => {
      if (res.data) dispatch({type: UPDATE_COLLECTOR, data: res.data})
    }).catch(error => apiError(dispatch, error))
    dispatch(showCollectorModal(false))
  }
}

export const removeCollector = (entity) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/connector/delete`, entity).then(res => {
      if (res.data.success) dispatch({type: REMOVE_COLLECTOR, data: entity})
    }).catch(error => apiError(dispatch, error))
  }
}

export const showAgentModal = (visible, agent) => {
  return dispatch => {
    dispatch({type: SHOW_AGENT_MODAL, visible, agent})
  }
}

export const fetchAgents = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/device/search/findAgents?size=1000`).then(res => {
      dispatch({type: FETCH_AGENTS, data: res.data._embedded.devices})
    }).catch(error => apiError(dispatch, error))
  }
}

export const addAgent = (props) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/deviceagent`, props).then(({data}) => {
      dispatch({type: ADD_AGENT, data})
      dispatch(showAgentModal(false))
    }).catch(error => apiError(dispatch, error))
  }
}

export const updateAgent = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity).then(({data}) => {
      dispatch({type: UPDATE_AGENT, data})
      dispatch(showAgentModal(false))
    }).catch(error => apiError(dispatch, error))
  }
}

export const removeAgent = (entity) => {
  return (dispatch) => {
    axios.delete(entity._links.self.href).then(() => {
      dispatch({type: REMOVE_AGENT, entity})
    }).catch(error => apiError(dispatch, error))
  }
}

export const showCredTypeModal = (visible, credType) => {
  return dispatch => {
    dispatch({type: SHOW_CRED_TYPE_MODAL, visible, credType})
  }
}

export const addCredType = (props) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/credentialtype`, props).then(({data}) => {
      dispatch({type: ADD_CRED_TYPE, data})
      dispatch(showCredTypeModal(false))
    }).catch(error => apiError(dispatch, error))
  }
}

export const updateCredType = (entity) => {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/credentialtype/${entity.id}`, entity).then(({data}) => {
      dispatch({type: UPDATE_CRED_TYPE, data})
      dispatch(showCredTypeModal(false))
    }).catch(error => apiError(dispatch, error))
  }
}

export const removeCredType = (entity) => {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/credentialtype/${entity.id}`).then(() => {
      dispatch({type: REMOVE_CRED_TYPE, entity})
    }).catch(error => apiError(dispatch, error))
  }
}

export const fetchCredTypes = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/credentialtype?size=100`).then(({data}) => {
      dispatch({type: FETCH_CRED_TYPES, data: data._embedded.credentialTypes})
    })
  }
}

export const selectCredType = (data) => {
  return dispatch => {
    dispatch({type: SELECT_CRED_TYPE, data})
  }
}

export const showMonitorTplCredTypesPicker = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_MONITOR_TPL_CREDTYPE_PICKER, visible})
  }
}

export const updateMonitorTplCredTypes = (data) => {
  return dispatch => {
    dispatch({type: UPDATE_MONITOR_TPL_CREDTYPES, data})
  }
}

export const showAgentPreloader = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_AGENT_PRELOADER, visible})
  }
}

export const fetchCollectors = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/connector/getAll`).then(({data}) => {
      if (data) dispatch({type: FETCH_COLLECTORS, data})
    })
  }
}

export const showSimulationModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_SIMULATION_MODAL, visible})
  }
}

export const postIncidentSimulation = (data) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/restlistener/post`, {data})
  }
}

export const toggleMapUser = (data) => {
  return dispatch => {
    dispatch({type: TOGGLE_MAP_USER, data})
  }
}

export const fetchLogFilters = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/logfilter?size=100`).then(({data}) => {
      dispatch({type: FETCH_LOG_FILTERS, data: data._embedded.logFilters})
    })
  }
}

export const addLogFilter = (props) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/logfilter`, props).then(response => {
      dispatch({type: ADD_LOG_FILTER, data: response.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const updateLogFilter = (entity) => {
  return dispatch => {
    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({type: UPDATE_LOG_FILTER, data: response.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const removeLogFilter = (entity) => {
  return dispatch => {
    axios.delete(entity._links.self.href).then(() => {
      dispatch({type: REMOVE_LOG_FILTER, data: entity})
    }).catch(error => apiError(dispatch, error))
  }
}

export const showLogFiltersModal = visible => {
  return dispatch => {
    dispatch({type: SHOW_LOG_FILTERS_MODAL, visible})
  }
}

export const fetchRoles = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/findAllRoles`).then(res => {
      dispatch({type: FETCH_ROLES, data: res.data})
    })
  }
}

export const updateRole = entity => {
  return dispatch => {
    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({type: UPDATE_ROLE, data: response.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const fetchPermissions = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/findAllPermissions`).then(res => {
      dispatch({type: FETCH_PERMISSIONS, data: res.data})
    })
  }
}

export const showWfParamModal = (visible, param) => {
  return dispatch => {
    dispatch({type: SHOW_WF_PARAM_MODAL, visible, param})
  }
}

export function addWfParam (param) {
  return dispatch => {
    dispatch({type: ADD_WF_PARAM, param})
  }
}

export function updateWfParam (oldParam, newParam) {
  return dispatch => {
    dispatch({type: UPDATE_WF_PARAM, oldParam, newParam})
  }
}

export function removeWfParam (param) {
  return dispatch => {
    dispatch({type: REMOVE_WF_PARAM, param})
  }
}

export function eddieSync () {
  return dispatch => {
    dispatch({type: SYNC_DATA, data: null})
    axios.get(`${ROOT_URL}/eddieSync`).then(res => {
      dispatch({type: SYNC_DATA, data: 'OK'})
    }).catch(() => {
      dispatch({type: SYNC_DATA, data: 'Failed'})
    })
  }
}

//////////////////////////////////////////////////////////////////

export function resetForm(name) {
  return dispatch => {
    dispatch(reset(name))
  }
}

export function showUserConnectorModal(visible, userConnector) {
  return dispatch => {
    dispatch({type: SHOW_USER_CONNECTOR_MODAL, visible, userConnector})
  }
}

export function fetchBrainCells() {
  return dispatch => {
    axios.get(`${ROOT_URL}/getAllBraincells`).then(res => {
      dispatch({type: FETCH_BRAIN_CELLS, data: res.data})
    })
  }
}

export function addBrainCell(entity, cb) {
  return dispatch => {
    axios.post(`${ROOT_URL}/saveBraincell`, entity).then(res => {
      if (res.data) {
        dispatch({type: ADD_BRAIN_CELL, data: res.data})
        cb && cb(res.data)
      }
    })
  }
}

export function updateBrainCell (entity) {
  return dispatch => {
    axios.post(`${ROOT_URL}/saveBraincell`, entity).then(res => {
      if (res.data) dispatch({type: UPDATE_BRAIN_CELL, data: res.data})
    })
  }
}

export function removeBrainCell (entity) {
  return dispatch => {
    axios.post(`${ROOT_URL}/deleteBraincell`, entity).then(res => {
      if (res.data.success) dispatch({type: REMOVE_BRAIN_CELL, data: entity})
    }).catch(error => apiError(dispatch, error))
  }
}

export function showBrainCellModal (visible, data) {
  return dispatch => {
    dispatch({type: SHOW_BRAIN_CELL_MODAL, visible, data})
  }
}

export function showScriptModal (visible) {
  return dispatch => {
    dispatch({type: SHOW_SCRIPT_MODAL, visible})
  }
}

export function showGrokModal (visible) {
  return dispatch => {
    dispatch({type: SHOW_GROK_MODAL, visible})
  }
}

export function showCellParamModal (visible, data) {
  return dispatch => {
    dispatch({type: SHOW_CELL_PARAM_MODAL, visible, data})
  }
}


export function fetchVendorProducts () {
  return dispatch => {
    axios.get(`${ROOT_URL}/vendorproduct?size=1000`).then(res => {
      dispatch({type: FETCH_VENDOR_PRODUCTS, data: sortBy(res.data._embedded.vendorProducts, p => p.name ? p.name.toLowerCase() : '')})
    })
  }
}

export function addVendorProduct (entity, cb) {
  return dispatch => {
    axios.post(`${ROOT_URL}/vendorproduct`, entity).then(res => {
      if (res.data) {
        dispatch({type: ADD_VENDOR_PRODUCT, data: res.data})
        cb && cb(res.data)
      } else {
        cb && cb()
      }
    }).catch(() => {
      cb && cb()
    })
  }
}

export function updateVendorProduct (entity) {
  return dispatch => {
    axios.put(`${ROOT_URL}/vendorproduct/${entity.id}`, entity).then(res => {
      if (res.data) dispatch({type: UPDATE_VENDOR_PRODUCT, data: res.data})
    })
  }
}

export function removeVendorProduct (entity) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/vendorproduct/${entity.id}`).then(res => {
      dispatch({type: REMOVE_VENDOR_PRODUCT, data: entity})
    }).catch(error => apiError(dispatch, error))
  }
}

export function fetchProductTypes () {
  return dispatch => {
    axios.get(`${ROOT_URL}/producttype?size=1000`).then(res => {
      dispatch({type: FETCH_PRODUCT_TYPES, data: sortBy(res.data._embedded.productTypes, p => p.name ? p.name.toLowerCase() : '')})
    })
  }
}

export function addProductType(entity) {
  return dispatch => {
    axios.post(`${ROOT_URL}/producttype`, entity).then(res => {
      if (res.data) dispatch({type: ADD_PRODUCT_TYPE, data: res.data})
    })
  }
}

export function updateProductType (entity) {
  return dispatch => {
    axios.put(`${ROOT_URL}/producttype/${entity.id}`, entity).then(res => {
      if (res.data) dispatch({type: UPDATE_PRODUCT_TYPE, data: res.data})
    })
  }
}

export function removeProductType (entity) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/producttype/${entity.id}`).then(res => {
      dispatch({type: REMOVE_PRODUCT_TYPE, data: entity})
    }).catch(error => apiError(dispatch, error))
  }
}

//////////////////////////////////////////

export function fetchProductVendors() {
  return dispatch => {
    axios.get(`${ROOT_URL}/productvendor?size=1000`).then(res => {
      dispatch({type: FETCH_PRODUCT_VENDORS, data: sortBy(res.data._embedded.productVendors, p => p.name ? p.name.toLowerCase() : '')})
    })
  }
}

export function addProductVendor(entity, cb) {
  return dispatch => {
    axios.post(`${ROOT_URL}/productvendor`, entity).then(res => {
      if (res.data) {
        dispatch({type: ADD_PRODUCT_VENDOR, data: res.data})
        cb && cb(res.data)
      } else {
        cb && cb()
      }
    }).catch(() => {
      cb && cb()
    })
  }
}

export function updateProductVendor(entity) {
  return dispatch => {
    axios.put(`${ROOT_URL}/productvendor/${entity.id}`, entity).then(res => {
      if (res.data) dispatch({type: UPDATE_PRODUCT_VENDOR, data: res.data})
    })
  }
}

export function removeProductVendor(entity) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/productvendor/${entity.id}`).then(res => {
      dispatch({type: REMOVE_PRODUCT_VENDOR, data: entity})
    }).catch(error => apiError(dispatch, error))
  }
}

export function testMatchRegex(regex, text, cb) {
  return dispatch => {
    axios.post(`${ROOT_URL}/testRegex`, {
      regex, text
    }).then(res => {
      cb && cb(res.data.success)
    }).catch(() => {
      cb && cb()
    })
  }
}

export function fetchTimezone() {
  return dispatch => {
    axios.get(`${SRA_URL}/api/getTimezone`, getAuthConfig()).then(res => {

    })
  }
}
