import React, { Component } from 'react'
import { findIndex, assign } from 'lodash'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {IconButton, RadioGroup, Radio} from '@material-ui/core'
import {Field} from 'redux-form'

import { CardPanel, FormSelect, FormInput } from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import MonitorPickModal from './MonitorPickModal'

import { extImageBaseUrl, appletColors as colors } from 'shared/Global'
import DeviceTplPicker from './DeviceTplPicker'
import {showConfirm} from 'components/common/Alert'

export default class MonitorTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: -1,

      monitorConfig: null,
      monitorWizardVisible: false,
      editMonitor: false,

      monitorPickerVisible: false,
      deviceTplPickerVisible: false
    }
  }

  renderTools () {
    return (
      <div>
        <AddCircleIcon onClick={this.onClickAdd.bind(this)} className="link"/>
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
    this.setState({ editMonitor: null, monitorPickerVisible: false })
    this.addMonitor(assign({}, item, {enable: true}))
  }

  onClickAdd (e) {
    this.setState({ monitorPickerVisible: true })
  }

  onClickAddBasic () {
    this.props.addBasicMonitors()
  }

  onClickAddDevice () {
    this.setState({deviceTplPickerVisible: true})
  }

  onClickEditMonitor (monitor) {
    this.setState({ monitorWizardVisible: true, editMonitor: monitor, monitorConfig: monitor })
    this.props.openDeviceMonitorWizard(monitor, monitor)
  }

  onClickRemoveMonitor (monitor) {
    const {monitors, onChanged} = this.props
    const index = monitors.indexOf(monitor)
    if (index < 0) return
    showConfirm('Click OK to remove', btn => {
      if (btn !== 'ok') return
      monitors.splice(index, 1)
      onChanged && onChanged(monitors)
    })
  }

  addMonitor (monitorConfig) {
    this.props.openDeviceMonitorWizard(monitorConfig, monitorConfig)
    this.setState({ monitorWizardVisible: true, monitorConfig })
  }

  onFinishMonitorWizard (res, params) {
    let { monitors, onChanged } = this.props

    const {editMonitor} = this.state
    if (editMonitor) {
      monitors = monitors.map(p => p.uid === editMonitor.uid ?
        {...p, ...params} : p)
    } else {
      monitors = [ ...monitors, params ]
    }
    onChanged && onChanged(monitors)
  }

  onRowDblClick () {
    this.onClickEdit()
  }


  getMonitorImage (item) {
    let img = item.image
    if (!img && item.monitortype) {
      const {templates} = this.props
      const index = findIndex(templates, {monitortype: item.monitortype})
      if (index >= 0) img = templates[index].image
    }

    return `${extImageBaseUrl}${img}`
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  renderMonitorPicker () {
    if (!this.state.monitorPickerVisible) return null
    return (
      <MonitorPickModal
        {...this.props}
        onClick={this.onClickItem.bind(this)}
        onClickBasic={this.onClickAddBasic.bind(this)}
        onHide={() => this.setState({monitorPickerVisible: false})}
      />
    )
  }

  renderDeviceTplPicker () {
    if (!this.state.deviceTplPickerVisible) return null
    return (
      <DeviceTplPicker
        {...this.props}
        onHide={() => this.setState({deviceTplPickerVisible: false})}
      />
    )
  }

  renderMonitorGroup () {
    const {monitorGroups, onChangeMonitorGroupType} = this.props
    if (!monitorGroups) return null
    return (
      <CardPanel title="Monitor Group">
        <div className="flex-horizontal">
          <div style={{paddingTop: 12}}>
            <RadioGroup
              name="monitorGroupType" defaultSelected="new" onChange={(e, value) => onChangeMonitorGroupType(value)}
              style={{marginTop: 10}}>
              <Radio value="new" label="New" className="pull-left"/>
              <Radio value="existing" label="Existing" className="pull-left" style={{width: 120, marginTop: 14}}/>
            </RadioGroup>
          </div>
          <div className="flex-1" style={{paddingLeft: 12}}>
            <div>
              <Field name="monitorGroupName" component={FormInput} className="valign-top mr-dialog" floatingLabel="Name" style={{marginTop: -20}}/>
            </div>
            <div style={{marginTop: -4}}>
              <Field
                name="monitorGroup" label="Monitor Group" component={FormSelect}
                options={monitorGroups.map(p => ({label: p.name, value: p.id}))}/>
            </div>
          </div>
        </div>
      </CardPanel>
    )
  }

  renderDevices () {
    if (this.props.hideDevices) return null
    return (
      <CardPanel title="Devices">
        <Field
          name="monitorDevice" label="Device" component={FormSelect} options={[]} className="valign-top"/>
        <IconButton onClick={this.onClickAddDevice.bind(this)} className="valign-top">
          <AddCircleIcon size={32}/>
        </IconButton>
      </CardPanel>
    )
  }

  render () {
    return (
      <div>
        {this.renderDevices()}
        {this.renderMonitorGroup()}

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
                    img={this.getMonitorImage(item)}
                    onClick={this.onClickEditMonitor.bind(this, item)}
                    onClickDelete={this.onClickRemoveMonitor.bind(this, item)}
                    verified
                  />
                )
              }
            </ul>

            {this.renderMonitorWizard()}
            {this.renderMonitorPicker()}
            {this.renderDeviceTplPicker()}
          </div>
        </CardPanel>
      </div>
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
