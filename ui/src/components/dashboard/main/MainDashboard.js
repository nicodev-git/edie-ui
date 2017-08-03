import React from 'react'
import {concat, assign, findIndex} from 'lodash'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import ReactTooltip from 'react-tooltip'
import {Responsive, WidthProvider} from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import GaugeWizardContainer from 'containers/shared/wizard/GaugeWizardContainer'
import { extImageBaseUrl, guid } from 'shared/Global'
import { wizardConfig } from 'components/common/wizard/WizardConfig'

import {showAlert} from 'components/common/Alert'

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
import GServers from 'components/common/gauge/GServers'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const gaugeMap = {
  'Line Chart': GLineChart,
  'Bar Chart': GBarChart,
  'Pie Chart': GPieChart,
  'Monitor': GMonitor,
  'Up/Down': GMonitor,
  'Cpu': GCpu,
  'Memory': GMemory,
  'Disk': GDisk,
  'Accelerometer': GAccelView,
  'Liquid': GLiquid,
  'Incident Table': GIncidentTable,
  'Servers': GServers
}

export default class MainDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceWizardVisible: false
    }
  }
  componentWillMount () {
    this.props.fetchGauges()
    this.props.fetchGaugeItems()
    this.props.fetchSysSearchOptions()
    this.props.fetchWorkflows()
  }

  getGauges () {
    return this.props.gaugeItems
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

  onClickMenuItem (tpl) {
    console.log(tpl)

    if (['Servers'].indexOf(tpl.name) >= 0) {
      this.onFinishAddWizard(null, null, {
        templateName:tpl.name,
        name: tpl.name,
        resource: 'search',
        widgetSize: 1
      })
    } else {
      const options = {
        title: tpl.name,
        templateName: tpl.name,
        widgetSize: tpl.widgetSize || 1
      }

      this.showAddWizard(options, (id, name, data) => {

      })
    }
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
    this.props.addGaugeItem(params)
  }

  getMonitors () {
  //   const {device} = this.props
  //   let monitors = []
  //   if (!isGroup(device)) {
  //     monitors = (device.monitors || []).map(p => ({
  //       label: p.name,
  //       value: p.uid
  //     }))
  //   }
  //   return monitors
    return []
  }

  onLayoutChange (layout, old, e1, e2, e) {
    const {gaugeItems} = this.props
    const layouts = [...layout]
    layouts.sort((a, b) => {
      const v1 = a.y * 10 + a.x
      const v2 = b.y * 10 + b.x
      if (v1 < v2) return -1
      if (v1 > v2) return 1
      return 0
    })
    layouts.forEach((p, i) => {
      const index = findIndex(gaugeItems, {id: p.i})
      if (index < 0) return
      this.props.updateGaugeItem({
        ...gaugeItems[index],
        layout: i
      })
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
        templateName={options.templateName}
        onClose={() => {
          this.setState({deviceWizardVisible: false})
          closeCallback && closeCallback()
        }}
        title={options.title}
        devices={this.props.mapDevices}
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
          device={{id: p.deviceId}}
          searchList={this.getSearchList()}
          devices={this.props.mapDevices}
          monitors={this.getMonitors()}

          updateDeviceGauge={this.props.updateGaugeItem}
          removeDeviceGauge={this.props.removeGaugeItem}
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

  render () {
    const gauges = this.getGauges()
    const items = [...gauges]
    items.sort((a, b) => {
      if (!a.layout && !b.layout) return 0
      if (!a.layout || a.layout < b.layout) return -1
      if (!b.layout || a.layout > b.layout) return 1
      return 0
    })
    const layout = mw => {
      let x = 0
      let y = 0
      return items.map((p, i) => {
        const w = Math.min(p.widgetSize || 1, mw)
        if (x + w > mw) {
          x = 0
          y++
        }
        const op = {
          i: p.id,
          x, y,
          w, h: 1
        }

        x += w
        if (x >= mw) {
          x = 0
          y++
        }
        return op
      })
    }
    const cols = {lg: 3, md: 2, sm: 2, xs: 1, xxs: 1}
    const layouts = {
      lg: layout(cols['lg']),
      md: layout(cols['md']),
      sm: layout(cols['sm']),
      xs: layout(cols['xs']),
      xxs: layout(cols['xxs'])
    }
    return (
      <div>
        {this.renderAddMenu()}
        <ResponsiveReactGridLayout
          className="layout" cols={cols} rowHeight={350}
          layouts={layouts}
          isResizable={false} margin={[10, 10]}
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
