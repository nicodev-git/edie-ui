import axios from 'axios'
import { hashHistory } from 'react-router'
import { assign, concat } from 'lodash'
import {
    AUTH_USER, AUTH_ERROR, INVALIDATE_USER,
    FETCH_USER_INFO,
    UPDATE_USER_INFO,
    OPEN_PROFILE_MODAL,
    CLOSE_PROFILE_MODAL,

    FETCH_MESSAGE, FETCH_DEVICES,
    UPDATE_DASHBOARD,

    OPEN_DEVICE, CLOSE_DEVICE,
    FETCH_DASHBOARD_INCIDENTS,
    FETCH_DASHBOARD_BIGINCIDENTS,

    OPEN_NEW_INCIDENT_MODAL,
    CLOSE_NEW_INCIDENT_MODAL,

    FETCH_DEVICE_INCIDENTS,
    ADD_DEVICE_INCIDENT,
    UPDATE_DEVICE_INCIDENT,

    OPEN_ADD_DEVICE_INCIDENT,
    CLOSE_ADD_DEVICE_INCIDENT,

    OPEN_DEVICE_MONITOR_PICKER,
    CLOSE_DEVICE_MONITOR_PICKER,

    OPEN_DEVICE_MONITOR_WIZARD,
    CLOSE_DEVICE_MONITOR_WIZARD,
    CLEAR_DEVICE_WIZARD_INITIAL_VALUES,

    FETCH_DEVICE_RULES,
    FETCH_DEVICE_RAW_INCIDENTS,
    FETCH_DEVICE_PHYSICAL_RULES,
    FETCH_DEVICE_BASIC_MONITORS,
    FETCH_DEVICE_EVENTLOG,
    FETCH_DEVICE_APPS,

    FETCH_ATTACKERS,

    FETCH_MAPS,
    ADD_MAP,
    UPDATE_MAP,
    CHANGE_MAP,
    OPEN_MAP_IMPORT_MODAL,
    CLOSE_MAP_IMPORT_MODAL,
    IMPORT_MAP,

    ADD_MAP_DEVICE,
    UPDATE_MAP_DEVICE,
    DELETE_MAP_DEVICE,

    ADD_MAP_LINE,
    UPDATE_MAP_LINE,
    DELETE_MAP_LINE,

    FETCH_MAP_DEVICES_LINES,

    OPEN_DEVICE_EDIT_MODAL,
    CLOSE_DEVICE_EDIT_MODAL,
    UPDATE_DEVICE_ERROR,

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

    FETCH_IMAGES,
    UPLOAD_IMAGE,

    SEARCH_INCIDENTS,
    SEARCH_INCIDENT_DEVICES,

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

    GENERATE_PINCODE,

    API_ERROR
} from './types'
import { encodeUrlParams } from '../shared/Global'

const ROOT_URL = 'http://imp.dev.securegion.com'

export function fetchDevices () {
  return function (dispatch) {
    let config = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': window.localStorage.getItem('token')
      }
    }
    axios.get(`${ROOT_URL}/device`, config)
            .then(response => {
                // console.log('FETCH_DEVICES:', response);
              console.log('Response DATA:', response.data._embedded.devices)

              dispatch({
                type: FETCH_DEVICES,
                payload: response.data._embedded.devices
              })
            })
  }
}

function getAuthConfig () { // eslint-disable-line no-unused-vars
  let config = {
    headers: {
      'Cache-Control': 'no-cache',
      'X-Authorization': window.localStorage.getItem('token')
    }
  }
  return config
}

export function signUser ({ email, password }) {
    // //console.log('signUser', email, password);
  return function (dispatch) {
    // let config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-Requested-With': 'XMLHttpRequest'
    //   }
    // }
    //     // //console.log(email, password);
    // axios.post(`${ROOT_URL}/api/auth/login`,
    //   {
    //     username: email,
    //     password: password
    //   }, config
    //         )
    //         .then(response => {
    //           console.log(response)
    //           dispatch({type: AUTH_USER})
    //             // console.log('token:', response.data.token);
    //           window.localStorage.setItem('token', response.data.token)
    //
    //           hashHistory.push('/')
    //         })
    //         .catch((err) => {
    //           console.log('err', err)
    //           dispatch({type: AUTH_ERROR, msg: 'Wrong credentials.'})
    //         })

    const api = new XMLHttpRequest() // eslint-disable-line no-undef
    api.onreadystatechange = () => {
      if (api.readyState === 4) {
        if (api.status !== 200) {
          dispatch({type: AUTH_ERROR, msg: 'Wrong credentials.'})
        } else {
          dispatch({type: AUTH_USER})

          console.log(JSON.parse(api.responseText))

          window.localStorage.setItem('token', JSON.parse(api.responseText).token)

          hashHistory.push('/')
        }
      }
    }
    api.open('POST', `${ROOT_URL}/api/auth/login`, true)
    // api.setRequestHeader('Origin', ROOT_URL)
    api.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    api.send(JSON.stringify({
      username: email,
      password: password
    }))
  }
}

