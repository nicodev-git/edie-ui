import React from 'react'

import BoardListModalView from './BoardListModalView'

import {showPrompt, showConfirm} from 'components/common/Alert'

export default class BoardListModal extends React.Component {
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

  render () {
    const {gaugeBoards} = this.props
    return (
      <BoardListModalView
        onHide={this.onHide.bind(this)}
        gaugeBoards={gaugeBoards}
        onClickAdd={this.onClickAdd.bind(this)}
        onClickEdit={this.onClickEdit.bind(this)}
        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
