import React from 'react'

import {Modal, CardPanel} from 'components/modal/parts'

export default class AppDevicesModalView extends React.Component {
  render () {
    const {onHide, devices, selectedApp} = this.props
    return (
      <Modal title="Devices" onRequestClose={onHide}>
        <CardPanel title={selectedApp.Name}>
          <div style={{maxHeight: 300, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>OS</th>
                <th>IP</th>
              </tr>
              </thead>
              <tbody>
              {devices.map(p =>
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.os}</td>
                  <td>{p.ip}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>
      </Modal>
    )
  }
}
