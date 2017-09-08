import React from 'react'

import {findIndex} from 'lodash'

export default class GDeviceInfo extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: false
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  getDevice () {
    const {devices, gauge} = this.props
    const index = findIndex(devices, {id: gauge.deviceId})
    if (index < 0) return null
    return devices[index]
  }

  renderFront () {
    const device = this.getDevice()
    if (!device) return <div />
    return (
      <div>
        <div className="row">
          <label className="col-md-4 text-right">Status:</label>
          <label className="col-md-8">{device.agent ? 'UP' : 'DOWN'}</label>
        </div>
      </div>
    )
  }

  renderBackView () {
    return null
  }

  render () {
    const {gauge} = this.props
    return (
      <FlipView
        {...this.props}

        hideHeader
        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
