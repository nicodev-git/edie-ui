import React from 'react'
import moment from 'moment'
import {TextField, SelectField, MenuItem, RaisedButton, Checkbox} from 'material-ui'
import {findIndex} from 'lodash'

import DoneButton from './DoneButton'
import {gaugeDurationTypes, gaugeResources, severities as allSeverities} from 'shared/Global'
import DateRangePicker from 'components/common/DateRangePicker'

import GaugeServerPicker from 'components/common/wizard/input/GaugeServerPicker'

const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: parseInt(p, 10)
}))

const inputStyle = {
  width: '100%'
}

const fixOptions = [{
  label: 'Any', value: '',
}, {
  label: 'Unfixed', value: 'false'
}, {
  label: 'Fixed', value: 'true'
}]

// const sizeList = [1, 2, 3].map(p => ({
//   label: p,
//   value: p
// }))

export default class GEditView extends React.Component {
  constructor (props) {
    super(props)

    const {gauge, monitorGroup} = props
    this.state = {
      resource: gauge.resource || 'search',
      savedSearchId: gauge.savedSearchId || '',
      deviceId: gauge.deviceId || '',
      monitorId: gauge.monitorId || '',
      workflowId: gauge.workflowId || '',
      serviceName: gauge.serviceName || '',
      monitorIds: (monitorGroup ? monitorGroup.monitorids : gauge.monitorIds) || [],

      duration: gauge.duration || '3',
      durationUnit: gauge.durationUnit || 'day',
      splitBy: gauge.splitBy || '1',
      splitUnit: gauge.splitUnit || 'day',
      name: gauge.name || '',

      fixed: gauge.fixed || '',
      severities: gauge.severities || [],
      dateFrom: gauge.dateFrom || 0,
      dateTo: gauge.dateTo || 0,

      itemSize: gauge.itemSize || 'normal',
      gaugeSize: gauge.gaugeSize || 'big',
      showDeviceType: gauge.showDeviceType || false,

      forward: gauge.forward || false,
      forwardBoardId: gauge.forwardBoardId || '',

      selectedDevice: null,
      selectedMonitor: null,
      selectedRight: null,
      servers: gauge.servers || []
    }
  }

  onChangeText(key, e, value) {
    const state = {
      [key]: value
    }
    this.setState(state)
  }

  onChangeSelect(key, e, target, value) {
    const state = {
      [key]: value
    }
    this.setState(state)
  }
  onChangeDateRange ({startDate, endDate}) {
    this.setState({
      dateFrom: startDate.valueOf(),
      dateTo: endDate.valueOf()
    })
  }

  toggleMonitorId (id) {
    let {monitorIds} = this.state
    if (monitorIds.includes(id)) {
      monitorIds = monitorIds.filter(p => p !== id)
    } else {
      monitorIds = [ ...monitorIds, id ]
    }
    this.setState({ monitorIds })
  }

  onSelectDevice (item) {
    this.setState({
      selectedDevice: item,
      selectedMonitor: null
    })
  }
  onSelectMonitor (item) {
    this.setState({
      selectedMonitor: item
    })
  }
  onSelectRight (item) {
    this.setState({
      selectedRight: item
    })
  }
  onClickAddServer () {
    let {selectedDevice, servers, selectedMonitor} = this.state
    if (!selectedDevice) return

    if (selectedMonitor) {
      const index = findIndex(servers,  {type: 'monitor', monitorId: selectedMonitor.uid})
      const item = {
        type: 'monitor',
        monitorId: selectedMonitor.uid,
        id: selectedDevice.id,
        name: selectedMonitor.name
      }
      if (index < 0) servers = [...servers, item]
    } else {
      const index = findIndex(servers, {type: 'device', id: selectedDevice.id})
      const item = {
        type: 'device',
        id: selectedDevice.id,
        name: selectedDevice.name
      }
      if (index < 0) servers = [...servers, item]
    }

    this.setState({
      servers
    })
  }

  onClickRemoveServer () {
    const {selectedRight, servers} = this.state
    if (!selectedRight) return
    this.setState({
      servers: servers.filter(p => selectedRight.type !== p.type ||
        (p.type === 'monitor' ? p.monitorId !== selectedRight.monitorId : p.id !== selectedRight.id))
    })
  }

  onClickDone () {
    const {onSubmit} = this.props
    const {resource, savedSearchId, monitorId, workflowId, deviceId, serviceName, monitorIds,
      duration, durationUnit, splitBy, splitUnit, name,
      severities, dateFrom, dateTo, fixed,
      itemSize, showDeviceType, gaugeSize,
      forward, forwardBoardId, servers
    }  = this.state
    const values = {
      resource, savedSearchId, monitorId, workflowId, deviceId, serviceName, monitorIds,
      duration, durationUnit, splitBy, splitUnit, name,
      severities, dateFrom, dateTo, fixed,
      itemSize, showDeviceType, gaugeSize,
      forward, forwardBoardId, servers
    }
    onSubmit && onSubmit(values)
  }

