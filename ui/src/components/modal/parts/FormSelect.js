import React from 'react'
import Select from 'material-ui/Select'
import {MenuItem} from 'material-ui/Menu'
import { errorStyle, underlineFocusStyle, inputStyle, selectLabelStyle,
  selectIconStyle,
  inputContainerStyle, selectedItemStyle } from 'style/common/materialStyles'

const FormSelect = ({input, label, floatingLabel, className, style, meta: { touched, error }, options}) => (
  <Select
    hintText={label}
    floatingLabelText={floatingLabel}
    errorText={touched && error}
    errorStyle={errorStyle}
    underlineStyle={underlineFocusStyle}
    selectedMenuItemStyle={selectedItemStyle}
    menuItemStyle={inputStyle}
    labelStyle={selectLabelStyle}

    style={style || inputContainerStyle}
    className={className}
    {...input}
    onChange={(event, index, value) => input.onChange(value, event)}>
    {options.map(option => <MenuItem key={option.value} value={option.value} primaryText={option.label}/>)}
  </Select>
)

export default FormSelect
