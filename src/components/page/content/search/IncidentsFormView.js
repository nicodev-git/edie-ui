import React from 'react'
import { Field } from 'redux-form'
import {FlatButton, SelectField, MenuItem} from 'material-ui'

import { FormInput, FormSelect } from 'components/modal/parts'
import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'
import DateRangePicker2 from 'components/shared/DateRangePicker2'

export default class IncidentsFormView extends React.Component {
  render () {
    const {
      fixedOptions,
      onChangeFixed,
      onClickWorkflow,
      severities,
      selectedSeverities,
      onChangeSeverity
    } = this.props

    return (
      <form onSubmit={onSubmit}>
        <div className="text-center margin-md-top" >
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
          <DateRangePicker2
            startDate={startDate}
            endDate={endDate}
            onApply={onChangeDateRange}/>

          <Field name="fixed" component={FormSelect} label="" options={fixedOptions} style={{verticalAlign: 'top', textAlign: 'left', maxWidth: '100px'}} onChange={onChangeFixed}/>
          <FlatButton label="Workflow" onTouchTap={onClickWorkflow} style={{marginTop: '4px', verticalAlign: 'top'}}/>

        </div>
      </form>
    )
  }
}
