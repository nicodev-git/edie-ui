import axios from 'axios'
import {findIndex} from 'lodash'
import {
  UPDATE_DASHBOARD,

  FETCH_DASHBOARD_INCIDENTS,
  ADD_DASHBOARD_INCIDENT,
  FETCH_DASHBOARD_BIGINCIDENTS,
  UPDATE_BIGINCIDENTS_PARAMS,

  CLOSE_API_ERROR_MODAL,

  REQUIRE_FULLSCREEN,

  OPEN_DASHBOARD_NEW_INCIDENT_MODAL,
  CLOSE_DASHBOARD_NEW_INCIDENT_MODAL,

  FIX_ALL_INCIDENTS_BY_TYPE,

  OPEN_INCIDENT_EVENTS_MODAL,
  CLOSE_INCIDENT_EVENTS_MODAL,

  UPDATE_DASHBOARD_STATS,
  UPDATE_NEW_INCIDENT_MSG,

  UPDATE_MAP_DEVICE_STATUS,
  UPDATE_MAP_DEVICES,

  SHOW_SIDEBAR_MESSAGE_MENU,

  SHOW_THREAT_ITEM_MODAL,
  UPDATE_SIDEBAR_SEARCH_ACTIVE,

  SHOW_COMMENTS_MODAL,
  SHOW_ATTACKER_MODAL,

  UPDATE_VIEWLOG_PARAMS,
  SHOW_DETAIL_LOG_MODAL,
  UPDATE_VIEWLOG_DEVICE,

  SHOW_DEVICE_TPL_PICKER,
  SHOW_MONITOR_DETAIL_MODAL,

  SHOW_WFRECT_MODAL,
  SHOW_RECT_SEARCH_MODAL,

  FETCH_WFRECT_GROUPS,
  ADD_WFRECT_GROUP,
  UPDATE_WFRECT_GROUP,
  REMOVE_WFRECT_GROUP,
  SHOW_WFRECT_GROUPS_MODAL,
  SELECT_WFRECT_GROUP,

  SHOW_APPS_PREF_MODAL,
  UPDATE_APPS_PREF,

  FETCH_ALL_APPS,
  SHOW_APP_DEVICES_MODAL,

  SHOW_SERVER_SEARCH_MODAL,
  UPDATE_SERVER_SEARCH_RESULTS,

  UPDATE_SERVER_SEARCH_PARAMS,
  SHOW_SERVER_CMD_MODAL,

  SHOW_RANGE_ADD_MODAL,
  SCAN_RANGE,
  UPDATE_SCAN_STATUS,

  NO_AUTH_ERROR
} from './types'

import { apiError } from './Errors'

import { ROOT_URL } from './config'

import { encodeUrlParams } from 'shared/Global'

export const updateDashboard = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DASHBOARD,
      data
    })
  }
}

export const fetchIncidents = () => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident/search/findBySeverity?severity=HIGH&severity=MEDIUM&sort=startTimestamp,desc`, {params: {}})
      .then(response => fetchIncidentsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchIncidentsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_DASHBOARD_INCIDENTS,
    data: response.data._embedded.incidents
  })
}

export const addDashboardIncident = incident => {
  return dispatch => {
    dispatch({type: ADD_DASHBOARD_INCIDENT, incident})
  }
}

export const fetchBigIncidents = (params) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`)
      .then(response => fetchBigIncidentsSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchBigIncidentsSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_DASHBOARD_BIGINCIDENTS,
    data: response.data._embedded.incidents
  })
}

export const updateBigIncidentParams = (params) => {
  return dispatch => {
    dispatch({type: UPDATE_BIGINCIDENTS_PARAMS, params})
    // dispatch(fetchBigIncidents(params))
  }
}

export const closeApiErrorModal = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_API_ERROR_MODAL
    })
  }
}

export function requireFullScreen (enabled) {
  return dispatch => {
    dispatch({
      type: REQUIRE_FULLSCREEN,
      enabled
    })
  }
}

export const openDashboardNewIncidentModal = () => {
  return dispatch => {
    dispatch({
      type: OPEN_DASHBOARD_NEW_INCIDENT_MODAL
    })
  }
}

export const closeDashboardNewIncidentModal = () => {
  return dispatach => {
    dispatach({
      type: CLOSE_DASHBOARD_NEW_INCIDENT_MODAL
    })
  }
}

