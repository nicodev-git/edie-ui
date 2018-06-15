import moment from 'moment'
import React from 'react'
import {reduce, isNull, isUndefined, isArray, assign, keys, findIndex} from 'lodash'
import axios from 'axios'

import { ROOT_URL } from 'actions/config'
import WarningIcon from '@material-ui/icons/Warning'
import DescriptionIcon from '@material-ui/icons/Description'
import { iconStyle } from 'style/common/materialStyles'

export const dateFormat = 'DD/MM/YYYY HH:mm:ss'
export const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss'

export const queryDateFormat = 'YYYY-MM-DD HH:mm:ss'

export const extImageBaseUrl = `${ROOT_URL}/externalpictures?name=`
export function getCustomImageUrl (img) {
  return `data:${img.mimeType};base64,${img.content}`
}

export const cybertronUrl = 'http://www.cyber-security.io'

export function isGroup (device) {
  return device && device.groupid === undefined
}

export const DragTypes = {
  DEVICE: 'device',
  DIVIDER: 'divider',
  WORKFLOW: 'workflow'
}

export const DiagramTypes = {
  OBJECT: 'object',
  LINE: 'line'
}

export const lineTypes = [{
  title: 'Lightning',
  image: '/resources/images/dashboard/map/light.svg',
  type: 'lightning'
}, {
  title: 'Lightning',
  image: '/resources/images/dashboard/map/lightning2.png',
  type: 'lightning2',
  visible: true
}, {
  title: 'Line',
  image: '/resources/images/dashboard/map/line.gif',
  type: 'normal',
  visible: true
}, {
  title: 'Dashed Line',
  image: '/resources/images/dashboard/map/dashedline.png',
  type: 'dashed',
  visible: true
}]

export const defaultKeys = [
  'port', 'user', 'password', 'hostname', 'checkinterval', 'timeout', 'url', 'filepath', 'remove_after', 'parse',
  'integrated'
]

export function getSeverityIcon (severity) {
  switch ((severity || '').toLowerCase()) {
    case 'high':
      return <WarningIcon style={iconStyle} nativeColor="#e13e3e" data-tip={severity}/>
    case 'low':
      return <WarningIcon style={iconStyle} nativeColor="#ef9f15" data-tip={severity}/>
    case 'medium':
      return <WarningIcon style={iconStyle} nativeColor="#52a1be" data-tip={severity}/>
    default:
      return <DescriptionIcon style={iconStyle} nativeColor="#52a1be" data-tip={severity}/>
  }
}

export function getSeverityColor (severity) {
  switch ((severity || '').toLowerCase()) {
    case 'high': return 'rgb(243, 105, 11)'
    case 'low': return 'rgb(234, 166, 11)'
    case 'medium': return 'rgb(226, 221, 12)'
    default: return 'rgb(100, 209, 12)'
  }
}

export function dateFormatter (datetime) {
  let date = datetime.substring(0, 10)
  let time = datetime.substring(11, 16)
  let today = moment().format('YYYY-MM-DD')
  if (today === date) return `Today ${time}`

  let yesterday = moment(new Date(new Date() - 3600 * 24 * 1000)).format('YYYY-MM-DD')
  if (yesterday === date) return `Yesterday ${time}`

  let diff = new Date() - new Date(date)
if (diff <= 0) return 'Today'

let seconds = diff / 1000
let minutes = seconds / 60
let hours = minutes / 60
let days = Math.floor(hours / 24)
let years = Math.floor(days / 365)

let str = ''
if (years > 0) {
  days -= years * 365
  str += `${years} year${years > 1 ? 's' : ''}`
}

let months = Math.floor(days / 30)
if (months > 0) {
  days -= months * 30
  if (str) str += ' '
    str += `${months} month${months > 1 ? 's' : ''}`
  }

  if (days > 0) {
    if (str) str += ' '
    str += `${days} day${days > 1 ? 's' : ''}`
  }

  if (str) str += ' ago'
  str += ` ${time}`

  return str
}

export function format () {
  let args = arguments
  return args[0].replace(/{(\d+)}/g, function (match, number) {
    return typeof args[1 + parseInt(number, 10)] !== 'undefined' ? args[1 + parseInt(number, 10)] : match
  })
}

