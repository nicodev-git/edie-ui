import React from 'react'
import {findIndex} from 'lodash'
import {ToolbarGroup, IconButton, IconMenu, MenuItem} from 'material-ui'
import {Responsive, WidthProvider} from 'react-grid-layout'
import EditIcon from 'material-ui/svg-icons/content/create'
import CredIcon from 'material-ui/svg-icons/action/credit-card'
import MonitorIcon from 'material-ui/svg-icons/action/event'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import RenewIcon from 'material-ui/svg-icons/action/autorenew'

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
import GaugePicker from 'components/common/gauge/GaugePicker'
import GaugeWizardContainer from 'containers/shared/wizard/GaugeWizardContainer'
import { guid, getWidgetSize, layoutCols, layoutRowHeight, layoutWidthZoom, layoutHeightZoom } from 'shared/Global'

import {showConfirm} from 'components/common/Alert'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const menuItems = ['Event Log', 'Installed App', 'Process', 'Services', 'Users', 'Firewall', 'Network', 'Command']

export default class MainControl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceWizardVisible: false
    }
    this.lastPlaceholder = null
  }
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
        x: 0, y: gauges[0].layout.y + gauges[0].layout.h,
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

  onClickMenuItem (tpl) {
    console.log(tpl)

    const options = {
      title: tpl.name,
      templateName: tpl.name,
      gaugeSize: 'big',
      tpl
    }
    //
    // this.showAddWizard(options, (id, name, data) => {
    //
    // })

    this.onFinishAddWizard(null, null, {
      name: tpl.name,
      templateName: tpl.name,
      gaugeSize: options.gaugeSize,
      deviceId: this.getDeviceId()
    }, options)
  }

  onFinishAddWizard (callback, res, params, options) {
    const editDevice = this.getDevice()
    const {tpl} = options
    params.id = guid()

    if (tpl.width && tpl.height){
      params.layout = {
        x: 0, y: 0,
        w: tpl.width * layoutWidthZoom, h: tpl.height * layoutHeightZoom
      }
      params.gaugeSize = 'custom'
    }

    this.props.updateMapDevice({
      ...editDevice,
      gauges: [...editDevice.gauges, params]
    })
  }

  showAddWizard (options, callback, closeCallback) {
    this.setState({
      deviceWizardConfig: {
        options, callback, closeCallback
      },
      deviceWizardVisible: true
    })
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

  onClickRemoveGauge (gauge) {
    const device = this.getDevice()
    this.props.updateMapDevice({
      ...device,
      gauges: device.gauges.filter(p => p !== gauge)
    })
  }

  onClickReset () {
    showConfirm('Click OK to reset', btn => {
      if (btn !== 'ok') return
      this.resetGauges()
    })
  }

  /////////////////////////////////////////////////////////////////////
  findGauge (id) {
    const gauges = this.getGauges()
    const index = findIndex(gauges, {id})
    if (index < 0) return null
    return gauges[index]
  }

  gaugeAspectRatio (templateName) {
    const {gauges} = this.props
    const index = findIndex(gauges, {name: templateName})
    if (index < 0) return null
    const {aspectWidth, aspectHeight} = gauges[index]
    if (aspectWidth && aspectHeight) {
      return {w: aspectWidth, h: aspectHeight}
    }
    return null
  }

  updateLayout(layout, oldItem, newItem, isResize) {
    if (JSON.stringify(oldItem) === JSON.stringify(newItem)) return
    const gaugeItems = this.getGauges()
    const items = []
    layout.forEach((p, i) => {
      const index = findIndex(gaugeItems, {id: p.i})
      if (index < 0) return
      const gauge = {
        ...gaugeItems[index],
        layout: {
          i: p.i,
          x: p.x, y: p.y,
          w: p.w, h: p.h
        }
      }
      if (isResize) {
        if (newItem.i === gauge.id) {
          gauge.gaugeSize = 'custom'
        } else if (!gauge.minimized) {
          if (gauge.layout.y === newItem.y) gauge.layout.h = newItem.h
        }
      } else {
        if (!gauge.minimized) {
          if (gauge.layout.y === newItem.y) gauge.layout.h = newItem.h
        }
      }
      items.push(gauge)
    })

    const device = this.getDevice()
    this.props.updateMapDevice({
      ...device,
      gauges: items
    })
  }
  onLayoutChange (layout, oldItem, newItem) {
    if (!this.lastPlaceholder) return
    newItem.x = this.lastPlaceholder.x
    newItem.y = this.lastPlaceholder.y
    this.updateLayout(layout, oldItem, newItem)
  }
  onDragStart () {
    this.lastPlaceholder = null
  }

  onDrag (layout, oldItem, newItem, placeholder, e) {
    const rowItems = layout.filter(p => p.y === placeholder.y)
    if (!rowItems.length) return
    if (findIndex(rowItems, {i: newItem.i}) < 0) rowItems.push(placeholder)
    rowItems.sort((a, b) => {
      if (a.x > b.x) return 1
      if (a.x < b.x) return -1
      return 0
    })

    let x = -1
    rowItems.forEach(p => {
      if (x < 0) {
        x = p.x
      } else {
        p.x = x
      }
      x += p.w
    })

    if (e) {
      this.lastPlaceholder = placeholder
    }
  }

  onResize (layout, oldItem, newItem, placeholder, mouseEvent, el) {
    const gauge = this.findGauge(newItem.i)
    if (!gauge) return
    if (gauge.minimized) {
      newItem.w = oldItem.w
      newItem.h = oldItem.h
      return
    }
    const ratio = this.gaugeAspectRatio(gauge.templateName)
    if (!ratio) return
    if (newItem.w !== oldItem.w) {
      const h = Math.ceil(newItem.w / layoutWidthZoom / ratio.w * ratio.h * layoutHeightZoom)
      newItem.h = h
      if (placeholder) placeholder.h = h
    } else {
      const w = Math.ceil(newItem.h / layoutHeightZoom / ratio.h * ratio.w * layoutWidthZoom)
      newItem.w = w
      if (placeholder) placeholder.w = w
    }
    layout.forEach(p => {
      if (p.i === newItem.i) {
        p.w = newItem.w
        p.h = newItem.h
      }
    })
  }
  onResizeStop (layout, oldItem, newItem, placeholder, mouseEvent, el) {
    const gauge = this.findGauge(newItem.i)
    if (!gauge) return
    if (gauge.minimized) {
      newItem.w = oldItem.w
      newItem.h = oldItem.h
      return
    }
    this.onDrag(layout, oldItem, newItem, newItem)
    this.updateLayout(layout, oldItem, newItem, true)
  }

  /////////////////////////////////////////////////////////////////////

  renderDeviceWizard () {
    if (!this.state.deviceWizardVisible) return null

    const {options, callback, closeCallback} = this.state.deviceWizardConfig

    const extra = {
      templateName: options.templateName
    }

    return (
      <GaugeWizardContainer
        templateName={options.templateName}
        onClose={() => {
          this.setState({deviceWizardVisible: false})
          closeCallback && closeCallback()
        }}
        title={options.title}
        devices={this.props.allDevices || []}
        monitors={[]}
        extraParams={extra}
        onFinish={this.onFinishAddWizard.bind(this, callback)}
        options={options}
      />
    )
  }

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
          removeDeviceGauge={this.onClickRemoveGauge.bind(this)}
          viewOnly
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

        onDragStart={this.onDragStart.bind(this)}
        onDrag={this.onDrag.bind(this)}
        onDragStop={this.onLayoutChange.bind(this)}

        onResize={this.onResize.bind(this)}
        onResizeStop={this.onResizeStop.bind(this)}
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
      <IconMenu iconButtonElement={<IconButton touch={true}><AddCircleIcon /></IconButton>}>
        {items.map((p, i) =>
          <MenuItem key={p.id} primaryText={p.name} onTouchTap={this.onClickMenuItem.bind(this, p)}/>
        )}
      </IconMenu>
    )

    // return (
    //   <IconButton onTouchTap={() => this.props.showGaugePicker(true)}>
    //     <AddCircleIcon />
    //   </IconButton>
    // )
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

  renderGaugePicker () {
    if (!this.props.gaugePickerOpen) return null
    return (
      <GaugePicker {...this.props} onClickMenuItem={this.onClickMenuItem.bind(this)} types={menuItems}/>
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
            <IconButton onTouchTap={this.onClickReset.bind(this)} tooltip="Reset"><RenewIcon/></IconButton>
            {this.renderMenu()}
          </ToolbarGroup>
        </TabPageHeader>
        <TabPageBody
          tabs={ServerDetailTab(device.id, device.templateName)}
          history={this.props.history} location={this.props.location} transparent>
          {this.renderGrid()}
          {this.renderDeviceEditModal()}
          {this.renderDeviceCredsModal()}
          {this.renderDeviceMonitorsModal()}
          {this.renderGaugePicker()}
          {this.renderDeviceWizard()}
        </TabPageBody>
      </TabPage>
    )
  }
}