  renderLogicalGroup () {
    const {devices} = this.props
    const {monitorIds} = this.state

    if (this.state.resource !== 'logicalgroup') return null

    return (
      <div className="col-md-6">
        <div style={{maxHeight: 150, overflow: 'auto'}}>
          <table className="table table-hover">
            <tbody>
            {(devices || []).map(d => (d.monitors || []).map(p =>
              <tr key={p.uid}>
                <td><Checkbox label={`${d.name} - ${p.name}`} checked={monitorIds.includes(p.uid)} onCheck={() => this.toggleMonitorId(p.uid)}/></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderMonitorPick () {
    const {deviceId, monitorId} = this.state
    const {devices, monitors} = this.props
    if (this.state.resource !== 'monitor') return null
    if (!devices) {
      return (
        <div className="col-md-6">
          <SelectField value={monitorId} floatingLabelText="Monitor" className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'monitorId')}>
            {monitors.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
          </SelectField>
        </div>
      )
    }
    const deviceOptions = devices.map(p => ({label: p.name, value: p.id}))
    const index = findIndex(devices, {id: deviceId})
    const monitorOptions = index < 0 ? [] : devices[index].monitors.map(p => ({label: p.name, value: p.uid}))
    return [
      <div key="deviceId" className="col-md-6">
        <SelectField value={deviceId} floatingLabelText="Device" className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'deviceId')}>
          {deviceOptions.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>
      </div>,
      <div key="monitorId" className="col-md-6">
        <SelectField value={monitorId} floatingLabelText="Monitor" className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'monitorId')}>
          {monitorOptions.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>
      </div>
    ]
  }
  renderNormal () {
    const {
      resource, savedSearchId, workflowId,
      duration, durationUnit, splitBy, splitUnit, name
    } = this.state
    const {searchList, hideDuration, hideSplit, workflows} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <TextField name="name" value={name} floatingLabelText="Name" className="valign-top" style={inputStyle} onChange={this.onChangeText.bind(this, 'name')}/>
          </div>
          <div className="col-md-6">
            <SelectField value={resource} floatingLabelText="Resource" className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'resource')}>
              {gaugeResources.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
            </SelectField>
          </div>
        </div>

        <div className="row">
          {resource === 'search' ? (
            <div className="col-md-6">
              <SelectField value={savedSearchId} floatingLabelText="Saved Search" className="valign-top mr-dialog" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'savedSearchId')}>
                {searchList.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
              </SelectField>
            </div>
          ): null}
          {resource === 'incident' ? (
            <div className="col-md-6">
              <SelectField value={workflowId} floatingLabelText="Workflow" className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'workflowId')}>
                {workflows.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
              </SelectField>
            </div>
          ) : null}
          {this.renderMonitorPick()}
          {this.renderLogicalGroup()}

