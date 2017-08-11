import React from 'react'

import BoardListModalView from './BoardListModalView'

export default class BoardListModal extends React.Component {
  onHide () {

  }

  onClickAdd () {

  }

  onClickEdit (item) {

  }

  onClickDelete (item) {

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
