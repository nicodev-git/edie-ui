import React from 'react'
import { Field, Form } from 'redux-form'
import { findIndex } from 'lodash'
import {Button, Select, Popover, MenuItem, IconButton} from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import ActionSearch from '@material-ui/icons/Search'
import ToggleStar from '@material-ui/icons/StarBorder'
import FilledStar from '@material-ui/icons/Star'
import LocalMovie from '@material-ui/icons/LocalMovies'
import Computer from '@material-ui/icons/Computer'
import NoSim from '@material-ui/icons/NoSim'
import ClearIcon from '@material-ui/icons/Clear'
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { FormInput } from 'components/modal/parts'

import DateRangePicker from 'components/common/DateRangePicker'

const dateRangeStyle = {marginTop: '4px'}

export default class SearchFormView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openSearchBy: false,
      advanced: false
    }

    this.renderDateLabel = this.renderDateLabel.bind(this)
  }
  onClickSearchBy (e) {
    this.setState({
      openSearchBy: true,
      anchorEl: e.target
    })
  }
  onClickToggleAdvanced () {
    this.setState({
      advanced: !this.state.advanced
    })
  }
  hideSearchBy () {
    this.setState({
      openSearchBy: false
    })
    return true
  }
  renderDateLabel (label) {
    return (
      <Button variant="flat">{label}</Button>
    )
  }
  severityRenderer (severities, values) {
    if (/*!values.length ||*/ values.length === severities.length) return 'All'
    return values.map(value => {
      const i = findIndex(severities, {value})
      return severities[i].label
    }).join(', ')
  }
  render () {
    const {
      onClickStar,
      starFilled,
      onSubmit,
      onClickWorkflow,

      severities,
      selectedSeverities,
      onChangeSeverity,

      collections,
      selectedCollections,
      onChangeCollection,

      startDate,
      endDate,
      onChangeDateRange,

      onClickIllustrate,
      onClickRelDevices,
      onClickIrrelDevices,

      monitorTemplates,
      selectedMonitorTypes,
      onChangeMonitorType,

      onClickViewFilter,
      onClickGraph,

      onClickTags,

      onClickClear,
      onClickSearch,

      onClickSearchMonitor,

      onKeyDownFreeText
    } = this.props

    const {advanced} = this.state

    return (
      <Form onSubmit={onSubmit}>
        <div style={{background: '#dadada', paddingLeft: 10}}>
          <div style={{height: 48}}>
            <Field name="freeText" component={FormInput} label="Search" onKeyDown={onKeyDownFreeText} style={{width: 300}}
                   className={`valign-middle margin-md-right margin-sm-top ${advanced ? 'hidden' : ''}`}/>
            <Select
              multiple
              value={selectedCollections}
              onChange={onChangeCollection}
              className="valign-middle margin-md-right margin-sm-top"
              style={{width: '180px'}}
            >
              {collections.map(option =>
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              )}
            </Select>
            <Button variant="flat" onClick={this.onClickSearchBy.bind(this)}
                    className="valign-middle margin-sm-top">Search By</Button>
            <DateRangePicker
              className="valign-middle margin-sm-top"
              startDate={startDate}
              endDate={endDate}
              onApply={onChangeDateRange}
              renderer={this.renderDateLabel}
              style={dateRangeStyle}
              autoApply
            />
            <div className="pull-right margin-sm-right">
              <IconButton tooltip="Favorite" className="valign-top" onClick={onClickStar}>{starFilled ? <FilledStar/> : <ToggleStar/>}</IconButton>
              <IconButton tooltip="Illustrate" className="valign-top" onClick={onClickIllustrate}><LocalMovie/></IconButton>
              <IconButton tooltip="Related devices" className="valign-top hidden" onClick={onClickRelDevices}><Computer/></IconButton>
              <IconButton tooltip="Non-related devices" className="valign-top hidden" onClick={onClickIrrelDevices}><NoSim/></IconButton>
              <IconButton tooltip="Views" className="valign-top" onClick={onClickViewFilter}><img src="/resources/images/sidebar/search/view-icon.png" width="24" alt=""/></IconButton>
              <IconButton tooltip="Graph" className="valign-top" onClick={onClickGraph}><img src="/resources/images/sidebar/search/graph-icon.png" width="24" alt=""/></IconButton>
              <IconButton tooltip="Clear" className="valign-top" onClick={onClickClear}><ClearIcon /></IconButton>
              <IconButton tooltip="Advanced" className="valign-top" onClick={this.onClickToggleAdvanced.bind(this)}>{advanced ? <ArrowUpIcon /> : <ArrowDownIcon />}</IconButton>
            </div>
            <Popover
              open={this.state.openSearchBy}
              anchorEl={this.state.anchorEl}
              onClose={this.hideSearchBy.bind(this)}
              style={{minWidth: 300}}
            >
              <div>
                <Button variant="flat" onClick={() => this.hideSearchBy() && onClickWorkflow()} style={{width: '100%', textAlign: 'left'}}>Workflows</Button>
                <Button variant="flat" onClick={() => this.hideSearchBy() && onClickSearchMonitor()} style={{width: '100%', textAlign: 'left'}}>Device/Monitors</Button>
                <Button variant="flat" onClick={(e) => this.hideSearchBy() && onClickTags(e)} style={{width: '100%', textAlign: 'left'}}>Tags</Button>
              </div>

              <div className="margin-md-left margin-md-right">
                <FormControl fullWidth>
                  <InputLabel>Severity</InputLabel>
                  <Select
                    multiple
                    value={selectedSeverities}
                    onChange={onChangeSeverity}
                    renderValue={this.severityRenderer.bind(this, severities)}
                  >
                    {severities.map(option =>
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>

              <div className="margin-md">
                <FormControl fullWidth>
                  <InputLabel>MonitorType</InputLabel>
                  <Select
                    multiple
                    value={selectedMonitorTypes}
                    onChange={onChangeMonitorType}
                  >
                    {monitorTemplates.map(option =>
                      <MenuItem key={option.id} value={option.monitortype}>{option.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </Popover>
          </div>

          <div className={`flex-horizontal ${advanced ? '' : 'hidden'}`} >
            <div className="flex-1">
              <Field name="query" component={FormInput} label="Search" style={{width: '100%'}} className="valign-top"/>
            </div>
            <div style={{width: 65}} className="text-right">
              <IconButton tooltip="Search" onClick={onClickSearch} type="submit" className="valign-top"><ActionSearch /></IconButton>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}
