import React from 'react'
import SelectField from 'material-ui/SelectField'
import SuperSelectField from 'material-ui-superselectfield'
import MenuItem from 'material-ui/MenuItem'
import { labelStyle, labelFocusStyle, errorStyle, underlineFocusStyle,
   selectedItemStyle } from './materialStyles'

const FormMultiSelect = ({input, label, meta: { touched, error }, options}) => (
  <SelectField
    floatingLabelText={label}
    floatingLabelStyle={labelStyle}
    floatingLabelFocusStyle={labelFocusStyle}
    errorText={touched && error}
    errorStyle={errorStyle}
    underlineStyle={underlineFocusStyle}
    selectedMenuItemStyle={selectedItemStyle}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}>
    {options.map(option => <MenuItem key={option.value} value={option.value} primaryText={option.label}/>)}
  </SelectField>
)

export default FormMultiSelect
