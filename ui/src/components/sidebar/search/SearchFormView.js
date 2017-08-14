import React from 'react'
import { Field } from 'redux-form'
import { findIndex } from 'lodash'
import {FlatButton, SelectField, MenuItem, IconButton} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ToggleStar from 'material-ui/svg-icons/toggle/star-border'
import FilledStar from 'material-ui/svg-icons/toggle/star'
import LocalMovie from 'material-ui/svg-icons/maps/local-movies'
import Computer from 'material-ui/svg-icons/hardware/computer'
import NoSim from 'material-ui/svg-icons/communication/no-sim'
import ClearIcon from 'material-ui/svg-icons/content/clear'
// import {Toolbar} from 'material-ui/Toolbar'

import { FormInput } from 'components/modal/parts'
import DateRangePicker from 'components/common/DateRangePicker'
import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/common/materialStyles'

const iconButtonStyle = {
  marginTop: '4px',
  verticalAlign: 'top',
  minWidth: '50px'
}
export default class SearchFormView extends React.Component {
  renderDateLabel (label) {
    return (
      <FlatButton label={label}/>
    )
  }
  severityRenderer (severities, values) {
    if (!values.length || values.length === severities.length) return 'All'
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
      onClickSavedSearch,
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

      onClickClear
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        <div style={{background: '#dadada', paddingLeft: 10}}>
          <div className="nowrap">
            <Field name="query" component={FormInput} label="Search" onKeyDown={onSearchKeyDown} style={{minWidth: 200}} className="valign-top"/>
            <DateRangePicker
              className="valign-top"
              startDate={startDate}
              endDate={endDate}
              onApply={onChangeDateRange}
              renderer={this.renderDateLabel.bind(this)}
              style={{marginTop: '4px'}}/>
            <SelectField
              underlineStyle={underlineFocusStyle}
              selectedMenuItemStyle={selectedItemStyle}
              menuItemStyle={inputStyle}
              multiple
              hintText="Severity"
              value={selectedSeverities}
              onChange={onChangeSeverity}
              className="text-left valign-top"
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
            <SelectField
              underlineStyle={underlineFocusStyle}
              selectedMenuItemStyle={selectedItemStyle}
              menuItemStyle={inputStyle}
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
            <SelectField
              underlineStyle={underlineFocusStyle}
              selectedMenuItemStyle={selectedItemStyle}
              menuItemStyle={inputStyle}
              menuStyle={{
                width: 220
              }}
              multiple
              hintText="MonitorType"
              value={selectedMonitorTypes && selectedMonitorTypes.length ? selectedMonitorTypes : null}
              onChange={onChangeMonitorType}
              style={{width: '180px'}}
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
            <FlatButton label="Saved Search" style={iconButtonStyle} onClick={onClickSavedSearch} className="nowrap valign-top"/>
          </div>

          <div className="nowrap">

            <IconButton tooltip="Workflow" onTouchTap={onClickWorkflow} className="valign-top"><img src="/resources/images/sidebar/search/wf-icon.png" width="24" alt=""/></IconButton>
            <IconButton tooltip="Tags" onTouchTap={onClickTags} className="valign-top"><img src="/resources/images/sidebar/search/tag.png" width="24" alt=""/></IconButton>
            <IconButton tooltip="Search" onTouchTap={onClickWorkflow} type="submit" className="valign-top"><ActionSearch /></IconButton>

            <IconButton tooltip="Favorite" className="valign-top" onTouchTap={onClickStar}>{starFilled ? <FilledStar/> : <ToggleStar/>}</IconButton>
            <IconButton tooltip="Illustrate" className="valign-top" onTouchTap={onClickIllustrate}><LocalMovie/></IconButton>
            <IconButton tooltip="Related devices" className="valign-top" onTouchTap={onClickRelDevices}><Computer/></IconButton>
            <IconButton tooltip="Non-related devices" className="valign-top" onTouchTap={onClickIrrelDevices}><NoSim/></IconButton>
            <IconButton tooltip="Views" className="valign-top" onTouchTap={onClickViewFilter}><img src="/resources/images/sidebar/search/view-icon.png" width="24" alt=""/></IconButton>
            <IconButton tooltip="Graph" className="valign-top" onTouchTap={onClickGraph}><img src="/resources/images/sidebar/search/graph-icon.png" width="24" alt=""/></IconButton>

            <IconButton tooltip="Clear" className="valign-top" onTouchTap={onClickClear}><ClearIcon /></IconButton>
          </div>
        </div>
      </form>
    )
  }
}
