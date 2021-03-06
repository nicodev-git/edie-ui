import axios from 'axios'
import { assign, concat, find } from 'lodash'
import {
  FETCH_MAPS,
  ADD_MAP,
  UPDATE_MAP,
  REMOVE_MAP,
  CHANGE_MAP,
  OPEN_MAP_IMPORT_MODAL,
  CLOSE_MAP_IMPORT_MODAL,
  IMPORT_MAP,
  SHOW_MAP_EXPORT_MODAL,

  OPEN_MAP_USERS_MODAL,
  CLOSE_MAP_USERS_MODAL,
  FETCH_MAP_USERS,
  ADD_MAP_USER,
  REMOVE_MAP_USER,

  ADD_MAP_DEVICE,
  UPDATE_MAP_DEVICE,
  DELETE_MAP_DEVICE,

  ADD_MAP_LINE,
  UPDATE_MAP_LINE,
  DELETE_MAP_LINE,

  FETCH_MAP_ITEMS,
  ADD_MAP_ITEM,
  UPDATE_MAP_ITEM,
  REMOVE_MAP_ITEM,

  RELOAD_DEVICE,

  DELETE_DEVICE_STATE,

  NO_AUTH_ERROR
} from './types'

import { apiError } from './Errors'

import { ROOT_URL } from './config'
import {encodeUrlParams} from 'shared/Global'

import {addDeviceCredential} from './CredentialsActions'
import {resolveAddr} from 'shared/HostUtil'

export const fetchMaps = (initial) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/map?size=100`)
      .then(response => fetchMapsSuccess(dispatch, response, initial))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchMapsSuccess = (dispatch, response, initial) => {
  const maps = response.data._embedded.maps
  dispatch({
    type: FETCH_MAPS,
    data: maps
  })
  if (initial && maps.length) {
    dispatch(changeMap(maps[0]))
  }
}

export const changeMap = (map) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_MAP,
      map
    })
    dispatch(fetchMapItemsByMap([map.id]))
  }
}

export const addMap = (props) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/map`, props)
      .then(response => addMapSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addMapSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_MAP,
    data: response.data
  })
  dispatch(changeMap(response.data))
}

export const updateMap = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.put(`${ROOT_URL}/map/${entity.id}`, entity)
      .then(response => updateMapSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateMapSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_MAP,
    data: response.data
  })
}

export const deleteMap = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/map/${entity.id}`)
      .then(() => deleteMapSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const deleteMapSuccess = (dispatch, entity) => {
  dispatch({
    type: REMOVE_MAP,
    data: entity
  })
}

export const openMapImportModal = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_MAP_IMPORT_MODAL
    })
  }
}

export const closeMapImportModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MAP_IMPORT_MODAL
    })
  }
}

export const importMap = (form) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/importmap`, form)
      .then(response => importMapSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const importMapSuccess = (dispatch, response) => {
  if (!response.data) return
  dispatch({
    type: IMPORT_MAP,
    data: response.data
  })
  dispatch(closeMapImportModal())
}

export const openMapUsersModal = (map) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_MAP_USERS_MODAL,
      data: map
    })
    dispatch(fetchMapUsers(map.id))
  }
}

export const closeMapUsersModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MAP_USERS_MODAL
    })
  }
}

export const fetchMapUsers = (mapId) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/search/findByMap?mapid=${mapId}`)
      .then(response => fetchMapUsersSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const fetchMapUsersSuccess = (dispatch, response) => {
  dispatch({
    type: FETCH_MAP_USERS,
    data: response.data._embedded.users
  })
}

export const addMapUser = (map, user) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    const entity = assign({}, user)
    entity.mapids = concat(entity.mapids || [], map.id)

    axios.put(`${ROOT_URL}/map/${entity.id}`, entity)
      .then(response => addMapUserSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const addMapUserSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_MAP_USER,
    data: response.data
  })
}

export const removeMapUser = (map, user) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    const entity = assign({mapids: []}, user)
    entity.mapids = (entity.mapids || []).filter(u => u !== map.id)

    axios.put(`${ROOT_URL}/map/${entity.id}`, entity)
      .then(() => removeMapUserSuccess(dispatch, user))
      .catch(error => apiError(dispatch, error))
  }
}

const removeMapUserSuccess = (dispatch, user) => {
  dispatch({
    type: REMOVE_MAP_USER,
    data: user
  })
}

//deleted this method... export const fetchMapDevicesAndLines = (mapids) => {

const fetchWorkflowIds = (uuids, cb) => {
  if (!uuids || !uuids.length) {
    cb && cb([])
    return
  }
  axios.get(`${ROOT_URL}/flow/search/findByUuidIn?size=1000&sort=name&${encodeUrlParams({uuid: uuids})}`).then(res => {
    cb(res.data._embedded.flows.map(u => u.id))
  })
}

const addMapDeviceSuccess = (dispatch, response) => {
  dispatch({
    type: ADD_MAP_DEVICE,
    data: response.data
  })
}

export const addMapDevice = (props, url) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    fetchWorkflowIds(props.workflowids || [], workflowids => {
      resolveAddr(props, newProps => {
        axios.post(`${ROOT_URL}${url || '/device'}`, assign({}, newProps, {workflowids})).then(response => {
          addMapDeviceSuccess(dispatch, response)
          const creds = newProps.credential || []
          creds.forEach(p => {
            dispatch(addDeviceCredential(p, response.data.id))
          })
        })//.catch(error => apiError(dispatch, error))
      })
    })
  }
}

export const updateMapDevice = (entity, cb) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.put(`${ROOT_URL}/device/${entity.id}`, entity)
      .then(response => {
        updateMapDeviceSuccess(dispatch, response);
        cb && cb()
      })
      .catch(error => apiError(dispatch, error))

    if (entity.credential) {
      entity.credential.forEach(p => {
        dispatch(addDeviceCredential(p, entity.id))
      })
    }
  }
}

const updateMapDeviceSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_MAP_DEVICE,
    data: response.data
  })
}

export const deleteMapDevice = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    dispatch({type: DELETE_DEVICE_STATE, data: true})
    axios.delete(`${ROOT_URL}/device/${entity.id}`).then(() => {
      deleteMapDeviceSuccess(dispatch, entity)
      dispatch({type: DELETE_DEVICE_STATE, data: false})
    }).catch(error => {
      dispatch({type: DELETE_DEVICE_STATE, data: false})
      apiError(dispatch, error)
    })
  }
}

const deleteMapDeviceSuccess = (dispatch, entity) => {
  dispatch({
    type: DELETE_MAP_DEVICE,
    data: entity
  })
}

export const addMapLine = (props, cb) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.post(`${ROOT_URL}/mapitem`, props)
      .then(response => addMapLineSuccess(dispatch, response, cb))
      .catch(error => apiError(dispatch, error))
  }
}

const addMapLineSuccess = (dispatch, response, cb) => {
  dispatch({
    type: ADD_MAP_LINE,
    data: response.data
  })
  cb && cb(response.data)
}

export const updateMapLine = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.put(`${ROOT_URL}/mapitem/${entity.id}`, entity)
      .then(response => updateMapLineSuccess(dispatch, response))
      .catch(error => apiError(dispatch, error))
  }
}

const updateMapLineSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_MAP_LINE,
    data: response.data
  })
}

export const deleteMapLine = (entity) => {
  if (!window.localStorage.getItem('token')) {
    return dispatch => dispatch({ type: NO_AUTH_ERROR })
  }
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/mapitem/${entity.id}`)
      .then(() => deleteMapLineSuccess(dispatch, entity))
      .catch(error => apiError(dispatch, error))
  }
}

