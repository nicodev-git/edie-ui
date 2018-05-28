import React from 'react'
import {TextField, Select, MenuItem, Button, Checkbox, FormControl, FormControlLabel, InputLabel} from '@material-ui/core'
import {findIndex} from 'lodash'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import {gaugeDurationTypes, gaugeResources, gaugeTableViewModes} from 'shared/Global'

import GaugeServerPicker from 'components/common/wizard/input/GaugeServerPicker'
import GaugeWorkflowPicker from 'components/common/wizard/input/GaugeWorkflowPicker'
import GaugeLogMonitorPicker from 'components/common/wizard/input/GaugeLogMonitorPicker'
import LogicalGroupPicker from 'components/common/wizard/input/LogicalGroupPicker'
import DeviceMonitorPicker from 'components/common/wizard/input/DeviceMonitorPicker'
import SavedSearchPicker from 'components/common/wizard/input/SavedSearchPicker'

// import { dialogBodyStyle, dialogTitleStyle } from 'style/common/materialStyles'
import {CardPanel, Modal} from 'components/modal/parts'


const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: parseInt(p, 10)
}))

export default class GEditView extends React.Component {
  constructor (props) {
    super(props)

    const {gauge, monitorGroup} = props

    let name = gauge.name || ''
    if (gauge.templateName === 'Log') {
      name = gauge.templateName
    }

    this.state = {
      name,

      resource: gauge.resource || 'search',
      savedSearchId: gauge.savedSearchId || '',
      savedSearchIds: gauge.savedSearchIds || [],
      deviceId: gauge.deviceId || '',
      monitorId: gauge.monitorId || '',
      workflowId: gauge.workflowId || '',
      workflowIds: gauge.workflowIds || [],
      serviceName: gauge.serviceName || '',
      monitorIds: (monitorGroup ? monitorGroup.monitorids : gauge.monitorIds) || [],
      userConnectorId: gauge.userConnectorId || '',

      duration: gauge.duration || '3',
      durationUnit: gauge.durationUnit || 'day',
      splitBy: gauge.splitBy || '1',
      splitUnit: gauge.splitUnit || 'day',

      fixed: gauge.fixed || '',
      severities: gauge.severities || [],
      dateFrom: gauge.dateFrom || 0,
      dateTo: gauge.dateTo || 0,

      checkInterval: gauge.checkInterval || 3,

      itemSize: gauge.itemSize || 'normal',
      gaugeSize: gauge.gaugeSize || 'big',
      showDeviceType: gauge.showDeviceType || false,

      forward: gauge.forward || false,
      forwardBoardId: gauge.forwardBoardId || '',

      selectedDevice: null,
      selectedMonitor: null,
      selectedRight: null,
      servers: gauge.servers || [],

      selectedWorkflow: null,

      logicalGroups: gauge.logicalGroups || [],
      selectedMonitorGroup: null,

      searchIds: gauge.searchIds || [],

      tableViewMode: gauge.tableViewMode || 'json',

      showImage: !!gauge.showImage
    }
  }

  onChangeText(key, e) {
    const state = {
      [key]: e.target.value
    }
    this.setState(state)
  }

