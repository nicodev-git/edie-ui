import React from 'react'
import {findIndex} from 'lodash'
import {Select, MenuItem, InputLabel, FormControl, ListItemText, Checkbox} from '@material-ui/core'

const FormMultiSelect = ({input, label, floatingLabel, fullWidth, className, options, ...custom}) => (
  <FormControl fullWidth={fullWidth} className={className} style={{minWidth: 160}}>
    {floatingLabel && <InputLabel>{floatingLabel}</InputLabel>}
    <Select
      {...custom}
      {...input}
      value={input.value || []}
      multiple
      placeholder={label}
      renderValue={selected => {
        const labels = []
        selected.forEach(value => {
          const index = findIndex(options, {value})
          if (index >= 0) labels.push(options[index].label)
        })
        return labels.join(', ') || labels
      }}
      onBlur={() => input.onBlur(input.value)}
    >
      {options.map(option =>
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={(input.value || []).indexOf(option.value) > -1}/>
          <ListItemText primary={option.label} />
        </MenuItem>)
      }
    </Select>
  </FormControl>
)

export default FormMultiSelect
