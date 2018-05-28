import React from 'react'
import moment from 'moment'
import {Select, MenuItem, Button, Checkbox, TextField} from '@material-ui/core'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect, Modal, CardPanel } from 'components/modal/parts'
import {findIndex} from 'lodash'
import { FormControl, FormControlLabel } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import {gaugeDurationTypes, gaugeResources, severities, timingOptions, realtimeGauges, historicGauges, gaugeTableViewModes} from 'shared/Global'
import DateRangePicker from 'components/common/DateRangePicker'

import GaugeLogMonitorPicker from './input/GaugeLogMonitorPicker'
import GaugeWorkflowPicker from './input/GaugeWorkflowPicker'
import LogicalGroupPicker from './input/LogicalGroupPicker'
import DeviceMonitorPicker from './input/DeviceMonitorPicker'
import SavedSearchPicker from './input/SavedSearchPicker'
import {required} from 'components/modal/validation/CommonValidation'

const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: p
}))

const fixOptions = [{
  label: 'Any', value: '',
}, {
  label: 'Unfixed', value: 'false'
}, {
  label: 'Fixed', value: 'true'
}]

export default class GaugeWizardView extends React.Component {
  renderDeviceList (showMonitorGroups) {
    const {devices, monitorGroups} = this.props
    let deviceOptions = devices.map(p => ({label: p.name, value: p.id}))
    const monitorGroupOptions = monitorGroups.map(p => ({label: p.name, value: p.id}))

    deviceOptions = showMonitorGroups ? [...deviceOptions, ...monitorGroupOptions] : deviceOptions
    return (
      <Field key="deviceId" name="deviceId" component={FormSelect} floatingLabel="Device" options={deviceOptions} className="valign-top margin-md-right"/>
    )
  }
  renderMonitorPick () {
    const {devices, monitors, formValues} = this.props
    if (formValues.resource !== 'monitor') return null
    if (!devices) {
      return (
        <Field
          name="monitorId" component={FormSelect} floatingLabel="Monitor" options={monitors} className="valign-top margin-md-right"
          validate={[required]}/>
      )
    }
    const index = findIndex(devices, {id: formValues.deviceId})
    const monitorOptions = index < 0 ? [] : devices[index].monitors.map(p => ({label: p.name, value: p.uid}))
    return [
      this.renderDeviceList(),
      <Field
        key="monitorId" name="monitorId" component={FormSelect} floatingLabel="Monitor" options={monitorOptions} className="valign-top"
        validate={[required]}/>
    ]
  }
  renderWorkflowPick () {
    const {formValues} = this.props
    if (formValues.resource !== 'incident') return null
    return (
      <GaugeWorkflowPicker {...this.props} className="margin-md-top"/>
    )
  }
  renderLogicalGroup () {
    const {devices, formValues, selectedMonitors, toggleMonitorId} = this.props
    if (formValues.resource !== 'logicalgroup') return null
    return (
      <div style={{maxHeight: 300, overflow: 'auto'}} className="margin-md-top">
        <table className="table table-hover">
          <tbody>
          {(devices || []).map(d => (d.monitors || []).map(p =>
            <tr key={p.uid}>
              <td>
                <FormControlLabel
                  control={
                    <Checkbox checked={selectedMonitors.includes(p.uid)} onChange={() => toggleMonitorId(p.uid)}/>
                  }
                  label={`${d.name} - ${p.name}`}
                />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }

  renderUserConnector () {
    const {formValues} = this.props
    if (formValues.resource !== 'userconnector') return null
    return (
      <Field name="userConnectorId" component={FormInput} floatingLabel="User Connector Id" className="valign-top margin-md-right" validate={[required]}/>
    )
  }
  renderTableViewMode () {
    const {templateName} = this.props
    if (templateName !== 'Table') return null
    return (
      <Field name="tableViewMode" component={FormSelect} floatingLabel="View Mode" options={gaugeTableViewModes} className="valign-top" validate={[required]}/>
    )
  }

  renderSearchShortcuts () {
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <SavedSearchPicker {...this.props}/>
      </div>
    )
  }

  renderSearchMode () {
    const {formValues, searchList, savedSearchItems,
      onChangeSavedSearchName, onChangeSavedSearchId,
      onClickAddSavedSearch, onClickRemoveSavedSearch} = this.props
    if (formValues.resource !== 'search') return null
    return (
      <div className="margin-md-top">
        <table className="table table-noborder" style={{border: '1px solid black'}}>
          <thead>
            <tr>
              <th>
                <span className="valign-middle">Saved Search</span>
                <AddIcon className="link valign-middle margin-md-left" onClick={onClickAddSavedSearch}/>
              </th>
            </tr>
          </thead>
          <tbody>
          {savedSearchItems.map((item, i) =>
            <tr key={i}>
              <td>
                <TextField value={item.name} onChange={e => onChangeSavedSearchName(e.target.value, i)} className="margin-md-right"/>

                <Select value={item.searchId} onChange={(e) => onChangeSavedSearchId(e.target.value, i)} style={{minWidth: 200}}>
                  {searchList.map(p =>
                    <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                  )}
                </Select>
                <DeleteIcon className="link" onClick={() => onClickRemoveSavedSearch(i)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
  renderNormal () {
    const {formValues, durationVisible, splitVisible, templateName} = this.props
    let resourceOptions = gaugeResources
    if (templateName === 'Up/Down') {
      resourceOptions = [...resourceOptions, {
        label: 'Logical Group', value: 'logicalgroup'
      }]
    }
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <Field name="resource" component={FormSelect} floatingLabel="Resource" options={resourceOptions} className="valign-top margin-md-right"/>

        {this.renderSearchMode()}
        {this.renderWorkflowPick()}
        {this.renderMonitorPick()}
        {this.renderLogicalGroup()}
        {this.renderUserConnector()}

        {this.renderTableViewMode()}

        {durationVisible ? (
          <div className="inline-block">
            <Field name="duration" component={FormSelect} floatingLabel="Duration" options={durations} className="valign-top margin-md-right" style={{width: 100}}/>
            <Field name="durationUnit" component={FormSelect} floatingLabel="  "options={gaugeDurationTypes} className="valign-top margin-md-right" style={{width: 120}}/>
          </div>
          ) : null
        }

        {splitVisible && (formValues.resource === 'search' || formValues.resource === 'incident') ? (
          <div className="inline-block">
            <Field name="splitBy" component={FormSelect} floatingLabel="Resolution" options={durations} className="valign-top margin-md-right" style={{width: 100}}/>
            <Field name="splitUnit" component={FormSelect} floatingLabel="  "options={gaugeDurationTypes} className="valign-top margin-md-right" style={{width: 120}}/>
          </div>
          ) : null
        }
      </div>
    )
  }
  renderDateLabel (label) {
    return (
      <Button variant="raised">{label}</Button>
    )
  }
  renderIncidentTable2 () {
    const {selectedSeverity, onChangeSeverity, dateFrom, dateTo, onChangeDateRange, devices} = this.props
    let deviceOptions = (devices || []).map(p => ({label: p.name, value: p.id}))
    deviceOptions = [
      ...deviceOptions,
      {label: '[Any Device]', value: '*'}
    ]
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        {devices && <Field name="deviceId" component={FormSelect} floatingLabel="Device" options={deviceOptions} className="valign-top" validate={[required]}/>}
        <FormControl className={`valign-top ${devices ? 'margin-md-right' : ''}`}>
          <InputLabel>Severity</InputLabel>
          <Select multiple onChange={onChangeSeverity} value={selectedSeverity}>
            {severities.map(option =>
              <MenuItem key={option.value} insetChildren checked={selectedSeverity && selectedSeverity.includes(option.value)}
                        value={option.value}>{option.label}</MenuItem>
            )}
          </Select>
        </FormControl>

        <Field name="fixed" component={FormSelect} floatingLabel="Status" options={fixOptions} className="valign-top"/>

        <div className="inline-block" style={{marginTop: 24}}>
          <DateRangePicker
            startDate={moment(dateFrom)}
            endDate={moment(dateTo)}
            onApply={onChangeDateRange.bind(this)}
            renderer={this.renderDateLabel.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderIncidentTable () {
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <DeviceMonitorPicker
          {...this.props}
        />
      </div>
    )
  }

  renderTable () {
    const {workflowOptions} = this.props

    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <Field name="workflowId" component={FormSelect} floatingLabel="Workflow" options={workflowOptions} className="valign-top margin-md-right" validate={[required]}/>
      </div>
    )
  }

  renderDeviceBasic () {
    const {devices} = this.props
    const deviceOptions = (devices || []).map(p => ({label: p.name, value: p.id}))
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <Field key="deviceId" name="deviceId" component={FormSelect} floatingLabel="Device" options={deviceOptions} className="valign-top" validate={[required]}/>
        <Field name="checkInterval" component={FormInput} floatingLabel="Interval" className="valign-top margin-md-right"/>
      </div>
    )
  }

  renderDevice () {
    const {devices, formValues} = this.props
    const deviceOptions = (devices || []).map(p => ({label: p.name, value: p.id}))
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        {devices && <Field key="deviceId" name="deviceId" component={FormSelect} floatingLabel="Device" options={deviceOptions} className="valign-top" validate={[required]}/>}

        <Field name="timing" component={FormSelect} floatingLabel="Timing" options={timingOptions} className="valign-top margin-md-right" validate={[required]}/>
        <Field
          name="gaugeType" component={FormSelect} floatingLabel="Gauge Type"
          options={formValues.timing === 'realtime' ? realtimeGauges : historicGauges}
          className="valign-top" validate={[required]}
          />

        {formValues.timing === 'historic' ? (
          <div className="inline-block">
            <Field name="duration" component={FormSelect} floatingLabel="Duration" options={durations} className="valign-top margin-md-right" style={{width: 100}}/>
            <Field name="durationUnit" component={FormSelect} floatingLabel="  "options={gaugeDurationTypes} className="valign-top" style={{width: 120}}/>
          </div>
        ) : (
          <Field name="checkInterval" component={FormInput} floatingLabel="Interval" className="valign-top margin-md-right"/>
        )}
      </div>
    )
  }
  renderService () {
    const {services} = this.props
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <Field name="serviceName" component={FormSelect} floatingLabel="Service" options={services} className="valign-top margin-md-right"/>
      </div>
    )
  }
  renderMonitors () {
    const {device, devices, formValues, selectedMonitors, onChangeMonitors} = this.props

    const index = findIndex(devices || [], {id: formValues.deviceId})
    const monitors = devices ? (index < 0 ? [] : devices[index].monitors) : device.monitors

    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        {devices && this.renderDeviceList()}

        <FormControl>
          <InputLabel>Monitors</InputLabel>
          <Select multiple value={selectedMonitors} onChange={onChangeMonitors}>
            {(monitors || []).map((p, i) =>
              <MenuItem key={i} value={p.uid}>{p.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    )
  }
  renderServices () {
    const {services, serviceNames, onChangeServiceNames} = this.props
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <FormControl>
          <InputLabel>Services</InputLabel>
          <Select multiple value={serviceNames} onChange={onChangeServiceNames} validate={[required]}>
            {(services || []).map((p, i) =>
              <MenuItem key={i} value={p.value}>{p.label}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    )
  }
  renderInstalledApp () {
    const {devices} = this.props
    const deviceOptions = (devices || []).map(p => ({label: p.name, value: p.id}))

    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        {devices && <Field key="deviceId" name="deviceId" component={FormSelect} floatingLabel="Device" options={deviceOptions} className="valign-top" validate={[required]}/>}

        <div className="inline-block">
          <Field name="duration" component={FormSelect} floatingLabel="Duration" options={durations} className="valign-top margin-md-right" style={{width: 100}}/>
          <Field name="durationUnit" component={FormSelect} floatingLabel="  "options={gaugeDurationTypes} className="valign-top" style={{width: 120}}/>
        </div>
      </div>
    )
  }
  renderServers () {
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <SavedSearchPicker {...this.props}/>
      </div>
    )
  }

  renderMonitorGroups () {
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top margin-md-right" validate={[required]}/>
        <LogicalGroupPicker {...this.props} />
      </div>
    )
  }
  renderLog () {
    return (
      <GaugeLogMonitorPicker {...this.props}/>
    )
  }
  renderContent () {
    const {templateName} = this.props
    switch(templateName) {
      case 'Incident Table':
        return this.renderIncidentTable()
      case 'Cpu':
      case 'Memory':
      case 'Disk':
        return this.renderDevice()
      case 'Service':
        return this.renderService()
      case 'Monitors':
        return this.renderMonitors()
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
      case 'Servers':
        return this.renderServers()
      case 'Logical Groups':
        return this.renderMonitorGroups()
      case 'Log':
        return this.renderLog()
      case 'Search Shortcuts':
        return this.renderSearchShortcuts()
      default:
        return this.renderNormal()
    }
  }
  render () {
    const {onSubmit, onHide, title} = this.props
    // const width = ['Servers', 'Log'].includes(templateName) ? 950 : 665
    const width = 950
    return (
      <Modal title={title || 'Gauge'} onRequestClose={onHide} contentStyle={{width, maxWidth: 'initial'}}>
        <form onSubmit={onSubmit}>
          <CardPanel className="margin-md-bottom">
            {this.renderContent()}
          </CardPanel>
          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Modal>
    )
  }
}
