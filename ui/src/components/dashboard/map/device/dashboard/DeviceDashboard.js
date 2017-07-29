import React from 'react'
import {concat, assign, findIndex} from 'lodash'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import {Responsive, WidthProvider} from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import GaugeWizardContainer from 'containers/shared/wizard/GaugeWizardContainer'
import { extImageBaseUrl, guid, isGroup } from 'shared/Global'
import { wizardConfig } from 'components/common/wizard/WizardConfig'

import {showAlert} from 'components/common/Alert'

import GLineChart from './gauge/GLineChart'
import GBarChart from './gauge/GBarChart'
import GMonitor from './gauge/GMonitor'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const gaugeMap = {
  'Line Chart': GLineChart,
  'Bar Chart': GBarChart,
  'Monitor': GMonitor,
  'Up/Down': GMonitor
}
export default class DeviceDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.props.fetchGauges()
    this.props.fetchSysSearchOptions()
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

    const options = {
      title: tpl.name,
      templateName: tpl.name
    }

    this.showAddWizard(options, (id, name, data) => {

    })
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
        monitors={this.getMonitors()}
        extraParams={extra}
        onFinish={this.onFinishAddWizard.bind(this, callback)}
      />
    )
  }

  // renderGauge (p) {
  //   const savedSearch = this.getSavedSearch(p.savedSearchId)
  //   if (!savedSearch && ['Line Chart', 'Pie Chart', 'Bar Chart'].indexOf(p.templateName) >= 0){
  //     if (p.resource === 'search') return <div key={p.id}></div>
  //   }
  //   const searchParams = savedSearch ? JSON.parse(savedSearch.data) : null
  //   return (
  //     <div key={p.id}>
  //       <GaugePanel
  //         device={this.props.device} gauge={p} searchParams={searchParams} searchList={this.getSearchList()}
  //         updateDeviceGauge={this.props.updateDeviceGauge}
  //         removeDeviceGauge={this.props.removeDeviceGauge}
  //         style={{width: '100%', height: '100%'}}
  //       />
  //     </div>
  //   )
  // }

  renderGauge (p) {
    let GaugePanel = gaugeMap[p.templateName || 'z']
    if (!GaugePanel) return <div key={p.id}/>
    return (
      <div key={p.id}>
        <GaugePanel
          device={this.props.device} gauge={p}
          searchList={this.getSearchList()}
          monitors={this.getMonitors()}

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

  render () {
    const gauges = this.getGauges()
    const layout = w => gauges.map((p, i) => ({
      i: p.id,
      x: i % w, y: parseInt(i / w, 10),
      w: p.templateName === 'Incident Table' ? Math.min(2, w) : 1, h: 1
    }))
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
          style={{marginTop: -10}}>
          {gauges.map(p => this.renderGauge(p))}
        </ResponsiveReactGridLayout>

        {this.renderDeviceWizard()}
      </div>
    )
  }
}