export function encodeUrlParams (obj) {
  let qs = reduce(obj, function (result, value, key) {
    if (!isNull(value) && !isUndefined(value)) {
      if (isArray(value)) {
        result += reduce(value, function (result1, value1) {
          if (!isNull(value1) && !isUndefined(value1)) {
            result1 += `${key}=${value1}&`
            return result1
          } else {
            return result1
          }
        }, '')
      } else {
        result += `${key}=${value}&`
      }
      return result
    } else {
      return result
    }
  }, '').slice(0, -1)
  return qs
}

export function parseSearchQuery (query) {
  if (!query) return []
  const matches = query.split(' and ')

  return matches.map(m => {
    const res = m.match(/([^ ()]*)=(.*)/)
    if (!res || !res.length) return {name: '*', value: m}
    return {
      name: res[1],
      value: res[2]
    }
  })
}

export function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

export function convertSearchParams (params) {
  const p = assign({}, params)
  if (p.dateFrom) p.dateFrom = moment(p.dateFrom, dateFormat).startOf('day').valueOf()
  if (p.dateTo) p.dateTo = moment(p.dateTo, dateFormat).endOf('day').valueOf()
  return p
}

export const collections = [
  {label: 'incident', value: 'incident'},
  {label: 'event', value: 'event'}
]
export const severities = [
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' },
  { label: 'Audit', value: 'AUDIT' },
  { label: 'Device', value: 'DEVICE' },
  { label: 'Ignore', value: 'IGNORE' }
]

export const viewFilters = {
  standard: {
    name: 'Standard',
    desc: 'Normal view'
  },
  log: {
    name: 'Log',
    desc: 'Log file content view'
  },
  raw: {
    name: 'Raw',
    desc: 'Raw data view'
  },
  notNull: {
    name: 'Not Null',
    desc: 'Filter Null Values'
  }
}

export const WorkflowActionTypes = [{
  label: 'Open Incident',
  value: 'OPEN_INCIDENT'
}, {
  label: 'Add Tag',
  value: 'ADD_TAG'
}]

export const collectorOSTypes = [{
  label: 'Windows', value: 'WINDOWS'
}, {
  label: 'Linux', value: 'LINUX'
}]

export const isWindowsDevice = (device) => {
  return device && device.templateName === 'Windows Server'
}

export const roleOptions = [
  {value: 'ADMIN', label: 'Admin'},
  {value: 'USER', label: 'User'}
]

export const removeAfterDurations = [1,2,3,5,10,15,20,25].map(p => ({
  label: `${p}`, value: p
}))

export const removeAfterDurationUnits = 'days months years'.split(' ').map(p => ({
  label: p, value: p
}))

//////////////////////////////////////

export const gaugeTypes = [{
  label: 'Line', value: 'line'
}, {
  label: 'Bar', value: 'bar'
}, {
  label: 'Liquid', value: 'liquid'
}, {
  label: 'Accel', value: 'accel'
}, {
  label: 'Incident Table', value: 'table'
}]

export const gaugeDurationTypes = [{
  label: 'Hours', value: 'hour'
}, {
  label: 'Days', value: 'day'
}, {
  label: 'Months', value: 'month'
}]

export const gaugeResources = [{
  label: 'Search', value: 'search'
}, {
  label: 'Monitor', value: 'monitor'
}, {
  label: 'Incident', value: 'incident'
}, {
  label: 'UserConnector', value: 'userconnector'
}]

export const timingOptions = [{
  label: 'Realtime', value: 'realtime',
}, {
  label: 'Historic', value: 'historic'
}]

export const realtimeGauges = [{
  label: 'Liquid', value: 'liquid'
}, {
  label: 'Accelerometer', value: 'accel'
}]

export const historicGauges = [{
  label: 'Line Chart', value: 'line'
}, {
  label: 'Bar Chart', value: 'bar'
}]

export const gaugeSizeList = ['small', 'medium', 'big', 'very big']

export function filterDevices (devices) {
  return (devices || []).filter(p => p.templateName !== 'Long hub' && p.templateName !== 'Free Text' && !p.line)
}

export function filterGaugeServers (devices) {
  return (devices || []).filter(p => p.templateName !== 'Long hub' && p.templateName !== 'Free Text' && !p.line)
}

