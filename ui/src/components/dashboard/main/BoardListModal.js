import React from 'react'

import BoardListModalView from './BoardListModalView'

import {showPrompt, showConfirm} from 'components/common/Alert'

export default class BoardListModal extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selected: null
    }
  }
  onHide () {

  }

  onClickAdd () {
    showPrompt('Please type name.', '', name => {
      if (!name) return
      this.props.addGaugeBoard({
        name
      })
    })
  }

  onClickEdit (item) {
    showPrompt('Please type name.', '', name => {
      if (!name) return
      this.props.updateGaugeBoard({
        ...item,
        name
      })
    })
  }

  onClickDelete (item) {
    showConfirm('Are you sure?', btn => {
      if (btn !== 'ok') return
      this.props.removeGaugeBoard(item)
    })
  }

  onSelect (item) {

  }

  onClickSetDefault (item) {

  }

  render () {
    const {gaugeBoards} = this.props
    return (
      <BoardListModalView
        selected={this.state.selected}
        onHide={this.onHide.bind(this)}
        gaugeBoards={gaugeBoards}
        onSelect={this.onSelect.bind(this)}
        onClickAdd={this.onClickAdd.bind(this)}
        onClickEdit={this.onClickEdit.bind(this)}
        onClickDelete={this.onClickDelete.bind(this)}
        onClickSetDefault={this.onClickSetDefault.bind(this)}
      />
    )
  }
}