export function signOut () {
  window.localStorage.removeItem('token')
  return {
    type: INVALIDATE_USER
  }
}

export function signup ({ email, password }) {
    // console.log('signup', email, password);
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response => {
              dispatch({type: AUTH_USER})
              window.localStorage.setItem('token', response.data.token)
              hashHistory.push('/feature')
            })
            .catch(error => {
              dispatch({type: AUTH_ERROR, msg: error})
            })
  }
}

export function fetchUserInfo () {
  return function (dispatch) {
    let config = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': window.localStorage.getItem('token')
      }
    }
    axios.get(`${ROOT_URL}/api/me`, config).then(response => {
      dispatch({ type: FETCH_USER_INFO, data: response.data }) // eslint-disable-line no-unused-vars
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function fetchMessage () {
    // //console.log('signup', email, password);
  return function (dispatch) {
        // console.log(window.localStorage.getItem('token'));
    let config = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': window.localStorage.getItem('token')
      }
    }
    axios.get(`${ROOT_URL}/api/me`, config)
            .then(response => {
                // console.log(response);
              dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.username
              })
            })
        // .catch(error => {
        //    dispatch(authError(error));
        // });
  }
}

export function updateUserProfile (props) {
  return function (dispatch) {
    axios.put(`${ROOT_URL}/user/${props.id}`, props)
            .then(response => {
              dispatch({ type: UPDATE_USER_INFO, data: response.data })
              dispatch(closeProfileModal())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function openProfileModal () {
  return function (dispatch) {
    dispatch({ type: OPEN_PROFILE_MODAL })
  }
}

export function closeProfileModal () {
  return function (dispatch) {
    dispatch({ type: CLOSE_PROFILE_MODAL })
  }
}

export function fetchMaps (initial) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/map`)
            .then(response => {
              const maps = response.data._embedded.maps
              dispatch({type: FETCH_MAPS, data: maps})
              if (initial && maps.length) dispatch(changeMap(maps[0]))
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function changeMap (map) {
  return function (dispatch) {
    dispatch({type: CHANGE_MAP, map})

    dispatch(fetchMapDevicesAndLines(map.id))
  }
}

export function addMap (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/map`, props)
        .then(response => {
          dispatch({ type: ADD_MAP, data: response.data })
        })
        .catch(error => {
          dispatch({type: API_ERROR, msg: error})
        })
  }
}

export function updateMap (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity)
        .then(response => {
          dispatch({ type: UPDATE_MAP, data: response.data })
        })
        .catch(error => {
          dispatch({type: API_ERROR, msg: error})
        })
  }
}

