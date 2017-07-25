import React from 'react'
import {RaisedButton} from 'material-ui'

export default class GaugeBackView extends React.Component {
  render () {
    const {splitBy, splitUnit} = this.props
    return (
      <div>
        <div>
          Resolution:
          <select
            className="form-control input-sm select-custom" value={splitBy}
            style={{fontSize: '11px'}}
            onChange={this.props.onChangeSplitBy}>
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
            style={{fontSize: '11px'}}
            onChange={this.props.onChangeSplitUnit}>
            <option value="minute">Minute(s)</option>
            <option value="hour">Hour(s)</option>
            <option value="day">Day(s)</option>
            <option value="month">Month(s)</option>
          </select>
        </div>

        <RaisedButton label="Done" onTouchTap={this.props.onClickFlip}/>
      </div>
    )
  }
}
