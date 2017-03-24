import { connect } from 'react-redux'
import { store } from './GetStore'
import React from 'react'

export function connectWithStore (WrappedComponent, ...args) {
  let ConnectedWrappedComponent = connect(...args)(WrappedComponent)
  return function (props) { // eslint-disable-line
    return <ConnectedWrappedComponent {...props} store={store} />
  }
}
