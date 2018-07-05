import React from 'react'
import {findIndex} from 'lodash'
import {IconButton, Menu, MenuItem, Tooltip} from '@material-ui/core'
import {Responsive, WidthProvider} from 'react-grid-layout'
import EditIcon from '@material-ui/icons/Create'
import MonitorIcon from '@material-ui/icons/Event'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RenewIcon from '@material-ui/icons/Autorenew'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockOutlineIcon from '@material-ui/icons/LockOutline'
import LeftArrowIcon from '@material-ui/icons/ArrowBack'
import ComputerIcon from '@material-ui/icons/Computer'

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
import FloatingMenu from 'components/common/floating/FloatingMenu'

import GaugeMap from 'components/common/gauge/GaugeMap'
import GaugePicker from 'components/common/gauge/GaugePicker'
import GaugeWizardContainer from 'containers/shared/wizard/GaugeWizardContainer'
import { guid, getWidgetSize, layoutCols, layoutRowHeight, layoutWidthZoom, layoutHeightZoom, mergeCredentials } from 'shared/Global'

import {showConfirm, showAlert} from 'components/common/Alert'
import {resolveAddr} from 'shared/HostUtil'
import {hasPermission} from 'shared/Permission'
import FlowPickerModal from './edit/FlowPickerModal'
import {deepPurple, purple} from "@material-ui/core/colors/index";

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const menuItems = ['Event Log', 'Installed App', 'Process', 'Services', 'Users', 'Firewall', 'Network', 'Command',
  'Incidents', 'Workflows']

const tplColors = [purple[500], deepPurple['A400']]