export function fixAllIncidentsByType (type) {
  return dispatch => {
    axios.get(`${ROOT_URL}/incident/fixall/${type}/deviceid`).then(res => {
      dispatch({ type: FIX_ALL_INCIDENTS_BY_TYPE })
    }).catch(error => apiError(dispatch, error))
  }
}

export function openIncidentEventsModal (incident) {
  return dispatch => {
    dispatch({type: OPEN_INCIDENT_EVENTS_MODAL, incident})
  }
}

export function closeIncidentEventsModal () {
  return dispatch => {
    dispatch({type: CLOSE_INCIDENT_EVENTS_MODAL})
  }
}

export function fetchDashboardStats () {
  return dispatch => {
    axios.get(`${ROOT_URL}/incident/dashboardinfo`).then(({data}) => {
      dispatch(updateDashboardStats({
        open: data.openincidents || 0,
        today: data.todayincidents || 0,
        month: data.monthincidents || 0
      }))
    }).catch(error => apiError(dispatch, error))
  }
}

export function updateDashboardStats (stats) {
  return dispatch => {
    dispatch({type: UPDATE_DASHBOARD_STATS, stats})
  }
}

export function updateNewIncidentMsg (msg) {
  return dispatch => {
    dispatch({type: UPDATE_NEW_INCIDENT_MSG, msg})
  }
}

export function updateMapDeviceStatus (data) {
  return dispatch => {
    dispatch({type: UPDATE_MAP_DEVICE_STATUS, data})
  }
}

export function updateDashboardMapDevices (data) {
  return dispatch => {
    dispatch({type: UPDATE_MAP_DEVICES, data})
  }
}

export function showSidebarMessageMenu (open) {
  return dispatch => {
    dispatch({type: SHOW_SIDEBAR_MESSAGE_MENU, open})
  }
}

export function showThreats (params) {
  return dispatch => {
    axios.get(`${ROOT_URL}/search/showThreats`, {params})
  }
}

export function showThreatItemModal (visible, threatItem) {
  return dispatch => {
    dispatch({type: SHOW_THREAT_ITEM_MODAL, visible, threatItem})
  }
}

export function updateSidebarSearchActive (active) {
  return dispatch => {
    dispatch({type: UPDATE_SIDEBAR_SEARCH_ACTIVE, active})
  }
}

export function showCommentsModal (visible, incident) {
  return dispatch => {
    dispatch({type: SHOW_COMMENTS_MODAL, visible, incident})
  }
}

export function showAttackerModal (visible) {
  return dispatch => {
    dispatch({type: SHOW_ATTACKER_MODAL, visible})
  }
}

///////////////////////////////////////////////////////////////////////////////////

export const updateViewLogParams = (params, history, push) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_VIEWLOG_PARAMS,
      params
    })
    const locationParams = {
      pathname: '/viewlog',
      search: `?q=${encodeURIComponent(JSON.stringify(params))}`
    }
    if (push) history.push(locationParams)
    else history.replace(locationParams)
  }
}

export const updateViewLogDevice = (device) => {
  return dispatch => {
    dispatch({type: UPDATE_VIEWLOG_DEVICE, device})
  }
}

export const showDetailLogModal = (visible, params) => {
  return dispatch => {
    dispatch({type: SHOW_DETAIL_LOG_MODAL, visible, params})
  }
}

export const showDeviceTplPicker = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_DEVICE_TPL_PICKER, visible})
  }
}

export const showMonitorDetailModal = (visible, monitor, device) => {
  return dispatch => {
    dispatch({type: SHOW_MONITOR_DETAIL_MODAL, visible, monitor, device})
  }
}

/////////////////////////////////////////////////

export const showWfRectModal = (visible, data) => {
  return dispatch => {
    dispatch({type: SHOW_WFRECT_MODAL, visible, data})
  }
}

export const showRectSearchModal = (visible, params) => {
  return dispatch => {
    dispatch({type: SHOW_RECT_SEARCH_MODAL, visible, params})
  }
}

