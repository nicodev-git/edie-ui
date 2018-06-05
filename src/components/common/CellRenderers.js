import React from 'react'
import moment from 'moment'
import {isArray, keys, merge, isObject} from 'lodash'

export function renderEntity (entity, options) {
  const ret = renderEntity2(entity, options)
  return ret.node
}

export function renderEntity2 (data, options) {
  if (data.id) delete data.id
  if (data._links) delete data._links

  return renderData(data, false, '', options, 0)
}

function renderValue (val, path, options, used) {
  let startChar, endChar
  let children = []
  if (typeof val === 'object' && val !== null) {
    startChar = isArray(val) ? '[' : '{'
    endChar = isArray(val) ? ']' : '}'

    if (isArray(val)) {
      val.every((item, index) => {
        const ret = renderValue(item, `${path}[${index}]`, options, used)
        used = ret.used
        children.push(ret.node)
        if (index < val.length - 1) children.push(<div className="field-separator" key={`${path}-sep-${index}`}/>)

        if (options && options.limit && used >= options.limit) return false
        return true
      })
    } else {
      const ret = renderData(val, true, path, options, used)
      used = ret.used
      children = ret.node
    }

    return {
      used,
      node: [
        <span className="field-key" key={`${path}-char-1`}>{startChar}&nbsp;</span>,
        ...children,
        <span className="field-key" key={`${path}-char-2`}>&nbsp;{endChar}</span>
      ]
    }
  }

  let valStr = `${val}`
  const attrs = {}
  if (options && options.timeField && path === `.${options.timeField}`) {
    valStr = moment(val).fromNow()
    attrs['data-tip'] = moment(val).format('YYYY-MM-DD HH:mm:ss')
  }

  if (options && options.limit && (used + valStr.length > options.limit)) {
    valStr = valStr.substring(0, options.limit - used)
  }

  used += valStr.length

  return {
    used,
    node: <span {...attrs} key={`${path}-val`} className="field-value" dangerouslySetInnerHTML={{__html: `${valStr}`}}/> // eslint-disable-line
  }
}

function renderData (entity, isChildren, path, options, used) {  // eslint-disable-line
  let children = []
  const allKeys = keys(entity)

  allKeys.every((key, index) => {
    if (entity[key] === null && options && options['notNull']) return true

    children.push(<span className="field-key" key={`${path}-key-${key}`} dangerouslySetInnerHTML={{__html: `${key} = `}}/>)
    used += key.length

    const ret = renderValue(entity[key], `${path}.${key}`, options, used)
    used = ret.used

    children = [...children, ret.node]

    if (index < allKeys.length - 1)
      children.push(<div className="field-separator" key={`${path}-sep-${index}`}/>)

    if (options && options.limit && used >= options.limit) return false
    return true
  })

  return {
    used,
    node: isChildren ? children : <div className="inline-block">{children}</div>
  }
}

export function removeNullValues(entity) {
  if (isObject(entity)) {
    const allKeys = keys(entity)
    const newEntity = {}
    allKeys.forEach(key => {
      const value = entity[key]
      if (value === null) return
      newEntity[key] = removeNullValues (value)
    })
    return newEntity
  } else if (isArray(entity)) {
    const newEntity = []
    entity.forEach(item => {
      newEntity.push(removeNullValues(item))
    })
    return newEntity
  }
  return entity
}

export function expandEntity (entity) {
  keys(entity).forEach(k => {
    const val = entity[k]
    try {
      const t = typeof val
      if (t === 'string') {
        const parsed = JSON.parse(val)
        if (parsed) entity[k] = expandEntity(parsed)
      } else if (t === 'object') {
        entity[k] = expandEntity(val)
      }
    } catch (e) {

    }
  })
  return entity
}


export function getHighlighted (entity, highlights) {
  let data = merge({}, entity)
  keys(highlights).forEach(path => {
    const highlighted = highlights[path]
    const pathElements = path.split('.')

    let el = data
    pathElements.forEach((pathEl, index) => {
      if (index === pathElements.length - 1) {
        if (isArray(el[pathEl])) {
          el = el[pathEl]
          el.forEach((item, index) => {
            if (highlighted.match(item)) el[index] = highlighted
          })
        } else if (isObject(el)){
          el[pathEl] = highlighted
        }
      } else {
        el = el[pathEl]
        if (isArray(el)) el = el[0]
      }
    })
  })

  return data
}
