import React from 'react'
import { Field } from 'redux-form'
import { findIndex } from 'lodash'
import {FlatButton, SelectField, Popover, MenuItem, IconButton} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ToggleStar from 'material-ui/svg-icons/toggle/star-border'
import FilledStar from 'material-ui/svg-icons/toggle/star'
import LocalMovie from 'material-ui/svg-icons/maps/local-movies'
import Computer from 'material-ui/svg-icons/hardware/computer'
import NoSim from 'material-ui/svg-icons/communication/no-sim'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

import { FormInput } from 'components/modal/parts'
import DateRangePicker from 'components/common/DateRangePicker'

export default class SearchFormView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openSearchBy: false,
      advanced: false
    }
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
      <FlatButton label={label}/>
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
      onSearchKeyDown,
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
      <form onSubmit={onSubmit}>
        <div style={{background: '#dadada', paddingLeft: 10}}>
          <div style={{height: 48}}>
            <Field name="freeText" component={FormInput} label="Search" onKeyDown={onKeyDownFreeText} style={{width: 300}}
                   className={`valign-top ${advanced ? 'hidden' : ''}`}/>
            <FlatButton label="Search By" onTouchTap={this.onClickSearchBy.bind(this)} className="valign-top margin-xs-top"/>
            <SelectField
              multiple
              hintText="Collection"
              value={selectedCollections}
              onChange={onChangeCollection}
              style={{width: '180px'}}
            >
              {collections.map(option =>
                <MenuItem
                  key={option.value}
                  insetChildren
                  checked={selectedCollections && selectedCollections.includes(option.value)}
                  value={option.value}
                  primaryText={option.label}
                />
              )}
            </SelectField>
            <DateRangePicker
              className="valign-top"
              startDate={startDate}
              endDate={endDate}
              onApply={onChangeDateRange}
              renderer={this.renderDateLabel.bind(this)}
              style={{marginTop: '4px'}}/>
            <div className="pull-right margin-sm-right">
              <IconButton tooltip="Favorite" className="valign-top" onTouchTap={onClickStar}>{starFilled ? <FilledStar/> : <ToggleStar/>}</IconButton>
              <IconButton tooltip="Illustrate" className="valign-top" onTouchTap={onClickIllustrate}><LocalMovie/></IconButton>
              <IconButton tooltip="Related devices" className="valign-top hidden" onTouchTap={onClickRelDevices}><Computer/></IconButton>
              <IconButton tooltip="Non-related devices" className="valign-top hidden" onTouchTap={onClickIrrelDevices}><NoSim/></IconButton>
              <IconButton tooltip="Views" className="valign-top" onTouchTap={onClickViewFilter}><img src="/resources/images/sidebar/search/view-icon.png" width="24" alt=""/></IconButton>
              <IconButton tooltip="Graph" className="valign-top" onTouchTap={onClickGraph}><img src="/resources/images/sidebar/search/graph-icon.png" width="24" alt=""/></IconButton>
              <IconButton tooltip="Clear" className="valign-top" onTouchTap={onClickClear}><ClearIcon /></IconButton>
              <IconButton tooltip="Advanced" className="valign-top" onTouchTap={this.onClickToggleAdvanced.bind(this)}>{advanced ? <ArrowUpIcon /> : <ArrowDownIcon />}</IconButton>
            </div>
            <Popover
              open={this.state.openSearchBy}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.hideSearchBy.bind(this)}
              style={{minWidth: 300}}
            >
              <div>
                <FlatButton label="Workflows" onTouchTap={() => this.hideSearchBy() && onClickWorkflow()} style={{width: '100%', textAlign: 'left'}}/>
                <FlatButton label="Device/Monitors" onTouchTap={() => this.hideSearchBy() && onClickSearchMonitor()} style={{width: '100%', textAlign: 'left'}}/>
                <FlatButton label="Tags" onTouchTap={(e) => this.hideSearchBy() && onClickTags(e)} style={{width: '100%', textAlign: 'left'}}/>
              </div>

              <div style={{marginTop: -35}}>
                <SelectField
                  multiple
                  floatingLabelText="Severity"
                  value={selectedSeverities}
                  onChange={onChangeSeverity}
                  style={{width: 300}}
                  className="text-left margin-md-left"
                  selectionRenderer={this.severityRenderer.bind(this, severities)}
                >
                  {severities.map(option =>
                    <MenuItem
                      key={option.value}
                      insetChildren
                      checked={selectedSeverities && selectedSeverities.includes(option.value)}
                      value={option.value}
                      primaryText={option.label}
                    />
                  )}
                </SelectField>
              </div>

              <div style={{marginTop: -20}}>
                <SelectField
                  multiple
                  floatingLabelText="MonitorType"
                  value={selectedMonitorTypes}
                  onChange={onChangeMonitorType}
                  style={{width: 300}}
                  className="margin-md-left"
                >
                  {monitorTemplates.map(option =>
                    <MenuItem
                      key={option.id}
                      insetChildren
                      checked={selectedMonitorTypes && selectedMonitorTypes.includes(option.monitortype)}
                      value={option.monitortype}
                      primaryText={option.name}
                    />
                  )}
                </SelectField>
              </div>
            </Popover>
          </div>

          <div className={`flex-horizontal ${advanced ? '' : 'hidden'}`} >
            <div className="flex-1">
              <Field name="query" component={FormInput} label="Search" onKeyDown={onSearchKeyDown} style={{width: '100%'}} className="valign-top"/>
            </div>
            <div style={{width: 65}} className="text-right">
              <IconButton tooltip="Search" onTouchTap={onClickSearch} type="submit" className="valign-top"><ActionSearch /></IconButton>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
