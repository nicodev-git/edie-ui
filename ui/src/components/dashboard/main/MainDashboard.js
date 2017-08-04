import React from 'react'
import {IconButton, SelectField, MenuItem, RaisedButton} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import {findIndex} from 'lodash'

import { showPrompt } from 'components/common/Alert'

import MainDashboardView from './MainDashboardView'

export default class MainDashboard extends React.Component {
  componentWillMount () {
    this.props.fetchGaugeBoards()
  }
  componentWillUpdate (nextProps) {
    const {gaugeBoards} = nextProps
    if (!this.props.gaugeBoards.length && gaugeBoards.length) {
      this.props.selectGaugeBoard(gaugeBoards[0].id)
    }
  }
  getSelected () {
    const index = findIndex(this.props.gaugeBoards, {id: this.props.selectedGaugeBoard})
    if (index < 0) return null
    return this.props.gaugeBoards[index]
  }
  onChangeBoard (e, index, value) {
    this.props.selectGaugeBoard(value)
  }
  onClickAdd () {
    showPrompt('Please type name.', '', name => {
      if (!name) return
      this.props.addGaugeBoard({
        name
      })
    })
  }
  onClickSetDefault () {

  }
  getBoards () {
    return this.props.gaugeBoards
  }
  renderContent () {
    const board = this.getSelected()
    if (!board) return null
    return (
      <MainDashboardView board={board} {...this.props}/>
    )
  }
  render () {
    return (
      <div className="tabs-custom flex-vertical flex-1">
        <div className="padding-lg-left">
          <SelectField
            floatingLabelText="Dashboard" value={this.props.selectedGaugeBoard} onChange={this.onChangeBoard.bind(this)}
            className="valign-top">
            {this.getBoards().map(p =>
              <MenuItem key={p.id} value={p.id} primaryText={p.name}/>
            )}
          </SelectField>
          <IconButton onTouchTap={this.onClickAdd.bind(this)} className="valign-bottom"><AddCircleIcon /></IconButton>
          <RaisedButton className="top" label="Set Default" style={{marginTop: 30}} onTouchTap={this.onClickSetDefault.bind(this)}/>
        </div>

        <div className="flex-vertical flex-1">
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
