import {
  OPEN_DEVICE, CLOSE_DEVICE,
  FETCH_MAPS,
  ADD_MAP,
  UPDATE_MAP,
  REMOVE_MAP,
  CHANGE_MAP,
  OPEN_MAP_IMPORT_MODAL,
  CLOSE_MAP_IMPORT_MODAL,
  IMPORT_MAP,
  SHOW_MAP_EXPORT_MODAL,

  ADD_MAP_DEVICE,
  UPDATE_MAP_DEVICE,
  UPDATE_MAP_DEVICES,
  DELETE_MAP_DEVICE,

  ADD_MAP_LINE,
  UPDATE_MAP_LINE,
  DELETE_MAP_LINE,

  FETCH_MAP_DEVICES_LINES,

  FETCH_DASHBOARD_INCIDENTS,
  ADD_DASHBOARD_INCIDENT,
  FETCH_DASHBOARD_BIGINCIDENTS,
  UPDATE_DEVICE_INCIDENT,

  UPDATE_BIGINCIDENTS_PARAMS,

  FETCH_IMAGES,
  UPLOAD_IMAGE,

  FETCH_USER_INFO,
  UPDATE_USER_INFO,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL,
  CHANGE_PROFILE_IMG,

  CLOSE_API_ERROR_MODAL,

  REQUIRE_FULLSCREEN,

  OPEN_DASHBOARD_NEW_INCIDENT_MODAL,
  CLOSE_DASHBOARD_NEW_INCIDENT_MODAL,

  OPEN_INCIDENT_EVENTS_MODAL,
  CLOSE_INCIDENT_EVENTS_MODAL,

  UPDATE_DASHBOARD_STATS,
  UPDATE_NEW_INCIDENT_MSG,

  UPDATE_MAP_DEVICE_STATUS,
  RELOAD_DEVICE,

  SHOW_SIDEBAR_MESSAGE_MENU,

  SHOW_THREAT_ITEM_MODAL,
  UPDATE_SIDEBAR_SEARCH_ACTIVE,
  SHOW_COMMENTS_MODAL,
  SHOW_ATTACKER_MODAL,

  FIX_ALL_DEVICE_INCIDENTS,

  UPDATE_VIEWLOG_PARAMS,
  UPDATE_VIEWLOG_DEVICE,
  SHOW_DETAIL_LOG_MODAL,

  SHOW_DEVICE_TPL_PICKER,
  SHOW_MONITOR_DETAIL_MODAL,

  DELETE_DEVICE_STATE,

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

  UPDATE_SETTING_USER,

  FETCH_DEVICES,

  FETCH_MAP_ITEMS,
  ADD_MAP_ITEM,
  UPDATE_MAP_ITEM,
  REMOVE_MAP_ITEM,

  API_ERROR
} from 'actions/types'

import {concat, difference, assign, findIndex} from 'lodash'

