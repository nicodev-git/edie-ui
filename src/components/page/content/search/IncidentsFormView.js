import React from 'react'
import {SelectField, MenuItem} from 'material-ui'

import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'
import DateRangePicker2 from 'components/shared/DateRangePicker2'

export default class IncidentsFormView extends React.Component {
  render () {
    const {
      fixedOptions,
      fixed,
      onChangeFixed,

      startDate,
      endDate,
      onChangeDateRange,

      severities,
      selectedSeverities,
      onChangeSeverity,

      deviceSearch
    } = this.props

    return (
      <div>
        <SelectField
          underlineStyle={underlineFocusStyle}
          selectedMenuItemStyle={selectedItemStyle}
          menuItemStyle={inputStyle}
          multiple
          hintText="Severity"
          value={selectedSeverities}
          onChange={onChangeSeverity}
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
          hintText="Fixed"
          underlineStyle={underlineFocusStyle}
          selectedMenuItemStyle={selectedItemStyle}
          menuItemStyle={inputStyle}
          labelStyle={inputStyle}
          onChange={onChangeFixed}
          value={fixed}
        >
          {fixedOptions.map(option => <MenuItem key={option.value} value={option.value} primaryText={option.label}/>)}
        </SelectField>

        <DateRangePicker2
          startDate={startDate}
          endDate={endDate}
          onApply={onChangeDateRange}/>
        {deviceSearch}
      </div>
    )
  }
}
