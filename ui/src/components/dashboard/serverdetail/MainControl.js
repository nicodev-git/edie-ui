import React from 'react'
import {findIndex} from 'lodash'
import {Responsive, WidthProvider} from 'react-grid-layout'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'

import GaugeMap from 'components/common/gauge/GaugeMap'
import { getWidgetSize, layoutCols, layoutRowHeight, layoutWidthZoom, layoutHeightZoom } from 'shared/Global'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export default class MainControl extends React.Component {
  getDeviceId () {
    return this.props.match.params.id
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  getGauges () {
    const gauges = []
    const device = this.getDevice()
    if (device) {
      gauges.push({
        id: device.id,
        name: '',
        templateName: 'Device Info',
        deviceId: device.id
      })
    }
    return gauges
  }
  /////////////////////////////////////////////////////////////////////

  renderGauge (p) {
    let GaugePanel = GaugeMap[p.templateName || 'z']
    if (!GaugePanel) return <div key={p.id}/>
    return (
      <div key={p.id}>
        <GaugePanel
          {...this.props}
          gauge={p}
          device={{id: p.deviceId}}
          searchList={[]}
          monitors={[]}

          updateDeviceGauge={() => {}}
          removeDeviceGauge={() => {}}
          onClickMinimize={() => {}}
          onClickMaximize={() => {}}
          onClickModalView={() => {}}
          style={{width: '100%', height: '100%'}}
        />
      </div>
    )
  }

  renderGrid () {
    const gauges = this.getGauges()
    const layout = mw => {
      let x = 0
      let y = 0
      return gauges.map((p, i) => {
        let {w, h, minH, minW} = getWidgetSize(p, this.props.devices, false)
        if (p.layout) {
          if (w && h) return {...p.layout, i: p.id, w, h, minW, minH}
          return {...p.layout, i: p.id, minW, minH}
        }
        if (x + w > mw) {
          x = 0
          y++
        }
        const op = {
          i: p.id,
          x, y,
          w, h,
          minW, minH
        }

        x += w
        if (x >= mw) {
          x = 0
          y++
        }
        return op
      })
    }
    const cols = layoutCols
    const layouts = {
      lg: layout(cols['lg']),
      md: layout(cols['md']),
      sm: layout(cols['sm']),
      xs: layout(cols['xs']),
      xxs: layout(cols['xxs'])
    }

    return (
      <ResponsiveReactGridLayout
        className="layout" cols={cols} rowHeight={layoutRowHeight}
        layouts={layouts}
        style={{marginTop: -10}}
        margin={[16, 16]}
      >
        {gauges.map(p => this.renderGauge(p))}
      </ResponsiveReactGridLayout>
    )
  }

  render () {
    const device = this.getDevice()
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
        </TabPageHeader>
        <TabPageBody tabs={ServerDetailTab(device.id, device.templateName)} history={this.props.history} location={this.props.location} transparent>
          {this.renderGrid()}
        </TabPageBody>
      </TabPage>
    )
  }
}
