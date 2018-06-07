import React from 'react'
import moment from 'moment'
import {Button, MenuItem, Select, TextField} from '@material-ui/core'
import ActionSearch from '@material-ui/icons/Search'
import ReactTooltip from 'react-tooltip'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import DateRangePicker from 'components/common/DateRangePicker'

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
      <FormControl className="valign-top">
        <InputLabel>Select severities</InputLabel>
        <Select
          multiple
          onChange={onChangeSeverity}
          value={selectedSeverity}
          style={{width: '160px'}}>
          {severities.map(option =>
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl className="margin-md-left valign-top">
        <InputLabel> </InputLabel>
        <Select
          onChange={onChangeFixedStatus}
          value={fixedStatus || ''}
          style={{width: '120px'}}>
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="false">Unfixed</MenuItem>
          <MenuItem value="true">Fixed</MenuItem>
        </Select>
      </FormControl>

        <DateRangePicker
          startDate={moment(startDate)}
          endDate={moment(endDate)}
          onApply={onChangeDateRange}
          renderer={label =>
            <Button
              variant="flat" className="valign-top margin-md-left"
              style={{borderBottom: '1px solid lightgray', marginTop: 4}}>{label}</Button>
          }
        />

      <TextField
        label={<ActionSearch style={{bottom: '5px'}} nativeColor="#888888"/>}
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
