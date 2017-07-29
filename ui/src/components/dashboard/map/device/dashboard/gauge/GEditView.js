import React from 'react'
import {TextField, SelectField, MenuItem} from 'material-ui'

import DoneButton from './DoneButton'
import {gaugeDurationTypes, gaugeResources} from 'shared/Global'

const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: parseInt(p, 10)
}))

const inputStyle = {
  width: '100%'
}

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
      name: gauge.name || ''
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

  onClickDone () {
    const {onSubmit} = this.props
    const {resource, savedSearchId, monitorId,
      duration, durationUnit, splitBy, splitUnit, name
    }  = this.state
    const values = {
      resource, savedSearchId, monitorId,
      duration, durationUnit, splitBy, splitUnit, name
    }
    onSubmit && onSubmit(values)
  }

  render () {
    const {
      resource, savedSearchId, monitorId,
      duration, durationUnit, splitBy, splitUnit, name
    } = this.state
    const {searchList, monitors} = this.props
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

          <div className="col-md-3">
            <SelectField value={duration} floatingLabelText="Duration" className="valign-top mr-dialog" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'duration')}>
              {durations.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
            </SelectField>
          </div>
          <div className="col-md-3">
            <SelectField value={durationUnit} floatingLabelText="  " className="valign-top" style={inputStyle} onChange={this.onChangeSelect.bind(this, 'durationUnit')}>
              {gaugeDurationTypes.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
            </SelectField>
          </div>
        </div>

        <div className="row">
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
        </div>

        <DoneButton onClick={this.onClickDone.bind(this)}/>
      </div>
    )
  }
}
