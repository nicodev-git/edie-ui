import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'

import { layoutWidthZoom, layoutHeightZoom } from 'shared/Global'
import GridLayout from './GridLayout'

export default class ProcessTable extends React.Component {
  getGauges () {
    return [{
      id: 'basic0',
      name: 'Process',
      templateName: 'Process',
      deviceId: this.props.device.id,
      gaugeSize: 'custom',
      layout: {
        i: 'basic0',
        x: 0, y: 0,
        w: 12 * layoutWidthZoom, h: 5 * layoutHeightZoom
      }
    }]
  }
  onClickEdit () {
    this.props.showDeviceEditModal(true, this.getDevice())
  }
  renderBody () {
    return (
      <GridLayout
        {...this.props}
        gauges={this.getGauges()}
        fullSize
      />
    )
  }
  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title="Process" useToolBar titleOptions={<StatusImg {...this.props} device={device}/>}>
        </TabPageHeader>
        <TabPageBody tabs={ServerDetailTab(device.slug, device.templateName)} history={this.props.history} location={this.props.location} transparent>
          {this.renderBody()}
        </TabPageBody>
      </TabPage>
    )
  }
}
