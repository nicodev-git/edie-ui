import React from 'react'
import { Field } from 'redux-form'
import { findIndex } from 'lodash'
import {FlatButton, SelectField, MenuItem} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ToggleStar from 'material-ui/svg-icons/toggle/star-border'
import FilledStar from 'material-ui/svg-icons/toggle/star'
import LocalMovie from 'material-ui/svg-icons/maps/local-movies'
import Computer from 'material-ui/svg-icons/hardware/computer'
import NoSim from 'material-ui/svg-icons/communication/no-sim'

import { FormInput } from 'components/modal/parts'
import DateRangePicker2 from 'components/shared/DateRangePicker2'
import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

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
      onChangeMonitorType
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        <div className="text-center margin-md-top" >
          <Field name="query" component={FormInput} label="Search" onKeyDown={onSearchKeyDown} style={{verticalAlign: 'top'}}/>
          <DateRangePicker2
            startDate={startDate}
            endDate={endDate}
            onApply={onChangeDateRange}
            renderer={this.renderDateLabel.bind(this)}
            style={{marginTop: '4px', verticalAlign: 'top'}}/>
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
            style={{width: '200px'}}
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
          <FlatButton label="Workflow" onTouchTap={onClickWorkflow} style={{marginTop: '4px', verticalAlign: 'top'}}/>
          <FlatButton type="submit" icon={<ActionSearch />} style={{marginTop: '4px', verticalAlign: 'top'}}/>
          <FlatButton icon={starFilled ? <FilledStar/> : <ToggleStar/>} style={{marginTop: '4px', verticalAlign: 'top'}} onClick={onClickStar}/>
          <FlatButton label="Saved Search" style={{marginTop: '4px', verticalAlign: 'top', minWidth: '50px'}} onClick={onClickSavedSearch}/>
          <FlatButton icon={<LocalMovie/>} style={{marginTop: '4px', verticalAlign: 'top', minWidth: '50px'}} onClick={onClickIllustrate}/>
          <FlatButton icon={<Computer/>} style={{marginTop: '4px', verticalAlign: 'top', minWidth: '50px'}} onClick={onClickRelDevices}/>
          <FlatButton icon={<NoSim/>} style={{marginTop: '4px', verticalAlign: 'top', minWidth: '50px'}} onClick={onClickIrrelDevices}/>
        </div>
      </form>
    )
  }
}
