import React from 'react'

import { Modal, CardPanel } from 'components/modal/parts'

export default class MonitorGroupsModalView extends React.Component {
  renderRow (monitorGroup) {
    return (
      <tr key={monitorGroup.id}>
        <td>{monitorGroup.name || 'No Name'}</td>
      </tr>
    )
  }
  render () {
    const {onHide, monitorGroups} = this.props
    return (
      <Modal title="Monitor Groups" onRequestClose={onHide}>
        <CardPanel title="Map Users">
          <div style={{maxHeight: 350, overflow: 'auto'}}>
            <table className="table table-hover">
              <tbody>
              {monitorGroups.map(p => this.renderRow(p))}
              </tbody>
            </table>
          </div>
        </CardPanel>
      </Modal>
    )
  }
}
