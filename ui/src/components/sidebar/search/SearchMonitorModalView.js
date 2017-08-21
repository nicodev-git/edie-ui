import React from 'react'

import {TwoButtonsBlockCustom, Modal, CardPanel} from 'components/modal/parts'

export default class SearchMonitorModalView extends React.Component {
  render () {
    const {allDevices, onClickOK, onClickClose, onClickRow} = this.props
    return (
      <Modal title="Monitors" onRequestClose={onClickClose}>
        <CardPanel title="Monitors">
          <div style={{maxHeight: 400, overflow: 'auto'}}>
            <table className="table table-hover">
              <tbody>
              {allDevices.map(device => (device.monitors || []).map(monitor =>
                <tr key={monitor.uid} onClick={() => onClickRow(monitor.uid)}>
                  <td>{`${device.name} - ${monitor.name}`}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </CardPanel>
        <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
      </Modal>
    )
  }
}
