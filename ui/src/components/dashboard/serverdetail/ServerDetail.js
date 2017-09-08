import React from 'react'
import {findIndex} from 'lodash'

import RefreshOverlay from 'components/common/RefreshOverlay'

export default class ServerDetail extends React.Component {
  getDeviceId () {
    return this.props.match.params.id
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  componentWillMount () {
    this.props.fetchDevice(this.getDeviceId())
  }

  render () {
    const device = this.getDevice()
    if (!device) return <RefreshOverlay/>
    return (
      <div>
        Detail page
      </div>
    )
  }
}
