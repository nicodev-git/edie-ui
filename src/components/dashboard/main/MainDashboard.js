import React from 'react'
import {Select, MenuItem} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {findIndex} from 'lodash'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import {slugify} from 'shared/Global'

import MainDashboardView from './MainDashboardView'
import ServerDashboardView from './ServerDashboardView'
import BoardListModal from './BoardListModal'
import WorkflowDashboardView from './WorkflowDashboardView'
import AppsDashboardView from './AppsDashboardView'

import {hasPermission} from 'shared/Permission'

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
    let {id} = this.props.match.params
    if ((!this.props.gaugeBoards.length || !nextProps.match.params.id) && gaugeBoards.length) {
      let board
      if (id && nextProps.match.params.id) {
        board = this.findBoard(gaugeBoards, id)
      }

      if (!board) board = gaugeBoards.filter(p => p.type !== 'system')[0]
      nextProps.selectGaugeBoard(board.id, slugify(board.name), nextProps.history)
    }
  }
  findBoard (boards, slug) {
    let found
    boards.every(p => {
      if (slugify(p.name) === slug) {
        found = p
        return false
      }
      return true
    })
    return found
  }
  getSelectedId () {
    const {id} = this.props.match.params
    const board = this.findBoard(this.props.gaugeBoards, id)
    if (board) return board.id
    return id
  }
  getSelected () {
    const index = findIndex(this.props.gaugeBoards, {id: this.getSelectedId()})
    if (index < 0) return null
    return this.props.gaugeBoards[index]
  }

  isServerDashboard (board) {
    return board && board.type === 'system' && board.name === 'Servers'
  }
  onChangeBoard (e) {
    const gaugeBoards = this.getBoards()
    const index = findIndex(gaugeBoards, {id: e.target.value})
    const url = slugify(gaugeBoards[index].name)
    this.props.selectGaugeBoard(e.target.value, url, this.props.history, true)
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
    return this.props.gaugeBoards.filter(p => p.type !== 'system')
  }
  renderContent (canEdit) {
    const board = this.getSelected()
    if (!board) return null
    if (board.type === 'system') {
      if (board.name === 'Servers') {
        return (
          <ServerDashboardView board={board} {...this.props} canEdit={canEdit}/>
        )
      } else if (board.name === 'Workflows') {
        return (
          <WorkflowDashboardView board={board} {...this.props} canEdit={canEdit}/>
        )
      } else if (board.name === 'Apps') {
        return (
          <AppsDashboardView board={board} {...this.props} canEdit={canEdit}/>
        )
      }
    }
    return (
      <MainDashboardView board={board} {...this.props} canEdit={canEdit}/>
    )
  }
  renderBoardsModal () {
    if (!this.props.gaugeBoardsModalOpen) return
    return (
      <BoardListModal {...this.props}/>
    )
  }

  renderTopbar (canEdit) {
    const board = this.getSelected()
    if (!board) return null
    if (board.type === 'system') {
      return (
        <div className="padding-lg-left margin-sm-top"/>
      )
    }
    return (
      <div className="padding-lg-left margin-sm-top">
        <FormControl className="valign-top margin-sm-top">
          <InputLabel>Dashboard</InputLabel>
          <Select
            value={this.getSelectedId()} onChange={this.onChangeBoard.bind(this)}
            style={{width: 180}}>
            {this.getBoards().map(p =>
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        {canEdit && <AddCircleIcon onClick={this.onClickAdd.bind(this)} className="link valign-bottom margin-sm-left"/>}
      </div>
    )
  }
  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditDashboard')
    return (
      <div className="tabs-custom flex-vertical flex-1">
        {this.renderTopbar(canEdit)}

        <div className="flex-vertical flex-1">
          {this.renderContent(canEdit)}
          {this.renderBoardsModal()}
        </div>
      </div>
    )
  }
}
