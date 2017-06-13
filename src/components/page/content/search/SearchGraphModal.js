import React from 'react'

import {SearchGraphModalView} from 'components/modal'

export default class SearchGraphModal extends React.Component {
  onClickClose () {
    this.props.showSearchGraphModal(false)
  }
  render () {
    return (
      <SearchGraphModalView
        onHide={this.onClickClose.bind(this)}
      />
    )
  }
}
