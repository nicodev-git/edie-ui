import React from 'react'
import moment from 'moment'
import {assign, concat, isArray, keys} from 'lodash'

export function renderEntity (entity, options) {
  const data = assign({}, entity)
  if (data.id) delete data.id
  if (data._links) delete data._links

  const ret = renderData(data, false, '', options, 0)
  return ret.node
}

function renderValue (val, path, options, used) {
  let startChar, endChar
  let children = []
  if (typeof val === 'object' && val !== null) {
    startChar = isArray(val) ? '[' : '{'
    endChar = isArray(val) ? ']' : '}'

    if (isArray(val)) {
      val.forEach((item, index) => {
        const ret = renderValue(item, `${path}[${index}]`, options, used)
        used = ret.used
        children.push(ret.node)
        if (index < val.length - 1) children.push(<div className="field-separator" key={`${path}-sep-${index}`}/>)

        if (options.limit && used >= options.limit) return false
      })
    } else {
      const ret = renderData(val, true, path, options, used)
      used = ret.used
      children = ret.node
    }

    return {
      used,
      node: concat([],
        <span className="field-key" key={`${path}-char-1`}>{startChar}&nbsp;</span>,
        children,
        <span className="field-key" key={`${path}-char-2`}>&nbsp;{endChar}</span>
      )
    }
  }

  let valStr = val
  const attrs = {}
  if (options.timeField && path === `.${options.timeField}`) {
    valStr = moment(val).fromNow()
    attrs['data-tip'] = moment(val).format('YYYY-MM-DD HH:mm:ss')
  }

  if (options.limit && (used + valStr.length > options.limit)) {
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

  allKeys.forEach((key, index) => {
    if (entity[key] === null && options && options['notNull']) return

    children.push(<span className="field-key" key={`${path}-key-${key}`}>{key} = </span>)
    used += key.length

    const ret = renderValue(entity[key], `${path}.${key}`, options, used)
    used = ret.used

    children = concat(children, ret.node)

    if (index < allKeys.length - 1)
      children.push(<div className="field-separator" key={`${path}-sep-${index}`}/>)

    if (options.limit && used >= options.limit) return false
  })

  return {
    used,
    node: isChildren ? children : <div className="inline-block">{children}</div>
  }
}
