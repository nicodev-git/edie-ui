import React from 'react'

import DeviceFlowsModalView from './DeviceFlowsModalView'
export default class DeviceFlowsModal extends React.Component {
  componentWillMount () {

  }
  render () {
    const {workflows} = this.props

    return (
      <DeviceFlowsModalView
        {...this.props}
      />
    )
  }
}