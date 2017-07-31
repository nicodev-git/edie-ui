import React from 'react'
import moment from 'moment'
import {TextField, SelectField, MenuItem, RaisedButton} from 'material-ui'

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

export default class GEditView extends React.Component {
  constructor (props) {
    super(props)

    const {gauge} = props
    this.state = {
      resource: gauge.resource || 'search',
      savedSearchId: gauge.savedSearchId || '',
      monitorId: gauge.monitorId || '',
      duration: gauge.duration || '3',
      durationUnit: gauge.durationUnit || 'day',
      splitBy: gauge.splitBy || '1',
      splitUnit: gauge.splitUnit || 'day',
      name: gauge.name || '',

      fixed: gauge.fixed || '',
      severities: gauge.severities || [],
      dateFrom: gauge.dateFrom || 0,
      dateTo: gauge.dateTo || 0
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
    const {resource, savedSearchId, monitorId,
      duration, durationUnit, splitBy, splitUnit, name,
      severities, dateFrom, dateTo, fixed
    }  = this.state
    const values = {
      resource, savedSearchId, monitorId,
      duration, durationUnit, splitBy, splitUnit, name,
      severities, dateFrom, dateTo, fixed
    }
    onSubmit && onSubmit(values)
  }

  renderNormal () {
    const {
      resource, savedSearchId, monitorId,
      duration, durationUnit, splitBy, splitUnit, name
    } = this.state
    const {searchList, monitors, hideDuration, hideSplit} = this.props
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
          <div className="col-md-6">
            {resource === 'search' ? (
              <SelectField value={savedSearchId} floatingLabelText="Saved Search" className="valign-top mr-dialog" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'savedSearchId')}>
                {searchList.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
              </SelectField>
            ): null}
            {resource === 'monitor' ? (
              <SelectField value={monitorId} floatingLabelText="Monitor" className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'monitorId')}>
                {monitors.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
              </SelectField>
            ) : null}
          </div>

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
    const {fixed, severities, dateFrom, dateTo, name} = this.state
    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>

        <SelectField multiple floatingLabelText="Severity" onChange={this.onChangeSeverity.bind(this)} className="valign-top mr-dialog" value={severities}>
          {allSeverities.map(option =>
            <MenuItem key={option.value} insetChildren checked={severities && severities.includes(option.value)}
                      value={option.value} primaryText={option.label}/>
          )}
        </SelectField>

        <SelectField value={fixed} floatingLabelText="Status" className="valign-top mr-dialog" onChange={this.onChangeSelect.bind(this, 'fixed')}>
          {fixOptions.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>

        <div className="inline-block" style={{marginTop: 24}}>
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
  renderContent () {
    const {gauge} = this.props
    switch(gauge.templateName) {
      case 'Incident Table':
        return this.renderIncidentTable()
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