const initialState = {
  stats: {
    open: 0,
    month: 0,
    today: 0,
    attackers: 0
  },

  maps: [],
  mapDevices: [],
  mapLines: [],

  incidents: [],
  mainIncidentDraw: 1,

  selectedDevice: null,

  images: [],

  logViewParam: {
    q: '',
    monitorId: ''
  },

  wfRectGroups: [],

  appsPref: {
    hideDuplicate: false
  },
  allApps: [],
  serverSearchParams: {},
  rangeScanResults: [],

  sidebarProfileMenuOpen: false,
  sidebarMessageMenuOpen: false,

  sidebarSearchActive: false,

  mapItems: [],

  apiErrorModalOpen: false,
  apiError: '',

  newIncident: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
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

    case FETCH_DEVICES: {
      let {selectedDevice} = state
      if (selectedDevice) {
        const index = findIndex(action.payload, {id: selectedDevice.id})
        selectedDevice = {...selectedDevice, ...action.payload[index]}
      }
      return {...state, selectedDevice}
    }

    case UPDATE_MAP_DEVICE: {
      let mapDevices = state.mapDevices.map(u => {
        if (u.id === action.data.id) return {...u, ...action.data}
        return u
      })

      let {selectedDevice} = state
      if (selectedDevice && selectedDevice.id === action.data.id) selectedDevice = {...selectedDevice, ...action.data}

      return {...state, mapDevices, selectedDevice}
    }
    case UPDATE_MAP_DEVICES: {
      const mapDevices = state.mapDevices.map(u => {
        const index = findIndex(action.data, {id: u.id})
        if (index >= 0) return {...u, ...action.data[index]}
        return u
      })

      let {selectedDevice} = state
      if (selectedDevice) {
        const index = findIndex(action.data, {id: selectedDevice.id})
        selectedDevice = {...selectedDevice, ...action.data[index]}
      }

      return {...state, mapDevices, selectedDevice}
    }
    case RELOAD_DEVICE:
      return {...state, selectedDevice: assign({}, state.selectedDevice, action.data)}

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
      return { ...state, mapDevices: action.devices, mapLines: action.lines }

    case FETCH_DASHBOARD_INCIDENTS:
      return { ...state, incidents: action.data }

    case FETCH_DASHBOARD_BIGINCIDENTS:
      return { ...state, bigIncidents: action.data }

    case UPDATE_DEVICE_INCIDENT: {
      const incidents = state.incidents.map(u => {
        if (u.id === action.data.id) return action.data
        return u
      })
      return { ...state, incidents, mainIncidentDraw: state.mainIncidentDraw + 1 }
    }

    case UPDATE_BIGINCIDENTS_PARAMS: {
      console.log(action.params)
      return { ...state, bigIncidentParams: action.params }
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

    case UPDATE_SETTING_USER: {
      let {userInfo} = state
      if (userInfo && userInfo.id === action.data.id) {
        userInfo = {
          ...userInfo,
          ...action.data
        }
      }
      return { ...state, userInfo }
    }

    case OPEN_PROFILE_MODAL:
      return { ...state, profileModalVisible: true, profileImg: null }

    case CLOSE_PROFILE_MODAL:
      return { ...state, profileModalVisible: false, profileImg: null }

    case CHANGE_PROFILE_IMG:
      return { ...state, profileImg: action.img }

    case API_ERROR:
      return { ...state, apiErrorModalOpen: true, apiError: action.msg }

    case CLOSE_API_ERROR_MODAL:
      return { ...state, apiErrorModalOpen: false }

    case REQUIRE_FULLSCREEN:
      return { ...state, isFullScreen: action.enabled }

    case OPEN_DASHBOARD_NEW_INCIDENT_MODAL:
      return { ...state, newIncidentModalOpen: true }
    case CLOSE_DASHBOARD_NEW_INCIDENT_MODAL:
      return { ...state, newIncidentModalOpen: false }

    case OPEN_INCIDENT_EVENTS_MODAL:
      return { ...state, incidentEventsModalOpen: true, selectedIncident: action.incident }
    case CLOSE_INCIDENT_EVENTS_MODAL:
      return { ...state, incidentEventsModalOpen: false }

    case UPDATE_DASHBOARD_STATS:
      return { ...state, stats: action.stats }

    case ADD_DASHBOARD_INCIDENT:
      return { ...state, newIncident: action.incident[0], mainIncidentDraw: state.mainIncidentDraw + 1 }

    case FIX_ALL_DEVICE_INCIDENTS:
      return { ...state, mainIncidentDraw: state.mainIncidentDraw + 1 }

    case UPDATE_NEW_INCIDENT_MSG: {
      const  lastIncidentMsg = state.newIncidentMsg || state.lastIncidentMsg
      return {...state, lastIncidentMsg, newIncidentMsg: action.msg}
    }

    case UPDATE_MAP_DEVICE_STATUS: {
      const mapDevices = state.mapDevices.map(u => {
        // const data = ['UP', 'DOWN']
        const status = action.data[u.id] // data[parseInt(Math.random() * 100) % 2]
        return status ? assign({}, u, {status}) : u
      })

      return { ...state, mapDevices }
    }

    case SHOW_SIDEBAR_MESSAGE_MENU:
      return { ...state, sidebarMessageMenuOpen: action.open }
    case SHOW_THREAT_ITEM_MODAL:
      return { ...state, threatItemModalOpen: !!action.visible, threatItem: action.threatItem }

    case UPDATE_SIDEBAR_SEARCH_ACTIVE:
      return { ...state, sidebarSearchActive: action.active }
    case SHOW_COMMENTS_MODAL:
      return { ...state, commentsModalVisible: !!action.visible, commentsIncident: action.incident }
    case SHOW_ATTACKER_MODAL:
      return { ...state, attackerModalOpen: !!action.visible }

    case SHOW_MAP_EXPORT_MODAL:
      return { ...state, mapExportModalOpen: !!action.visible }

    case UPDATE_VIEWLOG_PARAMS:
      return { ...state, logViewParam: action.params }

    case UPDATE_VIEWLOG_DEVICE:
      return { ...state, logViewDevice: action.device }

    case SHOW_DETAIL_LOG_MODAL:
      return { ...state, detailLogModalOpen: action.visible, detailLogViewParam: action.params }

    case SHOW_DEVICE_TPL_PICKER:
      return { ...state, deviceTplPickerOpen: action.visible }

    case SHOW_MONITOR_DETAIL_MODAL:
      return { ...state, monitorDetailModalOpen: action.visible, gaugeDevice: action.device, gaugeMonitor: action.monitor }

    case DELETE_DEVICE_STATE:
      return { ...state, deleteDeviceState: action.data }

    case SHOW_WFRECT_MODAL:
      return { ...state, wfRectModalOpen: action.visible, editWfRect: action.data }

    case SHOW_RECT_SEARCH_MODAL:
      return { ...state, rectSearchModalOpen: action.visible, rectSearchParams: action.params }

    case FETCH_WFRECT_GROUPS:
      return { ...state, wfRectGroups: action.data }
    case ADD_WFRECT_GROUP:
      return { ...state, wfRectGroups: [...state.wfRectGroups, action.data] }

    case UPDATE_WFRECT_GROUP: {
      let {selectedWfRectGroup} = state
      if (selectedWfRectGroup && selectedWfRectGroup.id === action.data.id ) selectedWfRectGroup = action.data
      return { ...state, wfRectGroups: state.wfRectGroups.map(p => p.id === action.data.id ? action.data : p), selectedWfRectGroup }
    }

    case REMOVE_WFRECT_GROUP: {
      let {selectedWfRectGroup} = state
      if (selectedWfRectGroup && selectedWfRectGroup.id === action.data.id ) selectedWfRectGroup = null
      return { ...state, wfRectGroups: state.wfRectGroups.filter(p => p.id !== action.data.id), selectedWfRectGroup }
    }

    case SHOW_WFRECT_GROUPS_MODAL:
      return { ...state, wfRectGroupsModalOpen: action.visible }

    case SELECT_WFRECT_GROUP:
      return { ...state, selectedWfRectGroup: action.group }

    case SHOW_APPS_PREF_MODAL:
      return { ...state, appsPrefModalOpen: action.visible }

    case UPDATE_APPS_PREF:
      return { ...state, appsPref: action.data }

    case FETCH_ALL_APPS:
      return { ...state, allApps: action.data }

    case SHOW_APP_DEVICES_MODAL:
      return { ...state, appDevicesModalOpen: action.visible, appDeviceIds: action.deviceIds, selectedApp: action.app }

    case SHOW_SERVER_SEARCH_MODAL:
      return { ...state, serverSearchModalOpen: action.visible }

    case UPDATE_SERVER_SEARCH_RESULTS:
      return { ...state, serverSearchResults: action.data }

    case UPDATE_SERVER_SEARCH_PARAMS:
      return  { ...state, serverSearchParams: action.data }

    case SHOW_SERVER_CMD_MODAL:
      return { ...state, serverCmdModalOpen: action.visible }

    case SHOW_RANGE_ADD_MODAL:
      return { ...state, rangeAddModalOpen: action.visible }

    case SCAN_RANGE:
      return { ...state, rangeScanResults: action.data }
    case UPDATE_SCAN_STATUS:
      return { ...state, scanStatus: action.status }

    case FETCH_MAP_ITEMS:
      return { ...state, mapItems: action.data, mapLines: action.lines }
    case ADD_MAP_ITEM:
      return { ...state, mapItems: [...state.mapItems, action.data] }
    case UPDATE_MAP_ITEM:
      return { ...state, mapItems: state.mapItems.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_MAP_ITEM:
      return { ...state, mapItems: state.mapItems.filter(p => p.id !== action.data.id) }

    default:
      return state
  }
}

