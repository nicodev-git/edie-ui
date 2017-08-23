import React from 'react'
import {IconButton} from 'material-ui'
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import BackwardIcon from 'material-ui/svg-icons/navigation/arrow-back'
import {concat} from 'lodash'


export default class GaugeLogMonitorPicker extends React.Component {
  render () {
    const {
      devices, selectedMonitors, toggleMonitorId, onSelectMonitor, selectedMonitor,
      selectedRight, onSelectRight,
      tableClass, height} = this.props

    let monitors = []
    (devices || []).forEach(device => {
      monitors = concat(monitors, (device.monitors || []).filter(monitor => monitor.monitortype === 'logfile'))
    })

    return (
      <div className="padding-md-left padding-md-right">
        <div className="row">
          <div className="col-md-6 p-none">
            <div style={{height: height || 300, overflow: 'auto', border: '1px solid gray'}}>
              <table className={`table table-hover ${tableClass}`}>
                <tbody>
                <tr>
                  <td><b>Monitor</b></td>
                </tr>
                {monitors.map(p =>
                  <tr key={p.uid}>
                    <td
                      className={selectedMonitor && selectedMonitor.uid === p.uid ? 'selected' : ''}
                      onClick={() => onSelectMonitor(p)}>
                      {p.name}
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-1 p-none">
            <IconButton onTouchTap={toggleMonitorId}>
              <ForwardIcon />
            </IconButton>
            <IconButton onTouchTap={toggleMonitorId}>
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
                {selectedMonitors.map(p => {
                  const isSel = selectedRight && selectedRight.uid === p
                  const index = findIndex(monitors, {uid: p})
                  if (index < 0) return null
                  return (
                    <tr
                      key={p} className={isSel  ? 'selected' : ''}
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
