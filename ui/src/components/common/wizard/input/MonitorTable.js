import React, { Component } from 'react'
import { assign } from 'lodash'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import {IconButton} from 'material-ui'

import { CardPanel } from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import MonitorPickModal from './MonitorPickModal'

import { extImageBaseUrl } from 'shared/Global'

const colors = '#2468ff #963484 #222629 #3cba54 #999999 #D1282C'.split(' ')

export default class MonitorTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: -1,

      monitorConfig: null,
      monitorWizardVisible: false,
      isEditMonitor: false,

      monitorPickerVisible: false
    }
  }

  renderTools () {
    return (
      <div className="pull-right" style={{marginTop: -13}}>
        <IconButton onTouchTap={this.onClickAdd.bind(this)}>
          <AddCircleIcon size={32}/>
        </IconButton>
      </div>
    )
  }

  renderMonitorWizard () {
    if (!this.state.monitorWizardVisible) return

    const {monitorConfig} = this.state
    const type = 'monitor-custom'

    return (
      <MonitorWizardContainer
        deviceType={type}
        title={monitorConfig ? monitorConfig.name : ''}
        onClose={() => { this.setState({ monitorWizardVisible: false }) }}
        extraParams={{ monitortype: monitorConfig.monitortype }}
        configParams={{}}
        onFinish={this.onFinishMonitorWizard.bind(this)}
      />
    )
  }

  onClickItem (item) {
    this.setState({ isEditMonitor: false })
    this.addMonitor(assign({}, item, {enable: true}))
  }

  onClickAdd (e) {
    this.setState({ monitorPickerVisible: true })
  }

  onClickEdit (e) {
    let {selected} = this.state
    const {monitors} = this.props
    if (selected < 0) return

    this.setState({ monitorWizardVisible: true, isEditMonitor: true, monitorConfig: monitors[selected] })
    this.props.openDeviceMonitorWizard(monitors[selected])
  }

  onClickRemove () {
    // const {monitors, onChanged} = this.props
    // monitors.splice(selected, 1)
    // selected = -1
    // this.setState({selected, monitors})
    //
    // onChanged && onChanged(monitors)
  }

  addMonitor (monitorConfig) {
    this.props.openDeviceMonitorWizard(monitorConfig)
    this.setState({ monitorWizardVisible: true, monitorConfig })
  }

  onFinishMonitorWizard (res, params) {
    const { monitors, onChanged } = this.props

    let {selected, isEditMonitor} = this.state
    if (isEditMonitor) {
      monitors[selected] = assign({}, monitors[selected], params)
    } else {
      monitors.push(params)
    }
    onChanged && onChanged(monitors)
  }

  onRowDblClick () {
    this.onClickEdit()
  }

  renderMonitorPicker () {
    if (!this.state.monitorPickerVisible) return null
    return (
      <MonitorPickModal
        {...this.props}
        onHide={() => this.setState({monitorPickerVisible: false})}
      />
    )
  }

  render () {
    return (
      <CardPanel title="Monitors" tools={this.renderTools()}>
        <div style={{height: 326, overflow: 'auto', padding: '3px'}}>
          <ul className="web-applet-cards">
            {
              this.props.monitors.map((item, index) =>
                <AppletCard
                  key={index}
                  className="small"
                  color={colors[index % colors.length]}
                  name={item.name}
                  desc={item.monitortype}
                  img={`${extImageBaseUrl}${item.image}`}
                  onClickDelete={this.onClickRemove.bind(this, item)}
                />
              )
            }
          </ul>


          <table className="table dataTable hover hidden">
            <thead>
            <tr>
              <th width="5%">Type</th>
              <th width="5%">Name</th>
            </tr>
            </thead>
            <tbody>
            {
              this.props.monitors.map((item, index) =>
                <tr key={index}
                  className={index === this.state.selected ? 'selected' : ''}
                  onClick={() => this.setState({selected: index})}
                  onDoubleClick={this.onRowDblClick.bind(this)}>
                  <td>{item.monitortype}</td>
                  <td>{item.name}</td>
                </tr>
              )
            }
            </tbody>
          </table>

          {this.renderMonitorWizard()}
          {this.renderMonitorPicker()}
        </div>
      </CardPanel>
    )
  }
}

MonitorTable.defaultProps = {
  config: {},
  values: {},
  monitors: [],
  templates: [],
  onChanged: null
}