export const fetchWfRectGroups = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/workflowrectgroup?size=1000`).then(response => {
      dispatch({type: FETCH_WFRECT_GROUPS, data: response.data._embedded.workflowRectGroups})
    }).catch(error => apiError(dispatch, error))
  }
}

export const addWfRectGroup = (props) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/workflowrectgroup`, props).then(res => {
      dispatch({type: ADD_WFRECT_GROUP, data: res.data})
    })
  }
}

export const updateWfRectGroup = (entity) => {
  return dispatch => {
    axios.put(entity._links.self.href, entity).then(res => {
      dispatch({type: UPDATE_WFRECT_GROUP, data: res.data})
    })
  }
}

export const removeWfRectGroup = (entity) => {
  return dispatch => {
    axios.delete(entity._links.self.href, entity).then(() => {
      dispatch({type: REMOVE_WFRECT_GROUP, data: entity})
    })
  }
}

export const showWfRectGroupsModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_WFRECT_GROUPS_MODAL, visible})
  }
}

export const selectWfRectGroup = (group) => {
  return dispatch => {
    dispatch({type: SELECT_WFRECT_GROUP, group})
  }
}

export const addGaugeRect = (props, board) => {
  return dispatch => {
    dispatch(updateWfRectGroup({
      ...board,
      rects: [...(board.rects || []), props]
    }))
  }
}

export const updateGaugeRect = (props, board, stateOnly) => {
  return dispatch => {
    const rects = (board.rects || []).map(p => {
      if (props.length) {
        const index = findIndex(props, {uid: p.uid})
        return index < 0 ? p : props[index]
      } else {
        return p.uid === props.uid ? props : p
      }
    })

    const data = {
      ...board,
      rects
    }
    if (stateOnly) {
      dispatch({type: UPDATE_WFRECT_GROUP, data})
    } else {
      dispatch(updateWfRectGroup(data))
    }

  }
}

export const removeGaugeRect = (props, board, stateOnly) => {
  return dispatch => {
    const data = {
      ...board,
      rects: (board.rects || []).filter(p => p.uid !== props.uid)
    }
    if (stateOnly)
      dispatch({type: UPDATE_WFRECT_GROUP, data})
    else
      dispatch(updateWfRectGroup(data))
  }
}

export const showAppsPrefModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_APPS_PREF_MODAL, visible})
  }
}

export const updateAppsPref = (data) => {
  return dispatch => {
    dispatch({type: UPDATE_APPS_PREF, data})
  }
}

export const fetchAllApps = (hideDuplicate) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/findAllApps`, {
      params: {hideDuplicate}
    }).then(res => {
      dispatch({type: FETCH_ALL_APPS, data: res.data})
    })
  }
}

export const showAppDevicesModal = (visible, deviceIds, app) => {
  return dispatch => {
    dispatch({type: SHOW_APP_DEVICES_MODAL, visible, deviceIds, app})
  }
}

export const showServerSearchModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_SERVER_SEARCH_MODAL, visible})
  }
}

export const searchServers = params => {
  return dispatch => {
    axios.get(`${ROOT_URL}/search/device?${encodeUrlParams(params)}`).then(res => {
      dispatch(updateServerSearchResults(res.data.map(p => p.id)))
    })
  }
}

export const updateServerSearchResults = (data) => {
  return dispatch => {
    dispatch({type: UPDATE_SERVER_SEARCH_RESULTS, data})
  }
}

export const updateServerSearchParams = (data) => {
  return dispatch => {
    dispatch({type: UPDATE_SERVER_SEARCH_PARAMS, data})
  }
}

export const showServerCmdModal = visible => {
  return dispatch => {
    dispatch({type: SHOW_SERVER_CMD_MODAL, visible})
  }
}

export const showRangeAddModal = visible => {
  return dispatch => {
    dispatch({type: SHOW_RANGE_ADD_MODAL, visible})
  }
}

export const scanRange = (from, to) => {
  return dispatch => {
    dispatch(updateScanStatus('loading'))
    axios.get(`${ROOT_URL}/scanRange`, {
      params: {from, to}
    }).then(res => {
      dispatch({type: SCAN_RANGE, data: res.data})
      dispatch(updateScanStatus(''))
    }).catch(() => {
      dispatch(updateScanStatus(''))
    })
  }
}

export const updateScanStatus = (status) => {
  return dispatch => {
    dispatch({type: UPDATE_SCAN_STATUS, status})
  }
}
