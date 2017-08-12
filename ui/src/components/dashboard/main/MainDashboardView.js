import React from 'react'
import {concat, assign, findIndex} from 'lodash'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import ReactTooltip from 'react-tooltip'
import {Responsive, WidthProvider} from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import GaugeWizardContainer from 'containers/shared/wizard/GaugeWizardContainer'
import { extImageBaseUrl, guid, getWidgetSize, gaugeAspectRatio, layoutCols, layoutRowHeight } from 'shared/Global'
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
import GMonitors from 'components/common/gauge/GMonitors'
import GTable from 'components/common/gauge/GTable'
import GInstallApp from 'components/common/gauge/GInstallApp'

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
  'Table': GTable,
  'Servers': GServers,
  'Monitors': GMonitors,
  'Installed App': GInstallApp
}

export default class MainDashboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceWizardVisible: false,
      flip: {}
    }
  }
  componentWillMount () {
    this.props.fetchGauges()
    this.props.fetchSysSearchOptions()
    this.props.fetchWorkflows()
    this.props.fetchDevicesGroups()
  }

  getGauges () {
    return this.props.board.gauges || []
  }

  findGauge (id) {
    const gauges = this.getGauges()
    const index = findIndex(gauges, {id})
    if (index < 0) return null
    return gauges[index]
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
        resource: 'search'
      })
    } else {
      const options = {
        title: tpl.name,
        templateName: tpl.name,
        gaugeSize: 'big'
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
    this.props.addGaugeItem(params, this.props.board)
  }

  getMonitors () {
    return []
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
      if (isResize && newItem.i === gauge.id) {
        gauge.gaugeSize = 'custom'
      }

      items.push(gauge)
    })
    this.props.updateGaugeItem(items, this.props.board)
  }
  onLayoutChange (layout, oldItem, newItem, placeholder, mouseEvent, el) {
    this.updateLayout(layout, oldItem, newItem)
  }
  onResize (layout, oldItem, newItem, placeholder, mouseEvent, el) {
    const gauge = this.findGauge(newItem.i)
    if (!gauge) return
    const ratio = gaugeAspectRatio[gauge.templateName]
    if (!ratio) return
    if (newItem.w !== oldItem.w) {
      newItem.h = Math.ceil(newItem.w / ratio.w * ratio.h)
    } else {
      newItem.w = Math.ceil(newItem.h / ratio.h * ratio.w)
    }
  }
  onResizeStop (layout, oldItem, newItem, placeholder, mouseEvent, el) {
    this.updateLayout(layout, oldItem, newItem, true)

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
        devices={this.props.devices || []}
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
          devices={this.props.devices}
          monitors={this.getMonitors()}

          flip={this.state.flip[p.id]}
          onClickFlip={this.onClickFlip.bind(this, p.id)}

          updateDeviceGauge={gauge => this.props.updateGaugeItem(gauge, this.props.board)}
          removeDeviceGauge={gauge => this.props.removeGaugeItem(gauge, this.props.board)}
          style={{width: '100%', height: '100%'}}
        />
      </div>
    )
  }

  renderAddMenu () {
    const {gauges} = this.props
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
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
    const layout = mw => {
      let x = 0
      let y = 0
      return gauges.map((p, i) => {
        let {w, h} = getWidgetSize(p, this.props.devices, this.state.flip[p.id])
        if (p.layout) {
          if (w && h) return {...p.layout, i: p.id, w, h}
          return {...p.layout, i: p.id}
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
        {this.renderAddMenu()}
        <ResponsiveReactGridLayout
          className="layout" cols={cols} rowHeight={layoutRowHeight}
          layouts={layouts}
          style={{marginTop: -10}}
          margin={[4, 10]}
          onDragStop={this.onLayoutChange.bind(this)}
          onResize={this.onResize.bind(this)}
          onResizeStop={this.onResizeStop.bind(this)}
        >
          {gauges.map(p => this.renderGauge(p))}
        </ResponsiveReactGridLayout>

        {this.renderDeviceWizard()}
        <ReactTooltip />
      </div>
    )
  }
}
