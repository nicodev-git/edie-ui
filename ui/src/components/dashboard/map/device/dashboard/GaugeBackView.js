import React from 'react'
import {RaisedButton, SelectField, MenuItem} from 'material-ui'

export default class GaugeBackView extends React.Component {
  render () {
    const {
      splitBy, splitUnit, selectedSearch, searchList,
      onChangeSplitBy, onChangeSplitUnit, onChangeSearch
    } = this.props
    return (
      <div>
        <div>
          Resolution:
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
        </div>

        <RaisedButton label="Done" onTouchTap={this.props.onClickFlip}/>
      </div>
    )
  }
}
