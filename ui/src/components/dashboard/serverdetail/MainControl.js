import React from 'react'
import {findIndex} from 'lodash'
import {ToolbarGroup, IconMenu, IconButton, MenuItem} from 'material-ui'
import {Responsive, WidthProvider} from 'react-grid-layout'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import EditIcon from 'material-ui/svg-icons/content/create'
import CredIcon from 'material-ui/svg-icons/action/credit-card'
import MonitorIcon from 'material-ui/svg-icons/action/event'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'
import DeviceEditModal from 'containers/shared/wizard/DeviceEditModalContainer'
import { getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceCredsModal from './edit/DeviceCredsModal'
import DeviceMonitorsModal from './edit/DeviceMonitorsModal'
import ServerCombo from './ServerCombo'

import GaugeMap from 'components/common/gauge/GaugeMap'
import { getWidgetSize, layoutCols, layoutRowHeight, layoutWidthZoom, layoutHeightZoom } from 'shared/Global'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const menuItems = ['Event Log', 'Installed App', 'Process', 'Services', 'Users', 'Firewall', 'Network', 'Command']

export default class MainControl extends React.Component {
  componentWillMount () {
    this.props.fetchGauges()

    const device = this.getDevice()
    if (!device) return
    if (!device.gauges || !device.gauges.length) {
      this.resetGauges()
    }
  }

  resetGauges () {
    const device = this.getDevice()
    const gauges = []
    gauges.push({
      id: 'basic0',
      name: '',
      templateName: 'Device Info',
      deviceId: device.id,
      gaugeSize: 'custom',
      layout: {
        i: 'basic0',
        x: 0, y: 0,
        w: 5 * layoutWidthZoom, h: 2.5 * layoutHeightZoom
      }
    })

    gauges.push({
      id: 'basic1',
      name: 'Status',
      templateName: 'Device Basic',
      deviceId: device.id,
      gaugeSize: 'custom',
      layout: {
        i: 'basic1',
        x: 0, y: gauges[0].y + gauges[0].h,
        w: 5 * layoutWidthZoom, h: 2.5 * layoutHeightZoom
      }
    })
    this.props.updateMapDevice({
      ...device,
      gauges
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

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
    const device = this.getDevice()
    return device.gauges || []
  }

  onClickMenuItem () {

  }

  onClickEdit () {
    this.props.showDeviceEditModal(true, this.getDevice())
  }
  onFinishEdit (device) {
    this.props.updateMapDevice(device)
  }

  onClickCredEdit () {
    this.props.showDeviceCredsModal(true, this.getDevice())
  }

  onClickMonitorEdit () {
    this.props.showDeviceMonitorsModal(true, this.getDevice())
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

  renderDeviceEditModal () {
    const {editDevice, deviceEditModalOpen} = this.props
    if (!deviceEditModalOpen) return null

    return (
      <DeviceEditModal
        deviceType={`${getDeviceType(editDevice.templateName)}-edit`}
        title={editDevice.name}
        monitors={editDevice.monitors}
        onClose={() => this.props.showDeviceEditModal(false)}
        onFinish={this.onFinishEdit.bind(this)}
      />
    )
  }
  renderMenu () {
    const {gauges} = this.props
    const items = (gauges || []).filter(p => menuItems.includes(p.name))
    return (
      <IconMenu iconButtonElement={<IconButton touch={true}><NavigationExpandMoreIcon /></IconButton>}>
        {items.map((p, i) =>
          <MenuItem key={p.id} primaryText={p.name} onTouchTap={this.onClickMenuItem.bind(this, p)}/>
        )}
      </IconMenu>
    )
  }

  renderDeviceCredsModal () {
    const {deviceCredsModalOpen} = this.props
    if (!deviceCredsModalOpen) return null
    return (
      <DeviceCredsModal
        {...this.props}
      />
    )
  }

  renderDeviceMonitorsModal () {
    if (!this.props.deviceMonitorsModalOpen) return null
    return (
      <DeviceMonitorsModal
        {...this.props}
      />
    )
  }

  renderAddMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onTouchTap={() => this.props.showGaugePicker(true)}>
          <AddCircleIcon />
        </IconButton>
      </div>
    )
  }

  render () {
    const device = this.getDevice()
    return (
      <TabPage>
        <TabPageHeader
          title={<ServerCombo {...this.props} device={device}/>}
          titleStyle={{height: 20, width: 240, display: 'inline-block'}}
          titleOptions={<StatusImg {...this.props} device={device}/>}
          useToolBar>
          <ToolbarGroup firstChild>
            <IconButton onTouchTap={this.onClickEdit.bind(this)} tooltip="General"><EditIcon/></IconButton>
            <IconButton onTouchTap={this.onClickCredEdit.bind(this)} tooltip="Credentials"><CredIcon/></IconButton>
            <IconButton onTouchTap={this.onClickMonitorEdit.bind(this)} tooltip="Monitors"><MonitorIcon/></IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            {this.renderMenu()}
          </ToolbarGroup>
        </TabPageHeader>
        <TabPageBody
          tabs={ServerDetailTab(device.id, device.templateName)}
          history={this.props.history} location={this.props.location} transparent>
          {this.renderAddMenu()}
          {this.renderGrid()}
          {this.renderDeviceEditModal()}
          {this.renderDeviceCredsModal()}
          {this.renderDeviceMonitorsModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
