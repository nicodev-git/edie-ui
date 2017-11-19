import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { errorStyle, underlineFocusStyle, inputStyle, selectLabelStyle,
  selectIconStyle,
  inputContainerStyle, selectedItemStyle } from 'style/common/materialStyles'

const FormSelect = ({input, label, floatingLabel, className, style, meta: { touched, error }, options}) => (
  <SelectField
    hintText={label}
    floatingLabelText={floatingLabel}
    errorText={touched && error}
    errorStyle={errorStyle}
    underlineStyle={underlineFocusStyle}
    selectedMenuItemStyle={selectedItemStyle}
    menuItemStyle={inputStyle}
    labelStyle={selectLabelStyle}
    iconStyle={selectIconStyle}
    style={style || inputContainerStyle}
    className={className}
    {...input}
    onChange={(event, index, value) => input.onChange(value, event)}>
    {options.map(option => <MenuItem key={option.value} value={option.value} primaryText={option.label}/>)}
  </SelectField>
)

export default FormSelect
