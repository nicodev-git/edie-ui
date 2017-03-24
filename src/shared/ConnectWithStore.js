import { connect } from 'react-redux'
import React from 'react'

export function connectWithStore (store, WrappedComponent, ...args) {
  let ConnectedWrappedComponent = connect(...args)(WrappedComponent)
  return function (props) { // eslint-disable-line
    return <ConnectedWrappedComponent {...props} store={store} />
  }
}
