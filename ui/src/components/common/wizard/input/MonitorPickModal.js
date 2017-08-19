import React from 'react'

import MonitorPickModalView from './MonitorPickModalView'

export default class MonitorPickModal extends React.Component {
  onHide () {

  }

  render () {
    return (
      <MonitorPickModalView
        {...this.props}
      />
    )
  }
}
