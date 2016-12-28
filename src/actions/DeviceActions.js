import axios from 'axios'
import { assign, concat } from 'lodash'
import {
  FETCH_DEVICES,
  
  OPEN_DEVICE, 
  CLOSE_DEVICE,

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

  OPEN_DEVICE_EDIT_MODAL,
  CLOSE_DEVICE_EDIT_MODAL,
  UPDATE_DEVICE_ERROR,

  FETCH_DEVICE_TEMPLATES,
  ADD_DEVICE_TEMPLATE,
  UPDATE_DEVICE_TEMPLATE,
  DELETE_DEVICE_TEMPLATE,
  OPEN_DEVICE_TEMPLATE_MODAL,
  CLOSE_DEVICE_TEMPLATE_MODAL,

  API_ERROR
} from './types'

export const fetchDevices = () => {
  return (dispatch) => {
    let config = {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Authorization': window.localStorage.getItem('token')
      }
    }
    axios.get(`${ROOT_URL}/device`, config)
      .then(response => fetchDevicesSuccess(dispatch, response))
      .catch(error => fetchDevicesFail(dispatch, error))
  }

  const fetchDevicesFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const fetchDevicesSuccess = (dispatch, response) => {
    console.log('Response DATA:', response.data._embedded.devices)
    dispatch({
      type: FETCH_DEVICES,
      payload: response.data._embedded.devices
    })
  }
}

export const openDevice = (device) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_DEVICE,
      data: device
    })
  }
}

export const closeDevice = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_DEVICE
    })
  }
}

export const openDeviceMonitorPicker = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_DEVICE_MONITOR_PICKER
    })
  }
}

export const closeDeviceMonitorPicker = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_DEVICE_MONITOR_PICKER
    })
  }
}

export const openDeviceMonitorWizard = (initialValues) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_DEVICE_MONITOR_WIZARD,
      data: initialValues
    })
  }
}

export const closeDeviceMonitorWizard = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_DEVICE_MONITOR_WIZARD
    })
  }
}

export const clearDeviceWizardInitialValues = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_DEVICE_WIZARD_INITIAL_VALUES
    })
  }
}

export const fetchDeviceRules = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_DEVICE_RULES,
      data: []
    })
  }
}

export const fetchDeviceRawIncidents = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_DEVICE_RAW_INCIDENTS,
      data: []
    })
  }
}

export const fetchDevicePhysicalRules = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_DEVICE_PHYSICAL_RULES,
      data: []
    })
  }
}

export const fetchDeviceBasicMonitors = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_DEVICE_BASIC_MONITORS,
      data: []
    })
  }
}

export const fetchDeviceEventLog = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_DEVICE_EVENTLOG,
      data: []
    })
  }
}

export const fetchDeviceApps = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_DEVICE_APPS,
      data: []
    })
  }
}

export const openDeviceEditModal = (device) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_DEVICE_EDIT_MODAL,
      device
    })
  }
}

export const closeDeviceEditModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_DEVICE_EDIT_MODAL
    })
  }
}

export const addDevice = (url, props) => {
  return (dispatch) => {
    axios.post(url, props)
      .then(() => addDeviceSuccess(dispatch))
      .catch(error => addDeviceFail(dispatch, error))
  }

  const addDeviceFail = (dispatch, error) => {
    dispatch({
      type: UPDATE_DEVICE_ERROR,
      msg: error
    })
  }

  const addDeviceSuccess = (dispatch) => {
    dispatch(closeDeviceEditModal())
    dispatch(fetchDevices())
  }
}

export const updateDevice = (url, props) => {
  return (dispatch) => {
    axios.put(url, props)
      .then(response => updateDeviceSuccess(dispatch))
      .catch(error => updateDeviceFail(dispatch, error))
  }

  const updateDeviceFail = (dispatch, error) => {
    dispatch({
      type: UPDATE_DEVICE_ERROR,
      msg: error
    })
  }

  const updateDeviceSuccess = (dispatch) => {
    dispatch(closeDeviceEditModal())
    dispatch(fetchDevices())
  }
}

export const deleteDevice = (url) => {
  return (dispatch) => {
    axios.delete(url)
      .then(() => deleteDeviceSuccess(dispatch))
      .catch(error => deleteDeviceFail(dispatch, error))
  }

  const deleteDeviceFail = (dispatch, error) => {
    dispatch({
      type: UPDATE_DEVICE_ERROR,
      msg: error
    })
  }

  const deleteDeviceSuccess = (dispatch) => {
    dispatch(fetchDevices())
  }
}

export const fetchDeviceTemplates = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/devicetemplate`)
      .then(response => fetchDeviceTemplatesSuccess(dispatch, response))
      .catch(error => fetchDeviceTemplatesFail(dispatch, error))
  }

  const fetchDeviceTemplatesFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const fetchDeviceTemplatesSuccess = (dispatch, response) => {
    dispatch({
      type: FETCH_DEVICE_TEMPLATES,
      data: response.data._embedded.deviceTemplates
    })
  }
}

export const addDeviceTemplate = (props) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/devicetemplate`, props)
      .then(response => addDeviceTemplateSuccess(dispatch, response))
      .catch(error => addDeviceTemplateFail(dispatch, error))
  }

  const addDeviceTemplateFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const addDeviceTemplateSuccess = (dispatch, response) => {
    dispatch({
      type: ADD_DEVICE_TEMPLATE,
      data: response.data
    })
    dispatch(closeDeviceTplModal())
  }
}

export const updateDeviceTemplate = (entity) => {
  return (dispatch) => {
    axios.put(entity._links.self.href, entity)
      .then(response => updateDeviceTemplateSuccess(dispatch, response))
      .catch(error => updateDeviceTemplateFail(dispatch, error))
  }

  const updateDeviceTemplateFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const updateDeviceTemplateSuccess = (dispatch, response) => {
    dispatch({
      type: UPDATE_DEVICE_TEMPLATE,
      data: response.data
    })
    dispatch(closeDeviceTplModal())
  }
}

export const deleteDeviceTemplate = (entity) => {
  return (dispatch) => {
    axios.delete(entity._links.self.href, entity)
      .then(() => deleteDeviceTemplateSuccess(dispatch, entity))
      .catch(error => deleteDeviceTemplateFail(dispatch, error))
  }

  const deleteDeviceTemplateFail = (dispatch, error) => {
    dispatch({
      type: API_ERROR,
      msg: error
    })
  }

  const deleteDeviceTemplateSuccess = (dispatch, entity) => {
    dispatch({
      type: DELETE_DEVICE_TEMPLATE,
      data: entity
    })
  }
}

export const openDeviceTplModal = (tpl) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_DEVICE_TEMPLATE_MODAL,
      data: tpl
    })
  }
}

export const closeDeviceTplModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_DEVICE_TEMPLATE_MODAL
    })
  }
}
