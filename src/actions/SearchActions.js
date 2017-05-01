import axios from 'axios'
import { assign } from 'lodash'
import {browserHistory} from 'react-router'
import {
  UPDATE_SEARCH_PARAMS,
  UPDATE_SEARCH_FIELDS,
  OPEN_FIELDS_POPOVER,
  CLOSE_FIELDS_POPOVER,
  FETCH_FIELD_TOP_VALUES,
  UPDATE_QUERY_CHIPS,

  UPDATE_INCIDENTS_PARAMS,

  OPEN_SEARCH_SAVE_POPOVER,
  CLOSE_SEARCH_SAVE_POPOVER,

  OPEN_SEARCH_WF_MODAL,
  CLOSE_SEARCH_WF_MODAL,
  SELECT_SEARCH_WF_CATEGORY,
  CHANGE_SEARCH_WF_FILTER,
  SELECT_WF_ROW,
  SELECT_SEARCH_WF,
  ADD_SEARCH_WF,
  REMOVE_SEARCH_WF,
  REPLACE_SEARCH_WFS,

  UPDATE_USER_INFO,

  SHOW_SAVED_SEARCH_MODAL,
  FETCH_SYS_SEARCH_OPTIONS,
  SELECT_SEARCH,
  SET_LOADING_SEARCH_OPTIONS,
  SHOW_REL_DEVICES_POPOVER,
  FETCH_REL_DEVICES,
  SHOW_IRREL_DEVICES_MODAL,
  FETCH_IRREL_DEVICES,
  SHOW_SEARCH_FIELDS_MODAL
} from './types'
import { ROOT_URL } from './config'
import { apiError } from './Errors'
import {encodeUrlParams, convertSearchParams} from 'shared/Global'

export const updateSearchParams = (params) => {
  return function (dispatch) {
    dispatch(fetchSearchFields(params))
    dispatch({
      type: UPDATE_SEARCH_PARAMS,
      params
    })
    browserHistory.replace({
      pathname: '/search',
      search: `?${encodeUrlParams({q: JSON.stringify(params)})}`
    })
  }
}