export function deleteMap (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href)
            .then(response => {
              dispatch(fetchMaps(true))
                // dispatch({ type: REMOVE_MAP, data: entity })
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function openMapImportModal () {
  return function (dispatch) {
    dispatch({ type: OPEN_MAP_IMPORT_MODAL })
  }
}

export function closeMapImportModal () {
  return function (dispatch) {
    dispatch({ type: CLOSE_MAP_IMPORT_MODAL })
  }
}

export function importMap (form) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/importmap`, form).then(response => {
      dispatch({type: IMPORT_MAP, data: response.data})
      dispatch(closeMapImportModal())
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function updateDashboard (data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_DASHBOARD,
      data
    })
  }
}

export function fetchMapDevicesAndLines (mapid) {
  return function (dispatch) {
    if (!mapid) {
      dispatch({ type: FETCH_MAP_DEVICES_LINES, maps: [], lines: [] })
      return
    }

    const req1 = axios.get(`${ROOT_URL}/device/search/findDevicesByMapid`, {
      params: { mapid }
    }).then(response => {
      return response.data._embedded.devices
    })

    const req2 = axios.get(`${ROOT_URL}/device/search/findLinesByMapid`, {
      params: { mapid }
    }).then(response => {
      return response.data._embedded.devices
    })

    axios.all([req1, req2]).then(res => {
      dispatch({ type: FETCH_MAP_DEVICES_LINES, maps: res[0], lines: res[1] })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function addMapDevice (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/device`, props)
            .then(response => {
              dispatch({type: ADD_MAP_DEVICE, data: response.data})
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function updateMapDevice (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity)
            .then(response => {
              dispatch({type: UPDATE_MAP_DEVICE, data: response.data})
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function deleteMapDevice (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href)
            .then(response => {
              dispatch({type: DELETE_MAP_DEVICE, data: entity})
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function addMapLine (props, cb) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/device`, props)
            .then(response => {
              dispatch({type: ADD_MAP_LINE, data: response.data})
              cb && cb(response.data)
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function updateMapLine (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity)
            .then(response => {
              dispatch({type: UPDATE_MAP_LINE, data: response.data})
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function deleteMapLine (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href)
            .then(response => {
              dispatch({type: DELETE_MAP_LINE, data: entity})
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchIncidents () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/incident`, {
      params: { }
    }).then(response => {
      dispatch({ type: FETCH_DASHBOARD_INCIDENTS, data: response.data._embedded.incidents })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function fetchBigIncidents (params) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`).then(response => {
      dispatch({ type: FETCH_DASHBOARD_BIGINCIDENTS, data: response.data._embedded.incidents })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function fetchAttackers () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/attacker`, {
      params: { }
    }).then(response => {
      dispatch({ type: FETCH_ATTACKERS, data: response.data._embedded.attackers })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function openNewIncidentModal () {
  return function (dispatch) {
    dispatch({
      type: OPEN_NEW_INCIDENT_MODAL
    })
  }
}

export function closeNewIncidentModal () {
  return function (dispatch) {
    dispatch({
      type: CLOSE_NEW_INCIDENT_MODAL
    })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchDeviceTemplates () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/devicetemplate`).then(response => {
      dispatch({type: FETCH_DEVICE_TEMPLATES, data: response.data._embedded.deviceTemplates})
    })
        .catch(error => {
          dispatch({type: API_ERROR, msg: error})
        })
  }
}

export function addDeviceTemplate (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/devicetemplate`, props)
            .then(response => {
              dispatch({type: ADD_DEVICE_TEMPLATE, data: response.data})
              dispatch(closeDeviceTplModal())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function updateDeviceTemplate (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity)
            .then(response => {
              dispatch({type: UPDATE_DEVICE_TEMPLATE, data: response.data})
              dispatch(closeDeviceTplModal())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function deleteDeviceTemplate (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href, entity)
            .then(response => {
              dispatch({type: DELETE_DEVICE_TEMPLATE, data: entity})
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function openDeviceTplModal (tpl) {
  return function (dispatch) {
    dispatch({type: OPEN_DEVICE_TEMPLATE_MODAL, data: tpl})
  }
}

export function closeDeviceTplModal () {
  return function (dispatch) {
    dispatch({type: CLOSE_DEVICE_TEMPLATE_MODAL})
  }
}

export function fetchMonitorTemplates () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/monitortemplate`).then(response => {
      dispatch({type: FETCH_MONITOR_TEMPLATES, data: response.data._embedded.monitorTemplates})
    })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function addMonitorTemplate (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/monitortemplate`, props)
            .then(response => {
              dispatch({type: ADD_MONITOR_TEMPLATE, data: response.data})
              dispatch(closeMonitorTplModal())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function updateMonitorTemplate (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity)
            .then(response => {
              dispatch({type: UPDATE_MONITOR_TEMPLATE, data: response.data})
              dispatch(closeMonitorTplModal())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function deleteMonitorTemplate (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href, entity)
            .then(() => {
              dispatch({type: DELETE_MONITOR_TEMPLATE, data: entity})
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function openMonitorTplModal (tpl) {
  return function (dispatch) {
    dispatch({type: OPEN_MONITOR_TEMPLATE_MODAL, data: tpl})
  }
}

export function closeMonitorTplModal () {
  return function (dispatch) {
    dispatch({type: CLOSE_MONITOR_TEMPLATE_MODAL})
  }
}

export function openTplImageModal () {
  return function (dispatch) {
    dispatch({type: OPEN_TPL_IMAGE_MODAL})
  }
}

export function closeTplImageModal (selectedImage) {
  return function (dispatch) {
    dispatch({type: CLOSE_TPL_IMAGE_MODAL, data: selectedImage})
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function openDevice (device) {
  return function (dispatch) {
    dispatch({
      type: OPEN_DEVICE,
      data: device
    })
  }
}

export function closeDevice () {
  return function (dispatch) {
    dispatch({
      type: CLOSE_DEVICE
    })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchDeviceIncidents (params) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`).then(response => {
      dispatch({type: FETCH_DEVICE_INCIDENTS, data: response.data._embedded.incidents})
    })
        .catch(error => {
          dispatch({type: API_ERROR, msg: error})
        })
  }
}

export function addDeviceIncident (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/incident`, props)
            .then(response => {
              dispatch({type: ADD_DEVICE_INCIDENT, data: response.data})
              dispatch(closeAddDeviceIncident())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function updateDeviceIncident (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({type: UPDATE_DEVICE_INCIDENT, data: response.data})
    })
        .catch(error => {
          dispatch({type: API_ERROR, msg: error})
        })
  }
}

export function openAddDeviceIncident () {
  return function (dispatch) {
    dispatch({
      type: OPEN_ADD_DEVICE_INCIDENT
    })
  }
}

export function closeAddDeviceIncident () {
  return function (dispatch) {
    dispatch({
      type: CLOSE_ADD_DEVICE_INCIDENT
    })
  }
}

export function fixIncident (incident) {
  return function (dispatch) {
    incident.fixed = true
    incident.acknowledged = true
    dispatch(updateDeviceIncident(incident))
  }
}

export function ackIncident (incident) {
  return function (dispatch) {
    incident.acknowledged = true
    dispatch(updateDeviceIncident(incident))
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function openDeviceMonitorPicker () {
  return function (dispatch) {
    dispatch({
      type: OPEN_DEVICE_MONITOR_PICKER
    })
  }
}

export function closeDeviceMonitorPicker () {
  return function (dispatch) {
    dispatch({
      type: CLOSE_DEVICE_MONITOR_PICKER
    })
  }
}

export function openDeviceMonitorWizard (initialValues) {
  return function (dispatch) {
    dispatch({
      type: OPEN_DEVICE_MONITOR_WIZARD,
      data: initialValues
    })
  }
}

export function closeDeviceMonitorWizard () {
  return function (dispatch) {
    dispatch({
      type: CLOSE_DEVICE_MONITOR_WIZARD
    })
  }
}

export function clearDeviceWizardInitialValues () {
  return dispatch => {
    dispatch({ type: CLEAR_DEVICE_WIZARD_INITIAL_VALUES })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function uploadImage (formData) {
  return dispatch => {
    axios.post(`${ROOT_URL}/upload`, formData)
        .then(response => {
          dispatch({type: UPLOAD_IMAGE, data: response.data})
        })
        .catch(error => {
          dispatch({type: API_ERROR, msg: error})
        })
  }
}

export function fetchImages () {
  return dispatch => {
    axios.get(`${ROOT_URL}/customImage`)
            .then(response => {
              dispatch({type: FETCH_IMAGES, data: response.data._embedded.customImages})
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function searchIncidents (params) {
  return dispatch => {
    axios.get(`${ROOT_URL}/incident/search/findBy?${encodeUrlParams(params)}`).then(response => {
      dispatch({type: SEARCH_INCIDENTS, data: response.data._embedded.incidents})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function searchIncidentDevices (params) {
  return dispatch => {
    axios.get(`${ROOT_URL}/device/search/findByName?${encodeUrlParams(params)}`).then(response => {
      dispatch({type: SEARCH_INCIDENT_DEVICES, data: response.data._embedded.devices})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchSettingMaps () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/map`).then(response => {
      dispatch({type: FETCH_SETTING_MAPS, data: response.data._embedded.maps})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function openSettingMapModal (map) {
  return function (dispatch) {
    dispatch({type: OPEN_SETTING_MAP_MODAL, data: map})
  }
}

export function closeSettingMapModal () {
  return function (dispatch) {
    dispatch({type: CLOSE_SETTING_MAP_MODAL})
  }
}

export function addSettingMap (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/map`, props)
            .then(response => {
              dispatch({ type: ADD_SETTING_MAP, data: response.data })
              dispatch(closeSettingMapModal())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function updateSettingMap (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity)
            .then(response => {
              dispatch({ type: UPDATE_SETTING_MAP, data: response.data })
              dispatch(closeSettingMapModal())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function deleteSettingMap (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href)
            .then(() => {
              dispatch({ type: REMOVE_SETTING_MAP, data: entity })
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function openMapUsersModal (map) {
  return function (dispatch) {
    dispatch({type: OPEN_MAP_USERS_MODAL, data: map})
    dispatch(fetchMapUsers(map.id))
  }
}

export function closeMapUsersModal () {
  return function (dispatch) {
    dispatch({type: CLOSE_MAP_USERS_MODAL})
  }
}

export function fetchMapUsers (mapId) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user/search/findByMap?mapid=${mapId}`).then(response => {
      dispatch({type: FETCH_MAP_USERS, data: response.data._embedded.users})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function addMapUser (map, user) {
  return function (dispatch) {
    const entity = assign({ }, user)
    entity.mapids = concat(entity.mapids || [], map.id)

    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({ type: ADD_MAP_USER, data: response.data })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function removeMapUser (map, user) {
  return function (dispatch) {
    const entity = assign({ mapids: [] }, user)
    entity.mapids = (entity.mapids || []).filter(u => u !== map.id)

    axios.put(entity._links.self.href, entity).then(() => {
      dispatch({ type: REMOVE_MAP_USER, data: user })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchSettingUsers () {
  return function (dispatch) {
    dispatch({type: FETCH_SETTING_USERS, data: []})

    axios.get(`${ROOT_URL}/user`).then(response => {
      dispatch({type: FETCH_SETTING_USERS, data: response.data._embedded.users})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function addSettingUser (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/user`, props)
            .then(response => {
              dispatch({ type: ADD_SETTING_USER, data: response.data })
              dispatch(closeSettingUserModal())
            })
            .catch(error => {
              dispatch({type: API_ERROR, msg: error})
            })
  }
}

export function updateSettingUser (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({ type: UPDATE_SETTING_USER, data: response.data })
      dispatch(closeSettingUserModal())
      dispatch(closeUserPasswordModal())
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function deleteSettingUser (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href).then(response => {
      dispatch({ type: REMOVE_SETTING_USER, data: entity })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function openSettingUserModal (user) {
  return function (dispatch) {
    dispatch({type: OPEN_SETTING_USER_MODAL, data: user})
  }
}

export function closeSettingUserModal () {
  return function (dispatch) {
    dispatch({type: CLOSE_SETTING_USER_MODAL})
  }
}

export function openUserPasswordModal (user) {
  return function (dispatch) {
    dispatch({type: OPEN_USER_PASSWORD_MODAL, data: user})
  }
}

export function closeUserPasswordModal () {
  return function (dispatch) {
    dispatch({type: CLOSE_USER_PASSWORD_MODAL})
  }
}

export function generatePincode () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/genpin`).then(response => {
      dispatch({type: GENERATE_PINCODE, data: response.data})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function fetchEnvVars () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/setting/search/envvars`).then(response => {
      dispatch({type: FETCH_ENV_VARS, data: response.data._embedded.settingses})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function updateEnvVar (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({type: UPDATE_ENV_VAR, data: response.data})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function addEnvVar (entity) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/setting`, entity).then(response => {
      dispatch({type: ADD_ENV_VAR, data: response.data})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function fetchIdentities () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/setting/search/identities`).then(response => {
      dispatch({type: FETCH_IDENTITIES, data: response.data._embedded.settingses})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function addIdentity (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/setting`, props).then(response => {
      dispatch({type: ADD_IDENTITY, data: response.data})
      dispatch(closeIdentityModal())
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function updateIdentity (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({type: UPDATE_IDENTITY, data: response.data})
      dispatch(closeIdentityModal())
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function removeIdentity (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href).then(response => {
      dispatch({type: REMOVE_IDENTITY, data: entity})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function openIdentityModal (entity) {
  return function (dispatch) {
    dispatch({ type: OPEN_IDENTITY_MODAL, data: entity })
  }
}

export function closeIdentityModal () {
  return function (dispatch) {
    dispatch({ type: CLOSE_IDENTITY_MODAL })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchCredentials () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/credential`).then(response => {
      dispatch({ type: FETCH_CREDENTIALS, data: response.data._embedded.credentials })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function addCredentials (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/credential`, props).then(response => {
      dispatch({type: ADD_CREDENTIALS, data: response.data})
      dispatch(closeCredentialsModal())
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function updateCredentials (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({type: UPDATE_CREDENTIALS, data: response.data})
      dispatch(closeCredentialsModal())
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function removeCredentials (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href).then(response => {
      dispatch({type: REMOVE_CREDENTIALS, data: entity})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function openCredentialsModal (entity) {
  return function (dispatch) {
    dispatch({ type: OPEN_CREDENTIALS_MODAL, data: entity })
  }
}

export function closeCredentialsModal () {
  return function (dispatch) {
    dispatch({ type: CLOSE_CREDENTIALS_MODAL })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchWorkflows () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/workflow`).then(response => {
      dispatch({ type: FETCH_WORKFLOWS, data: response.data._embedded.workflows })
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function addWorkflow (props) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/workflow`, props).then(response => {
      dispatch({type: ADD_WORKFLOW, data: response.data})
      dispatch(closeWorkflowModal())
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function updateWorkflow (entity) {
  return function (dispatch) {
    axios.put(entity._links.self.href, entity).then(response => {
      dispatch({type: UPDATE_WORKFLOW, data: response.data})
      dispatch(closeWorkflowModal())
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function removeWorkflow (entity) {
  return function (dispatch) {
    axios.delete(entity._links.self.href).then(response => {
      dispatch({type: REMOVE_WORKFLOW, data: entity})
    }).catch(error => {
      dispatch({type: API_ERROR, msg: error})
    })
  }
}

export function openWorkflowModal (entity) {
  return function (dispatch) {
    dispatch({ type: OPEN_WORKFLOW_MODAL, data: entity })
  }
}

export function closeWorkflowModal () {
  return function (dispatch) {
    dispatch({ type: CLOSE_WORKFLOW_MODAL })
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function fetchDeviceRules () {
  return function (dispatch) {
    dispatch({
      type: FETCH_DEVICE_RULES,
      data: []
    })
  }
}

export function fetchDeviceRawIncidents () {
  return function (dispatch) {
    dispatch({
      type: FETCH_DEVICE_RAW_INCIDENTS,
      data: []
    })
  }
}

export function fetchDevicePhysicalRules () {
  return function (dispatch) {
    dispatch({
      type: FETCH_DEVICE_PHYSICAL_RULES,
      data: []
    })
  }
}

export function fetchDeviceBasicMonitors () {
  return function (dispatch) {
    // const res = [] // Never used

    dispatch({
      type: FETCH_DEVICE_BASIC_MONITORS,
      data: []
    })
  }
}

export function fetchDeviceEventLog () {
  return function (dispatch) {
    dispatch({
      type: FETCH_DEVICE_EVENTLOG,
      data: []
    })
  }
}

export function fetchDeviceApps () {
  return function (dispatch) {
    const res = []
    dispatch({
      type: FETCH_DEVICE_APPS,
      data: res
    })
  }
}

export function openDeviceEditModal (device) {
  return function (dispatch) {
    dispatch({
      type: OPEN_DEVICE_EDIT_MODAL,
      device
    })
  }
}

export function closeDeviceEditModal () {
  return function (dispatch) {
    dispatch({
      type: CLOSE_DEVICE_EDIT_MODAL
    })
  }
}

export function addDevice (url, props) {
  return function (dispatch) {
    axios.post(url, props)
            .then(response => {
              dispatch(closeDeviceEditModal())
              dispatch(fetchDevices())
            })
            .catch(error => {
              dispatch({type: UPDATE_DEVICE_ERROR, msg: error})
            })
  }
}

export function updateDevice (url, props) {
  return function (dispatch) {
    axios.put(url, props)
            .then(response => {
              dispatch(closeDeviceEditModal())
              dispatch(fetchDevices())
            })
            .catch(error => {
              dispatch({type: UPDATE_DEVICE_ERROR, msg: error})
            })
  }
}

export function deleteDevice (url) {
  return function (dispatch) {
    axios.delete(url)
            .then(response => {
              dispatch(fetchDevices())
            })
            .catch(error => {
              dispatch({type: UPDATE_DEVICE_ERROR, msg: error})
            })
  }
}
