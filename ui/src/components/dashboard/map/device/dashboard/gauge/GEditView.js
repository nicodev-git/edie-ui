import React from 'react'
import {TextField, SelectField, MenuItem} from 'material-ui'

import {gaugeDurationTypes, gaugeResources} from 'shared/Global'

const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: p
}))

export default class GEditView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      resource: 'search',
      savedSearchId: '',
      monitorId: '',
      duration: '3',
      durationUnit: 'day',
      splitBy: '1',
      splitUnit: 'day',
      name: ''
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

  render () {
    const {
      resource, savedSearchId, monitorId,
      duration, durationUnit, splitBy, splitUnit, name
    } = this.state
    const {searchList, monitors} = this.props
    return (
      <div>
        <TextField name="name" value={name} floatingLabelText="Name" className="valign-top mr-dialog" onChange={this.onChangeText.bind(this, 'name')}/>
        <SelectField value={resource} floatingLabelText="Resource" className="valign-top" onChange={this.onChangeSelect.bind(this, 'resource')}>
          {gaugeResources.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>

        {resource === 'search' ? (
          <SelectField value={savedSearchId} floatingLabelText="Saved Search" className="valign-top mr-dialog" onChange={this.onChangeSelect.bind(this, 'savedSearchId')}>
            {searchList.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
          </SelectField>
        ): null}
        {resource === 'monitor' ? (
          <SelectField value={monitorId} floatingLabelText="Monitor" className="valign-top" onChange={this.onChangeSelect.bind(this, 'monitorId')}>
            {monitors.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
          </SelectField>
        ) : null}

        <SelectField value={duration} floatingLabelText="Duration" className="valign-top mr-dialog" style={{width: 100}} onChange={this.onChangeSelect.bind(this, 'duration')}>
          {durations.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>
        <SelectField value={durationUnit} floatingLabelText="  " className="valign-top" style={{width: 120}} onChange={this.onChangeSelect.bind(this, 'durationUnit')}>
          {gaugeDurationTypes.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>
      </div>
    )
  }
}
