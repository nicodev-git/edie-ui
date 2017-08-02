import React from 'react'
import moment from 'moment'
import {TextField, SelectField, MenuItem, RaisedButton} from 'material-ui'
import {findIndex} from 'lodash'

import DoneButton from './DoneButton'
import {gaugeDurationTypes, gaugeResources, severities as allSeverities} from 'shared/Global'
import DateRangePicker from 'components/common/DateRangePicker'

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

const sizeList = [1, 2, 3].map(p => ({
  label: p, value: p
}))

export default class GEditView extends React.Component {
  constructor (props) {
    super(props)

    const {gauge} = props
    this.state = {
      resource: gauge.resource || 'search',
      savedSearchId: gauge.savedSearchId || '',
      deviceId: gauge.deviceId || '',
      monitorId: gauge.monitorId || '',
      workflowId: gauge.workflowId || '',
      serviceName: gauge.serviceName || '',

      duration: gauge.duration || '3',
      durationUnit: gauge.durationUnit || 'day',
      splitBy: gauge.splitBy || '1',
      splitUnit: gauge.splitUnit || 'day',
      name: gauge.name || '',

      fixed: gauge.fixed || '',
      severities: gauge.severities || [],
      dateFrom: gauge.dateFrom || 0,
      dateTo: gauge.dateTo || 0,

      widgetSize: gauge.widgetSize || 1
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

  onChangeSeverity (e, index, values) {
    this.setState({
      severities: values
    })
  }
  onChangeDateRange ({startDate, endDate}) {
    this.setState({
      dateFrom: startDate.valueOf(),
      dateTo: endDate.valueOf()
    })
  }

  onClickDone () {
    const {onSubmit} = this.props
    const {resource, savedSearchId, monitorId, workflowId, deviceId, serviceName,
      duration, durationUnit, splitBy, splitUnit, name,
      severities, dateFrom, dateTo, fixed,
      widgetSize
    }  = this.state
    const values = {
      resource, savedSearchId, monitorId, workflowId, deviceId, serviceName,
      duration, durationUnit, splitBy, splitUnit, name,
      severities, dateFrom, dateTo, fixed,
      widgetSize
    }
    onSubmit && onSubmit(values)
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
      duration, durationUnit, splitBy, splitUnit, name,
      widgetSize
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

        <div className="row">
          <div className="col-md-3">
            <SelectField value={widgetSize} floatingLabelText="Size" className="valign-top mr-dialog" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'widgetSize')}>
              {sizeList.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
            </SelectField>
          </div>
        </div>
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
    const {deviceId, fixed, severities, dateFrom, dateTo, name, widgetSize} = this.state
    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        {devices && <SelectField value={deviceId} floatingLabelText="Device" className="valign-top" onChange={this.onChangeSelect.bind(this, 'deviceId')}>
          {devices.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
        </SelectField>}
        <SelectField multiple floatingLabelText="Severity" onChange={this.onChangeSeverity.bind(this)} className="valign-top mr-dialog" value={severities}>
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

        <SelectField value={widgetSize} floatingLabelText="Size" className="valign-top mr-dialog" onChange={this.onChangeSelect.bind(this, 'widgetSize')}>
          {sizeList.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>
      </div>
    )
  }
  renderDevice () {
    const {devices} = this.props
    const {name, deviceId, widgetSize} = this.state
    if (!devices) return null
    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <SelectField value={deviceId} floatingLabelText="Device" className="valign-top" onChange={this.onChangeSelect.bind(this, 'deviceId')}>
          {devices.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
        </SelectField>
        <SelectField value={widgetSize} floatingLabelText="Size" className="valign-top mr-dialog" onChange={this.onChangeSelect.bind(this, 'widgetSize')}>
          {sizeList.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>
      </div>
    )
  }
  renderService () {
    const {services} = this.props
    const {name, serviceName, widgetSize} = this.state
    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <SelectField value={serviceName} floatingLabelText="Service" className="valign-top mr-dialog" onChange={this.onChangeSelect.bind(this, 'serviceName')}>
          {services.map(p => <MenuItem key={p.ServiceName} value={p.ServiceName} primaryText={p.DisplayName || p.ServiceName}/>)}
        </SelectField>

        <SelectField value={widgetSize} floatingLabelText="Size" className="valign-top mr-dialog" onChange={this.onChangeSelect.bind(this, 'widgetSize')}>
          {sizeList.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
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
      default:
        return this.renderNormal()
    }
  }
  render () {
    return (
      <div>
        {this.renderContent()}

        <DoneButton onClick={this.onClickDone.bind(this)}/>
      </div>
    )
  }
}
