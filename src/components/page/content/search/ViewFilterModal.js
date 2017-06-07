import React from 'react'

import {ViewFilterModalView} from 'components/modal'

export default class ViewFilterModal extends React.Component {
  onClickOK () {

  }
  onClickClose () {

  }
  render () {
    return (
      <ViewFilterModalView
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
      />
    )
  }
}
