import React from 'react'

import {Modal, CardPanel} from 'components/modal/parts'
import {isWindowsDevice} from 'shared/Global'

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
                  <td>{isWindowsDevice(p) ? 'Windows' : 'Linux'}</td>
                  <td>{p.wanip || p.lanip}</td>
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