  onChangeSelect(key, e) {
    const state = {
      [key]: e.target.value
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

  ///////////////////////////////////////////////////////////////////////////

  onSelectWorkflow (item) {
    this.setState({
      selectedWorkflow: item
    })
  }

  onClickAddWorkflow () {
    const {selectedWorkflow, workflowIds} = this.state
    if (!selectedWorkflow) return
    if (workflowIds.includes(selectedWorkflow.id)) return
    this.setState({
      workflowIds: [...workflowIds, selectedWorkflow.id],
      selectedWorkflow: null
    })
  }

  onClickRemoveWorkflow () {
    const {selectedRight, workflowIds} = this.state
    if (!selectedRight) return
    this.setState({
      workflowIds: workflowIds.filter(p => p !== selectedRight.id),
      selectedRight: null
    })
  }

  ///////////////////////////////////////////////////////////////////////////

  onSelectMonitorGroup (item) {
    this.setState({
      selectedMonitorGroup: item
    })
  }

  onClickAddMonitorGroup () {
    const {selectedMonitorGroup, logicalGroups} = this.state
    if (!selectedMonitorGroup) return
    if (logicalGroups.filter(p => p.id === selectedMonitorGroup.id).length) return
    this.setState({
      logicalGroups: [...logicalGroups, {id: selectedMonitorGroup.id, dashboardId: ''}],
      selectedMonitorGroup: null
    })
  }

  onClickRemoveMonitorGroup () {
    const {selectedRight, logicalGroups} = this.state
    if (!selectedRight) return
    this.setState({
      logicalGroups: logicalGroups.filter(p => p.id !== selectedRight.id),
      selectedRight: null
    })
  }

  onUpdateMonitorGroup (item) {
    this.setState({
      logicalGroups: this.state.logicalGroups.map(p =>
        p.id === item.id ? item : p
      )
    })
  }

  ///////////////////////////////////////////////////////////////////////////

  onClickToggleMonitor (monitor) {
    let {monitorIds} = this.state
    if (monitorIds.includes(monitor.uid)) {
      monitorIds = monitorIds.filter(p => p !== monitor.uid)
    } else {
      monitorIds = [...monitorIds, monitor.uid]
    }
    this.setState({monitorIds})
  }

  onClickToggleDevice (device) {
    let {servers} = this.state
    if (servers.includes(device.id)) {
      servers = servers.filter(p => p !== device.id)
    } else {
      servers = [...servers, device.id]
    }
    this.setState({servers})
  }

  onClickToggleMonitorGroup (group) {
    let {logicalGroups} = this.state
    if (logicalGroups.filter(p => p.id === group.id).length > 0) {
      logicalGroups = logicalGroups.filter(p => p.id !== group.id)
    } else {
      logicalGroups = [...logicalGroups, {id: group.id}]
    }
    this.setState({logicalGroups})
  }

  onClickToggleSearch (savedSearchId) {
    let {searchIds} = this.state
    if (searchIds.includes(savedSearchId)) {
      searchIds = searchIds.filter(p => p !== savedSearchId)
    } else {
      searchIds = [...searchIds, savedSearchId]
    }
    this.setState({searchIds})
  }

  ///////////////////////////////////////////////////////////////////////////
  onChangeSavedSearch (id, index) {
    const {savedSearchIds} = this.state
    this.setState({
      savedSearchIds: savedSearchIds.map((p, i) => i === index ? id : p)
    })
  }

  onClickAddSavedSearch () {
    this.setState({
      savedSearchIds: [...this.state.savedSearchIds, '']
    })
  }

  onClickRemoveSavedSearch (i) {
    this.setState({
      savedSearchIds: this.state.savedSearchIds.filter((p, index) => index !== i)
    })
  }

  ///////////////////////////////////////////////////////////////////////////
  onClickDone () {
    const {onSubmit} = this.props
    const {
      resource, savedSearchId, savedSearchIds, monitorId, workflowId, workflowIds, deviceId, serviceName, monitorIds,
      duration, durationUnit, splitBy, splitUnit, name,
      severities, dateFrom, dateTo, fixed,
      itemSize, showDeviceType, gaugeSize,
      forward, forwardBoardId, servers,
      tableViewMode, showImage,
      logicalGroups,
      searchIds, userConnectorId
    }  = this.state
    const values = {
      resource, savedSearchId, savedSearchIds, monitorId, workflowId, workflowIds, deviceId, serviceName, monitorIds,
      duration, durationUnit, splitBy, splitUnit, name,
      severities, dateFrom, dateTo, fixed,
      itemSize, showDeviceType, gaugeSize,
      forward, forwardBoardId, servers,
      tableViewMode, showImage,
      logicalGroups,
      searchIds, userConnectorId
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
                <td>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={monitorIds.includes(p.uid)}
                        onChange={() => this.toggleMonitorId(p.uid)}/>
                    }
                    label={`${d.name} - ${p.name}`}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderUserConnector () {
    const {userConnectorId} = this.state
    if (this.state.resource !== 'userconnector') return null
    return (
      <div className="col-md-6">
        <TextField name="userConnectorId" value={userConnectorId} label="User Connector Id"
                   className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'userConnectorId')} fullWidth/>
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
          <FormControl className="valign-top" fullWidth>
            <InputLabel>Monitor</InputLabel>
            <Select value={monitorId} onChange={this.onChangeSelect.bind(this, 'monitorId')}>
              {monitors.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      )
    }
    const deviceOptions = devices.map(p => ({label: p.name, value: p.id}))
    const index = findIndex(devices, {id: deviceId})
    const monitorOptions = index < 0 ? [] : devices[index].monitors.map(p => ({label: p.name, value: p.uid}))
    return [
      <div key="deviceId" className="col-md-6">
        <FormControl className="valign-top" fullWidth>
          <InputLabel>Device</InputLabel>
          <Select value={deviceId} onChange={this.onChangeSelect.bind(this, 'deviceId')}>
            {deviceOptions.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
          </Select>
        </FormControl>
      </div>,
      <div key="monitorId" className="col-md-6">
        <FormControl className="valign-top" fullWidth>
          <InputLabel>Monitor</InputLabel>
          <Select value={monitorId} onChange={this.onChangeSelect.bind(this, 'monitorId')}>
            {monitorOptions.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    ]
  }
  renderWorkflowPick () {
    const {workflowId, workflowIds, selectedWorkflow, selectedDevice, selectedRight} = this.state
    const {devices, workflows} = this.props
    if (this.state.resource !== 'incident') return null
    if (!devices) {
      return (
        <div className="col-md-6">
          <FormControl className="valign-top" fullWidth>
            <InputLabel>Workflow</InputLabel>
            <Select value={workflowId} onChange={this.onChangeSelect.bind(this, 'workflowId')}>
              {workflows.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      )
    }

    return (
      <div className="col-md-12">
        <GaugeWorkflowPicker
          devices={devices}
          workflows={workflows}

          selectedDevice={selectedDevice}
          selectedWorkflow={selectedWorkflow}
          onSelectDevice={this.onSelectDevice.bind(this)}
          onSelectWorkflow={this.onSelectWorkflow.bind(this)}
          onClickAddWorkflow={this.onClickAddWorkflow.bind(this)}
          onClickRemoveWorkflow={this.onClickRemoveWorkflow.bind(this)}

          selectedWorkflows={workflowIds}
          selectedRight={selectedRight}
          onSelectRight={this.onSelectRight.bind(this)}
        />
      </div>
    )
  }
  renderTableViewMode () {
    const {gauge} = this.props
    const {tableViewMode} = this.state
    if (gauge.templateName !== 'Table') return null
    return (
      <div className="col-md-6">
        <FormControl className="valign-top" fullWidth>
          <InputLabel>View Mode</InputLabel>
          <Select value={tableViewMode} onChange={this.onChangeSelect.bind(this, 'tableViewMode')}>
            {gaugeTableViewModes.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    )
  }

  renderSearchMode () {
    const {resource, savedSearchIds} = this.state
    const {searchList} = this.props
    if (resource !== 'search') return null
    return (
      <div className="row margin-md-top">
        <div className="col-md-12">
          <table className="table table-noborder" style={{border: '1px solid black'}}>
            <thead>
            <tr>
              <th>
                <span className="valign-middle">Saved Search</span>
                <AddIcon className="link valign-middle margin-md-left" onClick={this.onClickAddSavedSearch.bind(this)}/>
              </th>
            </tr>
            </thead>
            <tbody>
            {savedSearchIds.map((id, i) =>
              <tr key={i}>
                <td>
                  <Select value={id} onChange={(e) => this.onChangeSavedSearch(e.target.value, i)} style={{minWidth: 200}}>
                    {searchList.map(p =>
                      <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                    )}
                  </Select>
                  <DeleteIcon className="link" onClick={() => this.onClickRemoveSavedSearch(i)}/>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderNormal () {
    const {
      resource,
      duration, durationUnit, splitBy, splitUnit, name
    } = this.state
    const {hideDuration, hideSplit, gauge} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <TextField name="name" value={name} label="Name" className="valign-top" fullWidth onChange={this.onChangeText.bind(this, 'name')}/>
          </div>
          <div className="col-md-6">
            <FormControl className="valign-top" fullWidth>
              <InputLabel>Resource</InputLabel>
              <Select value={resource} onChange={this.onChangeSelect.bind(this, 'resource')}>
                {gaugeResources.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>

        {this.renderSearchMode()}

        <div className="row">
          {this.renderWorkflowPick()}
          {this.renderMonitorPick()}
          {this.renderTableViewMode()}
          {this.renderLogicalGroup()}
          {this.renderUserConnector()}

          {!hideDuration && <div className="col-md-3">
            <FormControl className="valign-top mr-dialog" fullWidth>
              <InputLabel>Duration</InputLabel>
              <Select value={duration} onChange={this.onChangeSelect.bind(this, 'duration')}>
                {durations.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
              </Select>
            </FormControl>
          </div>}
          {!hideDuration && <div className="col-md-3">
            <FormControl className="valign-top" fullWidth>
              <InputLabel>  </InputLabel>
              <Select value={durationUnit} onChange={this.onChangeSelect.bind(this, 'durationUnit')}>
                {gaugeDurationTypes.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
              </Select>
            </FormControl>
          </div>}
        </div>

        {gauge.templateName === 'Up/Down' ? this.renderForward() : null}

        {!hideSplit && resource !== 'monitor' && resource !== 'userconnector' && <div className="row">
          <div className="col-md-3">
            <FormControl className="valign-top mr-dialog" fullWidth>
              <InputLabel>Resolution</InputLabel>
              <Select value={splitBy} onChange={this.onChangeSelect.bind(this, 'splitBy')}>
                {durations.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3">
            <FormControl className="valign-top" fullWidth>
              <InputLabel>  </InputLabel>
              <Select value={splitUnit} onChange={this.onChangeSelect.bind(this, 'splitUnit')}>
                {gaugeDurationTypes.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>}
      </div>
    )
  }

  renderDateLabel (label) {
    return (
      <Button variant="raised">{label}</Button>
    )
  }

  renderIncidentTable () {
    const {devices, monitorGroups} = this.props
    const {monitorIds, servers, logicalGroups, monitorTreeData, name} = this.state
    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <DeviceMonitorPicker
          allDevices={devices}
          monitorGroups={monitorGroups}
          onClickToggleMonitor={this.onClickToggleMonitor.bind(this)}
          onClickToggleDevice={this.onClickToggleDevice.bind(this)}
          onClickToggleMonitorGroup={this.onClickToggleMonitorGroup.bind(this)}
          selectedServers={servers}
          selectedMonitorGroups={logicalGroups}
          selectedMonitors={monitorIds}

          monitorTreeData={monitorTreeData}
          onChangeTreeData={(monitorTreeData) => {this.setState({monitorTreeData})}}
        />
      </div>
    )
  }

  renderDevice () {
    const {devices} = this.props
    const {name, deviceId} = this.state
    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        {devices && <FormControl className="valign-top">
          <InputLabel>Device</InputLabel>
          <Select value={deviceId} className="valign-top" onChange={this.onChangeSelect.bind(this, 'deviceId')}>
            {devices.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>}

        <TextField name="checkInterval" label="Interval" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'checkInterval')}/>
      </div>
    )
  }
  renderDeviceBasic () {
    const {devices} = this.props
    const {name, deviceId} = this.state
    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <FormControl className="valign-top">
          <InputLabel>Device</InputLabel>
          <Select value={deviceId} onChange={this.onChangeSelect.bind(this, 'deviceId')}>
            {(devices || []).map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    )
  }
  renderService () {
    const {services} = this.props
    const {name, serviceName} = this.state
    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <FormControl className="valign-top mr-dialog">
          <InputLabel>Service</InputLabel>
          <Select value={serviceName} onChange={this.onChangeSelect.bind(this, 'serviceName')}>
            {services.map(p => <MenuItem key={p.ServiceName} value={p.ServiceName}>{p.DisplayName || p.ServiceName}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    )
  }
  renderForward () {
    const {gaugeBoards} = this.props
    const {forward, forwardBoardId} = this.state
    return [
      <div key="forward" className="inline-block nowrap margin-md-right" style={{marginTop: 12}}>
        <FormControlLabel
          control={
            <Checkbox checked={forward} onChange={this.onChangeText.bind(this, 'forward')}/>
          }
          label="Forward to dashboard"
        />
      </div>,
      <Select key="forwardBoard" value={forwardBoardId} className="valign-top" onChange={this.onChangeSelect.bind(this, 'forwardBoardId')}>
        {(gaugeBoards || []).map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
      </Select>
    ]
  }

  renderServers () {
    const {devices} = this.props
    const {name, itemSize, showDeviceType, servers, selectedDevice, selectedRight, selectedMonitor} = this.state

    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <Select value={itemSize} label="Item Size" className="valign-top" onChange={this.onChangeSelect.bind(this, 'itemSize')}>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="slim">Slim</MenuItem>
        </Select>
        <FormControlLabel
          control={
            <Checkbox checked={showDeviceType} onChange={this.onChangeText.bind(this, 'showDeviceType')}/>
          }
          label="Show Device Type"
        />

        {this.renderForward()}

        <div>
          <GaugeServerPicker
            height={400}
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

  renderMonitorGroups () {
    const {monitorGroups, gaugeBoards} = this.props
    const {name, itemSize, logicalGroups, selectedMonitorGroup, selectedRight} = this.state

    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <FormControl className="valign-top">
          <InputLabel>Item Size</InputLabel>
          <Select value={itemSize} onChange={this.onChangeSelect.bind(this, 'itemSize')}>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="slim">Slim</MenuItem>
          </Select>
        </FormControl>
        <div>
          <LogicalGroupPicker
            height={400}
            monitorGroups={monitorGroups}
            selectedMonitorGroups={logicalGroups}
            selectedMonitorGroup={selectedMonitorGroup}
            selectedRight={selectedRight}

            gaugeBoards={gaugeBoards}

            onSelectRight={this.onSelectRight.bind(this)}
            onSelectMonitorGroup={this.onSelectMonitorGroup.bind(this)}
            onClickAddMonitorGroup={this.onClickAddMonitorGroup.bind(this)}
            onClickRemoveMonitorGroup={this.onClickRemoveMonitorGroup.bind(this)}
            onUpdateMonitorGroup={this.onUpdateMonitorGroup.bind(this)}
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
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>

        {devices && <FormControl className="valign-top">
          <InputLabel>Device</InputLabel>
          <Select value={deviceId} onChange={this.onChangeSelect.bind(this, 'deviceId')}>
            {devices.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>}

        <FormControl>
          <InputLabel>Monitors</InputLabel>
          <Select multiple value={monitorIds} onChange={this.onChangeSelect.bind(this, 'monitorIds')}>
            {(monitors || []).map(p =>
              <MenuItem
                key={p.uid}
                value={p.uid}
              >{p.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    )
  }

  renderNews () {
    const {name, showImage} = this.state
    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <div className="margin-md-top">
          <FormControlLabel
            control={
              <Checkbox checked={showImage} onChange={this.onChangeText.bind(this, 'showImage')}/>
            }
            label="Show Images"
          />
        </div>
      </div>
    )
  }

  renderLog () {
    const {devices} = this.props
    const {servers, selectedDevice, selectedRight, selectedMonitor, name} = this.state
    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <GaugeLogMonitorPicker
          height={400}
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
    )
  }

  renderSearchShortcuts () {
    const {name, searchIds} = this.state
    const {searchList} = this.props
    return (
      <div>
        <TextField name="name" value={name} label="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <SavedSearchPicker
          searchList={searchList}
          selectedSearchIds={searchIds}
          onClickToggleSearch={this.onClickToggleSearch.bind(this)}
        />
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
      case 'Logical Groups':
        return this.renderMonitorGroups()
      case 'Monitors':
        return this.renderMonitors()
      case 'News':
        return this.renderNews()
      case 'Log':
        return this.renderLog()
      case 'Installed App':
      case 'Event Log':
      case 'Process':
      case 'Services':
      case 'Users':
      case 'Firewall':
      case 'Network':
      case 'Command':
      case 'CPU/Memory/Disk':
        return this.renderDeviceBasic()
      case 'Search Shortcuts':
        return this.renderSearchShortcuts()
      default:
        return this.renderNormal()
    }
  }
  render () {
    return (
      <Modal title="Edit" onRequestClose={this.onClickDone.bind(this)} contentStyle={{width: 1000, maxWidth: 'initial'}}>
        <CardPanel>
          {this.renderContent()}
        </CardPanel>
      </Modal>
    )
  }
}
