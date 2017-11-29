import React from 'react'

export default class LogFilersModal extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <LogFiltersModalView
        onHide={onHide}
      />
    )
  }
}
