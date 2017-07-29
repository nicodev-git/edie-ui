import React from 'react'
import {TextField, SelectField, MenuItem} from 'material-ui'

import {gaugeDurationTypes, gaugeResources} from 'shared/Global'

const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: p
}))

export default class GEditView extends React.Component {
  render () {
    const {
      resource, savedSearchId, duration, durationUnit, splitBy, splitUnit, selectedSearch, searchList, name,
      onChangeResource, onChangeDuration, onChangeDurationUnit, onChangeSplitBy, onChangeSplitUnit, onChangeSearch, onChangeName
    } = this.props
    return (
      <div>
        <TextField value={name} floatingLabel="Name" className="valign-top mr-dialog" onChange={onChangeName}/>
        <SelectField v gaugealue={resource} floatingLabel="Resource" className="valign-top" onChange={onChangeResource}>
          {gaugeResources.map(p => <MenuItem value={p.value} primaryText={p.label}/>)}
        </SelectField>

        {resource === 'search' ? (
          <SelectField value={savedSearchId} floatingLabel="Saved Search" className="valign-top mr-dialog">
            {searchList.map(p => <MenuItem value={p.value} primaryText={p.label}/>)}
          </SelectField>
        ): null}
        {resource === 'monitor' && <Field name="monitorId" component={FormSelect} floatingLabel="Monitor" options={monitors} className="valign-top"/>}

        <Field name="duration" component={FormSelect} floatingLabel="Duration" options={durations} className="valign-top mr-dialog" style={{width: 100}}/>
        <Field name="durationUnit" component={FormSelect} floatingLabel="  "options={gaugeDurationTypes} className="valign-top" style={{width: 120}}/>
      </div>
    )
  }
}
