import React from 'react'
import {SelectField, MenuItem} from 'material-ui'
import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

const FormMultiSelect = ({input, label, meta: { touched, error }, options, value, onChange}) => (
  <SelectField
    {...input}
    underlineStyle={underlineFocusStyle}
    selectedMenuItemStyle={selectedItemStyle}
    menuItemStyle={inputStyle}
    multiple
    hintText={label}
    value={value}
    onChange={onChange}
  >
    {options.map(option =>
      <MenuItem
        key={option.value}
        insetChildren
        checked={value && value.includes(option.value)}
        value={option.value}
        primaryText={option.label}
      />
    )}
  </SelectField>
)

export default FormMultiSelect
