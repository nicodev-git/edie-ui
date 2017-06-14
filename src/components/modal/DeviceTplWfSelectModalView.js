import React from 'react'
import {Dialog} from 'material-ui'

import { TwoButtonsBlockCustom } from './parts'

export default class DeviceTplWfSelectModalView extends React.Component {
  render () {
    const {
      onClickClose, onClickSave, onClickRow,
      workflows, selectedRowWf
    } = this.props
    return (
      <Dialog open title="Workflow">
        <div style={{maxHeight: '400px', overflow: 'auto'}}>
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
              workflows.map(w =>
                <tr
                  key={w.id}
                  className={selectedRowWf && selectedRowWf.id === w.id ? 'selected' : ''}
                  onClick={() => onClickRow(w)}
                >
                  <td>{w.category}</td>
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
        <TwoButtonsBlockCustom name1="Cancel" action1={onClickClose} name2="OK" action2={onClickSave}/>
      </Dialog>
    )
  }
}
