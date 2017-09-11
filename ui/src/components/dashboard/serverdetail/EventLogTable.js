import React, { Component } from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'

import { layoutWidthZoom, layoutHeightZoom } from 'shared/Global'

import GridLayout from './GridLayout'

export default class EventLogTable extends Component {
  // onChangeLogName (e, index, value) {
  //   this.props.selectLogName(value)
  //
  //   this.monitorSocket.send({
  //     action: 'enable-realtime',
  //     monitors: 'eventlog',
  //     deviceId: this.props.device.id,
  //     data: {
  //       name: value
  //     }
  //   })
  // }

  getDeviceId () {
    return this.props.match.params.id
  }

  getGauges () {
    return [{
      id: 'basic0',
      name: 'Event Log',
      templateName: 'Event Log',
      deviceId: this.getDeviceId(),
      gaugeSize: 'custom',
      layout: {
        i: 'basic0',
        x: 0, y: 0,
        w: 12 * layoutWidthZoom, h: 5 * layoutHeightZoom
      }
    }]
  }
  renderBody () {
    return (
      <GridLayout
        {...this.props}
        gauges={this.getGauges()}
      />
    )
  }
  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title="Event Log" useToolBar>
        </TabPageHeader>
        <TabPageBody tabs={ServerDetailTab(device.id, device.templateName)} history={this.props.history} location={this.props.location} transparent>
          {this.renderBody()}
        </TabPageBody>
      </TabPage>
    )
  }
}