export default class MainControl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceWizardVisible: false,
      flowPickerOpen: false
    }
    this.lastPlaceholder = null
  }
  componentWillMount () {
    this.props.fetchGaugeBoards()
    this.props.fetchGauges()

    this.props.fetchCredTypes()
    this.props.fetchCredentials()

    const device = this.getDevice()
    if (!device) return
    if (!device.gauges || !device.gauges.length) {
      this.resetGauges()
    }
  }

  resetGauges (valueOnly) {
    const device = this.getDevice()
    const gauges = []

    const w = 5 * layoutWidthZoom
    const h = 2.5 * layoutHeightZoom

    const tpls = [
      ['Device Info', {x: 0, y: 0}],
      ['Device Basic', {x: w, y: 0}],
      ['DeviceIO', {x: 0, y: h}],
      ['Command', {x: w, y: h}],
      ['Incidents', {x: 0, y: h * 2, w: w * 2}],
      ['Workflows', {x: 0, y: h * 3, w: w * 2}],
      ['NetStat', {x: 0, y: h * 4, w: w * 2}],
      ['DiskParts', {x: 0, y: h * 5, w}],
      ['Network', {x: w, y: h * 5, w}]
    ]


    tpls.forEach((tpl, i) => {
      gauges.push({
        id: `basic${i}`,
        name: '',
        templateName: tpl[0],
        gaugeSize: 'custom',
        deviceId: device.id,
        layout: {
          i: `basic${i}`,
          x: tpl[1].x, y: tpl[1].y,
          w: tpl[1].w || w, h
        }
      })
    })


    const params = {
      ...device,
      gauges
    }
    if (valueOnly) return params

    this.props.updateMapDevice(params)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  getDeviceSlug () {
    return this.props.match.params.name
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {slug: this.getDeviceSlug()})
    if (index < 0) return null
    return devices[index]
  }

  getGauges () {
    const {userInfo} = this.props
    const device = this.getDevice()
    let gauges = device.gauges || []
    if (!hasPermission(userInfo, 'CommandLine')) {
      gauges = gauges.filter(p => p.templateName !== 'Command')
    }
    return gauges
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
      deviceId: this.getDevice().id
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

  onClickBack () {
    const {gaugeBoards} = this.props
    const found = gaugeBoards.filter(p => p.name === 'Servers' && p.type === 'system')
    if (found.length) {
      this.props.history.push(`/dashboard/servers`)
    }
  }

  onClickEdit () {
    // this.props.showDeviceEditModal(true, this.getDevice())
    const device = this.getDevice()
    this.props.history.push(`/dashboard/servers/${device.id}/edit`)
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
      const editDevice = this.resetGauges(true)

      ////////////////////////////////
      const {credentials} = this.props
      const deviceCreds = credentials.filter(p => !p.global && (p.deviceIds || []).includes(editDevice.id))
      const deivceGlobalCreds = credentials.filter(p => p.global && !p.default && (p.deviceIds || []).includes(editDevice.id))
      editDevice.credential = mergeCredentials(editDevice, credentials, deivceGlobalCreds, deviceCreds)
      resolveAddr(editDevice, (newProps) => {
        if (!newProps) {
          showAlert('Host name resolve failed.')
          return
        }
        this.props.updateMapDevice(newProps)
      })
    })
  }

  onClickToggleLock () {
    const device = this.getDevice()
    this.props.updateMapDevice({
      ...device,
      gaugeLocked: !device.gaugeLocked
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

  onWidthChange (containerWidth) {
    console.log(containerWidth)
  }

  /////////////////////////////////////////////////////////////////////

  getMenuItems () {
    const items = [{
      label: 'Add Workflow',
      icon: <ComputerIcon/>,
      color: tplColors[0],
      onClick: this.onClickShowFlowPicker.bind(this)
    }]
    return items
  }

  onClickShowFlowPicker () {
    this.setState({
      flowPickerOpen: true
    })
  }

  onClickAddFlow (wf) {
    const device = this.getDevice()
    let {workflowids} = device

    this.setState({
      flowPickerOpen: false
    })

    if (!device) return

    if (!workflowids) workflowids = []
    if (workflowids.indexOf(wf.uuid) >= 0) return
    workflowids = [...workflowids, wf.uuid]

    this.props.updateMapDevice({
      ...device,
      workflowids
    })
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

    const device = this.getDevice()
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
          noDelete={device.gaugeLocked}
          style={{width: '100%', height: '100%'}}
        />
      </div>
    )
  }

  renderGrid () {
    const device = this.getDevice()
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
      <div>
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

          isResizable={!device.gaugeLocked}
          isDraggable={!device.gaugeLocked}

          onWidthChange={this.onWidthChange.bind(this)}
        >
          {gauges.map(p => this.renderGauge(p))}
        </ResponsiveReactGridLayout>
      </div>
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
    // const {gauges} = this.props
    // const items = (gauges || []).filter(p => menuItems.includes(p.name))
    // return (
    //   <div>
    //     <IconButton><AddCircleIcon /></IconButton>
    //     <Menu open={false}>
    //       {items.map((p, i) =>
    //         <MenuItem key={p.id} onClick={this.onClickMenuItem.bind(this, p)}>{p.name}</MenuItem>
    //       )}
    //     </Menu>
    //   </div>
    // )
  }


  renderDeviceCredsModal () {
    const {deviceCredsModalOpen, editDevice} = this.props
    if (!deviceCredsModalOpen) return null
    return (
      <DeviceCredsModal
        {...this.props}
        initialValues={editDevice}
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

  renderFlowPicker (device) {
    if (!this.state.flowPickerOpen) return null
    return (
      <FlowPickerModal
        {...this.props}
        device={device}
        onClickOK={this.onClickAddFlow.bind(this)}
        onClickClose={() => this.setState({flowPickerOpen: false})}
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
          <Tooltip title="Back">
            <IconButton onClick={this.onClickBack.bind(this)}><LeftArrowIcon/></IconButton>
          </Tooltip>
          <Tooltip title="General">
            <IconButton onClick={this.onClickEdit.bind(this)}><EditIcon/></IconButton>
          </Tooltip>
          <Tooltip title="Monitors">
            <IconButton onClick={this.onClickMonitorEdit.bind(this)}><MonitorIcon/></IconButton>
          </Tooltip>
          <Tooltip title={device.gaugeLocked ? 'Unlock' : 'Lock'}>
            <IconButton onClick={this.onClickToggleLock.bind(this)}>
              {device.gaugeLocked ? <LockOpenIcon/> : <LockOutlineIcon/>}
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton onClick={this.onClickReset.bind(this)}><RenewIcon/></IconButton>
          </Tooltip>
            {this.renderMenu()}
        </TabPageHeader>
        <TabPageBody
          tabs={ServerDetailTab(device.slug, device.templateName)}
          history={this.props.history} location={this.props.location} transparent>
          {this.renderGrid()}
          {this.renderDeviceEditModal()}
          {this.renderDeviceCredsModal()}
          {this.renderDeviceMonitorsModal()}
          {this.renderGaugePicker()}
          {this.renderDeviceWizard()}
          {this.renderFlowPicker(device)}
        </TabPageBody>

        <FloatingMenu menuItems={this.getMenuItems()}/>
      </TabPage>
    )
  }
}
