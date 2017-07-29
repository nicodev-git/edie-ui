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
      durationUnit: 'days',
      splitBy: '1',
      splitUnit: 'day',
      name: ''
    }
  }

  render () {
    const {
      resource, savedSearchId, monitorId,
      duration, durationUnit, splitBy, splitUnit, name,
      onChangeResource, onChangeSavedSearch, onChangeMonitor,
      onChangeDuration, onChangeDurationUnit, onChangeSplitBy, onChangeSplitUnit, onChangeName
    } = this.state
    const {searchList, monitors} = this.props
    return (
      <div>
        <TextField value={name} floatingLabel="Name" className="valign-top mr-dialog" onChange={onChangeName}/>
        <SelectField v gaugealue={resource} floatingLabel="Resource" className="valign-top" onChange={onChangeResource}>
          {gaugeResources.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>

        {resource === 'search' ? (
          <SelectField value={savedSearchId} floatingLabel="Saved Search" className="valign-top mr-dialog" onChange={onChangeSavedSearch}>
            {searchList.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
          </SelectField>
        ): null}
        {resource === 'monitor' ? (
          <SelectField value={monitorId} floatingLabel="Monitor" className="valign-top" onChange={onChangeMonitor}>
            {monitors.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
          </SelectField>
        ) : null}

        <SelectField value={duration} floatingLabel="Duration" className="valign-top mr-dialog" style={{width: 100}} onChange={onChangeDuration}>
          {durations.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>
        <SelectField value={durationUnit} floatingLabel="  " className="valign-top" style={{width: 120}} onChange={onChangeDurationUnit}>
          {gaugeDurationTypes.map(p => <MenuItem key={p.value} value={p.value} primaryText={p.label}/>)}
        </SelectField>
      </div>
    )
  }
}