const deleteMapLineSuccess = (dispatch, entity) => {
  dispatch({
    type: DELETE_MAP_LINE,
    data: entity
  })
}

export function reloadDevice (device) {
  return (dispatch) => {
    dispatch({
      type: RELOAD_DEVICE,
      data: device
    })
  }
}

export function showMapExportModal (visible) {
  return dispatch => {
    dispatch({type: SHOW_MAP_EXPORT_MODAL, visible})
  }
}

/////////////////////////////////////////////////////////////////

export function fetchMapItemsByMap (mapids) {
  return dispatch => {
    axios.get(`${ROOT_URL}/mapitem/search/findByMapids?${encodeUrlParams({mapids})}`).then(res => {
        const data  = res.data._embedded.mapItems
        const deviceIds = []
        const productIds = []
        const monitorIds = []
        const lines = []

        const allItems = []

        data.forEach(p => {
          switch(p.type) {
              case 'PRODUCT':
                  productIds.push(p.itemId)
                  break
              case 'DEVICE':
                  deviceIds.push(p.itemId)
                  break
              case 'MONITOR':
                  monitorIds.push(p.itemId)
                  break
              case 'LONGHUB':
                  allItems.push(p)
                  break
              case 'CUSTOM':
                  allItems.push(p)
                  break
              case 'LINE':
                  lines.push(p)
                  break
              default:
                  break
          }
        })

        const reqs = []
        if (deviceIds.length) {
            const req = axios.get(`${ROOT_URL}/device/search/findByIds?${encodeUrlParams({ids: deviceIds})}`)
            reqs.push(req)
        } else {
            reqs.push(true)
        }

        if (productIds.length) {
            const req = axios.get(`${ROOT_URL}/product/search/findByIds?${encodeUrlParams({ids: productIds})}`)
            reqs.push(req)
        } else {
            reqs.push(true)
        }

        if (monitorIds.length) {
            const req = axios.get(`${ROOT_URL}/monitor/search/findByIds?${encodeUrlParams({ids: monitorIds})}`)
            reqs.push(req)
        } else {
            reqs.push(true)
        }
        axios.all(reqs).then(allRes => {
            if (allRes[0].data) {
                allRes[0].data._embedded.devices.forEach(device => {
                    const item = find(data, {itemId: device.id})
                    if (!item) return
                    allItems.push({
                        ...item,
                        entity: device
                    })
                })
            }

            if (allRes[1].data) {
                allRes[1].data._embedded.products.forEach(product => {
                    const item = find(data, {itemId: product.id})
                    if (!item) return
                    allItems.push({
                        ...item,
                        entity: product
                    })
                })
            }

            if (allRes[2].data) {
                allRes[2].data._embedded.monitors.forEach(monitor => {
                    const item = find(data, {itemId: monitor.uid})
                    if (!item) return
                    allItems.push({
                        ...item,
                        entity: monitor
                    })
                })
            }

            dispatch({type: FETCH_MAP_ITEMS, data: allItems, lines})
        })
    })
  }
}


export function addMapItem (entity) {
  return dispatch => {
    axios.post(`${ROOT_URL}/mapitem`, entity).then(res => {
      if (res.data) {
        dispatch({type: ADD_MAP_ITEM, data: {...res.data, entity: entity}})
        debugger;
      }
    })
  }
}

export function updateMapItem (entity) {
  return dispatch => {
    axios.put(`${ROOT_URL}/mapitem/${entity.id}`, entity).then(res => {
      if (res.data) dispatch({type: UPDATE_MAP_ITEM, data: {...res.data, entity: entity.entity}})
    })
  }
}

export function removeMapItem (entity) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/mapitem/${entity.id}`).then(res => {
      dispatch({type: REMOVE_MAP_ITEM, data: entity})
    }).catch(error => apiError(dispatch, error))
  }
}