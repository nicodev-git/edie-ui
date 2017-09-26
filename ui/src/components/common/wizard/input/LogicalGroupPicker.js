import React from 'react'
import {IconButton} from 'material-ui'
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import BackwardIcon from 'material-ui/svg-icons/navigation/arrow-back'
import {findIndex} from 'lodash'

export default class LogicalGroupPicker extends React.Component {
  renderRight () {
    const {tableClass, height, monitorGroups, selectedMonitorGroups, selectedRight, onSelectRight} = this.props

    const wfs = []
    selectedMonitorGroups.forEach(id => {
      const index = findIndex(monitorGroups, {id})
      if (index >= 0) wfs.push(monitorGroups[index])
    })

    return (
      <div style={{height: height || 300, overflow: 'auto', border: '1px solid gray'}}>
        <table className={`table table-hover ${tableClass}`}>
          <tbody>
          <tr>
            <td><b>Selected</b></td>
            <td><b>Forward</b></td>
          </tr>
          {wfs.map(p => {
            let isSel = selectedRight && p.id === selectedRight.id
            return (
              <tr
                key={p.id} className={isSel  ? 'selected' : ''}
                onClick={() => onSelectRight(p)}>
                <td>{p.name || 'No Name'}</td>
                <td></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    const {
      monitorGroups, selectedMonitorGroup,
      onSelectMonitorGroup, onClickAddMonitorGroup, onClickRemoveMonitorGroup,
      tableClass, height,
      className
    } = this.props
    return (
      <div className={`padding-md-left padding-md-right ${className || ''}`}>
        <div className="row">
          <div className="col-md-6 p-none">
            <div style={{height: height || 300, overflow: 'auto', border: '1px solid gray'}}>
              <table className={`table table-hover ${tableClass || ''}`}>
                <tbody>
                <tr>
                  <td><b>Logical Group</b></td>
                </tr>
                {monitorGroups.map((p, i) =>
                  <tr key={p.id}>
                    <td
                      className={selectedMonitorGroup && selectedMonitorGroup.id === p.id ? 'selected' : ''}
                      onClick={() => onSelectMonitorGroup(p)}>
                      {p.name || 'No Name'}
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-1 p-none">
            <IconButton onTouchTap={onClickAddMonitorGroup}>
              <ForwardIcon />
            </IconButton>
            <IconButton onTouchTap={onClickRemoveMonitorGroup}>
              <BackwardIcon />
            </IconButton>
          </div>
          <div className="col-md-5 p-none">
            {this.renderRight()}
          </div>
        </div>
      </div>
    )
  }
}
