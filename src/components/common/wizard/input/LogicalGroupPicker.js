import React from 'react'
import {IconButton} from '@material-ui/core'
import ForwardIcon from '@material-ui/icons/ArrowForward'
import BackwardIcon from '@material-ui/icons/ArrowBack'
import {findIndex} from 'lodash'

// import DashboardPicker from './DashboardPicker'

export default class LogicalGroupPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dashboardModalOpen: false,
      selected: null,
    }
  }

  onChangeDashboard (e, index, dashboardId) {
    const {selectedRight, onUpdateMonitorGroup} = this.props
    onUpdateMonitorGroup({
      ...selectedRight,
      dashboardId: e.target.value
    })
  }

  // onClickDashboard (item) {
  //   const {onSelectRight} = this.props
  //   onSelectRight(item)
  //   this.setState({
  //     dashboardModalOpen: true,
  //     selected: item.dashboardId
  //   })
  // }

  // renderDashboardModal() {
  //   if (!this.state.dashboardModalOpen) return null
  //   const {gaugeBoards} = this.props
  //   return (
  //     <DashboardPicker
  //       gaugeBoards={gaugeBoards}
  //       selected={this.state.selected}
  //       onHide={() => this.setState({dashboardModalOpen: false})}
  //       onClickOK={this.onChangeDashboard.bind(this)}
  //     />
  //   )
  // }

  renderRight () {
    const {tableClass, height, monitorGroups, selectedMonitorGroups, selectedRight, onSelectRight, gaugeBoards} = this.props

    const wfs = []
    selectedMonitorGroups.forEach(p => {
      const index = findIndex(monitorGroups, {id: p.id})
      if (index >= 0) {
        const dindex = p.dashboardId ? findIndex(gaugeBoards, {id: p.dashboardId}) : -1
        wfs.push({
          ...monitorGroups[index],
          dashboardId: p.dashboardId,
          dashboard: dindex < 0 ? 'None' : gaugeBoards[dindex].name
        })
      }
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
                <td>
                  {isSel ? (
                    <select
                      value={p.dashboardId}
                      onChange={this.onChangeDashboard.bind(this)}
                      className="text-primary" style={{fontSize: 14}}>
                      <option value="">[None]</option>
                      {gaugeBoards.map(k =>
                        <option key={k.id} value={k.id}>{k.name}</option>
                      )}
                    </select>
                  ) : (
                    <div className="link text-primary">{p.dashboard}</div>
                  )}

                </td>
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
            <IconButton onClick={onClickAddMonitorGroup}>
              <ForwardIcon />
            </IconButton>
            <IconButton onClick={onClickRemoveMonitorGroup}>
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
