import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, CloseButton } from './parts'

export default class RelDevicesModalView extends React.Component {
  render () {
    const {onHide, relDevices} = this.props
    return (
      <Modal show onHide={onHide} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <Header name="Choose Monitor"/>
        <div className="modal-body bootstrap-dialog-message">
          <div style={{maxHeight: '500px', overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
              {relDevices.map(d =>
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.wanip || d.lanip}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <CloseButton onClose={onHide} />
        </div>
      </Modal>
    )
  }
}
