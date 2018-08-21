import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {MenuItem, Select, Checkbox} from '@material-ui/core'
import {find} from 'lodash'

import {productFilterTypes} from 'shared/Global'

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 50 * 8,
    }
  }
}

export default class WorkflowProductFilter extends React.Component {
  render () {
    const {filterType, onChangeFilterType} = this.props

    return (
      <div className="inline-block margin-md-left">
        <FormControl>
          <InputLabel>Filter Type</InputLabel>
          <Select
            value={filterType}
            onChange={onChangeFilterType}
            style={{width: 150}}
            MenuProps={menuProps}
          >
            {productFilterTypes.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
          </Select>
        </FormControl>


        {filterType === 'PRODUCT' ? (
          <div>
          </div>
        ) : (
          <div>
          </div>
        )}

      </div>
    )
  }
}