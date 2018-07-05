import React from 'react'

import {Button} from '@material-ui/core'
import { TwoButtonsBlockCustom, Modal, CardPanel } from 'components/modal/parts'

export default class FlowPickerModalView extends React.Component {
  render () {
    const {
      onClickClose, onClickOK,
      workflows,
      selected, onClickRow,
    } = this.props
    return (
      <Modal title="Workflow" onRequestClose={onClickClose}>
        <CardPanel title="Workflow">
          <div style={{maxHeight: '250px', overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              {
                workflows.map(w =>
                  <tr
                    key={w.uuid}
                    className={selected && selected.uuid === w.uuid ? 'selected' : ''}
                    onClick={() => onClickRow(w)}>

                    <td>{w.name}</td>
                    <td>{w.description}</td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>
        </CardPanel>
        <div className="margin-md-top">
          <Button variant="raised" onClick={onClickOK}>OK</Button>
        </div>
      </Modal>
    )
  }
}
