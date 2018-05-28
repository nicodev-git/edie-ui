import React from 'react'
import {IconButton} from '@material-ui/core'
import ForwardIcon from '@material-ui/icons/ArrowForward'
import BackwardIcon from '@material-ui/icons/ArrowBack'

export default class GaugeServerPicker extends React.Component {
  render () {
    const {devices, selectedServers, selectedDevice, selectedRight, selectedMonitor,
      onSelectDevice, onSelectRight, onSelectMonitor, onClickAddServer, onClickRemoveServer,
      tableClass, height
    } = this.props
    const monitors = selectedDevice ? (selectedDevice.monitors || []) : []
    return (
      <div className="padding-md-left padding-md-right">
        <div className="row">
          <div className="col-md-6 p-none">
            <div className="flex-horizontal" style={{height: height || 300, border: '1px solid gray'}}>
              <div className="flex-1" style={{overflow: 'auto'}}>
                <table className={`table table-hover ${tableClass}`}>
                  <tbody>
                  <tr>
                    <td><b>Device</b></td>
                  </tr>
                  {(devices || []).map((p, i) =>
                    <tr key={p.id}>
                      <td
                        width="50%"
                        className={selectedDevice && selectedDevice.id === p.id ? 'selected' : ''}
                        onClick={() => onSelectDevice(p)}>{p.name}</td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
              <div className="flex-1" style={{overflow: 'auto'}}>
                <table className={`table table-hover ${tableClass}`}>
                  <tbody>
                  <tr>
                    <td><b>Monitor</b></td>
                  </tr>
                  {monitors.map((p, i) =>
                    <tr key={p.uid}>
                      <td
                        width="50%"
                        className={selectedMonitor && selectedMonitor.uid === p.uid ? 'selected' : ''}
                        onClick={() => onSelectMonitor(monitors[i])}>
                        {p.name}
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-1 p-none">
            <IconButton onClick={() => onClickAddServer(false)}>
              <ForwardIcon />
            </IconButton>
            <IconButton onClick={onClickRemoveServer}>
              <BackwardIcon />
            </IconButton>
          </div>
          <div className="col-md-5 p-none">
            <div style={{height: height || 300, overflow: 'auto', border: '1px solid gray'}}>
              <table className={`table table-hover ${tableClass}`}>
                <tbody>
                <tr>
                  <td><b>Selected</b></td>
                </tr>
                {selectedServers.map(p => {
                  let isSel = false
                  if (selectedRight) {
                    if (selectedRight.type === 'monitor')
                      isSel = p.type === 'monitor' && p.monitorId === selectedRight.monitorId
                    else
                      isSel = p.type === 'device' && p.id === selectedRight.id
                  }
                  return (
                    <tr
                      key={p.monitorId || p.id} className={isSel  ? 'selected' : ''}
                      onClick={() => onSelectRight(p)}>
                      <td>{p.name}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
