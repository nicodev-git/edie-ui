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
import {Toolbar} from 'material-ui/Toolbar'

import { FormInput } from 'components/modal/parts'
import DateRangePicker2 from 'components/shared/DateRangePicker2'
import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

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

      onClickViewFilter
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        <Toolbar style={{background: '#dadada', height: '48px'}}>
          <Field name="query" component={FormInput} label="Search" onKeyDown={onSearchKeyDown}/>
          <DateRangePicker2
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
            className="text-left"
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
            multiple
            hintText="MonitorType"
            value={selectedMonitorTypes}
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
          <IconButton tooltip="Workflow" onTouchTap={onClickWorkflow}><img src="/images/wf-icon.png" width="24"/></IconButton>
          <IconButton tooltip="Search" onTouchTap={onClickWorkflow} type="submit" ><ActionSearch /></IconButton>

          <IconButton tooltip="Favorite" onTouchTap={onClickStar}>{starFilled ? <FilledStar/> : <ToggleStar/>}</IconButton>
          <FlatButton label="Saved Search" style={iconButtonStyle} onClick={onClickSavedSearch}/>
          <IconButton tooltip="Illustrate" onTouchTap={onClickIllustrate}><LocalMovie/></IconButton>
          <IconButton tooltip="Related devices" onTouchTap={onClickRelDevices}><Computer/></IconButton>
          <IconButton tooltip="Non-related devices" onTouchTap={onClickIrrelDevices}><NoSim/></IconButton>
          <IconButton tooltip="Views" onTouchTap={onClickViewFilter}><img src="/images/view-icon.png" width="24"/></IconButton>
        </Toolbar>
      </form>
    )
  }
}
