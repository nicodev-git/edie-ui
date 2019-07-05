import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import { Modal, CardPanel } from 'components/modal/parts'

export default class DeviceFlowsModalView extends React.Component {
  render () {
    const {onHide, deviceWorkflows, onClickAdd, children} = this.props
    return (
      <Modal title="Flows" onRequestClose={onHide}>
        <CardPanel title="Flows" tools={<AddIcon className="link" onClick={onClickAdd}/>}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {deviceWorkflows.map(p =>
              <tr key={p.uuid}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td></td>
              </tr>
            )}
            </tbody>
          </table>
        </CardPanel>
        {children}
      </Modal>
    )
  }
}
