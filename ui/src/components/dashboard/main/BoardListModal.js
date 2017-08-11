import React from 'react'

import BoardListModalView from './BoardListModalView'

export default class BoardListModal extends React.Component {
  onHide () {

  }

  render () {
    const {gaugeBoards} = this.props
    return (
      <BoardListModalView
        onHide={this.onHide.bind(this)}
        gaugeBoards={gaugeBoards}
      />
    )
  }
}
