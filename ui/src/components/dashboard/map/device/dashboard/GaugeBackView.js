import React from 'react'
import {RaisedButton, SelectField, MenuItem, TextField} from 'material-ui'

import {gaugeDurationTypes} from 'shared/Global'

export default class GaugeBackView extends React.Component {
  render () {
    const {
      duration, durationUnit, splitBy, splitUnit, selectedSearch, searchList, name,
      onChangeDuration, onChangeDurationUnit, onChangeSplitBy, onChangeSplitUnit, onChangeSearch, onChangeName
    } = this.props
    return (
      <div>
        <div>
          <TextField value={name} floatingLabelText="Title" onChange={onChangeName}/>
        </div>
        <div className="margin-md-top">
          Show Last
          <select
            className="form-control input-sm select-custom" value={duration}
            style={{color: 'black'}}
            onChange={onChangeDuration}>
            <option value="1">&nbsp;1</option>
            <option value="2">&nbsp;2</option>
            <option value="3">&nbsp;3</option>
            <option value="5">&nbsp;5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
          <select
            className="form-control input-sm select-custom" value={durationUnit}
            style={{color: 'black'}}
            onChange={onChangeDurationUnit}>
            {gaugeDurationTypes.map(p =>
              <option key={p.value} value={p.value}>{p.label}</option>
            )}
          </select>&nbsp;
          With Resolution
          <select
            className="form-control input-sm select-custom" value={splitBy}
            style={{color: 'black'}}
            onChange={onChangeSplitBy}>
            <option value="1">&nbsp;1</option>
            <option value="2">&nbsp;2</option>
            <option value="3">&nbsp;3</option>
            <option value="5">&nbsp;5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>

          <select
            className="form-control input-sm select-custom" value={splitUnit}
            style={{color: 'black'}}
            onChange={onChangeSplitUnit}>
            <option value="minute">Minute(s)</option>
            <option value="hour">Hour(s)</option>
            <option value="day">Day(s)</option>
            <option value="month">Month(s)</option>
          </select>
        </div>

        <div>
          <SelectField
            floatingLabelText="Saved Search" onChange={onChangeSearch} value={selectedSearch}>
            {searchList.map(p => <MenuItem key={p.id} value={p.id} primaryText={p.name}/>)}
          </SelectField>
          &nbsp;&nbsp;
        </div>
        <div className="text-right" style={{position: 'absolute', bottom: 16, right: 16}}>
          <RaisedButton label="Done" onTouchTap={this.props.onClickDone}/>
        </div>
      </div>
    )
  }
}
