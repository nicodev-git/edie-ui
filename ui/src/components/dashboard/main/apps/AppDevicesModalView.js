import React from 'react'

import {Modal, CardPanel} from 'components/modal/parts'

export default class AppDevicesModalView extends React.Component {
  render () {
    const {onHide, devices} = this.props
    return (
      <Modal title="Devices" onRequestClose={onHide}>
        <CardPanel title="Devices">
          <div style={{maxHeight: 300, overflow: 'auto'}}>
            <table>
              <thead>
              <tr><th>Device</th></tr>
              </thead>
              <tbody>
              {devices.map(p =>
                <tr key={p.id}>
                  <td>
                    {p.name}
                  </td>
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
