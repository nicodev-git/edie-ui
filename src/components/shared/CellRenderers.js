import React from 'react'
import {assign, concat, isArray, keys} from 'lodash'

export function renderEntity (entity) {
  const data = assign({}, entity)
  if (data.id) delete data.id
  if (data._links) delete data._links
  return renderData(data, false, '')
}

function renderValue (val, path) {
  let startChar, endChar
  let children = []
  if (typeof val === 'object' && val !== null) {
    startChar = isArray(val) ? '[' : '{'
    endChar = isArray(val) ? ']' : '}'

    if (isArray(val)) {
      val.forEach((item, index) => {
        children.push(renderValue(item, `${path}[${index}]`))
        if (index < val.length - 1) children.push(<div className="field-separator" key={`${path}-sep-${index}`}/>)
      })
    } else {
      children = renderData(val, true, path)
    }

    return concat([],
      <span className="field-key" key={`${path}-char-1`}>{startChar}&nbsp;</span>,
      children,
      <span className="field-key" key={`${path}-char-2`}>&nbsp;{endChar}</span>
    )
  }
  return (
    <span key={`${path}-val`} className="field-value" dangerouslySetInnerHTML={{__html: `${val}`}}/> // eslint-disable-line
  )
}

function renderData (entity, isChildren, path) {  // eslint-disable-line
  let children = []
  const allKeys = keys(entity)
  allKeys.forEach((key, index) => {
    children.push(<span className="field-key" key={`${path}-key-${key}`}>{key} = </span>)
    children = concat(children, renderValue(entity[key], `${path}.${key}`))
    if (index < allKeys.length - 1) children.push(<div className="field-separator" key={`${path}-sep-${index}`}/>)
  })
  if (isChildren) return children
  return <div className="inline-block">{children}</div>
}
