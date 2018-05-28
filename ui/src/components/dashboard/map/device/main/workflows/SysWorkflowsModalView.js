import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import {MenuItem} from '@material-ui/core'
import { findIndex } from 'lodash'
import { FormControlLabel } from '@material-ui/core'

import { TwoButtonsBlockCustom, Modal, CardPanel } from 'components/modal/parts'
import { errorStyle, underlineFocusStyle, inputStyle,
  selectedItemStyle } from 'style/common/materialStyles'

export default class SysWorkflowsModalView extends React.Component {
  render () {
    const {header, onChangeCategory, onChangeCheck,
      onClickClose, onClickAdd,
      sysWorkflows,
      selectedSysWorkflowCategory, workflowCategories,
      selectedSysWorkflows} = this.props
    return (
      <Modal title={header} onRequestClose={onClickClose}>
        <CardPanel title={header}>
          <div className="padding-md-left">
            <Select
              errorStyle={errorStyle}
              underlineStyle={underlineFocusStyle}
              selectedMenuItemStyle={selectedItemStyle}
              menuItemStyle={inputStyle}

              value={selectedSysWorkflowCategory || ''}
              onChange={onChangeCategory}
            >
              <MenuItem key="0" value="" >[All]</MenuItem>
              {workflowCategories.map(c =>
                <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
              )}
            </Select>
          </div>
          <div style={{maxHeight: '400px', overflow: 'scroll'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Category</th>
                <th>Severity</th>
                <th>Name</th>
                <th>Description</th>
                <th>Version</th>
              </tr>
              </thead>
              <tbody>
              {
                sysWorkflows.map(w =>
                  <tr key={w.id}>
                    <td>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={findIndex(selectedSysWorkflows, {id: w.id}) >= 0}
                            onChange={(e, c) => onChangeCheck(w, e, c)}
                          />
                        }
                        label={w.category}
                      />
                    </td>
                    <td>{w.severity}</td>
                    <td>{w.name}</td>
                    <td>{w.desc}</td>
                    <td>{w.version}</td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>
        </CardPanel>
        <TwoButtonsBlockCustom name2="Add" action2={onClickAdd}/>
      </Modal>
    )
  }
}