export const fetchSearchFields = (params) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/search/fields`, {params: convertSearchParams(params)}).then(res => {
      dispatch({type: UPDATE_SEARCH_FIELDS, data: res.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const openFieldsPopover = (selectedField, anchorEl) => {
  return dispatch => {
    dispatch({type: OPEN_FIELDS_POPOVER, selectedField, anchorEl})
  }
}

export const closeFieldsPopover = () => {
  return dispatch => {
    dispatch({type: CLOSE_FIELDS_POPOVER})
  }
}

export const fetchFieldTopValues = (name, params) => {
  return dispatch => {
    dispatch({type: FETCH_FIELD_TOP_VALUES, data: []})
    const config = {
      params: assign({}, convertSearchParams(params), {name})
    }
    axios.get(`${ROOT_URL}/search/topValueCount`, config).then(res => {
      dispatch({type: FETCH_FIELD_TOP_VALUES, data: res.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const updateQueryChips = (chips) => {
  return dispatch => {
    dispatch({type: UPDATE_QUERY_CHIPS, chips})
  }
}

const updateUserSuccess = (dispatch, response) => {
  dispatch({
    type: UPDATE_USER_INFO,
    data: response.data
  })
}

export const addSearchOption = (user, option) => {
  if (!user) return
  return dispatch => {
    const searchOptions = JSON.parse(user.searchOptions || '[]')
    searchOptions.push(option)
    axios.put(user._links.self.href, assign({}, user, {
      searchOptions: JSON.stringify(searchOptions)
    })).then(res => updateUserSuccess(dispatch, res)).catch(error => apiError(dispatch, error))
  }
}

export const updateSearchOption = (user, option) => {
  if (!user) return
  return dispatch => {
    const searchOptions = JSON.parse(user.searchOptions || '[]')
    axios.put(user._links.self.href, assign({}, user, {
      searchOptions: JSON.stringify(searchOptions.map(m => m.id === option.id ? option : m))
    })).then(res => updateUserSuccess(dispatch, res)).catch(error => apiError(dispatch, error))
  }
}

export const removeSearchOption = (user, option) => {
  if (!user) return
  return dispatch => {
    const searchOptions = JSON.parse(user.searchOptions || '[]')
    axios.put(user._links.self.href, assign({}, user, {
      searchOptions: JSON.stringify(searchOptions.filter(m => m.id !== option.id))
    })).then(res => updateUserSuccess(dispatch, res)).catch(error => apiError(dispatch, error))
  }
}

export const openSearchSavePopover = (option, anchorEl) => {
  return dispatch => {
    dispatch({type: OPEN_SEARCH_SAVE_POPOVER, option, anchorEl})
  }
}

export const closeSearchSavePopover = () => {
  return dispatch => {
    dispatch({type: CLOSE_SEARCH_SAVE_POPOVER})
  }
}

export const openSearchWfModal = () => {
  return dispatch => {
    dispatch({type: OPEN_SEARCH_WF_MODAL})
  }
}

export const closeSearchWfModal = () => {
  return dispatch => {
    dispatch({type: CLOSE_SEARCH_WF_MODAL})
  }
}

export const selectSearchWfCategory = (categoryId) => {
  return dispatch => {
    dispatch({type: SELECT_SEARCH_WF_CATEGORY, categoryId})
  }
}

export const changeSeachWfFilter = (filter) => {
  return dispatch => {
    dispatch({type: CHANGE_SEARCH_WF_FILTER, filter})
  }
}

export const selectWfRow = (workflow) => {
  return dispatch => {
    dispatch({type: SELECT_WF_ROW, workflow})
  }
}

export const selectSearchWf = (workflow) => {
  return dispatch => {
    dispatch({type: SELECT_SEARCH_WF, workflow})
  }
}

export const addSearchWf = (workflow) => {
  return dispatch => {
    dispatch({type: ADD_SEARCH_WF, workflow})
  }
}

export const removeSearchWf = (workflow) => {
  return dispatch => {
    dispatch({type: REMOVE_SEARCH_WF, workflow})
  }
}

export const replaceSearchWfs = (workflows) => {
  return dispatch => {
    dispatch({type: REPLACE_SEARCH_WFS, workflows})
  }
}

export const updateIncidentSearchParams = (params) => {
  return function (dispatch) {
    console.log(params)
    dispatch({
      type: UPDATE_INCIDENTS_PARAMS,
      params
    })
  }
}

export const showSavedSearch = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_SAVED_SEARCH_MODAL, visible})
  }
}

export const fetchSysSearchOptions = () => {
  return dispatch => {
    dispatch({type: SET_LOADING_SEARCH_OPTIONS, loading: true})
    axios.get(`${ROOT_URL}/usersearch?size=1000`).then(res => {
      dispatch({type: FETCH_SYS_SEARCH_OPTIONS, data: res.data._embedded.userSearches})
      dispatch({type: SET_LOADING_SEARCH_OPTIONS, loading: false})
    }).catch(error => apiError(dispatch, error))
  }
}

export function selectSearch (selected) {
  return dispatch => {
    dispatch({type: SELECT_SEARCH, selected})
  }
}

export const showRelDevicesPopover = (visible, anchorEl) => {
  return dispatch => {
    dispatch({type: SHOW_REL_DEVICES_POPOVER, visible, anchorEl})
  }
}

export const fetchRelDevices = (params) => {
  return dispatch => {
    dispatch({type: FETCH_REL_DEVICES, data: []})
    const config = {
      params: assign({}, convertSearchParams(params))
    }
    axios.get(`${ROOT_URL}/search/relevantDevices`, config).then(res => {
      dispatch({type: FETCH_REL_DEVICES, data: res.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const showIrrelDevicesModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_IRREL_DEVICES_MODAL, visible})
  }
}

export const fetchIrrelDevices = (params) => {
  return dispatch => {
    dispatch({type: FETCH_IRREL_DEVICES, data: []})
    const config = {
      params: assign({}, convertSearchParams(params))
    }
    axios.get(`${ROOT_URL}/search/irrelevantDevices`, config).then(res => {
      dispatch({type: FETCH_IRREL_DEVICES, data: res.data})
    }).catch(error => apiError(dispatch, error))
  }
}

export const showSearchFieldsModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_SEARCH_FIELDS_MODAL, visible})
  }
}
