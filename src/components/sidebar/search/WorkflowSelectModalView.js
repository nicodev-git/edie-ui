import React from 'react'
import {MenuItem, Select, TextField} from '@material-ui/core'

import { TwoButtonsBlockCustom, Modal, CardPanel } from 'components/modal/parts'

export default class WorkflowSelectModalView extends React.Component {
  render () {
    const {
      onChangeCategory,
      onClickClose, onClickOK,
      workflows,
      selectedRowWf, onClickRow,
      selectedCategory, workflowCategories,
      workflowFilter, onChangeWorkflowFilter
    } = this.props
    return (
      <Modal title="Workflow" onRequestClose={onClickClose}>
        <CardPanel title="Workflow">
          <div className="padding-md-left">
            <Select value={selectedCategory || ''} onChange={onChangeCategory}>
              <MenuItem key="0" value="">[All]</MenuItem>
              {workflowCategories.map(c =>
                <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
              )}
            </Select>
            <TextField
              label="Search"
              style={{marginLeft: '20px', verticalAlign: 'top'}}
              value={workflowFilter}
              onChange={onChangeWorkflowFilter}
            />
          </div>
          <div style={{maxHeight: '250px', overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Severity</th>
                <th>Name</th>
                <th>Description</th>
                <th>Version</th>
              </tr>
              </thead>
              <tbody>
              {
                workflows.map(w =>
                  <tr
                    key={w.id}
                    className={selectedRowWf.id === w.id ? 'selected' : ''}
                    onClick={() => onClickRow(w)}
                  >
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
        <TwoButtonsBlockCustom name2="OK" action2={onClickOK}/>
      </Modal>
    )
  }
}
