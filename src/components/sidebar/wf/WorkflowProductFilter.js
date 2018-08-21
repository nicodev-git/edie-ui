import React from 'react'


import WorkflowSettingModalView from './WorkflowSettingModalView'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {MenuItem, Select} from "@material-ui/core";
import {find} from "lodash";
import Checkbox from "@material-ui/core/Checkbox";

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 50 * 8,
    }
  }
}

export default class WorkflowProductFilter extends React.Component {
  onSubmit (values) {
    const entity = {
      ...values,
    }

    this.props.onSave(entity)
    this.onClickClose()
  }
  onClickClose () {
    this.props.onClose()
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div className="inline-block margin-md-left">
        <FormControl>
          <InputLabel>Product Type</InputLabel>
          <Select
            value={filterProductTypes}
            onChange={this.onChangeProductTypeId.bind(this)}
            style={{width: 150}}
            multiple
            renderValue={selected => selected.map(p => find(productTypes, {id: p}).name).join(', ')}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 50 * 8,
                }
              }
            }}
          >
            {productTypes.map(p =>
              <MenuItem key={p.id} value={p.id}>
                <Checkbox checked={filterProductTypes.includes(p.id)}/>
                <label>{p.name}</label>
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    )
  }
}