export const layoutWidthZoom  = 100
export const layoutHeightZoom = 4
export const layoutCols = {lg: 12 * layoutWidthZoom, md: 12 * layoutWidthZoom, sm: 10 * layoutWidthZoom, xs: 4 * layoutWidthZoom, xxs: 4 * layoutWidthZoom}
export const layoutRowHeight = 10

export function getWidgetSize (gauge, devices, flip) {
  let size = gauge.gaugeSize
  // let hs = 0
  // if (gauge.templateName === 'Servers') {
  //   const count = !gauge.servers || !gauge.servers.length ? filterGaugeServers(devices || []).length : gauge.servers.length
  //   const ws = Math.max(Math.min(Math.ceil(count / (gauge.itemSize === 'slim' ? 24 : 16)), 3), 1)
  //   if (ws === 1) size = 'big'
  //   else if (ws === 2) size = 'very big'
  //   else size = 'extra big'
  //
  //   hs = Math.max(1, count / ws /  (gauge.itemSize === 'slim' ? 6 : 4))
  // }
  // if (flip) {
  //   if (size === 'small' || size === 'medium' || size === 'custom') size = 'big'
  //   if (gauge.templateName === 'Servers') size = 'very big'
  // }
  if (gauge.minimized) size = 'very small'

  let wh = {w: 4, h: 4}
  switch(size) {
    case 'very small':
      wh = {w: 1, h: 1}
      break
    case 'small':
      wh = {w: 1, h: 2}
      break
    case 'medium':
      wh = {w: 2, h: 2}
      break
    case 'very big':
      wh = {w: 8, h: 4}
      break
    case 'extra big':
      wh = {w: 12, h: 4}
      break
    case 'custom':
      wh = {w: 0, h: 0}
      break
    case 'big':
    default:
      wh = {w: 4, h: 4}
  }

  if (flip) {
    // if (gauge.templateName === 'Servers') wh.h = 6
  } else {
    // if (hs) wh.h = hs

    if (gauge.templateName === 'Accelerometer')
      wh.h = 1
  }

  return {
    w: wh.w * layoutWidthZoom,
    h: wh.h * layoutHeightZoom,
    minH: 1 * layoutHeightZoom + 2,
    minW: 1 * layoutWidthZoom
  }
}

export const gaugeAspectRatio = {
  // 'Liquid': {w: 1, h: 1}
}

export const gaugeTableViewModes = [{
  label: 'JSON', value: 'json'
}, {
  label: 'Table', value: 'table'
}]


export const appletColors = '#2468ff #963484 #222629 #3cba54 #999999 #D1282C'.split(' ')

export function cybertronImageUrl (item) {
  return `${cybertronUrl}/webPic?articleId=${item.contentId}`
}

export function cybertronRenderInfo (item) {
  let imgUrl, desc, date

  if (item.type === 'rss') {
    imgUrl = item.pictureURL
  } else if (item.type === 'video') {
    imgUrl = `http://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`
  } else {
    imgUrl = `${cybertronUrl}/mobileGetPic?pictureName=${item.pictureName || ''}`
  }

  if (item.type === 'video') {
    desc = item.channel
    date = `${moment(new Date(item.dateCreated)).fromNow()} • ${item.views}`
  } else {
    desc = item.readableContent
    date = moment(new Date(item.dateCreated)).fromNow()
  }

  return {imgUrl, desc, date}
}

export function checkAgentUp (id, cb) {
  axios.get(`${ROOT_URL}/isAgentUp?id=${id}`).then(res => {
    cb(res.data.success, res.data.info, parseInt(res.data.object || 0, 10))
  }).catch(() => cb(false))
}

export function getDeviceCredentials (selectedDevice, credentials, showGlobal) {
  const deviceCreds = credentials.filter(p => /*!p.global && */p.deviceIds && p.deviceIds.indexOf(selectedDevice.id) >= 0)
  if (showGlobal) {
    const isWin = isWindowsDevice(selectedDevice)
    credentials.forEach(p => {
      if (!p.global || !p.default) return
      if (isWin && p.type === 'SSH') return
      if (!isWin && p.type === 'WINDOWS') return
      if (deviceCreds.filter(d => d.type === p.type).length === 0)
        deviceCreds.push(p)
    })
  }
  return deviceCreds
}