          {!hideDuration && <div className="col-md-3">
            <SelectField value={duration} floatingLabelText="Duration" className="valign-top mr-dialog" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'duration')}>
              {durations.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
            </SelectField>
          </div>}
          {!hideDuration && <div className="col-md-3">
            <SelectField value={durationUnit} floatingLabelText="  " className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'durationUnit')}>
              {gaugeDurationTypes.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
            </SelectField>
          </div>}
        </div>

        {!hideSplit && resource !== 'monitor' && <div className="row">
          <div className="col-md-3">
            <SelectField value={splitBy} floatingLabelText="Resolution" className="valign-top mr-dialog" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'splitBy')}>
              {durations.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
            </SelectField>
          </div>
          <div className="col-md-3">
            <SelectField value={splitUnit} floatingLabelText="  " className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'splitUnit')}>
              {gaugeDurationTypes.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
            </SelectField>
          </div>
        </div>}
      </div>
    )
  }

  renderDateLabel (label) {
    return (
      <RaisedButton label={label}/>
    )
  }

  renderIncidentTable () {
    const {devices} = this.props
    const {deviceId, fixed, severities, dateFrom, dateTo, name} = this.state
    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        {devices && <SelectField value={deviceId} floatingLabelText="Device" className="valign-top" onChange={this.onChangeSelect.bind(this, 'deviceId')}>
          <MenuItem value="*" primaryText="[Any Device]"/>
          {devices.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
        </SelectField>}
        <SelectField multiple floatingLabelText="Severity" onChange={this.onChangeSelect.bind(this, 'severities')} className="valign-top mr-dialog" value={severities}>
          {allSeverities.map(option =>
            <MenuItem key={option.value} insetChildren checked={severities && severities.includes(option.value)}
                      value={option.value} primaryText={option.label}/>
          )}
        </SelectField>

        <SelectField value={fixed} floatingLabelText="Status" className="valign-top mr-dialog" onChange={this.onChangeSelect.bind(this, 'fixed')}>
          {fixOptions.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>

        <div className="inline-block mr-dialog" style={{marginTop: 24}}>
          <DateRangePicker
            startDate={moment(dateFrom)}
            endDate={moment(dateTo)}
            onApply={this.onChangeDateRange.bind(this)}
            renderer={this.renderDateLabel.bind(this)}
          />
        </div>
      </div>
    )
  }
  renderDevice () {
    const {devices} = this.props
    const {name, deviceId} = this.state
    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        {devices && <SelectField value={deviceId} floatingLabelText="Device" className="valign-top" onChange={this.onChangeSelect.bind(this, 'deviceId')}>
          {devices.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
        </SelectField>}
      </div>
    )
  }
  renderService () {
    const {services} = this.props
    const {name, serviceName} = this.state
    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <SelectField value={serviceName} floatingLabelText="Service" className="valign-top mr-dialog" onChange={this.onChangeSelect.bind(this, 'serviceName')}>
          {services.map(p => <MenuItem key={p.ServiceName} value={p.ServiceName} primaryText={p.DisplayName || p.ServiceName}/>)}
        </SelectField>
      </div>
    )
  }
  renderServers () {
    const {gaugeBoards, devices} = this.props
    const {name, itemSize, showDeviceType, forward, forwardBoardId, servers, selectedDevice, selectedRight, selectedMonitor} = this.state

    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <SelectField value={itemSize} floatingLabelText="Item Size" className="valign-top" onChange={this.onChangeSelect.bind(this, 'itemSize')}>
          <MenuItem value="normal" primaryText="Normal"/>
          <MenuItem value="slim" primaryText="Slim"/>
        </SelectField>
        <div>
          <Checkbox label="Show Device Type" checked={showDeviceType} onCheck={this.onChangeText.bind(this, 'showDeviceType')}/>
          <div className="inline-block nowrap margin-md-right" style={{marginTop: 12}}>
            <Checkbox label="Forward to dashboard" checked={forward} onCheck={this.onChangeText.bind(this, 'forward')}/>
          </div>
          <SelectField value={forwardBoardId} className="valign-top" onChange={this.onChangeSelect.bind(this, 'forwardBoardId')}>
            {(gaugeBoards || []).map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
          </SelectField>
        </div>

        <div>
          <GaugeServerPicker
            devices={devices}
            selectedServers={servers}
            selectedDevice={selectedDevice}
            selectedRight={selectedRight}
            selectedMonitor={selectedMonitor}
            onSelectDevice={this.onSelectDevice.bind(this)}
            onSelectRight={this.onSelectRight.bind(this)}
            onSelectMonitor={this.onSelectMonitor.bind(this)}
            onClickAddServer={this.onClickAddServer.bind(this)}
            onClickRemoveServer={this.onClickRemoveServer.bind(this)}
          />
        </div>
      </div>
    )
  }
  renderMonitors () {
    const {device, devices} = this.props
    const {name, monitorIds, deviceId} = this.state

    const index = findIndex(devices || [], {id: deviceId})
    const monitors = devices ? (index < 0 ? [] : devices[index].monitors) : device.monitors

    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>

        {devices && <SelectField value={deviceId} floatingLabelText="Device" className="valign-top" onChange={this.onChangeSelect.bind(this, 'deviceId')}>
          {devices.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
        </SelectField>}

        <SelectField multiple floatingLabelText="Monitors" value={monitorIds} onChange={this.onChangeSelect.bind(this, 'monitorIds')}>
          {(monitors || []).map(p =>
            <MenuItem
              key={p.uid}
              insetChildren
              checked={monitorIds && monitorIds.includes(p.uid)}
              value={p.uid}
              primaryText={p.name}
            />
          )}
        </SelectField>
      </div>
    )
  }
  renderContent () {
    const {gauge} = this.props
    switch(gauge.templateName) {
      case 'Incident Table':
        return this.renderIncidentTable()
      case 'Cpu':
      case 'Memory':
      case 'Disk':
        return this.renderDevice()
      case 'Service':
        return this.renderService()
      case 'Servers':
        return this.renderServers()
      case 'Monitors':
        return this.renderMonitors()
      default:
        return this.renderNormal()
    }
  }
  render () {
    return (
      <div className="padding-xs">
        {this.renderContent()}

        <DoneButton onClick={this.onClickDone.bind(this)}/>
      </div>
    )
  }
}
