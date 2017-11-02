import React from 'react'
import {IconButton, SelectField, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import {findIndex} from 'lodash'

import MainDashboardView from './MainDashboardView'
import ServerDashboardView from './ServerDashboardView'
import BoardListModal from './BoardListModal'
import WorkflowDashboardView from './WorkflowDashboardView'

export default class MainDashboard extends React.Component {
  componentWillMount () {
    this.props.selectGaugeBoard(null)
    this.props.fetchGaugeBoards()
    this.props.fetchGauges()
    this.props.fetchSysSearchOptions()
    this.props.fetchWorkflows()
    this.props.fetchDevicesGroups()
    this.props.fetchMonitorGroups()
    this.props.fetchMonitorTemplates()
    this.props.fetchCredentials()
    this.props.fetchCollectors()
    this.props.fetchDeviceTemplates()
  }
  componentWillUpdate (nextProps) {
    const {gaugeBoards} = nextProps
    const {id} = this.props.match.params
    if ((!this.props.gaugeBoards.length || !nextProps.match.params.id) && gaugeBoards.length) {
      let index = -1
      if (id && nextProps.match.params.id) index = findIndex(gaugeBoards, {id})

      nextProps.selectGaugeBoard(gaugeBoards[index >= 0 ? index : 0].id, nextProps.history)
    }
  }
  getSelectedId () {
    return this.props.match.params.id
  }
  getSelected () {
    const index = findIndex(this.props.gaugeBoards, {id: this.getSelectedId()})
    if (index < 0) return null
    return this.props.gaugeBoards[index]
  }
  onChangeBoard (e, index, value) {
    this.props.selectGaugeBoard(value, this.props.history, true)
  }
  onClickAdd () {
    // showPrompt('Please type name.', '', name => {
    //   if (!name) return
    //   this.props.addGaugeBoard({
    //     name
    //   })
    // })
    this.props.showGaugeBoardsModal(true)
  }
  onClickSetDefault () {
    const board = this.getSelected()
    if (!board) return null
    this.props.setDefaultGaugeBoard(board)
  }
  getBoards () {
    return this.props.gaugeBoards
  }
  renderContent () {
    const board = this.getSelected()
    if (!board) return null
    if (board.type === 'system') {
      if (board.name === 'Servers') {
        return (
          <ServerDashboardView board={board} {...this.props}/>
        )
      } else if (board.name === 'Workflows') {
        return (
          <WorkflowDashboardView board={board} {...this.props}/>
        )
      }

    }
    return (
      <MainDashboardView board={board} {...this.props}/>
    )
  }
  renderBoardsModal () {
    if (!this.props.gaugeBoardsModalOpen) return
    return (
      <BoardListModal {...this.props}/>
    )
  }
  render () {
    return (
      <div className="tabs-custom flex-vertical flex-1">
        <div className="padding-lg-left">
          <SelectField
            floatingLabelText="Dashboard" value={this.getSelectedId()} onChange={this.onChangeBoard.bind(this)}
            className="valign-top">
            {this.getBoards().map(p =>
              <MenuItem key={p.id} value={p.id} primaryText={p.name}/>
            )}
          </SelectField>
          <IconButton onTouchTap={this.onClickAdd.bind(this)} className="valign-bottom"><AddCircleIcon /></IconButton>
        </div>

        <div className="flex-vertical flex-1">
          {this.renderContent()}
          {this.renderBoardsModal()}
        </div>
      </div>
    )
  }
}
