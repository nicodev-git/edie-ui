import moment from 'moment'
import React from 'react'
import {reduce, isNull, isUndefined, isArray, assign} from 'lodash'
import { ROOT_URL } from 'actions/config'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import DescriptionIcon from 'material-ui/svg-icons/action/description'
import { iconStyle } from 'style/materialStyles'

export const dateFormat = 'DD/MM/YYYY HH:mm:ss'

export const imageBaseUrl = `${ROOT_URL}/images/`
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
  image: '/images/light.svg',
  type: 'lightning'
}, {
  title: 'Lightning',
  image: '/images/lightning2.png',
  type: 'lightning2',
  visible: true
}, {
  title: 'Line',
  image: '/images/line.gif',
  type: 'normal',
  visible: true
}, {
  title: 'Dashed Line',
  image: '/images/dashedline.png',
  type: 'dashed',
  visible: true
}]

export function getIncidenttypeIcon (incidenttype) {
  switch (incidenttype) {
    case 'ssh root failed password':
      return 'sysadmin.png'
    case 'Failed password for root':
      return 'sysadmin.png'
    case 'unknown user':
      return 'usersicon.png'
    case 'SSH unknown user':
      return 'usersicon.png'
    case 'Root Login Attack pattern':
      return 'sysadmin.png'
    case 'root login':
      return 'adminlogin.png'
    case 'IPS':
      return 'ips.png'
    case 'NAC All Alerts':
      return 'nac.png'
    case 'Webservice Method failure':
      return 'webservice.png'
    case 'http failure':
      return 'port.png'
    case 'LogCheck failure':
      return 'log-dir.png'
    case 'ping failure':
      return 'ping.png'
  }

  return 'defaultincidenticon.png'
}

export function getSeverityIcon (severity) {
  switch ((severity || '').toLowerCase()) {
    case 'high':
      return <WarningIcon style={iconStyle} color="#e13e3e"/>
    case 'low':
      return <WarningIcon style={iconStyle} color="#ef9f15"/>
    case 'medium':
      return <WarningIcon style={iconStyle} color="#52a1be"/>
    default:
      return <DescriptionIcon style={iconStyle} color="#52a1be"/>
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

export const globalState = {
  fullscreen: false
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
  { label: 'Ignore', value: 'IGNORE' }
]