export function getDeviceCollectors (editDevice, collectors) {
  // if (isWindowsDevice(editDevice)) {
  //   return collectors.filter(p => p.ostype === 'WINDOWS')
  // }
  // return collectors.filter(p => p.ostype === 'LINUX')
  return collectors
}

export function mergeCredentials(device, credentials, deviceGlobalCredentials, deviceCredentials) {
  const deviceCreds = [...deviceCredentials]
  const isWin = isWindowsDevice(device)

  const fnCheck = (p => {
    if (!p.global) return
    if (isWin && p.type === 'SSH') return
    if (!isWin && p.type === 'WINDOWS') return
    if (deviceCreds.filter(d => d.type === p.type).length === 0)
      deviceCreds.push(p)
  })

  deviceGlobalCredentials.forEach(fnCheck)
  credentials.filter(p => p.global && p.default).forEach(fnCheck)

  return deviceCreds
}

export function getAgentStatusMessage (code) {
  let msg = ''
  switch (code) {
    case 1:
      msg = 'No Agent/Collector defined. If you need agent, click "Install" button to install agent. Otherwise, please choose collector.'
      break
    case 2:
      msg = 'No login credentials found. Please add SSH credentials.'
      break
    case 3:
      msg = 'Please choose linux os name.'
      break
    case 4:
      msg = 'Failed to check device with current credentials. Please check if credentials are correct.'
      break
    default:
      msg = ''
      break
  }
  return msg
}

export function isGaugeDeviceUp (device, gauge, lastUpdate) {
  let time = lastUpdate
  if (!lastUpdate) {
    if (device.agentType === 'collector') time = device.lastSeen
    else if (device.agentType === 'agent' && device.agent) time = device.agent.lastSeen
  }
  const interval = gauge.checkInterval || 3
  const now = new Date().getTime()
  return time && (now - time) <= (interval * 60 * 1000)
}

export function sumDisks (disks) {
  if (disks == null || !disks.length) return null
  let free = 0
  let total = 0
  disks.forEach(disk => {
    if (!disk.Drives) return
    disk.Drives.forEach(d => {
      free += d.FreeSpace || 0
      total += d.TotalSpace || 0
    })
  })
  if (!total) return null
  return {
    FreeSpace: free,
    UsedSpace: total - free,
    TotalSpace: total
  }
}

export function getRemoveAfter (monitor) {
  const values = {
    remove_after: 1,
    remove_after_unit: 'days'
  }
  if (!monitor || !monitor.params) return values
  const remove_after = parseInt(monitor.params.remove_after || 1, 10)
  if (!remove_after || isNaN(remove_after)) return values
  if (remove_after >= 365) {
    values.remove_after = remove_after / 365
    values.remove_after_unit = 'years'
    return values
  }
  if (remove_after >= 30) {
    values.remove_after = remove_after / 30
    values.remove_after_unit = 'months'
    return values
  }
  values.remove_after = remove_after || 1
  return values
}


export function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

export function trimOSName(name) {
  return (name || '')
    .replace(/Microsoft /g, "")
    .replace(/ Evaluation/g, "")
}

export const anyFieldKey = '*'

export const sortArray = (list, prop) => {
  list.sort((a, b) => {
    if (a[prop] < b[prop]) return -1
    if (a[prop] > b[prop]) return 1
    return 0
  })

  return list
}

export const gridBg = window.btoa('<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 0 10 L 40 10 M 10 0 L 10 40 M 0 20 L 40 20 M 20 0 L 20 40 M 0 30 L 40 30 M 30 0 L 30 40" fill="none" stroke="#e0e0e0" opacity="0.2" stroke-width="1"/><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>')

