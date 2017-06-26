import moment from 'moment'
import React from 'react'
import {reduce, isNull, isUndefined, isArray, assign} from 'lodash'
import { ROOT_URL } from 'actions/config'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import DescriptionIcon from 'material-ui/svg-icons/action/description'
import { iconStyle } from 'style/common/materialStyles'

export const dateFormat = 'DD/MM/YYYY HH:mm:ss'
export const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss'

export const extImageBaseUrl = `${ROOT_URL}/externalpictures?name=`
export function getCustomImageUrl (img) {
  return `data:${img.mimeType};base64,${img.content}`
}

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

export function getSeverityIcon (severity) {
  switch ((severity || '').toLowerCase()) {
    case 'high':
      return <WarningIcon style={iconStyle} color="#e13e3e" data-tip={severity}/>
    case 'low':
      return <WarningIcon style={iconStyle} color="#ef9f15" data-tip={severity}/>
    case 'medium':
      return <WarningIcon style={iconStyle} color="#52a1be" data-tip={severity}/>
    default:
      return <DescriptionIcon style={iconStyle} color="#52a1be" data-tip={severity}/>
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
    return typeof args[1 + parseInt(number)] !== 'undefined' ? args[1 + parseInt(number)] : match
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
  // if (!matches || !matches.length) {
  //   if (query) return [{name: '_all', value: query}]
  //   return []
  // }

  return matches.map(m => {
    const res = m.match(/([^ ()]*)=(.*)/)
    if (!res || !res.length) return {name: '_all', value: m}
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
