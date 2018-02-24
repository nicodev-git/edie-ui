import React from 'react'
import moment from 'moment'
import {Button, MenuItem, Select, TextField} from 'material-ui'
import ActionSearch from 'material-ui-icons/Search'
import ReactTooltip from 'react-tooltip'

import DateRangePicker from 'components/common/DateRangePicker'
import {
  errorStyle, underlineFocusStyle, inputStyle, selectedItemStyle, underlineStyle
} from 'style/common/materialStyles'

import {severities} from 'shared/Global'

const BigIncidentsView = ({onHide,
  selectedSeverity, onChangeSeverity,
  startDate, endDate, onChangeDateRange,
  fixedStatus, onChangeFixedStatus,
  keyword, onChangeKeyword,
  table, eventsModal}) => (
  <div className="flex-vertical flex-1" style={{background: 'white'}}>
    <div className="padding-md-left">
      <span style={{fontSize: '22px'}}><b>Incidents</b></span>
      <Button variant="flat" onClick={onHide} className="pull-right hidden">Close</Button>
    </div>
    <div className="form-inline padding-md-left">
      <Select
        errorStyle={errorStyle}
        underlineStyle={underlineFocusStyle}
        selectedMenuItemStyle={selectedItemStyle}
        menuItemStyle={inputStyle}

        multiple
        label="Select severities"
        onChange={onChangeSeverity}
        value={selectedSeverity}
        style={{width: '160px'}}
        className="valign-top"
      >
        {severities.map(option =>
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        )}
      </Select>

      <Select
        onChange={onChangeFixedStatus}
        value={fixedStatus || ''}
        className="margin-md-left valign-top"
        errorStyle={errorStyle}
        underlineStyle={underlineFocusStyle}
        selectedMenuItemStyle={selectedItemStyle}
        menuItemStyle={inputStyle}

        style={{width: '120px'}}>
        <MenuItem value="">Any</MenuItem>
        <MenuItem value="false">Unfixed</MenuItem>
        <MenuItem value="true">Fixed</MenuItem>
      </Select>
        <DateRangePicker
          startDate={moment(startDate)}
          endDate={moment(endDate)}
          onApply={onChangeDateRange}
          renderer={label =>
            <Button variant="flat"
              label={label} className="valign-top margin-md-left"
              style={{borderBottom: '1px solid lightgray', marginTop: 4}}/>
          }
        />

      <TextField
        label={<ActionSearch style={{bottom: '5px'}} color="#888888"/>}
        errorStyle={errorStyle}
        inputStyle={inputStyle}
        underlineFocusStyle={underlineStyle}
        onChange={onChangeKeyword}
        value={keyword}
        className="valign-top margin-md-left"
      />
    </div>
    <div className="flex-1 flex-vertical">
      {table}
      {eventsModal}
    </div>
    <ReactTooltip/>
  </div>
)

export default BigIncidentsView
