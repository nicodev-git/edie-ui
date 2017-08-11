import React from 'react'
import axios from 'axios'
import {concat, assign, findIndex} from 'lodash'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import {Responsive, WidthProvider} from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import GaugeWizardContainer from 'containers/shared/wizard/GaugeWizardContainer'
import { extImageBaseUrl, guid, isGroup, getWidgetSize } from 'shared/Global'
import { wizardConfig } from 'components/common/wizard/WizardConfig'

import {showAlert} from 'components/common/Alert'
import { ROOT_URL } from 'actions/config'

import GLineChart from 'components/common/gauge/GLineChart'
import GBarChart from 'components/common/gauge/GBarChart'
import GPieChart from 'components/common/gauge/GPieChart'
import GMonitor from 'components/common/gauge/GMonitor'
import GCpu from 'components/common/gauge/GCpu'
import GMemory from 'components/common/gauge/GMemory'
import GDisk from 'components/common/gauge/GDisk'
import GAccelView from 'components/common/gauge/GAccelView'
import GLiquid from 'components/common/gauge/GLiquid'
import GIncidentTable from 'components/common/gauge/GIncidentTable'
import GService from 'components/common/gauge/GService'
import GMonitors from 'components/common/gauge/GMonitors'
import GServers from 'components/common/gauge/GServers'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const gaugeMap = {
  'Line Chart': GLineChart,
  'Bar Chart': GBarChart,
  'Pie Chart': GPieChart,
  'Monitor': GMonitor,
  'Up/Down': GMonitor,
  'Service': GService,
  'Cpu': GCpu,
  'Memory': GMemory,
  'Disk': GDisk,
  'Accelerometer': GAccelView,
  'Liquid': GLiquid,
  'Incident Table': GIncidentTable,
  'Servers': GServers,
  'Monitors': GMonitors
}
export default class DeviceDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      agentDevice: props.device,
      flip: {}
    }
  }

  componentWillMount () {
    this.props.fetchGauges()
    this.props.fetchGaugeBoards()
    this.props.fetchSysSearchOptions()
    this.props.fetchWorkflows()
  }

  componentDidMount () {
    this.agentTimer = setInterval(() => {
      axios.get(`${ROOT_URL}/device/${this.props.device.id}`).then(res => {
        this.setState({
          agentDevice: res.data
        })
      })
    }, 1000 * 30)
  }

  componentWillUnmount () {
    clearInterval(this.agentTimer)
  }

  getGauges () {
    const {device} = this.props
    return device.gauges || []
  }

  getUserSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }

  getSearchList () {
    const {sysSearchOptions} = this.props
    return concat([], this.getUserSearchOptions().map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    }))
  }

  getSavedSearch (id) {
    const userOptions = this.getUserSearchOptions()
    let index = findIndex(userOptions, {id})
    if (index >= 0) return userOptions[index]

    const {sysSearchOptions} = this.props
    index = findIndex(sysSearchOptions, {id})
    if (index >= 0) return sysSearchOptions[index]

    return null
  }

  getNewPosition () {
    const {mapDevices} = this.props
    let maxY = null
    let minX = null
    let maxX = null
    mapDevices.forEach(p => {
      if (maxY === null) maxY = p.y
      else maxY = Math.max(maxY, p.y)

      if (minX === null) minX = p.x
      else minX = Math.min(minX, p.x)

      if (maxX === null) maxX = p.x
      else maxX = Math.max(maxX, p.x)
    })

    maxY = maxY || 0
    minX = minX || 0
    maxX = maxX || 0

    return {
      x: parseInt((minX + maxX) / 2, 10),
      y: maxY + 50
    }
  }

  onClickMenuItem (tpl) {
    console.log(tpl)

    // if (['Cpu', 'Memory', 'Disk'].indexOf(tpl.name) >= 0) {
    //   this.onFinishAddWizard(null, null, {
    //     templateName:tpl.name,
    //     name: tpl.name,
    //     resource: 'search'
    //   })
    // } else {
      const options = {
        title: tpl.name,
        templateName: tpl.name,
        widgetSize: tpl.widgetSize || 1
      }

      this.showAddWizard(options, (id, name, data) => {

      })
    // }
  }

  showAddWizard (options, callback, closeCallback) {
    if (wizardConfig[options.type] === null) {
      showAlert(`Unrecognized Type: ${options.type}`)
      return
    }

    this.setState({
      deviceWizardConfig: {
        options, callback, closeCallback
      },
      deviceWizardVisible: true
    })
  }

  onFinishAddWizard (callback, res, params, url) {
    params.id = guid()
    const lastLayout = Math.max.apply(this, (this.props.device.gauges || []).map(p => p.layout || 0))
    params.layout = lastLayout + 1
    this.props.addDeviceGauge(params, this.props.device)
  }

  getMonitors () {
    const {device} = this.props
    let monitors = []
    if (!isGroup(device)) {
      monitors = (device.monitors || []).map(p => ({
        label: p.name,
        value: p.uid
      }))
    }
    return monitors
  }
  onLayoutChange (layout, oldItem, newItem, e2, e) {
    if (JSON.stringify(oldItem) === JSON.stringify(newItem)) return
    const {device} = this.props
    const items = layout.map((p, i) => {
      const index = findIndex(device.gauges, {id: p.i})
      return {
        ...device.gauges[index],
        layout: {
          i: p.i,
          x: p.x, y: p.y,
          w: p.w, h: p.h
        }
      }
    })
    this.props.updateDeviceGauge(items, device)
  }

  onClickFlip (id) {
    const {flip} = this.state
    this.setState({
      flip: {
        ...flip,
        [id]: !flip[id]
      }
    })
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderDeviceWizard () {
    if (!this.state.deviceWizardVisible) return null

    const {options, callback, closeCallback} = this.state.deviceWizardConfig

    const extra = {
      templateName: options.templateName,
      widgetSize: options.widgetSize
    }

    return (
      <GaugeWizardContainer
        device={this.props.device}
        templateName={options.templateName}
        onClose={() => {
          this.setState({deviceWizardVisible: false})
          closeCallback && closeCallback()
        }}
        title={options.title}
        monitors={this.getMonitors()}
        extraParams={extra}
        onFinish={this.onFinishAddWizard.bind(this, callback)}
      />
    )
  }

  renderGauge (p) {
    let GaugePanel = gaugeMap[p.templateName || 'z']
    if (!GaugePanel) return <div key={p.id}/>
    return (
      <div key={p.id}>
        <GaugePanel
          {...this.props}
          gauge={p}
          searchList={this.getSearchList()}
          monitors={this.getMonitors()}

          flip={this.state.flip[p.id]}
          onClickFlip={this.onClickFlip.bind(this, p.id)}

          updateDeviceGauge={this.props.updateDeviceGauge}
          removeDeviceGauge={this.props.removeDeviceGauge}
          style={{width: '100%', height: '100%'}}
        />
      </div>
    )
  }

  renderAddMenu () {
    const {gauges} = this.props
    return (
      <div className="text-right">
        <IconMenu
          iconButtonElement={<IconButton><AddCircleIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          {gauges.map(p =>
            <MenuItem
              key={p.id} primaryText={p.name}
              leftIcon={<img src={`${extImageBaseUrl}${p.image}`} alt="" width="24" height="24" style={{background: 'black'}}/>}
              onTouchTap={this.onClickMenuItem.bind(this, p)}
            />
          )}
        </IconMenu>
      </div>
    )
  }

  renderAgent () {
    const {agentDevice} = this.state
    const now = new Date().getTime()
    const up = agentDevice && agentDevice.agent && (agentDevice.agent.lastSeen - now) <= 5 * 60000
    const img = up ? 'green_light.png' : 'yellow_light.png'
    return (
      <div className="pull-left margin-lg-left margin-md-top" data-tip={agentDevice.agent ? moment(agentDevice.agent.lastSeen).fromNow() : ''} data-place="right">
        <img alt="" src={`/resources/images/dashboard/map/device/monitors/${img}`} width="16"
             style={{verticalAlign: 'top', marginTop: -1, marginLeft: 5}}/>
      </div>
    )
  }

  render () {
    const gauges = this.getGauges()
    const layout = mw => {
      let x = 0
      let y = 0

      return gauges.map((p, i) => {
        const {w, h} = getWidgetSize(p, this.props.mapDevices, this.state.flip[p.id])
        if (p.layout && p.layout.i && w === p.layout.w && h === p.layout.h) {
          return {...p.layout , i: p.id}
        }
        if (x + w > mw) {
          x = 0
          y++
        }
        const op = {
          i: p.id,
          x, y,
          w, h
        }

        x += w
        if (x >= mw) {
          x = 0
          y++
        }
        return op
      })
    }
    const cols = {lg: 12, md: 8, sm: 8, xs: 4, xxs: 4}
    const layouts = {
      lg: layout(cols['lg']),
      md: layout(cols['md']),
      sm: layout(cols['sm']),
      xs: layout(cols['xs']),
      xxs: layout(cols['xxs'])
    }
    return (
      <div>
        {this.renderAgent()}
        {this.renderAddMenu()}
        <ResponsiveReactGridLayout
          className="layout" cols={cols} rowHeight={85}
          layouts={layouts}
          margin={[10, 10]}
          style={{marginTop: -10}}
          onDragStop={this.onLayoutChange.bind(this)}>
          {gauges.map(p => this.renderGauge(p))}
        </ResponsiveReactGridLayout>

        {this.renderDeviceWizard()}
        <ReactTooltip />
      </div>
    )
  }
}
