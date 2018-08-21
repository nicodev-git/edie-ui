import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {MenuItem, Select, Checkbox} from '@material-ui/core'
import {find} from 'lodash'

import {productFilterTypes} from 'shared/Global'
import {Field} from "redux-form";

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 50 * 8,
    }
  }
}

export default class WorkflowProductFilter extends React.Component {
  render () {
    const {
      vendorProducts, productTypes, productVendors,

      filterType, onChangeFilterType,
      productTypeId, onChangeProductType
    } = this.props

    return (
      <div className="inline-block margin-md-left">
        <FormControl className="margin-md-right">
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
          <FormControl>
            <InputLabel>Product Type</InputLabel>
            <Select
              value={productTypeId}
              onChange={onChangeFilterType}
              style={{width: 150}}
              MenuProps={menuProps}
            >
              {productTypes.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
            </Select>
          </FormControl>
        )}
      </div>
    )
  }
}