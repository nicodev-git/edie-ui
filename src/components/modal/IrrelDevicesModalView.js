import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, CloseButton } from './parts'

export default class IrrelDevicesModalView extends React.Component {
  renderItems () {
    const {irrelDevices} = this.props
    return irrelDevices.map(d =>
      <tr key={d}>
        <td>{d}</td>
      </tr>
    )
  }
  render () {
    const {onHide} = this.props
    return (
      <Modal show onHide={onHide} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary modal-w-fit">
        <Header name="Not Relevant Devices"/>
        <div className="modal-body bootstrap-dialog-message">
          <div style={{height: '500px', overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
              {this.renderItems()}
              </tbody>
            </table>
          </div>
          <CloseButton onClose={onHide} />
        </div>
      </Modal>
    )
  }
}
