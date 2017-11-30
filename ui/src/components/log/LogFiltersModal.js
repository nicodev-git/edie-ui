import React from 'react'

import LogFiltersModalView from './LogFiltersModalView'

export default class LogFiltersModal extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <LogFiltersModalView
        onHide={onHide}
      />
    )
  }
}