export function updateFlowItemForm (values) {

  const mapping = {}
  keys(values.mapping || {}).forEach(key => {
    if (values.mapping[key] && key.startsWith('from')) {
      const id = key.replace('from', '')
      const value = values.mapping[`to${id}`]
      mapping[values.mapping[key]] = value
    }
  })

  //////////////////////////////////////////////////////

  const matches = []
  const matchKeys = keys(values.match || {})
  matchKeys.forEach(key => {
    if (values.match[key] && key.startsWith('name')) {
      const pid = key.replace('name', '')

      const field = values.match[key]
      const condition = values.match[`condition${pid}`]
      const fieldValues = []

      const prefix = `value_${pid}_`
      matchKeys.forEach(vkey => {
        if (!vkey.startsWith(prefix)) return
        const value = values.match[vkey]
        if(value) fieldValues.push(value)
      })

      matches.push({
        field,
        condition,
        values: fieldValues
      })
    }
  })

  //////////////////////////////////////////////////////

  const tr = values.timerange
  const timerange = {
  }

  if (tr && tr.type) {
    timerange.type = tr.type
    timerange.weekdays = (tr.weekdays || '').split(',').filter(p => !!p)
    timerange.days = (tr.days || '').split(',').filter(p => !!p).map(p => parseInt(p, 10))
    timerange.date = tr.date || 0
    timerange.timeFrom = tr.timeFrom.split(':').map(p => parseInt(p, 10))
    timerange.timeTo = tr.timeTo.split(':').map(p => parseInt(p, 10))
  }

  //////////////////////////////////////////////////////

  const wfConditions = []
  const {wfCondition} = values
  if (wfCondition) {
    keys(wfCondition).forEach(key => {
      if(key.startsWith('checkFlowId')) {
        const checkFlowId = wfCondition[key]
        if (!checkFlowId) return

        const pid = key.replace('checkFlowId', '')

        wfConditions.push({
          duration: wfCondition[`duration${pid}`],
          durationUnit: wfCondition[`durationUnit${pid}`],
          checkFlowId
        })
      }
    })
  }

  //////////////////////////////////////////////////////

  const params = []
  const paramKeys = keys(values.param || {})
  paramKeys.forEach(key => {
    if (values.param[key] && key.startsWith('name')) {
      const pid = key.replace('name', '')

      const name = values.param[key]
      const value = values.param[`value${pid}`]

      params.push({
        name,
        value
      })
    }
  })

  const resVars = []
  const resVarKeys = keys(values.resvar || {})
  resVarKeys.forEach(key => {
    if (values.resvar[key] && key.startsWith('name')) {
      const pid = key.replace('name', '')

      const name = values.resvar[key]
      const value = values.resvar[`value${pid}`]

      resVars.push({
        name,
        value
      })
    }
  })

  //////////////////////////////////////////////////////

  return {
    ...values,
    match: null,
    wfCondition: null,
    timerange,
    matches,
    mapping,
    wfConditions,
    params,
    resVars
  }
}

export const findObject = (objects, criteria) => {
  const index = findIndex(objects, criteria)
  if (index < 0) return null
  return objects[index]
}

export const mappingFieldOptions = 'message ip port user description hostname [Other]'.split(' ').map(p => ({
  label: p,
  value: p
}))

export const brainCellTypes = [{
  label: 'CommandPattern', value: 'CommandPattern',
  valueTypes: ['WORKFLOW', 'COMMAND', 'FUNCTION', 'TEXTRESPONSE']
}, {
  label: 'Regex', value: 'Regex', valueTypes: ['TEXT']
}, {
  label: 'Grok', value: 'Grok', valueTypes: ['TEXT']
}, {
  label: 'Classification', value: 'Classification', valueTypes: ['TEXT']
}, {
  label: 'Tag', value: 'Tag', valueTypes: ['TEXT']
}]

export const brainCellValueTypes = [{
  label: 'Workflow', value: 'WORKFLOW'
}, {
  label: 'Text Response', value: 'TEXTRESPONSE'
}, {
  label: 'Function', value: 'FUNCTION'
}, {
  label: 'Text', value: 'TEXT'
}]

export function getKeyValues(obj, keyField = 'key', valueField = 'value') {
  return keys(obj || {}).map(p => ({
    [keyField]: p,
    [valueField]: obj[p]
  }))
}

export const channelIcons = {
  'RocketChat': 'app-rocketchat.png',
  'Slack': 'slack.png',
  'Rest': 'rest.png',
  'Mail': 'mail.png',
  'Gitlab': 'gitlab.png',

  'eddie': 'app-eddie.png',
  'srflow': 'wf.png',
  'connector': 'connector.png'
}
